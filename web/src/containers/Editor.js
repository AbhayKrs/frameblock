import { useRef, useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';

import { download_draft, edit_user_draft, fetch_draft } from "../utils/api_routes";
import { SET_EDITOR_DATA } from "../store/reducers/draft.reducers";
import '../styles/editor2.scss';

import { TbArrowAutofitHeight, TbArrowAutofitWidth, TbEdit } from 'react-icons/tb';
import { FiZoomIn, FiZoomOut } from 'react-icons/fi';
import { BiDownload } from 'react-icons/bi';
import { TiInputChecked } from "react-icons/ti";
import { CgCloseR } from "react-icons/cg";

import Loader from '../assets/images/updateLoader.gif';

import EditableInput from "../components/EditableInput";
import EditableObjective from "../components/EditableObjective";
import EditableSocials from "../components/EditableSocials";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Editor = () => {
    const [searchParams] = useSearchParams();

    const [updatedDraft, setUpdatedDraft] = useState({});
    const [draftUpdating, setDraftUpdating] = useState(false);
    const [editorWidth, setEditorWidth] = useState(0);
    const [viewOrder, setViewOrder] = useState('');
    const [itemsOrder, setItemsOrder] = useState([]);
    const [draft_name_edit, setDraftNameEdit] = useState(false);
    const [editDraftName, setEditDraftName] = useState('');

    const pageRef = useRef(null);
    const [editOn, setEditOn] = useState(false);

    useEffect(() => {
        const pageWidth = window.innerWidth - 200;
        const editorWidth = pageWidth > 1250 ? 1250 : pageWidth;
        document.documentElement.style.setProperty('--editorWidth', `${editorWidth}px`);

        const draftID = searchParams.get('draftid');
        fetch_draft(draftID).then(res => {
            setUpdatedDraft({ ...updatedDraft, ...res });
            SET_EDITOR_DATA(res);
        });

        const observer = new ResizeObserver(entries => {
            const val = Math.round(entries[0].contentRect.width);
            console.log("pagewidth", val);
            setEditorWidth(val);
        })
        observer.observe(pageRef.current);
        return () => pageRef.current && observer.unobserve(pageRef.current)
    }, []);

    useEffect(() => {
        if (updatedDraft.view_order) {
            setViewOrder(updatedDraft.view_order.type);
            setItemsOrder(updatedDraft.view_order.fields_order);
        }
    }, [updatedDraft]);

    const onDragEnd = (result) => {
        if (!result.destination) return;
        const updatedItems = reorder(
            itemsOrder,
            result.source.index,
            result.destination.index
        );
        console.log("onDragEnd", itemsOrder, result.source.index, result.destination.index)
        console.log("onDragEnd updatedItems", updatedItems);
        setItemsOrder(updatedItems);
    };

    const inWidth = (val) => {
        const fntSize = editorWidth * 0.018; // Default to 16px if not found
        const inpWidth = fntSize / 2 * (val.length + 1.5);
        return { width: inpWidth + "px" };
    }

    const reorder = (list, startIndex, endIndex) => {
        //Reoder id values for item order
        const tempId = list[startIndex].id;
        list[startIndex].id = list[endIndex].id;
        list[endIndex].id = tempId;

        //Reorder objective position in array
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        console.log("onDragEnd rem", removed);
        result.splice(endIndex, 0, removed);
        return result;
    };

    const zoomIn = () => {
        const zoomedWidth = pageRef.current.clientWidth + 100;
        if (zoomedWidth > 1250) {
            document.documentElement.style.setProperty('--editorWidth', 1250 + "px");
            setEditorWidth(1250);
        } else {
            document.documentElement.style.setProperty('--editorWidth', zoomedWidth + "px");
            setEditorWidth(zoomedWidth);
        }
    }

    const zoomOut = () => {
        const zoomedWidth = pageRef.current.clientWidth - 100;

        console.log("editOn", editOn, zoomedWidth);

        if (editOn && zoomedWidth < 800) {
            document.documentElement.style.setProperty('--editorWidth', 800 + "px");
            setEditorWidth(800);
            return;
        }

        if (zoomedWidth < 320) {
            document.documentElement.style.setProperty('--editorWidth', 320 + "px");
            setEditorWidth(320);
        } else {
            document.documentElement.style.setProperty('--editorWidth', zoomedWidth + "px");
            setEditorWidth(zoomedWidth);
        }
    }

    const widthFit = () => {
        const maxWidth = window.innerWidth - 200;
        if (maxWidth > 1250) {
            document.documentElement.style.setProperty('--editorWidth', 1250 + "px");
        } else {
            document.documentElement.style.setProperty('--editorWidth', maxWidth + "px");
        }
    }

    const heightFit = () => {
        const maxHeight = window.innerHeight - 200;
        if (editOn && maxHeight < 800) {
            document.documentElement.style.setProperty('--editorWidth', 800 + "px");
            return;
        }
        document.documentElement.style.setProperty('--editorWidth', (maxHeight / 1.414) + "px");
    }

    const print = async () => {
        const view = document.getElementById("page");
        view.style.margin = "unset";
        download_draft({ name: updatedDraft.draft_name, content: view.outerHTML });
    }

    const updateDraftName = () => {
        setDraftUpdating(true);
        setDraftNameEdit(false);

        setTimeout(() => {
            const payload = {
                templateID: updatedDraft.template_id,
                template_name: updatedDraft.template_name,
                draft_name: editDraftName,
                type: 'primary'
            }

            edit_user_draft(updatedDraft._id, payload).then(() => {
                fetch_draft(updatedDraft._id).then(res => {
                    setUpdatedDraft({ ...updatedDraft, ...res });
                    SET_EDITOR_DATA(res);
                    setDraftUpdating(false);
                })
            })
        }, 5000)
    }

    const handleInChange = (type, field, val) => {
        let edited_data = { ...updatedDraft }
        switch (type) {
            case 'string': {
                edited_data = {
                    ...updatedDraft,
                    data: {
                        ...updatedDraft.data,
                        [field]: val
                    }
                };
                break;
            }
            case 'object': {
                edited_data = {
                    ...updatedDraft,
                    data: {
                        ...updatedDraft.data,
                        [field]: { ...updatedDraft.data[field], ...val }
                    }
                };
                break;
            }
            case 'list': {
                edited_data = {
                    ...updatedDraft,
                    data: {
                        ...updatedDraft.data,
                        [field]: { ...val }
                    }
                };
                break;
            }
            default: break;
        }
        setUpdatedDraft(edited_data);
    }

    const handleSubmit = () => {
        setDraftUpdating(true);
        setTimeout(() => {
            const payload = {
                data: updatedDraft.data,
                type: 'content'
            }
            edit_user_draft(updatedDraft._id, payload).then(() => {
                fetch_draft(updatedDraft._id).then(res => {
                    setUpdatedDraft({ ...updatedDraft, ...res });
                    SET_EDITOR_DATA(res);
                    setDraftUpdating(false);
                })
            })
        }, 5000)
    }

    const handleEditToggle = () => {
        if (editOn) {
            handleSubmit(); setEditOn(false)
        } else {
            widthFit();
            setEditOn(!editOn)
        }
    }

    return (
        <div className="flex flex-row gap-4">
            <div id="editor_bar" className="w-auto flex flex-col p-2 rounded-md justify-between opacity-100 hover:opacity-100 border-2 border-slate-900/10 dark:border-slate-50/[0.06]">
                <div className="flex flex-col">
                    <div className="flex flex-col gap-3">
                        <TbArrowAutofitHeight onClick={heightFit} className="w-6 h-6 cursor-pointer text-gray-800 dark:text-gray-200" />
                        <TbArrowAutofitWidth onClick={widthFit} className="w-6 h-6 cursor-pointer text-gray-800 dark:text-gray-200" />
                        <FiZoomIn onClick={zoomIn} className="w-6 h-6 cursor-pointer text-gray-800 dark:text-gray-200" />
                        <FiZoomOut onClick={zoomOut} className="w-6 h-6 cursor-pointer text-gray-800 dark:text-gray-200" />
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <BiDownload onClick={() => print()} className="w-6 h-6 cursor-pointer text-gray-800 dark:text-gray-200" />
                </div>
            </div>
            <div style={{ height: 'calc(100vh - 7rem)' }} className="scrollbar relative flex flex-col items-center gap-2 overflow-y-auto w-full p-4 rounded-md border-2 border-slate-900/10 dark:border-slate-50/[0.06]">
                <div className="flex flex-row w-full justify-between">
                    {!draft_name_edit ?
                        <div className="flex flex-row items-center gap-1">
                            <p className="bg-transparent text-xl w-fit font-nunito dark:text-gray-300 font-bold focus:outline-none cursor-pointer">{updatedDraft.draft_name}</p>
                            <TbEdit onClick={() => { setDraftNameEdit(true); setEditDraftName(updatedDraft.draft_name) }} className="h-5 w-auto text-neutral-800 dark:text-neutral-800 cursor-pointer" />
                        </div>
                        :
                        <div className={`flex flex-row items-center ${draft_name_edit && 'border-b-2 border-dashed border-neutral-800 dark:border-gray-300'}`}>
                            <input
                                type="text"
                                maxLength={10}
                                value={editDraftName}
                                onChange={(ev) => setEditDraftName(ev.target.value)}
                                className='bg-transparent text-xl font-nunito dark:text-gray-300 font-bold focus:outline-none'
                                style={{ ...inWidth(updatedDraft.draft_name) }}
                            />
                            <TiInputChecked onClick={() => updateDraftName()} className="h-7 w-auto text-emerald-600 dark:text-emerald-500 cursor-pointer" />
                            <CgCloseR onClick={() => { setDraftNameEdit(false); setEditDraftName('') }} className="h-5 w-auto text-rose-600 dark:text-rose-500 cursor-pointer" />
                        </div>
                    }
                    <label class="flex gap-2 items-center cursor-pointer">
                        <input type="checkbox" value="" class="sr-only peer" checked={editOn} onChange={handleEditToggle} />
                        <div class="relative w-10 h-5 bg-neutral-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-400 rounded-full peer dark:bg-neutral-100 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white dark:peer-checked:after:border-neutral-600 after:content-[''] after:absolute after:top-[2px] after:start-[3px] after:bg-white dark:after:bg-neutral-700 after:border-gray-300 dark:after:border-neutral-800 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-500"></div>
                        <span class="text-sm font-semibold text-neutral-700 dark:text-neutral-100">
                            {editOn ?
                                "Toggle to Save & View"
                                :
                                "Toggle to Edit"
                            }</span>
                    </label>
                </div>
                <div id="page" ref={pageRef} className={`tmp_${updatedDraft.template_id} ${editOn ? 'edit_active' : ''} shadow-lg dark:shadow-neutral-900`}>
                    <div className="bg-layout"></div>
                    <div className="personal_section">
                        <div className="name_role">
                            <EditableInput tmpID={searchParams.get('tid')} editorWidth={editorWidth} field="fullname" editOn={editOn} val={updatedDraft?.data?.fullname} hndlChange={handleInChange} />
                            <EditableInput tmpID={searchParams.get('tid')} editorWidth={editorWidth} field="role" editOn={editOn} val={updatedDraft?.data?.role} hndlChange={handleInChange} />
                        </div>
                        <div className="socials">
                            <EditableSocials tmpID={searchParams.get('tid')} editorWidth={editorWidth} field="socials" editOn={editOn} val={updatedDraft?.data?.socials} hndlChange={handleInChange} />
                        </div>
                    </div>
                    {viewOrder === "dual" && itemsOrder.length > 0 && (
                        <div id="objj" className="objective_section">
                            <DragDropContext onDragEnd={(result) => onDragEnd(result, itemsOrder)}>
                                <div className="dual_view">
                                    <Droppable droppableId="droppable1">
                                        {provided => (
                                            <div
                                                className="view_col_1"
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                            >
                                                {itemsOrder.filter(itx => itx.id.includes("d1_")).map((item, idx) => {
                                                    return (
                                                        <Draggable key={item.id} draggableId={item.id} index={idx}>
                                                            {(provided) => (
                                                                <div className="relative" ref={provided.innerRef} {...provided.draggableProps}>
                                                                    <EditableObjective
                                                                        provided={provided}
                                                                        tmpID={searchParams.get('tid')}
                                                                        editorWidth={editorWidth}
                                                                        field={item.label}
                                                                        editOn={editOn}
                                                                        val={updatedDraft?.data?.[item.label]}
                                                                        hndlChange={handleInChange}
                                                                    />
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    )
                                                }
                                                )}
                                            </div>
                                        )}
                                    </Droppable>
                                    <Droppable droppableId="droppable2">
                                        {provided => (
                                            <div
                                                className="view_col_2"
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                            >
                                                {itemsOrder.filter(itx => itx.id.includes("d2_")).map((item, idx) => {
                                                    return (
                                                        <Draggable key={item.id} draggableId={item.id} index={idx + itemsOrder.filter(itx => itx.id.includes("d2_")).length - 1}>
                                                            {(provided) => (
                                                                <div className="relative" ref={provided.innerRef} {...provided.draggableProps}>
                                                                    <EditableObjective
                                                                        provided={provided}
                                                                        tmpID={searchParams.get('tid')}
                                                                        editorWidth={editorWidth}
                                                                        field={item.label}
                                                                        editOn={editOn}
                                                                        val={updatedDraft?.data?.[item.label]}
                                                                        hndlChange={handleInChange} />
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    )
                                                })}
                                            </div>
                                        )}
                                    </Droppable>
                                </div>
                            </DragDropContext>
                        </div>
                    )}
                    {viewOrder === "single" && itemsOrder.length > 0 && (
                        <div className="objective_section">
                            <DragDropContext onDragEnd={(result) => onDragEnd(result, itemsOrder.filter(itx => itx.id.includes("d1_")))}>
                                <Droppable droppableId="droppable">
                                    {provided => (
                                        <div
                                            className="single_view"
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                            {itemsOrder.filter(itx => itx.id.includes("d1_")).map((item, idx) => {
                                                return (
                                                    <Draggable key={item.id} draggableId={item.id} index={idx}>
                                                        {(provided) => (
                                                            <div className="relative" ref={provided.innerRef} {...provided.draggableProps}>
                                                                <EditableObjective
                                                                    provided={provided}
                                                                    tmpID={searchParams.get('tid')}
                                                                    editorWidth={editorWidth}
                                                                    field={item.label}
                                                                    editOn={editOn}
                                                                    val={updatedDraft?.data?.[item.label]}
                                                                    hndlChange={handleInChange} />
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                )
                                            })}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </div>
                    )}
                </div >
                {draftUpdating && <div className="sticky ml-auto z-50 right-0 bottom-0 flex flex-col">
                    <img src={Loader} className="h-auto w-12" />
                    <span className="font-nunito tracking-wide font-bold text-xs">saving...</span>
                </div>}
            </div >
        </div >
    )
}

export default Editor;