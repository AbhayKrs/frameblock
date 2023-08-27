import { useRef, useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { fetch_draft } from "../utils/api";
import { SET_EDITOR_DATA } from "../store/reducers/draft.reducers";
import '../styles/Editor.css';

import { AiFillMobile, AiFillHome } from 'react-icons/ai';
import { GrMail } from 'react-icons/gr';
import { BsLinkedin } from 'react-icons/bs';
import { FaGithubSquare } from 'react-icons/fa';
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

    return (
        <div style={{ height: 'calc(100vh - 4.75rem)' }} className="scrollbar relative flex flex-col gap-2 overflow-y-auto border-2 border-neutral-700 bg-slate-200 py-6 px-4 rounded-md">
            <div id="editor_bar" className="group fixed top-2 left-28 right-14 z-50 inset-x-0 w-auto flex flex-row justify-between opacity-0 hover:opacity-100 bg-indigo-500 dark:bg-indigo-500 p-2 rounded-md">
                <div className="pointer-events-none group-hover:pointer-events-auto flex flex-row space-x-3">
                    <TbArrowAutofitHeight className="w-6 h-6 cursor-pointer text-gray-800 dark:text-gray-200" />
                    <TbArrowAutofitWidth className="w-6 h-6 cursor-pointer text-gray-800 dark:text-gray-200" />
                    <FiZoomIn className="w-6 h-6 cursor-pointer text-gray-800 dark:text-gray-200" />
                    <FiZoomOut className="w-6 h-6 cursor-pointer text-gray-800 dark:text-gray-200" />
                </div>
                <BiDownload onClick={() => print()} className="w-6 h-6 cursor-pointer text-gray-800 dark:text-gray-200" />
            </div>
            <div id="page" ref={pageRef} style={{ minHeight: `calc(${width}px * 1.414)`, padding: `${width * 0.06}px` }} className="tmp_64e0a6766acb0ae15dfbdfe1 bg-white w-full h-full outline-none shadow-lg">
                <div className="personal_section">
                    <div className="name_role">
                        <EditableInput pageWidth={width} field="fullname" in_type="text" val={updatedDraft?.data?.fullname} handleInputChange={() => { }} />
                        <EditableInput pageWidth={width} field="role" in_type="text" val={updatedDraft?.data?.role} handleInputChange={() => { }} />
                    </div>
                    <div className="socials">
                        <li className="socials_item">
                            <AiFillMobile className="social_icons" />
                            <EditableLink pageWidth={width} field="socials_phone" in_type="tel" val={updatedDraft?.data?.socials.phone_number} handleInputChange={() => { }} />                        </li>
                        <li className="socials_item">
                            <GrMail className="social_icons" />
                            <EditableLink pageWidth={width} field="socials_email" in_type="email" val={updatedDraft?.data?.socials.email} handleInputChange={() => { }} />
                        </li>
                        <li className="socials_item">
                            <AiFillHome className="social_icons" />
                            <EditableLink pageWidth={width} field="socials_portfolio" in_type="text" val={updatedDraft?.data?.socials.portfolio_value} handleInputChange={() => { }} />
                        </li>
                        <li className="socials_item">
                            <BsLinkedin className="social_icons" />
                            <EditableLink pageWidth={width} field="socials_linkedin" in_type="text" val={updatedDraft?.data?.socials.linkedin_value} handleInputChange={() => { }} />
                        </li>
                        <li className="socials_item">
                            <FaGithubSquare className="social_icons" />
                            <EditableLink pageWidth={width} field="socials_github" in_type="text" val={updatedDraft?.data?.socials.github_value} handleInputChange={() => { }} />
                        </li>
                    </div>
                </div>
                <div className="objective_section">
                    <EditableObjective pageWidth={width} field="skills" val={updatedDraft?.data?.skills} handleInputChange={() => { }} />
                    <EditableObjective pageWidth={width} field="experience" val={updatedDraft?.data?.experience} handleInputChange={() => { }} />
                    <EditableObjective pageWidth={width} field="projects" val={updatedDraft?.data?.projects} handleInputChange={() => { }} />
                    <EditableObjective pageWidth={width} field="education" val={updatedDraft?.data?.education} handleInputChange={() => { }} />
                    <EditableObjective pageWidth={width} field="achievements" val={updatedDraft?.data?.achievements} handleInputChange={() => { }} />
                </div>
            </div>
        </div>
    )
}

export default Editor;