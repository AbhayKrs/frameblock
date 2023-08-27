import { useEffect, useRef, useState } from 'react';
import '../styles/Editor.css';
import EditableInput from './EditableInput';

import { MdAdd } from 'react-icons/md';

const EditableObjective = (props) => {
    const { pageWidth, field, in_type, val, handleInputChange } = props;

    const [mainEdit, setMainEdit] = useState(false);
    const inWidth = (value) => {
        const len = (value.length >= (pageWidth * 0.1302)) ? pageWidth * 0.1302 : value.length;
        return { width: len + 'ch' };
    }

    const changeHandler = () => {
    }

    const calcFontDimensions = (fld) => {
        switch (fld) {
            case 'objective_title': { return { fontSize: `calc(${pageWidth}px * 0.028)`, lineHeight: `calc(${pageWidth}px * 0.028)` } }
            case 'skills_label': { return { fontSize: `calc(${pageWidth}px * 0.019)`, lineHeight: `calc(${pageWidth}px * 0.019)` } }
            case 'skills_value': { return { fontSize: `calc(${pageWidth}px * 0.019)`, lineHeight: `calc(${pageWidth}px * 0.019)` } }
            case 'experience_role': { return { fontSize: `calc(${pageWidth}px * 0.021)`, lineHeight: `calc(${pageWidth}px * 0.021)` } }
            case 'experience_company': { return { fontSize: `calc(${pageWidth}px * 0.021)`, lineHeight: `calc(${pageWidth}px * 0.021)` } }
            case 'experience_location': { return { fontSize: `calc(${pageWidth}px * 0.018)`, lineHeight: `calc(${pageWidth}px * 0.018)` } }
            case 'experience_period': { return { fontSize: `calc(${pageWidth}px * 0.018)`, lineHeight: `calc(${pageWidth}px * 0.018)` } }
            case 'exp_value': { return { fontSize: `calc(${pageWidth}px * 0.019)`, lineHeight: `calc(${pageWidth}px * 0.019)` } }
            case 'project_name': { return { fontSize: `calc(${pageWidth}px * 0.021)`, lineHeight: `calc(${pageWidth}px * 0.021)` } }
            case 'project_links': { return { fontSize: `calc(${pageWidth}px * 0.021)`, lineHeight: `calc(${pageWidth}px * 0.021)` } }
            case 'proj_value': { return { fontSize: `calc(${pageWidth}px * 0.019)`, lineHeight: `calc(${pageWidth}px * 0.019)` } }
            case 'education_course': { return { fontSize: `calc(${pageWidth}px * 0.021)`, lineHeight: `calc(${pageWidth}px * 0.021)` } }
            case 'education_institute': { return { fontSize: `calc(${pageWidth}px * 0.021)`, lineHeight: `calc(${pageWidth}px * 0.021)` } }
            case 'education_grade': { return { fontSize: `calc(${pageWidth}px * 0.021)`, lineHeight: `calc(${pageWidth}px * 0.021)` } }
            case 'education_location': { return { fontSize: `calc(${pageWidth}px * 0.018)`, lineHeight: `calc(${pageWidth}px * 0.018)` } }
            case 'education_period': { return { fontSize: `calc(${pageWidth}px * 0.018)`, lineHeight: `calc(${pageWidth}px * 0.018)` } }
            case 'achievements_item': { return { fontSize: `calc(${pageWidth}px * 0.018)`, lineHeight: `calc(${pageWidth}px * 0.018)` } }
            case 'achievements_period': { return { fontSize: `calc(${pageWidth}px * 0.018)`, lineHeight: `calc(${pageWidth}px * 0.018)` } }
        }
    }

    const normalView = () => {
        switch (field) {
            case 'skills':
                return <div onClick={() => setMainEdit(true)} className="skills_view">
                    <div className="header_title">
                        <h2 style={{ ...calcFontDimensions('objective_title') }}>{val?.title}</h2>
                        <hr className="header_line" />
                    </div>
                    <div className="skills_content">
                        {val?.content_data.map((skill, index) => (
                            <div key={index} className="skills_content_item">
                                <div style={{ ...calcFontDimensions('skills_label') }} className="skills_labels">{skill.label}</div>
                                <div style={{ ...calcFontDimensions('skills_value') }} className="skills_values">{skill.content_values.toString()}</div>
                            </div>
                        ))}
                    </div>
                </div>
            case 'experience':
                return <div onClick={() => setMainEdit(true)} className="experience_view">
                    <div className="header_title">
                        <h2 style={{ ...calcFontDimensions('objective_title') }}>{val?.title}</h2>
                        <hr className="header_line" />
                    </div>
                    <div className="experience_content">
                        {val?.content.map((exp, index) => (
                            <div key={index} className="experience_content_item">
                                <div className="experience_titles">
                                    <div className="experience_titles_left">
                                        <p style={{ ...calcFontDimensions('experience_role') }} className="experience_role">{exp.role}</p>
                                        <p style={{ ...calcFontDimensions('experience_company') }} className="experience_company">{exp.company}</p>
                                    </div>
                                    <div className="experience_titles_right">
                                        <p style={{ ...calcFontDimensions('experience_location') }} className="experience_location">{exp.location}</p>
                                        <p style={{ ...calcFontDimensions('experience_period') }} className="experience_period">{exp.period_from} - {exp.period_to}</p>
                                    </div>
                                </div>
                                <div className="experience_description">
                                    {exp.description_list.map((exp_desc_item, index) => (
                                        <li key={index} style={{ ...calcFontDimensions('exp_value') }}>{exp_desc_item}</li>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            case 'projects':
                return <div onClick={() => setMainEdit(true)} className="projects_view">
                    <div className="header_title">
                        <h2 style={{ ...calcFontDimensions('objective_title') }}>{val?.title}</h2>
                        <hr className="header_line" />
                    </div>
                    <div className="project_content">
                        {val?.content.map((proj, index) => (
                            <div key={index} className="project_content_item">
                                <div className="project_titles">
                                    <p style={{ ...calcFontDimensions('project_name') }} className="project_name">{proj.name}</p>
                                    <p style={{ ...calcFontDimensions('project_links') }} className="project_links">{proj.project_link} | {proj.github_link}</p>
                                </div>
                                <div className="project_description">
                                    {proj.description_list.map((itx, index) => (
                                        <li key={index} style={{ ...calcFontDimensions('proj_value') }}>{itx}</li>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            case 'education':
                return <div onClick={() => setMainEdit(true)} className="education_view">
                    <div className="header_title">
                        <h2 style={{ ...calcFontDimensions('objective_title') }}>{val?.title}</h2>
                        <hr className="header_line" />
                    </div>
                    <div className="education_content">
                        {val?.content.map((edu, index) => (
                            <div key={index} className="education_content_item">
                                <div className="education_titles">
                                    <div className="education_titles_left">
                                        <p style={{ ...calcFontDimensions('education_course') }} className="education_course">{edu.course}</p>
                                        <p style={{ ...calcFontDimensions('education_institute') }} className="education_institute">{edu.institute}</p>
                                        <p style={{ ...calcFontDimensions('education_grade') }} className="education_grade">Grade</p>
                                    </div>
                                    <div className="education_titles_right">
                                        <p style={{ ...calcFontDimensions('education_location') }} className="education_location">{edu.location}</p>
                                        <p style={{ ...calcFontDimensions('education_period') }} className="education_period">{edu.period_from} - {edu.period_to}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            case 'achievements':
                return <div onClick={() => setMainEdit(true)} className="achievements_view">
                    <div className="header_title">
                        <h2 style={{ ...calcFontDimensions('objective_title') }}>{val?.title}</h2>
                        <hr className="header_line" />
                    </div>
                    <div className="achievements_content">
                        {val?.content_data.map((ach, index) => (
                            <div key={index} className="achievements_content_item">
                                <p style={{ ...calcFontDimensions('achievements_item') }} className="achievements_item">{ach}</p>
                                <p style={{ ...calcFontDimensions('achievements_period') }} className="achievements_period">{ach}</p>
                            </div>
                        ))}
                    </div>
                </div>
        }
    }

    const editView = () => {
        switch (field) {
            case 'skills':
                return <div className="skills_edit">
                    <div className="header_title">
                        <input className='editInput' style={{ ...calcFontDimensions('objective_title'), ...inWidth(val.title) }} type="text" value={val.title} onChange={changeHandler} />
                        <hr className="header_line" />
                    </div>
                    <div className="skills_content">
                        {val.content_data.map((skill, index) => (
                            <div key={index} className="skills_content_item">
                                <input className='skills_label_edit' style={{ ...calcFontDimensions('skills_label'), ...inWidth(skill.label) }} type="text" value={skill.label} onChange={changeHandler} />
                                <div className='skills_content_values'>
                                    {skill.content_values.map(itx => (
                                        <input className='skills_value' style={{ ...calcFontDimensions('skills_value'), ...inWidth(itx) }} type="text" value={itx} onChange={changeHandler} />
                                    ))}
                                    <MdAdd className='skills_value_add' />
                                </div>
                            </div>
                        ))}
                        <MdAdd className='skills_add' />
                    </div>
                </div>
            case 'experience':
                return <div className="experience_edit">
                    <div className="header_title">
                        <input className='editInput' style={{ ...calcFontDimensions('objective_title'), ...inWidth(val.title) }} type="text" value={val.title} onChange={changeHandler} />
                        <hr className="header_line" />
                    </div>
                    <div className="experience_content">
                        {val.content.map((exp, index) => (
                            <div key={index} className="experience_content_item">
                                <div className="experience_titles">
                                    <div className="experience_titles_left">
                                        <input className='experience_role' style={{ ...calcFontDimensions('experience_role'), ...inWidth(exp.role) }} type="text" value={exp.role} onChange={changeHandler} />
                                        <input className='experience_company' style={{ ...calcFontDimensions('experience_company'), ...inWidth(exp.company) }} type="text" value={exp.company} onChange={changeHandler} />
                                    </div>
                                    <div className="experience_titles_right">
                                        <input className='experience_location' style={{ ...calcFontDimensions('experience_location'), ...inWidth(exp.location) }} type="text" value={exp.location} onChange={changeHandler} />
                                        <div className='experience_period'>
                                            <input className='experience_period_from' style={{ ...calcFontDimensions('experience_period'), ...inWidth(exp.period_from) }} type="text" value={exp.period_from} onChange={changeHandler} />
                                            <input className='experience_period_to' style={{ ...calcFontDimensions('experience_period'), ...inWidth(exp.period_to) }} type="text" value={exp.period_to} onChange={changeHandler} />
                                        </div>
                                    </div>
                                </div>
                                <div className="experience_description">
                                    {exp.description_list.map((itx, index) => (
                                        <input key={index} className='exp_value' style={{ ...calcFontDimensions('exp_value'), ...inWidth(itx) }} type="text" value={itx} onChange={changeHandler} />
                                    ))}
                                    <MdAdd className='exp_value_add' />
                                </div>
                            </div>
                        ))}
                        <MdAdd className='experience_add' />
                    </div>
                </div>
            case 'projects':
                return <div className="projects_edit">
                    <div className="header_title">
                        <input className='editInput' style={{ ...calcFontDimensions('objective_title'), ...inWidth(val.title) }} type="text" value={val.title} onChange={changeHandler} />
                        <hr className="header_line" />
                    </div>
                    <div className="project_content">
                        {val?.content.map((proj, index) => (
                            <div key={index} className="project_content_item">
                                <div className="project_titles">
                                    <input className='project_name' style={{ ...calcFontDimensions('project_name'), ...inWidth(proj.name) }} type="text" value={proj.name} onChange={changeHandler} />
                                    <div className='project_links'>
                                        <input className='project_link' style={{ ...calcFontDimensions('project_links'), ...inWidth(proj.project_link) }} type="text" value={proj.project_link} onChange={changeHandler} />
                                        <input className='project_link' style={{ ...calcFontDimensions('project_links'), ...inWidth(proj.github_link) }} type="text" value={proj.github_link} onChange={changeHandler} />
                                    </div>
                                </div>
                                <div className="project_description">
                                    {proj.description_list.map((itx, index) => (
                                        <input key={index} className='proj_value' style={{ ...calcFontDimensions('proj_value'), ...inWidth(itx) }} type="text" value={itx} onChange={changeHandler} />
                                    ))}
                                    <MdAdd className='proj_value_add' />
                                </div>
                            </div>
                        ))}
                        <MdAdd className='projects_add' />
                    </div>
                </div>
            case 'education':
                return <div className="education_edit">
                    <div className="header_title">
                        <input className='editInput' style={{ ...calcFontDimensions('objective_title'), ...inWidth(val.title) }} type="text" value={val.title} onChange={changeHandler} />
                        <hr className="header_line" />
                    </div>
                    <div className="education_content">
                        {val?.content.map((edu, index) => (
                            <div key={index} className="education_content_item">
                                <div className="education_titles">
                                    <div className="education_titles_left">
                                        <input className='education_course' style={{ ...calcFontDimensions('education_course'), ...inWidth(edu.course) }} type="text" value={edu.course} onChange={changeHandler} />
                                        <input className='education_institute' style={{ ...calcFontDimensions('education_institute'), ...inWidth(edu.institute) }} type="text" value={edu.institute} onChange={changeHandler} />
                                        <input className='education_grade' style={{ ...calcFontDimensions('education_grade'), ...inWidth('Grade') }} type="text" value={'Grade'} onChange={changeHandler} />
                                    </div>
                                    <div className="education_titles_right">
                                        <input className='education_location' style={{ ...calcFontDimensions('education_location'), ...inWidth(edu.location) }} type="text" value={edu.location} onChange={changeHandler} />
                                        <div className='education_period'>
                                            <input className='education_period_from' style={{ ...calcFontDimensions('education_period'), ...inWidth(edu.period_from) }} type="text" value={edu.period_from} onChange={changeHandler} />
                                            <input className='education_period_to' style={{ ...calcFontDimensions('education_period'), ...inWidth(edu.period_to) }} type="text" value={edu.period_to} onChange={changeHandler} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <MdAdd className='education_add' />
                    </div>
                </div>
            case 'achievements':
                return <div className="achievements_edit">
                    <div className="header_title">
                        <input className='editInput' style={{ ...calcFontDimensions('objective_title'), ...inWidth(val.title) }} type="text" value={val.title} onChange={changeHandler} />
                        <hr className="header_line" />
                    </div>
                    <div className="achievements_content">
                        {val?.content_data.map((ach, index) => (
                            <div key={index} className="achievements_content_item">
                                <input className='achievements_item' style={{ ...calcFontDimensions('achievements_item'), ...inWidth(ach) }} type="text" value={ach} onChange={changeHandler} />
                                <input className='achievements_period' style={{ ...calcFontDimensions('achievements_period'), ...inWidth(ach) }} type="text" value={ach} onChange={changeHandler} />
                            </div>
                        ))}
                    </div>
                </div>
        }
    }

    return (
        <div className={field}>
            {!mainEdit ? normalView() : editView()}
        </div>
    )
}

export default EditableObjective;