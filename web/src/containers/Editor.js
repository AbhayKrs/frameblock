import { useRef, useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { edit_user_draft, fetch_draft, fetch_user_drafts } from "../utils/api";
import { SET_EDITOR_DATA, SET_USER_DRAFTS } from "../store/reducers/draft.reducers";
import '../styles/Editor.css';

import { TbArrowAutofitHeight, TbArrowAutofitWidth } from 'react-icons/tb';
import { FiZoomIn, FiZoomOut } from 'react-icons/fi';
import { BiDownload } from 'react-icons/bi';
import { MdModeEditOutline } from "react-icons/md";

import Loader from '../assets/images/updateLoader.gif';

import html2pdf from 'html2pdf.js/dist/html2pdf.min';
import EditableInput from "../components/EditableInput";
import EditableObjective from "../components/EditableObjective";
import EditableSocials from "../components/EditableSocials";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

// const useResize = (myRef) => {

//     const handleResize = useCallback(() => {
//         setWidth(myRef.current.offsetWidth);
//         console.log("sfs", myRef);
//     }, [myRef])

//     useEffect(() => {
//         window.addEventListener('load', handleResize)
//         window.addEventListener('resize', handleResize)
//         return () => {
//             window.removeEventListener('load', handleResize)
//             window.removeEventListener('resize', handleResize)
//         }
//     }, [myRef, handleResize])

//     return { width }
// }

const Editor = () => {
    const [searchParams] = useSearchParams();

    const [updatedDraft, setUpdatedDraft] = useState({});
    const [draftUpdating, setDraftUpdating] = useState(false);
    const [width, setWidth] = useState(0);
    const [viewOrder, setViewOrder] = useState('');
    const [itemsOrder, setItemsOrder] = useState([]);

    const pageRef = useRef(null);

    const [editOn, setEditOn] = useState(false);

    useEffect(() => {
        const draftID = searchParams.get('draftid');
        fetch_draft(draftID).then(res => {
            setUpdatedDraft({ ...updatedDraft, ...res });
            SET_EDITOR_DATA(res);
        });

        const observer = new ResizeObserver(entries => {
            const val = Math.round(entries[0].contentRect.width);
            console.log("width", val);
            setWidth(val)
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

    const onDragEnd = (result, items) => {
        if (!result.destination) return;
        console.log('list1', itemsOrder, result)
        const updatedItems = reorder(
            itemsOrder,
            result.source.index,
            result.destination.index
        );
        console.log('list2', updatedItems)
        setItemsOrder(updatedItems);
    };

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    const zoomIn = () => {
        pageRef.current.style.width = (pageRef.current.clientWidth + 100) + "px";
    }

    const zoomOut = () => {
        pageRef.current.style.width = (pageRef.current.clientWidth - 100) + "px";
    }

    const widthFit = () => {
        pageRef.current.style.width = (window.innerWidth - 200) + "px";
    }

    const heightFit = () => {
        pageRef.current.style.width = ((window.innerHeight - 200) / 1.414) + "px";
    }

    const print = async () => {
        const view = document.querySelector("#page");
        console.log("view", view);

        var opt = {
            margin: 0,
            filename: "resume.pdf",
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        html2pdf().from(view).set(opt).save();
    }

    const handleSubmit = (type, field, val) => {
        setDraftUpdating(true);
        let edited_data = { ...updatedDraft };

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
                console.log('da', field, val)
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
                console.log('list', field, val)
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

        setTimeout(() => {
            const payload = {
                data: edited_data.data,
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

    const calcStyling = (type) => {
        switch (type) {
            case 'draft_page': { return { gap: `calc(${width}px * 0.040)`, padding: `calc(${width}px * 0.04) calc(${width}px * 0.06)` } }
            case 'personal_section': { return { gap: `calc(${width}px * 0.008)` } }
            case 'name_role': { return { gap: `calc(${width}px * 0.008)` } }
            case 'dual_view': { return { gap: `calc(${width}px * 0.024)` } }
            case 'objective_section': { return { gap: `calc(${width}px * 0.032)` } }
            case 'view_col': { return { gap: `calc(${width}px * 0.032)` } }
        }
    }

    return (
        <div style={{ height: 'calc(100vh - 4rem)' }} className="scrollbar relative overflow-y-auto border-[3px] border-slate-400 dark:border-neutral-600 bg-slate-200 pt-8 pb-4 px-4 rounded-md">
            <div id="editor_bar" className="group fixed top-2 left-28 right-14 z-50 inset-x-0 w-auto flex flex-row justify-between opacity-100 hover:opacity-100 bg-amber-300 dark:bg-amber-300 p-2 rounded-md">
                <div className="pointer-events-none group-hover:pointer-events-auto flex flex-row space-x-3">
                    <TbArrowAutofitHeight onClick={heightFit} className="w-6 h-6 cursor-pointer text-gray-800 dark:text-gray-200" />
                    <TbArrowAutofitWidth onClick={widthFit} className="w-6 h-6 cursor-pointer text-gray-800 dark:text-gray-200" />
                    <FiZoomIn onClick={zoomIn} className="w-6 h-6 cursor-pointer text-gray-800 dark:text-gray-200" />
                    <FiZoomOut onClick={zoomOut} className="w-6 h-6 cursor-pointer text-gray-800 dark:text-gray-200" />
                </div>
                <div className="flex flex-row gap-2">
                    <MdModeEditOutline onClick={() => setEditOn(!editOn)} className="w-6 h-6 cursor-pointer text-gray-800 dark:text-gray-200" />
                    <BiDownload onClick={() => print()} className="w-6 h-6 cursor-pointer text-gray-800 dark:text-gray-200" />
                </div>
            </div>
            <div id="page" ref={pageRef} style={{ ...calcStyling("draft_page") }} className={`tmp_${updatedDraft.template_id}`}>
                <div className="personal_section" style={{ ...calcStyling("personal_section") }}>
                    <div className="name_role" style={{ ...calcStyling("name_role") }} >
                        <EditableInput tmpID={searchParams.get('tid')} pageWidth={width} field="fullname" editOn={editOn} val={updatedDraft?.data?.fullname} handleSubmit={handleSubmit} />
                        <EditableInput tmpID={searchParams.get('tid')} pageWidth={width} field="role" editOn={editOn} val={updatedDraft?.data?.role} handleSubmit={handleSubmit} />
                    </div>
                    <div className="socials">
                        <EditableSocials tmpID={searchParams.get('tid')} pageWidth={width} field="socials_phone" editOn={editOn} val={updatedDraft?.data?.socials} handleSubmit={handleSubmit} handleInputChange={() => { }} />
                    </div>
                </div>
                {viewOrder === "dual" && itemsOrder.length > 0 && (
                    <div className="objective_section" style={{ ...calcStyling("objective_section") }}>
                        <DragDropContext onDragEnd={(result) => onDragEnd(result, itemsOrder.filter(itx => itx.id.includes("d1_")))}>
                            <Droppable droppableId="droppable">
                                {provided => (
                                    <div
                                        className="dual_view"
                                        style={{ ...calcStyling("dual_view") }}
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        <div
                                            className="view_col_1"
                                            style={{ ...calcStyling("view_col") }}
                                        >
                                            {itemsOrder.filter(itx => itx.id.includes("d1_")).map((item, idx) => {
                                                return (
                                                    <Draggable key={item.id} draggableId={item.id} index={idx}>
                                                        {(provided) => (
                                                            <div className="relative" ref={provided.innerRef} {...provided.draggableProps}>
                                                                <EditableObjective
                                                                    provided={provided}
                                                                    tmpID={searchParams.get('tid')}
                                                                    pageWidth={width}
                                                                    field={item.label}
                                                                    editOn={editOn}
                                                                    val={updatedDraft?.data?.[item.label]}
                                                                    handleSubmit={handleSubmit}
                                                                    handleInputChange={() => { }}
                                                                />
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                )
                                            }
                                            )}
                                        </div>
                                        <div
                                            className="view_col_2"
                                            style={{ ...calcStyling("view_col") }}
                                        >
                                            {itemsOrder.filter(itx => itx.id.includes("d2_")).map((item, idx) => {
                                                return (
                                                    <Draggable key={item.id} draggableId={item.id} index={idx + itemsOrder.filter(itx => itx.id.includes("d2_")).length - 1}>
                                                        {(provided) => (
                                                            <div className="relative" ref={provided.innerRef} {...provided.draggableProps}>
                                                                <EditableObjective
                                                                    provided={provided}
                                                                    tmpID={searchParams.get('tid')}
                                                                    pageWidth={width}
                                                                    field={item.label}
                                                                    editOn={editOn}
                                                                    val={updatedDraft?.data?.[item.label]}
                                                                    handleSubmit={handleSubmit}
                                                                    handleInputChange={() => { }} />
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </div>
                )}
                {/* {viewOrder === "single" && itemsOrder.length > 0 && (
                    <div className="objective_section" style={{ ...calcStyling("objective_section") }}>
                        <DragDropContext onDragEnd={(result) => onDragEnd(result, itemsOrder.filter(itx => itx.id.includes("d1_")))}>
                            <Droppable droppableId="droppable">
                                {provided => (
                                    <div
                                        // className="dual_view"
                                        // style={{ ...calcStyling("dual_view") }}
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        {itemsOrder.filter(itx => itx.id.includes("d2_")).map((item, idx) => {
                                            return (
                                                <Draggable key={item.id} draggableId={item.id} index={idx}>
                                                    {(provided) => (
                                                        <div className="relative" ref={provided.innerRef} {...provided.draggableProps}>
                                                            <EditableObjective
                                                                provided={provided}
                                                                draftID={searchParams.get('draftid')}
                                                                pageWidth={width}
                                                                field={item.label}
                                                                val={updatedDraft?.data?.[item.label]}
                                                                handleSubmit={handleSubmit}
                                                                handleInputChange={() => { }} />
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
                )} */}
                {/* 
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided) => (
                            <div
                                className="objective_section"
                                ref={provided.innerRef}
                                style={{ ...calcStyling("objective_section") }}
                                {...provided.droppableProps}
                            >
                                {viewOrder === "dual" && itemsOrder.length > 0 && (
                                    <div className="dual_view" style={{ ...calcStyling("dual_view") }}>
                                        <div className="view_col_1" style={{ ...calcStyling("view_col") }}>
                                            {itemsOrder.filter(itx => itx.id.includes("d1_")).map((item, idx) => {
                                                return (
                                                    <Draggable key={item.id} draggableId={item.id} index={idx}>
                                                        {(provided) => (
                                                            <div className="relative" ref={provided.innerRef} {...provided.draggableProps}>
                                                                <EditableObjective
                                                                    provided={provided}
                                                                    tmpID={searchParams.get('tid')}
                                                                    pageWidth={width}
                                                                    field={item.label}
                                                                    val={updatedDraft?.data?.[item.label]}
                                                                    handleSubmit={handleSubmit}
                                                                    handleInputChange={() => { }} />
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                )
                                            }
                                            )}
                                        </div>
                                        <div className="view_col_2" style={{ ...calcStyling("view_col") }}>
                                            {itemsOrder.filter(itx => itx.id.includes("d2_")).map((item, idx) => {
                                                return (
                                                    <Draggable key={item.id} draggableId={item.id} index={idx}>
                                                        {(provided) => (
                                                            <div className="relative" ref={provided.innerRef} {...provided.draggableProps}>
                                                                <EditableObjective
                                                                    provided={provided}
                                                                    draftID={searchParams.get('draftid')}
                                                                    pageWidth={width}
                                                                    field={item.label}
                                                                    val={updatedDraft?.data?.[item.label]}
                                                                    handleSubmit={handleSubmit}
                                                                    handleInputChange={() => { }} />
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                )
                                            }
                                            )}
                                        </div>
                                    </div>
                                )}
                                {viewOrder === "single" && itemsOrder.length > 0 && itemsOrder.map((item, idx) => {
                                    return (
                                        <Draggable key={item.id} draggableId={item.id} index={idx}>
                                            {(provided) => (
                                                <div className="relative" ref={provided.innerRef} {...provided.draggableProps}>
                                                    <EditableObjective
                                                        provided={provided}
                                                        draftID={searchParams.get('draftid')}
                                                        pageWidth={width}
                                                        field={item.label}
                                                        val={updatedDraft?.data?.[item.label]}
                                                        handleSubmit={handleSubmit}
                                                        handleInputChange={() => { }} />
                                                </div>
                                            )}
                                        </Draggable>
                                    )
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext> */}
                {draftUpdating && <div className="absolute z-50 right-2 bottom-2">
                    <img src={Loader} className="h-auto w-12" />
                </div>}
            </div >
        </div >
    )
}

export default Editor;