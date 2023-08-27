import { useRef, useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { fetch_draft } from "../utils/api";
import { SET_EDITOR_DATA } from "../store/reducers/draft.reducers";
import '../styles/Editor.css';

import { TbArrowAutofitHeight, TbArrowAutofitWidth } from 'react-icons/tb';
import { FiZoomIn, FiZoomOut } from 'react-icons/fi';
import { BiDownload } from 'react-icons/bi';

import html2pdf from 'html2pdf.js/dist/html2pdf.min';
import EditableInput from "../components/EditableInput";
import EditableLink from "../components/EditableLink";
import EditableObjective from "../components/EditableObjective";

const useResize = (myRef) => {
    const [width, setWidth] = useState(0);

    const handleResize = useCallback(() => {
        setWidth(myRef.current.offsetWidth)
    }, [myRef])

    useEffect(() => {
        setWidth(myRef?.current.offsetWidth);
        window.addEventListener('load', handleResize)
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('load', handleResize)
            window.removeEventListener('resize', handleResize)
        }
    }, [myRef, handleResize])

    return { width }
}

const Editor = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const draft = useSelector(state => state.draft);

    const [updatedDraft, setUpdatedDraft] = useState({});

    const pageRef = useRef(null);
    const { width } = useResize(pageRef);

    useEffect(() => {
        const draftID = searchParams.get('draftid');
        fetch_draft(draftID).then(res => {
            setUpdatedDraft({ ...updatedDraft, ...res });
            SET_EDITOR_DATA(res);
        })
    }, [])

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

    const handleSubmit = (field, val) => {
        setUpdatedDraft(prev => ({
            ...prev,
            data: {
                ...prev.data,
                [field]: val
            }
        }));
    }

    return (
        <div style={{ height: 'calc(100vh - 4.75rem)' }} className="scrollbar relative flex flex-col gap-2 items-center overflow-y-auto border-2 border-neutral-700 bg-slate-200 py-6 px-4 rounded-md">
            <div id="editor_bar" className="group fixed top-2 left-28 right-14 z-50 inset-x-0 w-auto flex flex-row justify-between opacity-0 hover:opacity-100 bg-indigo-500 dark:bg-indigo-500 p-2 rounded-md">
                <div className="pointer-events-none group-hover:pointer-events-auto flex flex-row space-x-3">
                    <TbArrowAutofitHeight className="w-6 h-6 cursor-pointer text-gray-800 dark:text-gray-200" />
                    <TbArrowAutofitWidth className="w-6 h-6 cursor-pointer text-gray-800 dark:text-gray-200" />
                    <FiZoomIn className="w-6 h-6 cursor-pointer text-gray-800 dark:text-gray-200" />
                    <FiZoomOut className="w-6 h-6 cursor-pointer text-gray-800 dark:text-gray-200" />
                </div>
                <BiDownload onClick={() => print()} className="w-6 h-6 cursor-pointer text-gray-800 dark:text-gray-200" />
            </div>
            <div id="page" ref={pageRef} style={{ padding: `${width * 0.06}px` }} className="tmp_64e0a6766acb0ae15dfbdfe1 bg-white w-full outline-none shadow-lg">
                <div className="personal_section">
                    <div className="name_role">
                        <EditableInput pageWidth={width} field="fullname" val={updatedDraft?.data?.fullname} handleSubmit={handleSubmit} />
                        <EditableInput pageWidth={width} field="role" val={updatedDraft?.data?.role} handleSubmit={handleSubmit} />
                    </div>
                    <div className="socials">
                        <EditableLink pageWidth={width} field="socials_phone" val={{ code: updatedDraft?.data?.socials.phone_code, number: updatedDraft?.data?.socials.phone_number }} handleInputChange={() => { }} />
                        <EditableLink pageWidth={width} field="socials_email" val={updatedDraft?.data?.socials.email} handleInputChange={() => { }} />
                        <EditableLink pageWidth={width} field="socials_portfolio" val={updatedDraft?.data?.socials.portfolio_value} handleInputChange={() => { }} />
                        <EditableLink pageWidth={width} field="socials_linkedin" val={updatedDraft?.data?.socials.linkedin_value} handleInputChange={() => { }} />
                        <EditableLink pageWidth={width} field="socials_github" val={updatedDraft?.data?.socials.github_value} handleInputChange={() => { }} />
                    </div>
                </div>
                <div className="objective_section">
                    <EditableObjective pageWidth={width} field="skills" val={updatedDraft?.data?.skills} handleInputChange={() => { }} />
                    <EditableObjective pageWidth={width} field="experience" val={updatedDraft?.data?.experience} handleInputChange={() => { }} />
                    <EditableObjective pageWidth={width} field="projects" val={updatedDraft?.data?.projects} handleInputChange={() => { }} />
                    <EditableObjective pageWidth={width} field="education" val={updatedDraft?.data?.education} handleInputChange={() => { }} />
                    <EditableObjective pageWidth={width} field="achievements" val={updatedDraft?.data?.achievements} handleInputChange={() => { }} />
                </div>
            </div >
        </div >
    )
}

export default Editor;