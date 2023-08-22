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

import html2pdf from 'html2pdf.js/dist/html2pdf.min';

const useResize = (myRef) => {
    const [width, setWidth] = useState(0)

    const handleResize = useCallback(() => {
        setWidth(myRef.current.offsetWidth)
    }, [myRef])

    useEffect(() => {
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

    const pageRef = useRef(null);
    const { width } = useResize(pageRef);

    useEffect(() => {
        const draftID = searchParams.get('draftid');
        fetch_draft(draftID).then(res => {
            dispatch(SET_EDITOR_DATA(res));
        })
    }, [])

    const print = async () => {
        var opt = {
            margin: 0,
            filename: "myFile.pdf",
            image: { type: 'jpeg', quality: 0.98 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
            pagebreak: { mode: 'avoid-all', after: '#Content' },
            html2canvas: { scale: 2 },
        };

        const view = document.querySelector("#page");
        html2pdf()
            .set(opt)
            .from(view)
            .save();
    }


    return (
        <div style={{ height: 'calc(100vh - 4.75rem)' }} className="overflow-y-auto border-2 border-neutral-700 p-1 rounded-md">
            <button onClick={print}>PRINT</button>
            <a id="download" href="#" />
            <div>{width}</div>
            <div className="scrollbar p-2 flex justify-center">
                <div id="page" ref={pageRef} contenteditable="true" style={{ minHeight: `calc(${width}px * 1.414)` }} className="tmp_64e0a6766acb0ae15dfbdfe1">
                    <div className="personal_section">
                        <div className="name_role">
                            <h1 className="fullname" style={{ fontSize: `calc(${width}px * 0.039)`, lineHeight: `calc(${width}px * 0.039)` }}>{draft?.editor?.data?.fullname}</h1>
                            <h2 className="role" style={{ fontSize: `calc(${width}px * 0.023)`, lineHeight: `calc(${width}px * 0.023)` }}>{draft?.editor?.data?.role}</h2>
                        </div>
                        <div style={{ fontSize: `calc(${width}px * 0.019)`, lineHeight: `calc(${width}px * 0.019)` }} className="socials">
                            <li className="socials_item">
                                <AiFillMobile className="w-4 h-4" contenteditable="false" />
                                <a href="www.google.com">({draft?.editor?.data?.socials.phone_code}) {draft?.editor?.data?.socials.phone_number}</a>
                            </li>
                            <li className="socials_item">
                                <GrMail className="w-4 h-4" contenteditable="false" />
                                <span>{draft?.editor?.data?.socials.email}</span>
                            </li>
                            <li className="socials_item">
                                <AiFillHome className="w-4 h-4" contenteditable="false" />
                                <span>{draft?.editor?.data?.socials.portfolio_value}</span>
                            </li>
                            <li className="socials_item">
                                <BsLinkedin className="w-4 h-4" contenteditable="false" />
                                <span>{draft?.editor?.data?.socials.linkedin_value}</span>
                            </li>
                            <li className="socials_item">
                                <FaGithubSquare className="w-4 h-4" contenteditable="false" />
                                <span>{draft?.editor?.data?.socials.github_value}</span>
                            </li>
                        </div>
                    </div>
                    <div className="objective_section">
                        <div className="skills">
                            <div className="header_title">
                                <h2 style={{ fontSize: `calc(${width}px * 0.028)`, lineHeight: `calc(${width}px * 0.028)` }}>{draft?.editor?.data?.skills.title}</h2>
                                <hr className="header_line" />
                            </div>
                            <div className="skills_content">
                                {draft?.editor?.data?.skills?.content_data.map(skill => (
                                    <div className="skills_content_item">
                                        <p style={{ fontSize: `calc(${width}px * 0.019)`, lineHeight: `calc(${width}px * 0.019)` }} className="skills_labels">{skill.label}</p>
                                        <p style={{ fontSize: `calc(${width}px * 0.019)`, lineHeight: `calc(${width}px * 0.019)` }} className="skills_values">{skill.content_values.toString()}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="experience">
                            <div className="header_title">
                                <h2 style={{ fontSize: `calc(${width}px * 0.028)`, lineHeight: `calc(${width}px * 0.023)` }}>{draft?.editor?.data?.experience.title}</h2>
                                <hr className="header_line" />
                            </div>
                            <div className="experience_content">
                                {draft?.editor?.data?.experience?.content.map(exp => (
                                    <div className="experience_content_item">
                                        <div className="experience_titles">
                                            <div className="experience_titles_left">
                                                <p style={{ fontSize: `calc(${width}px * 0.021)`, lineHeight: `calc(${width}px * 0.021)` }} className="skills_labels">{exp.role}</p>
                                                <p style={{ fontSize: `calc(${width}px * 0.021)`, lineHeight: `calc(${width}px * 0.021)` }} className="skills_values">{exp.company}</p>
                                            </div>
                                            <div className="experience_titles_right">
                                                <p style={{ fontSize: `calc(${width}px * 0.021)`, lineHeight: `calc(${width}px * 0.021)` }} className="skills_labels">{exp.location}</p>
                                                <p style={{ fontSize: `calc(${width}px * 0.021)`, lineHeight: `calc(${width}px * 0.021)` }} className="skills_values">{exp.period_from} - {exp.period_to}</p>
                                            </div>
                                        </div>
                                        <div className="experience_description">
                                            {exp.description_list.map(exp_desc_item => (
                                                <li style={{ fontSize: `calc(${width}px * 0.019)`, lineHeight: `calc(${width}px * 0.019)`, marginLeft: 10 }}>{exp_desc_item}</li>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="projects">
                            <div className="header_title">
                                <h2 style={{ fontSize: `calc(${width}px * 0.028)`, lineHeight: `calc(${width}px * 0.023)` }}>{draft?.editor?.data?.projects.title}</h2>
                                <hr className="header_line" />
                            </div>
                            <div className="project_content">
                                {draft?.editor?.data?.projects?.content.map(project => (
                                    <div className="project_content_item">
                                        <div className="project_titles">
                                            <p style={{ fontSize: `calc(${width}px * 0.021)`, lineHeight: `calc(${width}px * 0.021)` }} className="skills_labels">{project.name}</p>
                                            <p style={{ fontSize: `calc(${width}px * 0.021)`, lineHeight: `calc(${width}px * 0.021)` }} className="skills_values">{project.project_link} | {project.github_link}</p>
                                        </div>
                                        <div className="project_description">
                                            {project.description_list.map(project_desc_item => (
                                                <li style={{ fontSize: `calc(${width}px * 0.019)`, lineHeight: `calc(${width}px * 0.019)`, marginLeft: 10 }}>{project_desc_item}</li>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="education">
                            <div className="header_title">
                                <h2 style={{ fontSize: `calc(${width}px * 0.028)`, lineHeight: `calc(${width}px * 0.023)` }}>{draft?.editor?.data?.education.title}</h2>
                                <hr className="header_line" />
                            </div>
                            <div className="education_content">
                                {draft?.editor?.data?.education?.content.map(edu => (
                                    <div className="education_content_item">
                                        <div className="education_titles">
                                            <div className="education_titles_left">
                                                <p style={{ fontSize: `calc(${width}px * 0.021)`, lineHeight: `calc(${width}px * 0.021)` }} className="skills_labels">{edu.course}</p>
                                                <p style={{ fontSize: `calc(${width}px * 0.021)`, lineHeight: `calc(${width}px * 0.021)` }} className="skills_values">{edu.institute}</p>
                                                <p style={{ fontSize: `calc(${width}px * 0.021)`, lineHeight: `calc(${width}px * 0.021)` }} className="skills_values">Grade</p>
                                            </div>
                                            <div className="education_titles_right">
                                                <p style={{ fontSize: `calc(${width}px * 0.021)`, lineHeight: `calc(${width}px * 0.021)` }} className="skills_labels">{edu.location}</p>
                                                <p style={{ fontSize: `calc(${width}px * 0.021)`, lineHeight: `calc(${width}px * 0.021)` }} className="skills_values">{edu.period_from} - {edu.period_to}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="achievements">
                            <div className="header_title">
                                <h2 style={{ fontSize: `calc(${width}px * 0.028)`, lineHeight: `calc(${width}px * 0.023)` }}>{draft?.editor?.data?.achievements.title}</h2>
                                <hr className="header_line" />
                            </div>
                            <div className="achievements_content">
                                {draft?.editor?.data?.achievements?.content_data.map(ach => (
                                    <div className="achievements_content_item">
                                        <p style={{ fontSize: `calc(${width}px * 0.021)`, lineHeight: `calc(${width}px * 0.021)` }} className="skills_labels">{ach}</p>
                                        <p style={{ fontSize: `calc(${width}px * 0.021)`, lineHeight: `calc(${width}px * 0.021)` }} className="skills_values">{ach}</p>
                                    </div>
                                ))}
                            </div>
                        </div>



                        <div className="projects">
                            <div className="header_title">
                                <h2 style={{ fontSize: `calc(${width}px * 0.028)`, lineHeight: `calc(${width}px * 0.023)` }}>{draft?.editor?.data?.projects.title}</h2>
                                <hr className="header_line" />
                            </div>
                            <div className="project_content">
                                {draft?.editor?.data?.projects?.content.map(project => (
                                    <div className="project_content_item">
                                        <div className="project_titles">
                                            <p style={{ fontSize: `calc(${width}px * 0.021)`, lineHeight: `calc(${width}px * 0.021)` }} className="skills_labels">{project.name}</p>
                                            <p style={{ fontSize: `calc(${width}px * 0.021)`, lineHeight: `calc(${width}px * 0.021)` }} className="skills_values">{project.project_link} | {project.github_link}</p>
                                        </div>
                                        <div className="project_description">
                                            {project.description_list.map(project_desc_item => (
                                                <li style={{ fontSize: `calc(${width}px * 0.019)`, lineHeight: `calc(${width}px * 0.019)`, marginLeft: 10 }}>{project_desc_item}</li>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="projects">
                            <div className="header_title">
                                <h2 style={{ fontSize: `calc(${width}px * 0.028)`, lineHeight: `calc(${width}px * 0.023)` }}>{draft?.editor?.data?.projects.title}</h2>
                                <hr className="header_line" />
                            </div>
                            <div className="project_content">
                                {draft?.editor?.data?.projects?.content.map(project => (
                                    <div className="project_content_item">
                                        <div className="project_titles">
                                            <p style={{ fontSize: `calc(${width}px * 0.021)`, lineHeight: `calc(${width}px * 0.021)` }} className="skills_labels">{project.name}</p>
                                            <p style={{ fontSize: `calc(${width}px * 0.021)`, lineHeight: `calc(${width}px * 0.021)` }} className="skills_values">{project.project_link} | {project.github_link}</p>
                                        </div>
                                        <div className="project_description">
                                            {project.description_list.map(project_desc_item => (
                                                <li style={{ fontSize: `calc(${width}px * 0.019)`, lineHeight: `calc(${width}px * 0.019)`, marginLeft: 10 }}>{project_desc_item}</li>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="projects">
                            <div className="header_title">
                                <h2 style={{ fontSize: `calc(${width}px * 0.028)`, lineHeight: `calc(${width}px * 0.023)` }}>{draft?.editor?.data?.projects.title}</h2>
                                <hr className="header_line" />
                            </div>
                            <div className="project_content">
                                {draft?.editor?.data?.projects?.content.map(project => (
                                    <div className="project_content_item">
                                        <div className="project_titles">
                                            <p style={{ fontSize: `calc(${width}px * 0.021)`, lineHeight: `calc(${width}px * 0.021)` }} className="skills_labels">{project.name}</p>
                                            <p style={{ fontSize: `calc(${width}px * 0.021)`, lineHeight: `calc(${width}px * 0.021)` }} className="skills_values">{project.project_link} | {project.github_link}</p>
                                        </div>
                                        <div className="project_description">
                                            {project.description_list.map(project_desc_item => (
                                                <li style={{ fontSize: `calc(${width}px * 0.019)`, lineHeight: `calc(${width}px * 0.019)`, marginLeft: 10 }}>{project_desc_item}</li>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="projects">
                            <div className="header_title">
                                <h2 style={{ fontSize: `calc(${width}px * 0.028)`, lineHeight: `calc(${width}px * 0.023)` }}>{draft?.editor?.data?.projects.title}</h2>
                                <hr className="header_line" />
                            </div>
                            <div className="project_content">
                                {draft?.editor?.data?.projects?.content.map(project => (
                                    <div className="project_content_item">
                                        <div className="project_titles">
                                            <p style={{ fontSize: `calc(${width}px * 0.021)`, lineHeight: `calc(${width}px * 0.021)` }} className="skills_labels">{project.name}</p>
                                            <p style={{ fontSize: `calc(${width}px * 0.021)`, lineHeight: `calc(${width}px * 0.021)` }} className="skills_values">{project.project_link} | {project.github_link}</p>
                                        </div>
                                        <div className="project_description">
                                            {project.description_list.map(project_desc_item => (
                                                <li style={{ fontSize: `calc(${width}px * 0.019)`, lineHeight: `calc(${width}px * 0.019)`, marginLeft: 10 }}>{project_desc_item}</li>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="projects">
                            <div className="header_title">
                                <h2 style={{ fontSize: `calc(${width}px * 0.028)`, lineHeight: `calc(${width}px * 0.023)` }}>{draft?.editor?.data?.projects.title}</h2>
                                <hr className="header_line" />
                            </div>
                            <div className="project_content">
                                {draft?.editor?.data?.projects?.content.map(project => (
                                    <div className="project_content_item">
                                        <div className="project_titles">
                                            <p style={{ fontSize: `calc(${width}px * 0.021)`, lineHeight: `calc(${width}px * 0.021)` }} className="skills_labels">{project.name}</p>
                                            <p style={{ fontSize: `calc(${width}px * 0.021)`, lineHeight: `calc(${width}px * 0.021)` }} className="skills_values">{project.project_link} | {project.github_link}</p>
                                        </div>
                                        <div className="project_description">
                                            {project.description_list.map(project_desc_item => (
                                                <li style={{ fontSize: `calc(${width}px * 0.019)`, lineHeight: `calc(${width}px * 0.019)`, marginLeft: 10 }}>{project_desc_item}</li>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="projects">
                            <div className="header_title">
                                <h2 style={{ fontSize: `calc(${width}px * 0.028)`, lineHeight: `calc(${width}px * 0.023)` }}>{draft?.editor?.data?.projects.title}</h2>
                                <hr className="header_line" />
                            </div>
                            <div className="project_content">
                                {draft?.editor?.data?.projects?.content.map(project => (
                                    <div className="project_content_item">
                                        <div className="project_titles">
                                            <p style={{ fontSize: `calc(${width}px * 0.021)`, lineHeight: `calc(${width}px * 0.021)` }} className="skills_labels">{project.name}</p>
                                            <p style={{ fontSize: `calc(${width}px * 0.021)`, lineHeight: `calc(${width}px * 0.021)` }} className="skills_values">{project.project_link} | {project.github_link}</p>
                                        </div>
                                        <div className="project_description">
                                            {project.description_list.map(project_desc_item => (
                                                <li style={{ fontSize: `calc(${width}px * 0.019)`, lineHeight: `calc(${width}px * 0.019)`, marginLeft: 10 }}>{project_desc_item}</li>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="projects">
                            <div className="header_title">
                                <h2 style={{ fontSize: `calc(${width}px * 0.028)`, lineHeight: `calc(${width}px * 0.023)` }}>{draft?.editor?.data?.projects.title}</h2>
                                <hr className="header_line" />
                            </div>
                            <div className="project_content">
                                {draft?.editor?.data?.projects?.content.map(project => (
                                    <div className="project_content_item">
                                        <div className="project_titles">
                                            <p style={{ fontSize: `calc(${width}px * 0.021)`, lineHeight: `calc(${width}px * 0.021)` }} className="skills_labels">{project.name}</p>
                                            <p style={{ fontSize: `calc(${width}px * 0.021)`, lineHeight: `calc(${width}px * 0.021)` }} className="skills_values">{project.project_link} | {project.github_link}</p>
                                        </div>
                                        <div className="project_description">
                                            {project.description_list.map(project_desc_item => (
                                                <li style={{ fontSize: `calc(${width}px * 0.019)`, lineHeight: `calc(${width}px * 0.019)`, marginLeft: 10 }}>{project_desc_item}</li>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="projects">
                            <div className="header_title">
                                <h2 style={{ fontSize: `calc(${width}px * 0.028)`, lineHeight: `calc(${width}px * 0.023)` }}>{draft?.editor?.data?.projects.title}</h2>
                                <hr className="header_line" />
                            </div>
                            <div className="project_content">
                                {draft?.editor?.data?.projects?.content.map(project => (
                                    <div className="project_content_item">
                                        <div className="project_titles">
                                            <p style={{ fontSize: `calc(${width}px * 0.021)`, lineHeight: `calc(${width}px * 0.021)` }} className="skills_labels">{project.name}</p>
                                            <p style={{ fontSize: `calc(${width}px * 0.021)`, lineHeight: `calc(${width}px * 0.021)` }} className="skills_values">{project.project_link} | {project.github_link}</p>
                                        </div>
                                        <div className="project_description">
                                            {project.description_list.map(project_desc_item => (
                                                <li style={{ fontSize: `calc(${width}px * 0.019)`, lineHeight: `calc(${width}px * 0.019)`, marginLeft: 10 }}>{project_desc_item}</li>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="education">
                            <div className="header_title">
                                <h2 style={{ fontSize: `calc(${width}px * 0.028)`, lineHeight: `calc(${width}px * 0.023)` }}>{draft?.editor?.data?.education.title}</h2>
                                <hr className="header_line" />
                            </div>
                            <div className="education_content">
                                {draft?.editor?.data?.education?.content.map(edu => (
                                    <div className="education_content_item">
                                        <div className="education_titles">
                                            <div className="education_titles_left">
                                                <p style={{ fontSize: `calc(${width}px * 0.021)`, lineHeight: `calc(${width}px * 0.021)` }} className="skills_labels">{edu.course}</p>
                                                <p style={{ fontSize: `calc(${width}px * 0.021)`, lineHeight: `calc(${width}px * 0.021)` }} className="skills_values">{edu.institute}</p>
                                                <p style={{ fontSize: `calc(${width}px * 0.021)`, lineHeight: `calc(${width}px * 0.021)` }} className="skills_values">Grade</p>
                                            </div>
                                            <div className="education_titles_right">
                                                <p style={{ fontSize: `calc(${width}px * 0.021)`, lineHeight: `calc(${width}px * 0.021)` }} className="skills_labels">{edu.location}</p>
                                                <p style={{ fontSize: `calc(${width}px * 0.021)`, lineHeight: `calc(${width}px * 0.021)` }} className="skills_values">{edu.period_from} - {edu.period_to}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="achievements">
                            <div className="header_title">
                                <h2 style={{ fontSize: `calc(${width}px * 0.028)`, lineHeight: `calc(${width}px * 0.023)` }}>{draft?.editor?.data?.achievements.title}</h2>
                                <hr className="header_line" />
                            </div>
                            <div className="achievements_content">
                                {draft?.editor?.data?.achievements?.content_data.map(ach => (
                                    <div className="achievements_content_item">
                                        <p style={{ fontSize: `calc(${width}px * 0.021)`, lineHeight: `calc(${width}px * 0.021)` }} className="skills_labels">{ach}</p>
                                        <p style={{ fontSize: `calc(${width}px * 0.021)`, lineHeight: `calc(${width}px * 0.021)` }} className="skills_values">{ach}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Editor;