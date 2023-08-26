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
                            <EditableLink pageWidth={width} field="socials_phone" in_type="tel" val={updatedDraft?.data?.socials.phone_number} handleInputChange={() => { }} />
                            {/* <a href="www.google.com">({updatedDraft?.data?.socials.phone_code}) {updatedDraft?.data?.socials.phone_number}</a> */}
                        </li>
                        <li className="socials_item">
                            <GrMail className="social_icons" />
                            <EditableLink pageWidth={width} field="socials_email" in_type="email" val={updatedDraft?.data?.socials.email} handleInputChange={() => { }} />

                            {/* <span >{updatedDraft?.data?.socials.email}</span> */}
                        </li>
                        <li className="socials_item">
                            <AiFillHome className="social_icons" />
                            <EditableLink pageWidth={width} field="socials_portfolio" in_type="text" val={updatedDraft?.data?.socials.portfolio_value} handleInputChange={() => { }} />

                            {/* <span >{updatedDraft?.data?.socials.portfolio_value}</span> */}
                        </li>
                        <li className="socials_item">
                            <BsLinkedin className="social_icons" />
                            <EditableLink pageWidth={width} field="socials_linkedin" in_type="text" val={updatedDraft?.data?.socials.linkedin_value} handleInputChange={() => { }} />
                            {/* <span >{updatedDraft?.data?.socials.linkedin_value}</span> */}
                        </li>
                        <li className="socials_item">
                            <FaGithubSquare className="social_icons" />
                            <EditableLink pageWidth={width} field="socials_github" in_type="text" val={updatedDraft?.data?.socials.github_value} handleInputChange={() => { }} />

                            {/* <span >{updatedDraft?.data?.socials.github_value}</span> */}
                        </li>
                    </div>
                </div>
                <div className="objective_section">
                    <div className="skills">
                        <div className="header_title">
                            <h2 style={{ fontSize: `calc(${width}px * 0.028)`, lineHeight: `calc(${width}px * 0.028)` }}>{updatedDraft?.data?.skills.title}</h2>
                            <hr className="header_line" />
                        </div>
                        <div className="skills_content">
                            {updatedDraft?.data?.skills?.content_data.map((skill, index) => (
                                <div key={index} className="skills_content_item">
                                    <div style={{ fontSize: `calc(${width}px * 0.019)`, lineHeight: `calc(${width}px * 0.019)` }} className="skills_labels">{skill.label}</div>
                                    <div style={{ fontSize: `calc(${width}px * 0.019)`, lineHeight: `calc(${width}px * 0.019)` }} className="skills_values">{skill.content_values.toString()}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="experience">
                        <div className="header_title">
                            <h2 style={{ fontSize: `calc(${width}px * 0.028)`, lineHeight: `calc(${width}px * 0.023)` }}>{updatedDraft?.data?.experience.title}</h2>
                            <hr className="header_line" />
                        </div>
                        <div className="experience_content">
                            {updatedDraft?.data?.experience?.content.map((exp, index) => (
                                <div key={index} className="experience_content_item">
                                    <div className="experience_titles">
                                        <div className="experience_titles_left">
                                            <p style={{ fontSize: `calc(${width}px * 0.021)`, lineHeight: `calc(${width}px * 0.021)` }} className="experience_role">{exp.role}</p>
                                            <p style={{ fontSize: `calc(${width}px * 0.021)`, lineHeight: `calc(${width}px * 0.021)` }} className="experience_company">{exp.company}</p>
                                        </div>
                                        <div className="experience_titles_right">
                                            <p style={{ fontSize: `calc(${width}px * 0.018)`, lineHeight: `calc(${width}px * 0.018)` }} className="experience_location">{exp.location}</p>
                                            <p style={{ fontSize: `calc(${width}px * 0.018)`, lineHeight: `calc(${width}px * 0.018)` }} className="experience_period">{exp.period_from} - {exp.period_to}</p>
                                        </div>
                                    </div>
                                    <div className="experience_description">
                                        {exp.description_list.map((exp_desc_item, index) => (
                                            <li key={index} style={{ fontSize: `calc(${width}px * 0.019)`, lineHeight: `calc(${width}px * 0.019)`, marginLeft: 10 }}>{exp_desc_item}</li>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="projects">
                        <div className="header_title">
                            <h2 style={{ fontSize: `calc(${width}px * 0.028)`, lineHeight: `calc(${width}px * 0.023)` }}>{updatedDraft?.data?.projects.title}</h2>
                            <hr className="header_line" />
                        </div>
                        <div className="project_content">
                            {updatedDraft?.data?.projects?.content.map((project, index) => (
                                <div key={index} className="project_content_item">
                                    <div className="project_titles">
                                        <p style={{ fontSize: `calc(${width}px * 0.021)`, lineHeight: `calc(${width}px * 0.021)` }} className="project_name">{project.name}</p>
                                        <p style={{ fontSize: `calc(${width}px * 0.021)`, lineHeight: `calc(${width}px * 0.021)` }} className="project_links">{project.project_link} | {project.github_link}</p>
                                    </div>
                                    <div className="project_description">
                                        {project.description_list.map((project_desc_item, index) => (
                                            <li key={index} style={{ fontSize: `calc(${width}px * 0.019)`, lineHeight: `calc(${width}px * 0.019)`, marginLeft: 10 }}>{project_desc_item}</li>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="education">
                        <div className="header_title">
                            <h2 style={{ fontSize: `calc(${width}px * 0.028)`, lineHeight: `calc(${width}px * 0.023)` }}>{updatedDraft?.data?.education.title}</h2>
                            <hr className="header_line" />
                        </div>
                        <div className="education_content">
                            {updatedDraft?.data?.education?.content.map((edu, index) => (
                                <div key={index} className="education_content_item">
                                    <div className="education_titles">
                                        <div className="education_titles_left">
                                            <p style={{ fontSize: `calc(${width}px * 0.021)`, lineHeight: `calc(${width}px * 0.021)` }} className="education_course">{edu.course}</p>
                                            <p style={{ fontSize: `calc(${width}px * 0.021)`, lineHeight: `calc(${width}px * 0.021)` }} className="education_institute">{edu.institute}</p>
                                            <p style={{ fontSize: `calc(${width}px * 0.021)`, lineHeight: `calc(${width}px * 0.021)` }} className="education_grade">Grade</p>
                                        </div>
                                        <div className="education_titles_right">
                                            <p style={{ fontSize: `calc(${width}px * 0.018)`, lineHeight: `calc(${width}px * 0.018)` }} className="education_location">{edu.location}</p>
                                            <p style={{ fontSize: `calc(${width}px * 0.018)`, lineHeight: `calc(${width}px * 0.018)` }} className="education_period">{edu.period_from} - {edu.period_to}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="achievements">
                        <div className="header_title">
                            <h2 style={{ fontSize: `calc(${width}px * 0.028)`, lineHeight: `calc(${width}px * 0.023)` }}>{updatedDraft?.data?.achievements.title}</h2>
                            <hr className="header_line" />
                        </div>
                        <div className="achievements_content">
                            {updatedDraft?.data?.achievements?.content_data.map((ach, index) => (
                                <div key={index} className="achievements_content_item">
                                    <p style={{ fontSize: `calc(${width}px * 0.018)`, lineHeight: `calc(${width}px * 0.018)` }} className="achievements_item">{ach}</p>
                                    <p style={{ fontSize: `calc(${width}px * 0.018)`, lineHeight: `calc(${width}px * 0.018)` }} className="achievements_period">{ach}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Editor;