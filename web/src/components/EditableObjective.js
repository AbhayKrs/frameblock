import { useEffect, useState } from 'react';
// import '../styles/Editor.css';

import { BiCheck } from 'react-icons/bi';
import { MdAdd, MdClose } from 'react-icons/md';
import { RiDragMove2Line } from 'react-icons/ri';

const EditableObjective = (props) => {
    const { tmpID, provided, editorWidth, field, editOn, val, handleSubmit } = props;
    const [editVal, setEditVal] = useState(val);

    useEffect(() => {
        setEditVal(val);
    }, [val])

    const inWidth = (value) => {
        const fntSize = editorWidth * 0.022;
        const inpWidth = fntSize / 2 * (value.length + 1.5);
        console.log("width", inpWidth)
        return { width: inpWidth + 'px' }
    }

    const normalView = () => {
        switch (field) {
            case 'skills':
                return <div className="skills_view">
                    <div className="header_title">
                        <h2>{editVal?.title}</h2>
                        <hr className="header_line" />
                    </div>
                    <div className="skills_content">
                        {editVal?.content_data?.map((skill, index) => (
                            <div key={index} className="skills_content_item">
                                <p className="skills_labels">{skill.label}</p>
                                <p className="skills_values">{skill.content_values.join(', ')}</p>
                            </div>
                        ))}
                    </div>
                </div>
            case 'experience':
                return <div className="experience_view">
                    <div className="header_title">
                        <h2>{editVal?.title}</h2>
                        <hr className="header_line" />
                    </div>
                    <div className="experience_content">
                        {editVal?.content?.map((exp, index) => (
                            <div key={index} className="experience_content_item">
                                <div className="experience_titles" >
                                    <div className="experience_titles_left">
                                        <p className="experience_role">{exp.role}</p>
                                        <p className="experience_company">{exp.company}</p>
                                    </div>
                                    <div className="experience_titles_right">
                                        <p className="experience_location">{exp.location}</p>
                                        <p className="experience_period">{exp.period_from} - {exp.period_to}</p>
                                    </div>
                                </div>
                                <ul className="experience_description">
                                    {exp.description_list.map((itx, index) => (
                                        <li key={index} className='mb-1 last:mb-0'>{itx}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            case 'projects':
                return <div className="projects_view">
                    <div className="header_title">
                        <h2>{editVal?.title}</h2>
                        <hr className="header_line" />
                    </div>
                    <div className="project_content">
                        {editVal?.content?.map((proj, index) => (
                            <div key={index} className="project_content_item" >
                                <div className="project_titles" >
                                    <p className="project_name">{proj.name}</p>
                                    {tmpID === "64e0a6766acb0ae15dfbdfe1" && <span>&#x2022;</span>}
                                    <p className="project_links">{proj.project_link} | {proj.github_link}</p>
                                </div>
                                {proj.header && <p className='project_header'>{proj.header}</p>}
                                <ul className="project_description">
                                    {proj.description_list.map((itx, index) => (
                                        <li key={index} className='mb-1 last:mb-0'>{itx}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            case 'education':
                return <div className="education_view">
                    <div className="header_title">
                        <h2>{editVal?.title}</h2>
                        <hr className="header_line" />
                    </div>
                    <div className="education_content">
                        {editVal?.content?.map((edu, index) => (
                            <div key={index} className="education_content_item">
                                <div className="education_titles">
                                    <div className="education_titles_left">
                                        <p className="education_course">{edu.course}</p>
                                        <p className="education_institute">{edu.institute}</p>
                                    </div>
                                    <div className="education_titles_right">
                                        <p className="education_location">{edu.location}</p>
                                        <p className="education_period">{edu.period_from} - {edu.period_to}</p>
                                    </div>
                                </div>
                                {
                                    (edu.grade_label || edu.grade_value) && <div className='eduction_description'>
                                        <p className="education_grade">{edu.grade_label}: {edu.grade_value}</p>
                                    </div>
                                }
                            </div>
                        ))}
                    </div>
                </div>
            case 'achievements':
                return <div className="achievements_view">
                    <div className="header_title">
                        <h2>{editVal?.title}</h2>
                        <hr className="header_line" />
                    </div>
                    <div className="achievements_content">
                        {editVal?.content_data?.map((ach, index) => (
                            <div key={index} className="achievements_content_item" >
                                <p className="achievements_item">{ach.title}</p>
                                <p className="achievements_period">{ach.period}</p>
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
                    <div className={`header_title ${editOn && 'edit_active'}`}>
                        <input className='editInput' style={{ ...inWidth(editVal?.title) }} type="text" value={editVal?.title} onChange={(ev) => setEditVal({ ...editVal, title: ev.target.value })} />
                        <hr className="header_line" />
                    </div>
                    <div className="skills_content">
                        {editVal?.content_data && editVal?.content_data.map((skill, index) => (
                            <div key={index} className="skills_content_item" >
                                <div className='skills_value_cell' >
                                    <input type="text" className='skills_label_value' style={{ ...inWidth(skill.label) }} value={skill.label} onChange={(ev) => {
                                        let clone = [...editVal.content_data];
                                        let obj = clone[index];
                                        obj.label = ev.target.value;
                                        clone[index] = obj;
                                        setEditVal({ ...editVal, content_data: [...clone] })
                                    }} />
                                </div>
                                <div className='skills_content_cell'>
                                    <div className='skills_content_values' >
                                        {skill.content_values.map((itx, idx) => (
                                            <div className='flex relative'>
                                                <input className='skills_value' style={{ ...inWidth(itx) }} type="text" value={itx} onChange={(ev) => {
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
                                                    className='edit_value_close'
                                                />
                                            </div>
                                        ))}
                                        <MdAdd
                                            className='skills_value_add'
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
                                    className='edit_item_close'
                                />
                            </div>
                        ))}
                        <MdAdd
                            className='skills_add'
                            onClick={() => {
                                setEditVal(prevVal => ({
                                    ...prevVal,
                                    content_data: [...prevVal.content_data, { label: 'Skill Label 3', content_values: ['skill test 1', 'skill test 2'] }]
                                }))
                            }}
                        />
                    </div>
                    <div className='drag_icon'  {...provided.dragHandleProps}>
                        <RiDragMove2Line className='h-full w-full' />
                    </div>
                </div>
            case 'experience':
                return <div className="experience_edit">
                    <div className={`header_title ${editOn && 'edit_active'}`}>
                        <input className='editInput' style={{ ...inWidth(editVal?.title) }} type="text" value={editVal?.title} onChange={(ev) => setEditVal({ ...editVal, title: ev.target.value })} />
                        <hr className="header_line" />
                    </div>
                    <div className="experience_content">
                        {editVal?.content && editVal?.content.map((exp, index) => (
                            <div key={index} className="experience_content_item">
                                <div className="experience_titles">
                                    <div className="experience_titles_left">
                                        <input className='experience_role' style={{ ...inWidth(exp.role) }} type="text" value={exp.role} onChange={(ev) => {
                                            let clone = [...editVal.content];
                                            let obj = clone[index];
                                            obj.role = ev.target.value;
                                            clone[index] = obj;
                                            setEditVal({ ...editVal, content: [...clone] })
                                        }} />
                                        <input className='experience_company' style={{ ...inWidth(exp.company) }} type="text" value={exp.company} onChange={(ev) => {
                                            let clone = [...editVal.content];
                                            let obj = clone[index];
                                            obj.company = ev.target.value;
                                            clone[index] = obj;
                                            setEditVal({ ...editVal, content: [...clone] })
                                        }} />
                                    </div>
                                    <div className="experience_titles_right">
                                        <input className='experience_location' style={{ ...inWidth(exp.location) }} type="text" value={exp.location} onChange={(ev) => {
                                            let clone = [...editVal.content];
                                            let obj = clone[index];
                                            obj.location = ev.target.value;
                                            clone[index] = obj;
                                            setEditVal({ ...editVal, content: [...clone] })
                                        }} />
                                        <div className='experience_period'>
                                            <input className='experience_period_from' style={{ ...inWidth(exp.period_from) }} type="text" value={exp.period_from} onChange={(ev) => {
                                                let clone = [...editVal.content];
                                                let obj = clone[index];
                                                obj.period_from = ev.target.value;
                                                clone[index] = obj;
                                                setEditVal({ ...editVal, content: [...clone] })
                                            }} />
                                            <span>-</span>
                                            <input className='experience_period_to' style={{ ...inWidth(exp.period_to) }} type="text" value={exp.period_to} onChange={(ev) => {
                                                let clone = [...editVal.content];
                                                let obj = clone[index];
                                                obj.period_to = ev.target.value;
                                                clone[index] = obj;
                                                setEditVal({ ...editVal, content: [...clone] })
                                            }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="experience_description">
                                    {exp.description_list.map((itx, idx) => (
                                        <div className='exp_value_root'>
                                            &#8226;
                                            <textarea
                                                key={index}
                                                className='exp_value'
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
                                            />
                                        </div>
                                    ))}
                                    <MdAdd
                                        className='exp_value_add'
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
                                    className='edit_item_close'
                                />
                            </div>
                        ))}
                        <MdAdd
                            className='experience_add'
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
                    <div className='drag_icon'  {...provided.dragHandleProps}>
                        <RiDragMove2Line className='h-full w-full' />
                    </div>
                </div >
            case 'projects':
                return <div className="projects_edit" >
                    <div className={`header_title ${editOn && 'edit_active'}`}>
                        <input className='editInput' style={{ ...inWidth(editVal?.title) }} type="text" value={editVal?.title} onChange={(ev) => setEditVal({ ...editVal, title: ev.target.value })} />
                        <hr className="header_line" />
                    </div>
                    <div className="project_content">
                        {editVal?.content && editVal?.content.map((proj, index) => (
                            <div key={index} className="project_content_item">
                                <div className="project_titles">
                                    <input className='project_name' style={{ ...inWidth(proj.name) }} type="text" value={proj.name} onChange={(ev) => {
                                        let clone = [...editVal.content];
                                        let obj = clone[index];
                                        obj.name = ev.target.value;
                                        clone[index] = obj;
                                        setEditVal({ ...editVal, content: [...clone] })
                                    }} />
                                    <div className='project_links'>
                                        <input className='link' style={{ ...inWidth(proj.project_link) }} type="text" value={proj.project_link} onChange={(ev) => {
                                            let clone = [...editVal.content];
                                            let obj = clone[index];
                                            obj.project_link = ev.target.value;
                                            clone[index] = obj;
                                            setEditVal({ ...editVal, content: [...clone] })
                                        }} />
                                        <input className='link' style={{ ...inWidth(proj.github_link) }} type="text" value={proj.github_link} onChange={(ev) => {
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
                                    value={proj.header}
                                    onChange={(ev) => {
                                        let clone = [...editVal.content];
                                        let obj = clone[index];
                                        obj.header = ev.target.value;
                                        clone[index] = obj;
                                        setEditVal({ ...editVal, content: [...clone] })
                                    }}
                                />
                                <div className="project_description" >
                                    {proj.description_list.map((itx, idx) => (
                                        <div className='proj_value_root'>
                                            &#8226;
                                            <textarea
                                                key={index}
                                                className='proj_value'
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
                                            />
                                        </div>
                                    ))}
                                    <MdAdd
                                        className='proj_value_add'
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
                                    className='edit_item_close'
                                />
                            </div>
                        ))}
                        <MdAdd
                            className='projects_add'
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
                    <div className='drag_icon'  {...provided.dragHandleProps}>
                        <RiDragMove2Line className='h-full w-full' />
                    </div>
                </div>
            case 'education':
                return <div className="education_edit">
                    <div className={`header_title ${editOn && 'edit_active'}`}>
                        <input className='editInput' style={{ ...inWidth(editVal?.title) }} type="text" value={editVal?.title} onChange={(ev) => setEditVal({ ...editVal, title: ev.target.value })} />
                        <hr className="header_line" />
                    </div>
                    <div className="education_content">
                        {editVal?.content && editVal?.content.map((edu, index) => (
                            <div key={index} className="education_content_item">
                                <div className="education_titles">
                                    <div className="education_titles_left">
                                        <input className='education_course' style={{ ...inWidth(edu.course) }} type="text" value={edu.course} onChange={(ev) => {
                                            let clone = [...editVal.content];
                                            let obj = clone[index];
                                            obj.course = ev.target.value;
                                            clone[index] = obj;
                                            setEditVal({ ...editVal, content: [...clone] })
                                        }} />
                                        <input className='education_institute' style={{ ...inWidth(edu.institute) }} type="text" value={edu.institute} onChange={(ev) => {
                                            let clone = [...editVal.content];
                                            let obj = clone[index];
                                            obj.institute = ev.target.value;
                                            clone[index] = obj;
                                            setEditVal({ ...editVal, content: [...clone] })
                                        }} />
                                    </div>
                                    <div className="education_titles_right">
                                        <input className='education_location' style={{ ...inWidth(edu.location) }} type="text" value={edu.location} onChange={(ev) => {
                                            let clone = [...editVal.content];
                                            let obj = clone[index];
                                            obj.location = ev.target.value;
                                            clone[index] = obj;
                                            setEditVal({ ...editVal, content: [...clone] })
                                        }} />
                                        <div className='education_period'>
                                            <input
                                                className='education_period_from'
                                                style={{ ...inWidth(edu.period_from) }}
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
                                            <span>-</span>
                                            <input className='education_period_to' style={{ ...inWidth(edu.period_to) }} type="text" value={edu.period_to} onChange={(ev) => {
                                                let clone = [...editVal.content];
                                                let obj = clone[index];
                                                obj.period_to = ev.target.value;
                                                clone[index] = obj;
                                                setEditVal({ ...editVal, content: [...clone] })
                                            }}
                                            />
                                        </div>
                                    </div>
                                    {/* <input
                                        className='education_grade'
                                        style={{ ...inWidth('Grade') }}
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
                                        }} /> */}
                                </div>
                                <MdClose
                                    onClick={() => {
                                        let updated = editVal;
                                        updated.content = updated.content.filter((x, i) => i !== index);
                                        setEditVal({ ...updated })
                                    }}
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
                    <div className='drag_icon'  {...provided.dragHandleProps}>
                        <RiDragMove2Line className='h-full w-full' />
                    </div>
                </div>
            case 'achievements':
                return <div className="achievements_edit">
                    <div className={`header_title ${editOn && 'edit_active'}`}>
                        <input className='editInput' style={{ ...inWidth(editVal?.title) }} type="text" value={editVal?.title} onChange={(ev) => setEditVal({ ...editVal, title: ev.target.value })} />
                        <hr className="header_line" />
                    </div>
                    <div className="achievements_content">
                        {editVal?.content_data && editVal?.content_data.map((ach, index) => (
                            <div key={index} className="achievements_content_item">
                                <input className='achievements_item' style={{ ...inWidth(ach.title) }} type="text" value={ach.title} onChange={(ev) => {
                                    let list = [...editVal.content_data];
                                    list[index].title = ev.target.value;
                                    setEditVal({ ...editVal, content_data: [...list] })
                                }} />
                                <input className='achievements_period' style={{ ...inWidth(ach.period) }} type="text" value={ach.period} onChange={(ev) => {
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
                    <div className='drag_icon'  {...provided.dragHandleProps}>
                        <RiDragMove2Line className='h-full w-full' />
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