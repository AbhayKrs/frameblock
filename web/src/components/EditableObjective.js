import { useEffect, useRef, useState } from 'react';
import '../styles/Editor.css';

import { BiCheck } from 'react-icons/bi';
import { MdAdd, MdRemove, MdClose } from 'react-icons/md';
import { RiDragMove2Line } from 'react-icons/ri';

const EditableObjective = (props) => {
    const { tmpID, provided, pageWidth, field, editOn, val, handleSubmit } = props;

    const [editVal, setEditVal] = useState(val);

    useEffect(() => {
        setEditVal(val);
    }, [val])

    const inWidth = (value) => {
        if (value === undefined) {
            return { width: '0ch' };
        }
        var len = (value.length > (pageWidth * 0.0878)) ? pageWidth * 0.0878 : value.length;
        len = len > 35 ? 35 : len;
        len = len < 7 ? 7 : len;
        // var len = value.length;
        len += 1;
        return { width: len + 'ch' };
    }

    const calcStyling = (fld) => {
        switch (fld) {
            case 'edit_root': { return { padding: `calc(${pageWidth}px * 0.012)`, borderRadius: `calc(${pageWidth}px * 0.004)`, gap: `calc(${pageWidth}px * 0.012)` } }
            case 'edit_item_root': { return { gap: `calc(${pageWidth}px * 0.010)`, padding: `calc(${pageWidth}px * 0.010)`, borderRadius: `calc(${pageWidth}px * 0.004)` } }
            case 'edit_content_values': { return { gap: `calc(${pageWidth}px * 0.006)` } }
            case 'edit_add': { return { height: `calc(${pageWidth}px * 0.028)`, width: `calc(${pageWidth}px * 0.028)` } }
            case 'edit_value_add': { return { height: `calc(${pageWidth}px * 0.018)`, width: `calc(${pageWidth}px * 0.018)` } }
            case 'edit_content': { return { gap: `calc(${pageWidth}px * 0.018)` } }
            case 'proj_content': { return { gap: `calc(${pageWidth}px * 0.006)` } }
            case 'edit_description': { return { gap: `calc(${pageWidth}px * 0.008)`, paddingLeft: `calc(${pageWidth}px * 0.036)` } }
            case 'edit_content_item': { return { padding: `calc(${pageWidth}px * 0.012)`, gap: `calc(${pageWidth}px * 0.008)`, borderRadius: `calc(${pageWidth}px * 0.004)` } }
            case 'edit_titles': { return { gap: `calc(${pageWidth}px * 0.003` } }
            case 'edit_period': { return { gap: `calc(${pageWidth}px * 0.008)` } }
            case 'edit_value_root': { return { gap: `calc(${pageWidth}px * 0.008)` } }
            case 'edit_input': { return { padding: `calc(${pageWidth}px * 0.005)`, borderRadius: `calc(${pageWidth}px * 0.006)` } }
            case 'objective_title': { return { fontSize: `calc(${pageWidth}px * 0.024)`, lineHeight: `calc(${pageWidth}px * 0.026)` } }
            case 'objective_content_view': { return { paddingTop: `calc(${pageWidth}px * 0.008)` } }
            case 'obj_content_item': { return { gap: `calc(${pageWidth}px * 0.003)` } }
            case 'skills_content': { return { borderSpacing: `var(--tw-border-spacing-x) calc(${pageWidth}px * 0.012)` } }
            case 'skills_label': { return { fontSize: `calc(${pageWidth}px * 0.018)`, lineHeight: `calc(${pageWidth}px * 0.020)` } }
            case 'skills_value': { return { fontSize: `calc(${pageWidth}px * 0.015)`, lineHeight: `calc(${pageWidth}px * 0.017)` } }
            case 'experience_role': { return { fontSize: `calc(${pageWidth}px * 0.018)`, lineHeight: `calc(${pageWidth}px * 0.020)` } }
            case 'experience_company': { return { fontSize: `calc(${pageWidth}px * 0.018)`, lineHeight: `calc(${pageWidth}px * 0.020)` } }
            case 'experience_location': { return { fontSize: `calc(${pageWidth}px * 0.016)`, lineHeight: `calc(${pageWidth}px * 0.018)` } }
            case 'experience_period': { return { fontSize: `calc(${pageWidth}px * 0.016)`, lineHeight: `calc(${pageWidth}px * 0.018)` } }
            case 'exp_value': { return { fontSize: `calc(${pageWidth}px * 0.015)`, lineHeight: `calc(${pageWidth}px * 0.017)` } }
            case 'proj_titles': { return { gap: `calc(${pageWidth}px * 0.012)` } }
            case 'project_name': { return { fontSize: `calc(${pageWidth}px * 0.018)`, lineHeight: `calc(${pageWidth}px * 0.020)` } }
            case 'project_links': { return { fontSize: `calc(${pageWidth}px * 0.016)`, lineHeight: `calc(${pageWidth}px * 0.018)` } }
            case 'proj_value': { return { fontSize: `calc(${pageWidth}px * 0.015)`, lineHeight: `calc(${pageWidth}px * 0.017)` } }
            case 'education_course': { return { fontSize: `calc(${pageWidth}px * 0.018)`, lineHeight: `calc(${pageWidth}px * 0.020)` } }
            case 'education_institute': { return { fontSize: `calc(${pageWidth}px * 0.018)`, lineHeight: `calc(${pageWidth}px * 0.020)` } }
            case 'education_grade': { return { fontSize: `calc(${pageWidth}px * 0.015)`, lineHeight: `calc(${pageWidth}px * 0.017)` } }
            case 'education_location': { return { fontSize: `calc(${pageWidth}px * 0.016)`, lineHeight: `calc(${pageWidth}px * 0.018)` } }
            case 'education_period': { return { fontSize: `calc(${pageWidth}px * 0.016)`, lineHeight: `calc(${pageWidth}px * 0.018)` } }
            case 'achievements_item': { return { fontSize: `calc(${pageWidth}px * 0.015)`, lineHeight: `calc(${pageWidth}px * 0.017)` } }
            case 'achievements_period': { return { fontSize: `calc(${pageWidth}px * 0.016)`, lineHeight: `calc(${pageWidth}px * 0.018)` } }
            case 'edit_actions': { return { top: `calc(${pageWidth}px * -0.007)`, right: 0 } }
            case 'edit_item_close': { return { top: `calc(${pageWidth}px * -0.007)`, right: 0 } }
            case 'edit_icon': { return { height: `calc(${pageWidth}px * 0.020)`, width: `calc(${pageWidth}px * 0.020)` } }
            case 'edit_value_close': { return { height: `calc(${pageWidth}px * 0.012)`, width: `calc(${pageWidth}px * 0.012)`, top: 0 } }
            case 'drag_icon': { return { top: `calc(${pageWidth}px * -0.010)`, left: 0, height: `calc(${pageWidth}px * 0.020)`, width: `calc(${pageWidth}px * 0.020)` } }
        }
    }

    const normalView = () => {
        switch (field) {
            case 'skills':
                return <div className="skills_view">
                    <div className="header_title">
                        <h2 style={{ ...calcStyling('objective_title') }}>{editVal?.title}</h2>
                        <hr className="header_line" />
                    </div>
                    <div className="skills_content" style={{ ...calcStyling("edit_content"), ...calcStyling("objective_content_view") }}>
                        {editVal?.content_data?.map((skill, index) => (
                            <div key={index} className="skills_content_item" style={{ ...calcStyling("obj_content_item") }}>
                                <div style={{ ...calcStyling('skills_label') }} className="skills_labels">{skill.label}</div>
                                <div style={{ ...calcStyling('skills_value') }} className="skills_values">{skill.content_values.join(', ')}</div>
                            </div>
                        ))}
                    </div>
                </div>
            case 'experience':
                return <div className="experience_view">
                    <div className="header_title">
                        <h2 style={{ ...calcStyling('objective_title') }}>{editVal?.title}</h2>
                        <hr className="header_line" />
                    </div>
                    <div className="experience_content" style={{ ...calcStyling("edit_content"), ...calcStyling("objective_content_view") }}>
                        {editVal?.content?.map((exp, index) => (
                            <div key={index} className="experience_content_item" style={{ ...calcStyling("obj_content_item") }}>
                                <div className="experience_titles" style={{ ...calcStyling("edit_titles") }}>
                                    <div className="experience_titles_left" style={{ ...calcStyling("edit_titles") }}>
                                        <p className="experience_role" style={{ ...calcStyling('experience_role') }}>{exp.role}</p>
                                        <p className="experience_company" style={{ ...calcStyling('experience_company') }}>{exp.company}</p>
                                    </div>
                                    <div className="experience_titles_right" style={{ ...calcStyling("edit_titles") }}>
                                        <p className="experience_location" style={{ ...calcStyling('experience_location') }}>{exp.location}</p>
                                        <p className="experience_period" style={{ ...calcStyling('experience_period') }}>{exp.period_from} - {exp.period_to}</p>
                                    </div>
                                </div>
                                <ul className="experience_description" style={{ ...calcStyling('edit_description') }}>
                                    {exp.description_list.map((itx, index) => (
                                        <li key={index} className='mb-1 last:mb-0' style={{ ...calcStyling('exp_value') }}>{itx}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            case 'projects':
                return <div className="projects_view">
                    <div className="header_title">
                        <h2 style={{ ...calcStyling('objective_title') }}>{editVal?.title}</h2>
                        <hr className="header_line" />
                    </div>
                    <div className="project_content" style={{ ...calcStyling("edit_content"), ...calcStyling("objective_content_view") }}>
                        {editVal?.content?.map((proj, index) => (
                            <div key={index} className="project_content_item" style={{ ...calcStyling("obj_content_item") }}>
                                <div className="project_titles" style={{ ...calcStyling('edit_titles'), ...calcStyling('proj_titles') }}>
                                    <p style={{ ...calcStyling('project_name') }} className="project_name">{proj.name}</p>
                                    {tmpID === "64e0a6766acb0ae15dfbdfe1" && <span style={{ ...calcStyling('project_name') }} >&#x2022;</span>}
                                    <p style={{ ...calcStyling('project_links') }} className="project_links">{proj.project_link} | {proj.github_link}</p>
                                </div>
                                <p style={{ ...calcStyling('proj_value') }} className='project_header'>{proj.header}</p>
                                <ul className="project_description" style={{ ...calcStyling('edit_description') }}>
                                    {proj.description_list.map((itx, index) => (
                                        <li key={index} className='mb-1 last:mb-0' style={{ ...calcStyling('proj_value') }}>{itx}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            case 'education':
                return <div className="education_view">
                    <div className="header_title">
                        <h2 style={{ ...calcStyling('objective_title') }}>{editVal?.title}</h2>
                        <hr className="header_line" />
                    </div>
                    <div className="education_content" style={{ ...calcStyling("edit_content"), ...calcStyling("objective_content_view") }}>
                        {editVal?.content?.map((edu, index) => (
                            <div key={index} className="education_content_item" style={{ ...calcStyling("obj_content_item") }}>
                                <div className="education_titles" style={{ ...calcStyling("edit_titles") }}>
                                    <div className="education_titles_left" style={{ ...calcStyling('edit_titles') }}>
                                        <p style={{ ...calcStyling('education_course') }} className="education_course">{edu.course}</p>
                                        <p style={{ ...calcStyling('education_institute') }} className="education_institute">{edu.institute}</p>
                                    </div>
                                    <div className="education_titles_right" style={{ ...calcStyling('edit_titles') }}>
                                        <p style={{ ...calcStyling('education_location') }} className="education_location">{edu.location}</p>
                                        <p style={{ ...calcStyling('education_period') }} className="education_period">{edu.period_from} - {edu.period_to}</p>
                                    </div>
                                </div>
                                <div className='eduction_description'>
                                    <p style={{ ...calcStyling('education_grade') }} className="education_grade">{edu.grade_label}: {edu.grade_value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            case 'achievements':
                return <div className="achievements_view">
                    <div className="header_title">
                        <h2 style={{ ...calcStyling('objective_title') }}>{editVal?.title}</h2>
                        <hr className="header_line" />
                    </div>
                    <div className="achievements_content" style={{ ...calcStyling("proj_content"), ...calcStyling("objective_content_view") }}>
                        {editVal?.content_data?.map((ach, index) => (
                            <div key={index} className="achievements_content_item" style={{ ...calcStyling("edit_content_values") }}>
                                <p style={{ ...calcStyling('achievements_item') }} className="achievements_item">{ach.title}</p>
                                <p style={{ ...calcStyling('achievements_period') }} className="achievements_period">{ach.period}</p>
                            </div>
                        ))}
                    </div>
                </div>
        }
    }

    const editView = () => {
        switch (field) {
            case 'skills':
                return <div className="skills_edit" style={{ ...calcStyling("edit_root") }}>
                    <div className="header_title">
                        <input className='editInput' style={{ ...calcStyling('objective_title'), ...inWidth(editVal?.title) }} type="text" value={editVal?.title} onChange={(ev) => setEditVal({ ...editVal, title: ev.target.value })} />
                        <hr className="header_line" />
                    </div>
                    <div className="skills_content" style={{ ...calcStyling("edit_content") }}>
                        {editVal?.content_data && editVal?.content_data.map((skill, index) => (
                            <div key={index} className="skills_content_item" style={{ ...calcStyling("edit_content_item") }}>
                                <div className='skills_value_cell' style={{ ...calcStyling('skills_label') }}>
                                    <input type="text" className='skills_label_value' style={{ ...calcStyling('edit_input'), ...inWidth(skill.label) }} value={skill.label} onChange={(ev) => {
                                        let clone = [...editVal.content_data];
                                        let obj = clone[index];
                                        obj.label = ev.target.value;
                                        clone[index] = obj;
                                        setEditVal({ ...editVal, content_data: [...clone] })
                                    }} />
                                </div>
                                <div className='skills_content_cell'>
                                    <div className='skills_content_values' style={{ ...calcStyling("edit_content_values") }}>
                                        {skill.content_values.map((itx, idx) => (
                                            <div className='flex relative'>
                                                <input className='skills_value' style={{ ...calcStyling('skills_value'), ...calcStyling('edit_input'), ...inWidth(itx) }} type="text" value={itx} onChange={(ev) => {
                                                    let clone = [...editVal.content_data];
                                                    let obj = clone[index];
                                                    let list = obj.content_values;
                                                    list[idx] = ev.target.value;
                                                    obj.content_values = list;
                                                    clone[index] = obj;
                                                    setEditVal({ ...editVal, content_data: [...clone] })
                                                }} />
                                                <MdClose
                                                    onClick={() => {
                                                        let updated = editVal;
                                                        updated.content_data[index].content_values = updated.content_data[index].content_values.filter((x, i) => i !== idx);
                                                        setEditVal({ ...updated })
                                                    }}
                                                    style={{ ...calcStyling("edit_value_close") }}
                                                    className='edit_value_close'
                                                />
                                            </div>
                                        ))}
                                        <MdAdd
                                            className='skills_value_add'
                                            style={{ ...calcStyling("edit_value_add") }}
                                            onClick={() => {
                                                let updated = editVal;
                                                const newVal = updated.content_data[index].content_values.length + 1;
                                                updated.content_data[index].content_values.push(`Skill ${newVal}`);
                                                setEditVal({ ...updated })
                                            }}
                                        />
                                    </div>
                                </div>
                                <MdClose
                                    onClick={() => {
                                        let updated = editVal;
                                        updated.content_data = updated.content_data.filter((x, i) => i !== index);
                                        setEditVal({ ...updated })
                                    }}
                                    style={{ ...calcStyling("edit_item_close") }}
                                    className='edit_item_close'
                                />
                            </div>
                        ))}
                        <MdAdd
                            className='skills_add'
                            style={{ ...calcStyling("edit_add") }}
                            onClick={() => {
                                setEditVal(prevVal => ({
                                    ...prevVal,
                                    content_data: [...prevVal.content_data, { label: 'Skill Label 3', content_values: ['skill test 1', 'skill test 2'] }]
                                }))
                            }}
                        />
                    </div>
                    <div style={{ ...calcStyling("drag_icon") }} className='drag_icon'  {...provided.dragHandleProps}>
                        <RiDragMove2Line className='h-full w-full' />
                    </div>
                    <div className='edit_actions' style={{ ...calcStyling("edit_actions") }}>
                        <BiCheck onClick={() => { handleSubmit('list', field, editVal) }} style={{ ...calcStyling("edit_icon") }} className='edit_icon' />
                        <MdClose style={{ ...calcStyling("edit_icon") }} className='edit_icon' />
                    </div>
                </div>
            case 'experience':
                return <div className="experience_edit" style={{ ...calcStyling("edit_root") }}>
                    <div className="header_title">
                        <input className='editInput' style={{ ...calcStyling('objective_title'), ...inWidth(editVal?.title) }} type="text" value={editVal?.title} onChange={(ev) => setEditVal({ ...editVal, title: ev.target.value })} />
                        <hr className="header_line" />
                    </div>
                    <div className="experience_content" style={{ ...calcStyling("edit_content") }}>
                        {editVal?.content && editVal?.content.map((exp, index) => (
                            <div key={index} className="experience_content_item" style={{ ...calcStyling("edit_content_item") }}>
                                <div className="experience_titles" style={{ ...calcStyling("edit_titles") }}>
                                    <div className="experience_titles_left" style={{ ...calcStyling("edit_titles") }}>
                                        <input className='experience_role' style={{ ...calcStyling('experience_role'), ...calcStyling('edit_input'), ...inWidth(exp.role) }} type="text" value={exp.role} onChange={(ev) => {
                                            let clone = [...editVal.content];
                                            let obj = clone[index];
                                            obj.role = ev.target.value;
                                            clone[index] = obj;
                                            setEditVal({ ...editVal, content: [...clone] })
                                        }} />
                                        <input className='experience_company' style={{ ...calcStyling('experience_company'), ...calcStyling('edit_input'), ...inWidth(exp.company) }} type="text" value={exp.company} onChange={(ev) => {
                                            let clone = [...editVal.content];
                                            let obj = clone[index];
                                            obj.company = ev.target.value;
                                            clone[index] = obj;
                                            setEditVal({ ...editVal, content: [...clone] })
                                        }} />
                                    </div>
                                    <div className="experience_titles_right" style={{ ...calcStyling("edit_titles") }}>
                                        <input className='experience_location' style={{ ...calcStyling('experience_location'), ...calcStyling('edit_input'), ...inWidth(exp.location) }} type="text" value={exp.location} onChange={(ev) => {
                                            let clone = [...editVal.content];
                                            let obj = clone[index];
                                            obj.location = ev.target.value;
                                            clone[index] = obj;
                                            setEditVal({ ...editVal, content: [...clone] })
                                        }} />
                                        <div className='experience_period' style={{ ...calcStyling("edit_period") }}>
                                            <input className='experience_period_from' style={{ ...calcStyling('experience_period'), ...calcStyling('edit_input'), ...inWidth(exp.period_from) }} type="text" value={exp.period_from} onChange={(ev) => {
                                                let clone = [...editVal.content];
                                                let obj = clone[index];
                                                obj.period_from = ev.target.value;
                                                clone[index] = obj;
                                                setEditVal({ ...editVal, content: [...clone] })
                                            }} />
                                            <span style={{ ...calcStyling('experience_period') }}>-</span>
                                            <input className='experience_period_to' style={{ ...calcStyling('experience_period'), ...calcStyling('edit_input'), ...inWidth(exp.period_to) }} type="text" value={exp.period_to} onChange={(ev) => {
                                                let clone = [...editVal.content];
                                                let obj = clone[index];
                                                obj.period_to = ev.target.value;
                                                clone[index] = obj;
                                                setEditVal({ ...editVal, content: [...clone] })
                                            }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="experience_description" style={{ ...calcStyling("edit_description") }}>
                                    {exp.description_list.map((itx, idx) => (
                                        <div className='exp_value_root' style={{ ...calcStyling("edit_value_root") }}>
                                            &#8226;
                                            <textarea
                                                key={index}
                                                className='exp_value'
                                                style={{ ...calcStyling('exp_value'), ...calcStyling('edit_input') }}
                                                value={itx}
                                                onChange={(ev) => {
                                                    let clone = [...editVal.content];
                                                    let obj = clone[index];
                                                    let list = obj.description_list;
                                                    list[idx] = ev.target.value;
                                                    obj.description_list = list;
                                                    clone[index] = obj;
                                                    setEditVal({ ...editVal, content: [...clone] })
                                                }}
                                            />
                                            <MdClose
                                                className='exp_value_close'
                                                onClick={() => {
                                                    let updated = editVal;
                                                    updated.content[index].description_list = updated.content[index].description_list.filter((x, i) => i !== idx);
                                                    setEditVal({ ...updated })
                                                }}
                                                style={{ ...calcStyling("edit_value_close") }}
                                            />
                                        </div>
                                    ))}
                                    <MdAdd
                                        className='exp_value_add'
                                        style={{ ...calcStyling("edit_value_add") }}
                                        onClick={() => {
                                            let updated = editVal;
                                            updated.content[index].description_list.push('Highlight your responsibilites, your contributions and your achievements in the position.');
                                            setEditVal({ ...updated })
                                        }}
                                    />
                                </div>
                                <MdClose
                                    onClick={() => {
                                        let updated = editVal;
                                        updated.content = updated.content.filter((x, i) => i !== index);
                                        setEditVal({ ...updated })
                                    }}
                                    style={{ ...calcStyling("edit_item_close") }}
                                    className='edit_item_close'
                                />
                            </div>
                        ))}
                        <MdAdd
                            className='experience_add'
                            style={{ ...calcStyling("edit_add") }}
                            onClick={() => {
                                setEditVal(prevVal => ({
                                    ...prevVal,
                                    content: [...prevVal.content,
                                    {
                                        role: "Your Job Title",
                                        company: "Your Company / Agency",
                                        location: "Job Location",
                                        period_from: "XXXX",
                                        period_to: "XXXX",
                                        description_type: "unordered_list",
                                        description_list: [
                                            "Highlight your responsibilites, your contributions and your achievements in the position."
                                        ],
                                    }]
                                }))
                            }}
                        />
                    </div>
                    <div style={{ ...calcStyling("drag_icon") }} className='drag_icon'  {...provided.dragHandleProps}>
                        <RiDragMove2Line className='h-full w-full' />
                    </div>
                    <div className='edit_actions' style={{ ...calcStyling("edit_actions") }}>
                        <BiCheck onClick={() => { handleSubmit('list', field, editVal) }} style={{ ...calcStyling("edit_icon") }} className='edit_icon' />
                        <MdClose style={{ ...calcStyling("edit_icon") }} className='edit_icon' />
                    </div>
                </div >
            case 'projects':
                return <div className="projects_edit" style={{ ...calcStyling("edit_root") }}>
                    <div className="header_title">
                        <input className='editInput' style={{ ...calcStyling('objective_title'), ...inWidth(editVal?.title) }} type="text" value={editVal?.title} onChange={(ev) => setEditVal({ ...editVal, title: ev.target.value })} />
                        <hr className="header_line" />
                    </div>
                    <div className="project_content" style={{ ...calcStyling("edit_content") }}>
                        {editVal?.content && editVal?.content.map((proj, index) => (
                            <div key={index} className="project_content_item" style={{ ...calcStyling("edit_content_item") }}>
                                <div className="project_titles" style={{ ...calcStyling("edit_titles") }}>
                                    <input className='project_name' style={{ ...calcStyling('project_name'), ...calcStyling('edit_input'), ...inWidth(proj.name) }} type="text" value={proj.name} onChange={(ev) => {
                                        let clone = [...editVal.content];
                                        let obj = clone[index];
                                        obj.name = ev.target.value;
                                        clone[index] = obj;
                                        setEditVal({ ...editVal, content: [...clone] })
                                    }} />
                                    <div className='project_links' style={{ ...calcStyling("edit_titles") }}>
                                        <input className='link' style={{ ...calcStyling('project_links'), ...calcStyling('edit_input'), ...inWidth(proj.project_link) }} type="text" value={proj.project_link} onChange={(ev) => {
                                            let clone = [...editVal.content];
                                            let obj = clone[index];
                                            obj.project_link = ev.target.value;
                                            clone[index] = obj;
                                            setEditVal({ ...editVal, content: [...clone] })
                                        }} />
                                        <input className='link' style={{ ...calcStyling('project_links'), ...calcStyling('edit_input'), ...inWidth(proj.github_link) }} type="text" value={proj.github_link} onChange={(ev) => {
                                            let clone = [...editVal.content];
                                            let obj = clone[index];
                                            obj.github_link = ev.target.value;
                                            clone[index] = obj;
                                            setEditVal({ ...editVal, content: [...clone] })
                                        }} />
                                    </div>
                                </div>
                                <textarea
                                    key={index}
                                    className='proj_header'
                                    style={{ ...calcStyling('proj_value'), ...calcStyling('edit_input') }}
                                    value={proj.header}
                                    onChange={(ev) => {
                                        let clone = [...editVal.content];
                                        let obj = clone[index];
                                        obj.header = ev.target.value;
                                        clone[index] = obj;
                                        setEditVal({ ...editVal, content: [...clone] })
                                    }}
                                />
                                <div className="project_description" style={{ ...calcStyling("edit_description") }}>
                                    {proj.description_list.map((itx, idx) => (
                                        <div className='proj_value_root' style={{ ...calcStyling("edit_value_root") }}>
                                            &#8226;
                                            <textarea
                                                key={index}
                                                className='proj_value'
                                                style={{ ...calcStyling('proj_value'), ...calcStyling('edit_input') }}
                                                value={itx}
                                                onChange={(ev) => {
                                                    let clone = [...editVal.content];
                                                    let obj = clone[index];
                                                    let list = obj.description_list;
                                                    list[idx] = ev.target.value;
                                                    obj.description_list = list;
                                                    clone[index] = obj;
                                                    setEditVal({ ...editVal, content: [...clone] })
                                                }}
                                            />
                                            <MdClose
                                                className='proj_value_close'
                                                onClick={() => {
                                                    let updated = editVal;
                                                    updated.content[index].description_list = updated.content[index].description_list.filter((x, i) => i !== idx);
                                                    setEditVal({ ...updated })
                                                }}
                                                style={{ ...calcStyling("edit_value_close") }}
                                            />
                                        </div>
                                    ))}
                                    <MdAdd
                                        className='proj_value_add'
                                        style={{ ...calcStyling("edit_value_add") }}
                                        onClick={() => {
                                            let updated = editVal;
                                            updated.content[index].description_list.push('Highlight your responsibilites, your contributions and your achievements in the position.');
                                            setEditVal({ ...updated })
                                        }}
                                    />
                                </div>
                                <MdClose
                                    onClick={() => {
                                        let updated = editVal;
                                        updated.content = updated.content.filter((x, i) => i !== index);
                                        setEditVal({ ...updated })
                                    }}
                                    style={{ ...calcStyling("edit_item_close") }}
                                    className='edit_item_close'
                                />
                            </div>
                        ))}
                        <MdAdd
                            className='projects_add'
                            style={{ ...calcStyling("edit_add") }}
                            onClick={() => {
                                setEditVal(prevVal => ({
                                    ...prevVal,
                                    content: [...prevVal.content,
                                    {
                                        name: "Project Name",
                                        project_link: "Project Link",
                                        github_link: "Github Link",
                                        description_type: "unordered_list",
                                        description_list: [
                                            "Highlight your responsibilites, your contributions and your achievements in the position."
                                        ],
                                    }
                                    ]
                                }))
                            }}
                        />
                    </div>
                    <div style={{ ...calcStyling("drag_icon") }} className='drag_icon'  {...provided.dragHandleProps}>
                        <RiDragMove2Line className='h-full w-full' />
                    </div>
                    <div className='edit_actions' style={{ ...calcStyling("edit_actions") }}>
                        <BiCheck onClick={() => { handleSubmit('list', field, editVal) }} style={{ ...calcStyling("edit_icon") }} className='edit_icon' />
                        <MdClose style={{ ...calcStyling("edit_icon") }} className='edit_icon' />
                    </div>
                </div>
            case 'education':
                return <div className="education_edit" style={{ ...calcStyling("edit_root") }}>
                    <div className="header_title">
                        <input className='editInput' style={{ ...calcStyling('objective_title'), ...inWidth(editVal?.title) }} type="text" value={editVal?.title} onChange={(ev) => setEditVal({ ...editVal, title: ev.target.value })} />
                        <hr className="header_line" />
                    </div>
                    <div className="education_content" style={{ ...calcStyling("edit_content") }}>
                        {editVal?.content && editVal?.content.map((edu, index) => (
                            <div key={index} className="education_content_item" style={{ ...calcStyling("edit_content_item") }}>
                                <div className="education_titles" style={{ ...calcStyling('edit_titles') }}>
                                    <div className="education_titles_left" style={{ ...calcStyling('edit_titles') }}>
                                        <input className='education_course' style={{ ...calcStyling('education_course'), ...calcStyling('edit_input'), ...inWidth(edu.course) }} type="text" value={edu.course} onChange={(ev) => {
                                            let clone = [...editVal.content];
                                            let obj = clone[index];
                                            obj.course = ev.target.value;
                                            clone[index] = obj;
                                            setEditVal({ ...editVal, content: [...clone] })
                                        }} />
                                        <input className='education_institute' style={{ ...calcStyling('education_institute'), ...calcStyling('edit_input'), ...inWidth(edu.institute) }} type="text" value={edu.institute} onChange={(ev) => {
                                            let clone = [...editVal.content];
                                            let obj = clone[index];
                                            obj.institute = ev.target.value;
                                            clone[index] = obj;
                                            setEditVal({ ...editVal, content: [...clone] })
                                        }} />
                                    </div>
                                    <div className="education_titles_right" style={{ ...calcStyling('edit_titles') }}>
                                        <input className='education_location' style={{ ...calcStyling('education_location'), ...calcStyling('edit_input'), ...inWidth(edu.location) }} type="text" value={edu.location} onChange={(ev) => {
                                            let clone = [...editVal.content];
                                            let obj = clone[index];
                                            obj.location = ev.target.value;
                                            clone[index] = obj;
                                            setEditVal({ ...editVal, content: [...clone] })
                                        }} />
                                        <div className='education_period' style={{ ...calcStyling("edit_period") }}>
                                            <input
                                                className='education_period_from'
                                                style={{ ...calcStyling('education_period'), ...calcStyling('edit_input'), ...inWidth(edu.period_from) }}
                                                type="text"
                                                value={edu.period_from}
                                                onChange={(ev) => {
                                                    let clone = [...editVal.content];
                                                    let obj = clone[index];
                                                    obj.period_from = ev.target.value;
                                                    clone[index] = obj;
                                                    setEditVal({ ...editVal, content: [...clone] })
                                                }}
                                            />
                                            <span style={{ ...calcStyling('experience_period') }}>-</span>
                                            <input className='education_period_to' style={{ ...calcStyling('education_period'), ...calcStyling('edit_input'), ...inWidth(edu.period_to) }} type="text" value={edu.period_to} onChange={(ev) => {
                                                let clone = [...editVal.content];
                                                let obj = clone[index];
                                                obj.period_to = ev.target.value;
                                                clone[index] = obj;
                                                setEditVal({ ...editVal, content: [...clone] })
                                            }}
                                            />
                                        </div>
                                    </div>
                                    <input
                                        className='education_grade'
                                        style={{ ...calcStyling('education_grade'), ...calcStyling('edit_input'), ...inWidth('Grade') }}
                                        type="text"
                                        value={edu.grade_value}
                                        onChange={(ev) => {
                                            let clone = [...editVal.content];
                                            let obj = clone[index];
                                            obj.grade_value = ev.target.value;
                                            if (obj.grade_value.includes("%")) {
                                                obj.grade_label = "Percentage"
                                            } else {
                                                obj.grade_label = "CGPA"
                                            }
                                            clone[index] = obj;
                                            setEditVal({ ...editVal, content: [...clone] })
                                        }} />
                                </div>
                                <MdClose
                                    onClick={() => {
                                        let updated = editVal;
                                        updated.content = updated.content.filter((x, i) => i !== index);
                                        setEditVal({ ...updated })
                                    }}
                                    style={{ ...calcStyling("edit_item_close") }}
                                    className='edit_item_close'
                                />
                            </div>
                        ))}
                        <MdAdd className='education_add' onClick={() => {
                            setEditVal(prevVal => ({
                                ...prevVal,
                                content: [...prevVal.content,
                                {
                                    course: "Your course / degree",
                                    institute: "Your institute / school",
                                    location: "Institute / School Location",
                                    period_from: "XXXX",
                                    period_to: "XXXX",
                                }
                                ]
                            }))
                        }} />
                    </div>
                    <div style={{ ...calcStyling("drag_icon") }} className='drag_icon'  {...provided.dragHandleProps}>
                        <RiDragMove2Line className='h-full w-full' />
                    </div>
                    <div className='edit_actions' style={{ ...calcStyling("edit_actions") }}>
                        <BiCheck onClick={() => { handleSubmit('list', field, editVal) }} style={{ ...calcStyling("edit_icon") }} className='edit_icon' />
                        <MdClose style={{ ...calcStyling("edit_icon") }} className='edit_icon' />
                    </div>
                </div>
            case 'achievements':
                return <div className="achievements_edit" style={{ ...calcStyling("edit_root") }}>
                    <div className="header_title">
                        <input className='editInput' style={{ ...calcStyling('objective_title'), ...inWidth(editVal?.title) }} type="text" value={editVal?.title} onChange={(ev) => setEditVal({ ...editVal, title: ev.target.value })} />
                        <hr className="header_line" />
                    </div>
                    <div className="achievements_content" style={{ ...calcStyling("proj_content"), ...calcStyling("objective_content_view") }}>
                        {editVal?.content_data && editVal?.content_data.map((ach, index) => (
                            <div key={index} className="achievements_content_item">
                                <input className='achievements_item' style={{ ...calcStyling('achievements_item'), ...calcStyling('edit_input'), ...inWidth(ach.title) }} type="text" value={ach.title} onChange={(ev) => {
                                    let list = [...editVal.content_data];
                                    list[index].title = ev.target.value;
                                    setEditVal({ ...editVal, content_data: [...list] })
                                }} />
                                <input className='achievements_period' style={{ ...calcStyling('achievements_period'), ...calcStyling('edit_input'), ...inWidth(ach.period) }} type="text" value={ach.period} onChange={(ev) => {
                                    let list = [...editVal.content_data];
                                    list[index].period = ev.target.value;
                                    setEditVal({ ...editVal, content_data: [...list] })
                                }} />
                                <MdClose
                                    onClick={() => {
                                        let updated = editVal;
                                        updated.content_data = updated.content_data.filter((x, i) => i !== index);
                                        setEditVal({ ...updated })
                                    }}
                                    style={{ ...calcStyling("edit_item_close") }}
                                    className='edit_item_close'
                                />
                            </div>
                        ))}
                        <MdAdd className='achievements_add' onClick={() => {
                            setEditVal(prevVal => ({
                                ...prevVal,
                                content_data: [...prevVal.content_data, 'achievement_3']
                            }))
                        }} />
                    </div>
                    <div style={{ ...calcStyling("drag_icon") }} className='drag_icon'  {...provided.dragHandleProps}>
                        <RiDragMove2Line className='h-full w-full' />
                    </div>
                    <div className='edit_actions' style={{ ...calcStyling("edit_actions") }}>
                        <BiCheck onClick={() => { handleSubmit('list', field, editVal) }} style={{ ...calcStyling("edit_icon") }} className='edit_icon' />
                        <MdClose style={{ ...calcStyling("edit_icon") }} className='edit_icon' />
                    </div>
                </div>
        }
    }

    return (
        <div className={field + " relative"}>
            {!editOn ? normalView() : editView()}
        </div>
    )
}

export default EditableObjective;