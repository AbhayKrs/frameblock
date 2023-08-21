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

    const print = () => {
        window.print();
    }


    return (
        <div style={{ height: 'calc(100vh - 4.75rem)' }} className="overflow-y-auto border-2 border-neutral-700 p-1 rounded-md">
            <button onClick={print}>PRINT</button>
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
                                <AiFillMobile contenteditable="false" />
                                <span>({draft?.editor?.data?.socials.phone_code}) {draft?.editor?.data?.socials.phone_number}</span>
                            </li>
                            <li className="socials_item">
                                <GrMail contenteditable="false" />
                                <span>{draft?.editor?.data?.socials.email}</span>
                            </li>
                            <li className="socials_item">
                                <AiFillHome contenteditable="false" />
                                <span>{draft?.editor?.data?.socials.portfolio_value}</span>
                            </li>
                            <li className="socials_item">
                                <BsLinkedin contenteditable="false" />
                                <span>{draft?.editor?.data?.socials.linkedin_value}</span>
                            </li>
                            <li className="socials_item">
                                <FaGithubSquare contenteditable="false" />
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
                        </div>
                        <div className="projects">
                            <div className="header_title">
                                <h2 style={{ fontSize: `calc(${width}px * 0.028)`, lineHeight: `calc(${width}px * 0.023)` }}>{draft?.editor?.data?.projects.title}</h2>
                                <hr className="header_line" />
                            </div>
                        </div>
                        <div className="education">
                            <div className="header_title">
                                <h2 style={{ fontSize: `calc(${width}px * 0.028)`, lineHeight: `calc(${width}px * 0.023)` }}>{draft?.editor?.data?.education.title}</h2>
                                <hr className="header_line" />
                            </div>
                        </div>
                        <div className="achievements">
                            <div className="header_title">
                                <h2 style={{ fontSize: `calc(${width}px * 0.028)`, lineHeight: `calc(${width}px * 0.023)` }}>{draft?.editor?.data?.achievements.title}</h2>
                                <hr className="header_line" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Editor;