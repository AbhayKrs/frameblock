import { useRef, useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { edit_user_draft, fetch_draft, fetch_user_drafts } from "../utils/api";
import { SET_EDITOR_DATA, SET_USER_DRAFTS } from "../store/reducers/draft.reducers";
import '../styles/Editor.css';

import { TbArrowAutofitHeight, TbArrowAutofitWidth } from 'react-icons/tb';
import { FiZoomIn, FiZoomOut } from 'react-icons/fi';
import { BiDownload } from 'react-icons/bi';

import Loader from '../assets/images/updateLoader.gif';

import html2pdf from 'html2pdf.js/dist/html2pdf.min';
import EditableInput from "../components/EditableInput";
import EditableObjective from "../components/EditableObjective";
import EditableSocials from "../components/EditableSocials";

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
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const draft = useSelector(state => state.draft);

    const [updatedDraft, setUpdatedDraft] = useState({});
    const [draftUpdating, setDraftUpdating] = useState(false);
    const [width, setWidth] = useState(0);

    const pageRef = useRef(null);
    // const { width } = useResize(pageRef);

    useEffect(() => {
        const draftID = searchParams.get('draftid');
        fetch_draft(draftID).then(res => {
            setUpdatedDraft({ ...updatedDraft, ...res });
            SET_EDITOR_DATA(res);
        });

        const observer = new ResizeObserver(entries => {
            setWidth(entries[0].contentRect.width)
        })
        observer.observe(pageRef.current);
        return () => pageRef.current && observer.unobserve(pageRef.current)
    }, []);

    const zoomIn = () => {
        pageRef.current.style.width = (pageRef.current.clientWidth + 200) + "px";
    }

    const zoomOut = () => {
        pageRef.current.style.width = (pageRef.current.clientWidth - 200) + "px";
    }

    const widthFit = () => {
        pageRef.current.style.width = (window.innerWidth - 200) + "px";
    }

    const heightFit = () => {
        pageRef.current.style.width = ((window.innerHeight - 200) / 1.414) + "px";
    }

    const print = async () => {
        var opt = {
            margin: 0,
            filename: "myFile.pdf",
            image: { type: 'jpeg', quality: 0.98 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
            pagebreak: { mode: 'avoid-all', after: '#Content' },
            html2canvas: { scale: 2 }
        };

        const view = document.querySelector("#page");
        html2pdf()
            .set(opt)
            .from(view)
            .save();
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

    const objectiveOrder = ['skills, experience, education, project, achievements'];

    return (
        <div style={{ height: 'calc(100vh - 4rem)' }} className="scrollbar relative overflow-y-auto border-[3px] border-slate-400 dark:border-neutral-600 bg-slate-200 pt-8 pb-4 px-4 rounded-md">
            <div id="editor_bar" className="group fixed top-2 left-28 right-14 z-50 inset-x-0 w-auto flex flex-row justify-between opacity-100 hover:opacity-100 bg-indigo-500 dark:bg-indigo-500 p-2 rounded-md">
                <div className="pointer-events-none group-hover:pointer-events-auto flex flex-row space-x-3">
                    <TbArrowAutofitHeight onClick={heightFit} className="w-6 h-6 cursor-pointer text-gray-800 dark:text-gray-200" />
                    <TbArrowAutofitWidth onClick={widthFit} className="w-6 h-6 cursor-pointer text-gray-800 dark:text-gray-200" />
                    <FiZoomIn onClick={zoomIn} className="w-6 h-6 cursor-pointer text-gray-800 dark:text-gray-200" />
                    <FiZoomOut onClick={zoomOut} className="w-6 h-6 cursor-pointer text-gray-800 dark:text-gray-200" />
                </div>
                <BiDownload onClick={() => print()} className="w-6 h-6 cursor-pointer text-gray-800 dark:text-gray-200" />
            </div>
            <div id="page" ref={pageRef} style={{ padding: `${width * 0.04}px ${width * 0.06}px` }} className={`tmp_${updatedDraft.template_id}`}>
                <div className="personal_section">
                    <div className="name_role">
                        <EditableInput draftID={searchParams.get('draftid')} pageWidth={width} field="fullname" val={updatedDraft?.data?.fullname} handleSubmit={handleSubmit} />
                        <EditableInput draftID={searchParams.get('draftid')} pageWidth={width} field="role" val={updatedDraft?.data?.role} handleSubmit={handleSubmit} />
                    </div>
                    <div className="socials">
                        <EditableSocials draftID={searchParams.get('draftid')} pageWidth={width} field="socials_phone" val={updatedDraft?.data?.socials} handleSubmit={handleSubmit} handleInputChange={() => { }} />
                    </div>
                </div>
                <div className="objective_section">
                    {['skills', 'experience', 'projects', 'education', 'achievements'].map((itx, idx) => {
                        return (
                            <EditableObjective draftID={searchParams.get('draftid')} pageWidth={width} field={itx} val={updatedDraft?.data?.[itx]} handleSubmit={handleSubmit} handleInputChange={() => { }} />
                        )
                    })}
                    {/* <EditableObjective draftID={searchParams.get('draftid')} pageWidth={width} field="skills" val={updatedDraft?.data?.skills} handleSubmit={handleSubmit} handleInputChange={() => { }} />
                    <EditableObjective draftID={searchParams.get('draftid')} pageWidth={width} field="experience" val={updatedDraft?.data?.experience} handleSubmit={handleSubmit} handleInputChange={() => { }} />
                    <EditableObjective draftID={searchParams.get('draftid')} pageWidth={width} field="projects" val={updatedDraft?.data?.projects} handleSubmit={handleSubmit} handleInputChange={() => { }} />
                    <EditableObjective draftID={searchParams.get('draftid')} pageWidth={width} field="education" val={updatedDraft?.data?.education} handleSubmit={handleSubmit} handleInputChange={() => { }} />
                    <EditableObjective draftID={searchParams.get('draftid')} pageWidth={width} field="achievements" val={updatedDraft?.data?.achievements} handleSubmit={handleSubmit} handleInputChange={() => { }} /> */}
                </div>
            </div>
            {draftUpdating && <div className="absolute z-50 right-2 bottom-2">
                <img src={Loader} className="h-auto w-12" />
            </div>}
        </div >
    )
}

export default Editor;