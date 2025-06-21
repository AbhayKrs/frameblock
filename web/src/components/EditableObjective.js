import { useEffect, useState } from 'react';
// import '../styles/Editor.css';

import { BiCheck } from 'react-icons/bi';
import { FiPlusSquare, FiMinusSquare } from "react-icons/fi";
import { RiDragMove2Line, RiGraduationCapFill } from 'react-icons/ri';
import { IoBriefcase } from "react-icons/io5";
import { FaList, FaStar, FaShare } from "react-icons/fa6";
import { PiGraphBold } from "react-icons/pi";

const EditableObjective = (props) => {
    const { tmpID, provided, editorWidth, field, editOn, val, hndlChange } = props;

    const headerTitleIcons = (field) => {
        switch (field) {
            case 'skills': return <FaList className="ht_icon" />
            case 'experience': return <IoBriefcase className="ht_icon" />
            case 'projects': return <PiGraphBold className="ht_icon" />
            case 'education': return <RiGraduationCapFill className="ht_icon" />
            case 'achievements': return <FaStar className="ht_icon" />
            case 'references': return <FaShare className="ht_icon" />
        }
    }

    const getTextWidth = (text, inputElement) => {
        const computedStyle = inputElement ? window.getComputedStyle(inputElement) : null;
        const font = `${computedStyle?.fontStyle} ${computedStyle?.fontVariant} ${computedStyle?.fontWeight} ${computedStyle?.fontSize} ${computedStyle?.fontFamily}`;

        // Setup canvas
        const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
        const context = canvas.getContext("2d");
        context.font = font;

        // Handle text-transform
        const transform = computedStyle?.textTransform;
        if (transform === 'uppercase') {
            text = text.toUpperCase();
        } else if (transform === 'lowercase') {
            text = text.toLowerCase();
        } else {
            text = text.replace(/\b\w/g, char => char.toUpperCase()) + " ";
        }

        // Get letter-spacing
        let letterSpacing = 0;
        const spacingStr = computedStyle?.letterSpacing;
        if (spacingStr && spacingStr !== 'normal') {
            letterSpacing = parseFloat(spacingStr); // px
        }

        let totalWidth = 0;
        for (let i = 0; i < text.length; i++) {
            totalWidth += context.measureText(text[i]).width;
            if (i < text.length - 1) totalWidth += letterSpacing;
        }

        const padding = 10;
        return totalWidth + padding;
    }

    const calcInWidth = (fld, val) => {
        const inputElement = document.querySelector(`input.${fld}`);
        const inpWidth = getTextWidth(val, inputElement);
        return { width: inpWidth + 'px' }
    }

    const calcTxtHeight = (fld, val) => {
        const inputElement = document.querySelector(`textarea.${fld}`);
        const computedStyle = inputElement ? window.getComputedStyle(inputElement) : null;

        let fontSize = computedStyle ? parseFloat(computedStyle.fontSize) : editorWidth * 0.018; // fallback
        let lineHeight = computedStyle ? parseFloat(computedStyle.lineHeight) : fontSize * 1.2;  // fallback

        const text = val;
        const lines = text.split('\n').length;

        const charsPerLine = inputElement ? Math.floor(inputElement.clientWidth / (fontSize * 0.58)) : 40;
        const wrappedLines = text.length > 0 ? Math.ceil(text.length / charsPerLine) : 1;

        const totalLines = Math.max(lines, wrappedLines);
        const padding = 10; // Extra buffer if needed

        const inpHeight = (totalLines * lineHeight) + padding;
        return { height: inpHeight + 'px' };
    }


    const draft_text_rendering = (text) => {
        const regex = /\<\<(.+?)\>\>/g;  // match content wrapped in <strong> tags
        const parts = [];
        let lastIndex = 0;

        text.replace(regex, (match, p1, offset) => {
            // Push text before the <strong> tag
            if (offset > lastIndex) {
                parts.push(text.substring(lastIndex, offset));
            }
            // Push <strong> component
            parts.push(<strong key={offset}>{p1}</strong>);
            lastIndex = offset + match.length;
        });

        // Push any remaining text after the last <strong> tag
        if (lastIndex < text.length) {
            parts.push(text.substring(lastIndex));
        }

        return parts;
    }

    const normalView = () => {
        switch (field) {
            case 'skills':
                return <div className="skills_view">
                    <div className="header_title">
                        {val?.isIconVisible && <div className='header_title_icon'>{headerTitleIcons(field)}</div>}
                        <h2>{val?.title}</h2>
                        <hr className="header_line" />
                    </div>
                    <div className="skills_content">
                        {val?.content_data?.map((skill, index) => (
                            <div key={index} className="skills_content_item">
                                <p className="skills_labels">{skill.label}</p>
                                <p className="skills_values">{skill.data_list.join(', ')}</p>
                            </div>
                        ))}
                    </div>
                </div>
            case 'experience':
                return <div className="experience_view">
                    <div className="header_title">
                        {val?.isIconVisible && <div className='header_title_icon'>{headerTitleIcons(field)}</div>}
                        <h2>{val?.title}</h2>
                        <hr className="header_line" />
                    </div>
                    <div className="experience_content">
                        {val?.content?.map((exp, index) => (
                            <div key={index} className="experience_content_item">
                                <div className="experience_titles" >
                                    <div className="experience_titles_left">
                                        <p className="experience_role">{exp.role}</p>
                                        <p className="experience_company">{exp.company}</p>
                                    </div>
                                    <div className="experience_titles_right">
                                        {exp.location.isVisible && <p className="experience_location">{exp.location.value}</p>}
                                        {exp.period.isVisible && <p className="experience_period">{exp.period.from} - {exp.period.to}</p>}
                                    </div>
                                </div>
                                <div className="experience_description">
                                    {exp.primary_desc.length > 0 && <p className='experience_primary_desc'>{draft_text_rendering(exp.primary_desc)}</p>}
                                    {exp.sec_desc_list.length > 0 && <ul className='experience_sec_desc'>
                                        {exp.sec_desc_list.map((itx, index) => (
                                            <li key={index} className='mb-1 last:mb-0'>{draft_text_rendering(itx)}</li>
                                        ))}
                                    </ul>}
                                    {exp.extra_desc_list.length > 0 && <div className='experience_extra_desc'>
                                        {exp.extra_desc_list.map((itx, index) => (
                                            <p key={index} className='experience_extra_values'>{draft_text_rendering(itx)}</p>
                                        ))}
                                    </div>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            case 'projects':
                return <div className="projects_view">
                    <div className="header_title">
                        {val?.isIconVisible && <div className='header_title_icon'>{headerTitleIcons(field)}</div>}
                        <h2>{val?.title}</h2>
                        <hr className="header_line" />
                    </div>
                    <div className="project_content">
                        {val?.content?.map((proj, index) => (
                            <div key={index} className="project_content_item" >
                                <div className="project_titles" >
                                    <p className="project_name">{proj.name}</p>
                                    <p className="project_links">
                                        <a target="_blank" href={proj.project_link}>PROJECT LINK</a> | <a target="_blank" href={proj.github_link}>GITHUB LINK</a>
                                    </p>
                                </div>
                                {proj.header && <p className='project_header'>{proj.header}</p>}
                                <ul className="project_description">
                                    {proj.primary_desc.length > 0 && <p className='project_primary_desc'>{proj.primary_desc}</p>}
                                    {proj.sec_desc_list.length > 0 && <ul className='project_sec_desc'>
                                        {proj.sec_desc_list.map((itx, index) => (
                                            <li key={index} className='mb-1 last:mb-0'>{itx}</li>
                                        ))}
                                    </ul>}
                                    {proj.extra_desc_list.length > 0 && <div className='project_extra_desc'>
                                        {proj.extra_desc_list.map((itx, index) => (
                                            <p key={index} className='project_extra_values'>{itx}</p>
                                        ))}
                                    </div>}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            case 'education':
                return <div className="education_view">
                    <div className="header_title">
                        {val?.isIconVisible && <div className='header_title_icon'>{headerTitleIcons(field)}</div>}
                        <h2>{val?.title}</h2>
                        <hr className="header_line" />
                    </div>
                    <div className="education_content">
                        {val?.content?.map((edu, index) => (
                            <div key={index} className="education_content_item">
                                <div className="education_titles">
                                    <div className="education_titles_left">
                                        <p className="education_course">{edu.course}</p>
                                        <p className="education_institute">{edu.institute}</p>
                                    </div>
                                    <div className="education_titles_right">
                                        {edu.location.isVisible && <p className="education_location">{edu.location.value}</p>}
                                        {edu.period.isVisible && <p className="education_period">{edu.period.from} - {edu.period.to}</p>}
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
                        {val?.isIconVisible && <div className='header_title_icon'>{headerTitleIcons(field)}</div>}
                        <h2>{val?.title}</h2>
                        <hr className="header_line" />
                    </div>
                    <div className="achievements_content">
                        {val?.content_data?.map((ach, index) => (
                            <p key={index} className="achievements_content_item" >
                                {ach}
                            </p>
                        ))}
                    </div>
                </div>
            case 'references':
                return <div className="references_view">
                    <div className="header_title">
                        {val?.isIconVisible && <div className='header_title_icon'>{headerTitleIcons(field)}</div>}
                        <h2>{val?.title}</h2>
                        <hr className="header_line" />
                    </div>
                    <div className="references_content">
                        {val?.content_data?.map((refr, index) => (
                            <div key={index} className="references_content_item" >
                                <p className="references_item">{refr}</p>
                            </div>
                        ))}
                    </div>
                </div>
        }
    }

    const editView = () => {
        switch (field) {
            case 'skills':
                return <div className="skills_view">
                    <div className="header">
                        <input className='header_title' style={{ ...calcInWidth("header_title", val?.title) }} type="text" value={val?.title} onChange={(ev) => hndlChange('list', field, { ...val, title: ev.target.value })} />
                    </div>
                    <div className="skills_content">
                        {val?.content_data && val?.content_data.map((skill, index) => (
                            <div key={index} className="skills_content_item" >
                                <div className='skills_labels'>
                                    <input
                                        type="text"
                                        className={`skills_label_value_${index}`}
                                        style={{ ...calcInWidth("skills_label_value_" + index, skill.label) }}
                                        value={skill.label} onChange={(ev) => {
                                            let clone = [...val.content_data];
                                            let obj = clone[index];
                                            obj.label = ev.target.value;
                                            clone[index] = obj;
                                            hndlChange('list', field, { ...val, content_data: [...clone] })
                                        }} />
                                </div>
                                <div className='skills_content_cell'>
                                    {skill.data_list.map((itx, idx) => (
                                        <div className='skills_content_values'>
                                            <input
                                                className={`skills_value_${index}_${idx}`}
                                                type="text"
                                                value={itx}
                                                style={{ ...calcInWidth("skills_value_" + index + "_" + idx, itx) }}
                                                onChange={(ev) => {
                                                    let clone = [...val.content_data];
                                                    let obj = clone[index];
                                                    let list = obj.data_list;
                                                    list[idx] = ev.target.value;
                                                    obj.data_list = list;
                                                    clone[index] = obj;
                                                    hndlChange('list', field, { ...val, content_data: [...clone] })
                                                }} />
                                            <FiMinusSquare
                                                onClick={() => {
                                                    let updated = val;
                                                    updated.content_data[index].data_list = updated.content_data[index].data_list.filter((x, i) => i !== idx);
                                                    hndlChange('list', field, { ...updated })
                                                }}
                                                className='edit_value_close'
                                            />
                                        </div>
                                    ))}
                                    <FiPlusSquare
                                        className='skills_value_add'
                                        onClick={() => {
                                            let updated = val;
                                            const newVal = updated.content_data[index].data_list.length + 1;
                                            updated.content_data[index].data_list.push(`Skill ${newVal}`);
                                            hndlChange('list', field, { ...updated })
                                        }}
                                    />
                                </div>
                                <FiMinusSquare
                                    onClick={() => {
                                        let updated = val;
                                        updated.content_data = updated.content_data.filter((x, i) => i !== index);
                                        hndlChange('list', field, { ...updated })
                                    }}
                                    className='edit_item_close'
                                />
                            </div>
                        ))}
                        <FiPlusSquare
                            className='skills_add'
                            onClick={() => {
                                hndlChange('list', field, { ...val, content_data: [...val.content_data, { label: 'Skill Label 3', data_type: "plain_list", data_list: ['skill test 1', 'skill test 2'] }] })
                            }}
                        />
                    </div>
                    <div className='drag_icon'  {...provided.dragHandleProps}>
                        <RiDragMove2Line className='h-full w-full' />
                    </div>
                </div>
            case 'experience':
                return <div className="experience_view">
                    <div className="header">
                        <input className='header_title' style={{ ...calcInWidth("header_title", val?.title) }} type="text" value={val?.title} onChange={(ev) => hndlChange('list', field, { ...val, title: ev.target.value })} />
                    </div>
                    <div className="experience_content">
                        {val?.content && val?.content.map((exp, index) => (
                            <div key={index} className="experience_content_item">
                                <div className="experience_titles">
                                    <div className="experience_titles_left">
                                        <input className='experience_role' style={{ ...calcInWidth("experience_role", exp.role) }} type="text" value={exp.role} onChange={(ev) => {
                                            let clone = [...val.content];
                                            let obj = clone[index];
                                            obj.role = ev.target.value;
                                            clone[index] = obj;
                                            hndlChange('list', field, { ...val, content_data: [...clone] })
                                        }} />
                                        <input className='experience_company' style={{ ...calcInWidth("experience_company", exp.company) }} type="text" value={exp.company} onChange={(ev) => {
                                            let clone = [...val.content];
                                            let obj = clone[index];
                                            obj.company = ev.target.value;
                                            clone[index] = obj;
                                            hndlChange('list', field, { ...val, content_data: [...clone] })
                                        }} />
                                    </div>
                                    <div className="experience_titles_right">
                                        <input className='experience_location' style={{ ...calcInWidth("experience_location", exp.location.value) }} type="text" value={exp.location.value} onChange={(ev) => {
                                            let clone = [...val.content];
                                            let obj = clone[index];
                                            obj.location.value = ev.target.value;
                                            clone[index] = obj;
                                            hndlChange('list', field, { ...val, content_data: [...clone] })
                                        }} />
                                        <div className='experience_period'>
                                            <input className='experience_period_from' style={{ ...calcInWidth("experience_period_from", exp.period.from) }} type="text" value={exp.period.from} onChange={(ev) => {
                                                let clone = [...val.content];
                                                let obj = clone[index];
                                                obj.period.from = ev.target.value;
                                                clone[index] = obj;
                                                hndlChange('list', field, { ...val, content_data: [...clone] })
                                            }} />
                                            <span> - </span>
                                            <input className='experience_period_to' style={{ ...calcInWidth("experience_period_to", exp.period.to) }} type="text" value={exp.period.to} onChange={(ev) => {
                                                let clone = [...val.content];
                                                let obj = clone[index];
                                                obj.period.to = ev.target.value;
                                                clone[index] = obj;
                                                hndlChange('list', field, { ...val, content_data: [...clone] })
                                            }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="experience_description">
                                    <textarea
                                        key={index}
                                        className='experience_primary_desc'
                                        value={exp.primary_desc}
                                        style={{ ...calcTxtHeight("experience_primary_desc", exp.primary_desc) }}
                                        onChange={(ev) => {
                                            let clone = [...val.content];
                                            let obj = clone[index];
                                            obj.primary_desc = ev.target.value;
                                            clone[index] = obj;
                                            hndlChange('list', field, { ...val, content_data: [...clone] })
                                        }}
                                    />
                                    <div className="experience_sec_desc">
                                        {exp.sec_desc_list.map((itx, idx) => (
                                            <div className='exp_value_root'>
                                                &#8226;
                                                <textarea
                                                    key={idx}
                                                    className={`exp_value_${index}_${idx}`}
                                                    value={itx}
                                                    style={{ ...calcTxtHeight(`exp_value_${index}_${idx}`, itx) }}
                                                    onChange={(ev) => {
                                                        let clone = [...val.content];
                                                        let obj = clone[index];
                                                        let list = obj.sec_desc_list;
                                                        list[idx] = ev.target.value;
                                                        obj.sec_desc_list = list;
                                                        clone[index] = obj;
                                                        hndlChange('list', field, { ...val, content_data: [...clone] })
                                                    }}
                                                />
                                                <FiMinusSquare
                                                    className='exp_value_close'
                                                    onClick={() => {
                                                        let updated = val;
                                                        updated.content[index].sec_desc_list = updated.content[index].sec_desc_list.filter((x, i) => i !== idx);
                                                        hndlChange('list', field, { ...updated })
                                                    }}
                                                />
                                            </div>
                                        ))}
                                        <FiPlusSquare
                                            className='exp_value_add'
                                            onClick={() => {
                                                let updated = val;
                                                updated.content[index].sec_desc_list.push('Highlight your responsibilites, your contributions and your achievements in the position.');
                                                hndlChange('list', field, { ...updated })
                                            }}
                                        />
                                    </div>
                                    <div className="experience_extra_desc">
                                        {exp.extra_desc_list.map((itx, idx) => (
                                            <div className='exp_value_root'>
                                                <input
                                                    type="text"
                                                    key={index}
                                                    className='exp_value'
                                                    value={itx}
                                                    style={{ ...calcInWidth("exp_value", itx) }}
                                                    onChange={(ev) => {
                                                        let clone = [...val.content];
                                                        let obj = clone[index];
                                                        let list = obj.extra_desc_list;
                                                        list[idx] = ev.target.value;
                                                        obj.extra_desc_list = list;
                                                        clone[index] = obj;
                                                        hndlChange('list', field, { ...val, content_data: [...clone] })
                                                    }} />
                                                <FiMinusSquare
                                                    className='exp_value_close'
                                                    onClick={() => {
                                                        let updated = val;
                                                        updated.content[index].extra_desc_list = updated.content[index].extra_desc_list.filter((x, i) => i !== idx);
                                                        hndlChange('list', field, { ...updated })
                                                    }}
                                                />
                                            </div>
                                        ))}
                                        <FiPlusSquare
                                            className='exp_value_add'
                                            onClick={() => {
                                                let updated = val;
                                                updated.content[index].extra_desc_list.push('test1');
                                                hndlChange('list', field, { ...updated })
                                            }}
                                        />
                                    </div>
                                </div>
                                <FiMinusSquare
                                    onClick={() => {
                                        let updated = val;
                                        updated.content = updated.content.filter((x, i) => i !== index);
                                        hndlChange('list', field, { ...updated })
                                    }}
                                    className='edit_item_close'
                                />
                            </div>
                        ))}
                    </div>
                    <FiPlusSquare
                        className='experience_add'
                        onClick={() => {
                            hndlChange('list', field, {
                                ...val,
                                content: [
                                    ...val.content,
                                    {
                                        role: "Your Job Title",
                                        company: "Your Company / Agency",
                                        location: {
                                            isVisible: true,
                                            value: "Job Location"
                                        },
                                        period: {
                                            isVisible: true,
                                            from: "XXXX",
                                            to: "XXXX"
                                        },
                                        primary_desc: "",
                                        sec_desc_type: "unordered_list",
                                        sec_desc_list: [
                                            "Highlight your responsibilites, your contributions and your achievements in the position."
                                        ],
                                        extra_desc_type: "plain_list",
                                        extra_desc_list: [""]
                                    }
                                ]
                            })
                        }}
                    />
                    <div className='drag_icon'  {...provided.dragHandleProps}>
                        <RiDragMove2Line className='h-full w-full' />
                    </div>
                </div >
            case 'projects':
                return <div className="projects_view" >
                    <div className="header">
                        <input className='header_title' style={{ ...calcInWidth("header_title", val?.title) }} type="text" value={val?.title} onChange={(ev) => hndlChange('list', field, { ...val, title: ev.target.value })} />
                    </div>
                    <div className="project_content">
                        {val?.content && val?.content.map((proj, index) => (
                            <div key={index} className="project_content_item">
                                <div className="project_titles">
                                    <input
                                        className='project_name'
                                        style={{ ...calcInWidth("project_name", proj.name) }}
                                        type="text"
                                        value={proj.name}
                                        onChange={(ev) => {
                                            let clone = [...val.content];
                                            let obj = clone[index];
                                            obj.name = ev.target.value;
                                            clone[index] = obj;
                                            hndlChange('list', field, { ...val, content_data: [...clone] })
                                        }} />
                                    <div className='project_links'>
                                        <input
                                            className='project_link'
                                            style={{ ...calcInWidth("project_link", proj.project_link) }}
                                            type="text"
                                            value={proj.project_link}
                                            onChange={(ev) => {
                                                let clone = [...val.content];
                                                let obj = clone[index];
                                                obj.project_link = ev.target.value;
                                                clone[index] = obj;
                                                hndlChange('list', field, { ...val, content_data: [...clone] })
                                            }} />
                                        <input className='github_link'
                                            style={{ ...calcInWidth("github_link", proj.github_link) }}
                                            type="text"
                                            value={proj.github_link}
                                            onChange={(ev) => {
                                                let clone = [...val.content];
                                                let obj = clone[index];
                                                obj.github_link = ev.target.value;
                                                clone[index] = obj;
                                                hndlChange('list', field, { ...val, content_data: [...clone] })
                                            }} />
                                    </div>
                                </div>
                                <div className="project_description">
                                    <textarea
                                        key={index}
                                        className='project_primary_desc'
                                        value={proj.primary_desc}
                                        style={{ ...calcTxtHeight("project_primary_desc", proj.primary_desc) }}
                                        onChange={(ev) => {
                                            let clone = [...val.content];
                                            let obj = clone[index];
                                            obj.primary_desc = ev.target.value;
                                            clone[index] = obj;
                                            hndlChange('list', field, { ...val, content_data: [...clone] })
                                        }}
                                    />
                                    <div className="project_sec_desc">
                                        {proj.sec_desc_list.map((itx, idx) => (
                                            <div className='proj_value_root'>
                                                &#8226;
                                                <textarea
                                                    key={index}
                                                    className='proj_value'
                                                    value={itx}
                                                    style={{ ...calcTxtHeight("proj_value", itx) }}
                                                    onChange={(ev) => {
                                                        let clone = [...val.content];
                                                        let obj = clone[index];
                                                        let list = obj.sec_desc_list;
                                                        list[idx] = ev.target.value;
                                                        obj.sec_desc_list = list;
                                                        clone[index] = obj;
                                                        hndlChange('list', field, { ...val, content_data: [...clone] })
                                                    }}
                                                />
                                                <FiMinusSquare
                                                    className='proj_value_close'
                                                    onClick={() => {
                                                        let updated = val;
                                                        updated.content[index].sec_desc_list = updated.content[index].sec_desc_list.filter((x, i) => i !== idx);
                                                        hndlChange('list', field, { ...updated })
                                                    }}
                                                />
                                            </div>
                                        ))}
                                        <FiPlusSquare
                                            className='proj_value_add'
                                            onClick={() => {
                                                let updated = val;
                                                updated.content[index].sec_desc_list.push('Highlight your responsibilites, your contributions and your achievements in the position.');
                                                hndlChange('list', field, { ...updated })
                                            }}
                                        />
                                    </div>
                                    <div className="project_extra_desc">
                                        {proj.extra_desc_list.map((itx, idx) => (
                                            <div className='proj_value_root'>
                                                <input
                                                    type="text"
                                                    key={index}
                                                    className='proj_value'
                                                    value={itx}
                                                    style={{ ...calcInWidth("proj_value", itx) }}
                                                    onChange={(ev) => {
                                                        let clone = [...val.content];
                                                        let obj = clone[index];
                                                        let list = obj.extra_desc_list;
                                                        list[idx] = ev.target.value;
                                                        obj.extra_desc_list = list;
                                                        clone[index] = obj;
                                                        hndlChange('list', field, { ...val, content_data: [...clone] })
                                                    }} />
                                                <FiMinusSquare
                                                    className='proj_value_close'
                                                    onClick={() => {
                                                        let updated = val;
                                                        updated.content[index].extra_desc_list = updated.content[index].extra_desc_list.filter((x, i) => i !== idx);
                                                        hndlChange('list', field, { ...updated })
                                                    }}
                                                />
                                            </div>
                                        ))}
                                        <FiPlusSquare
                                            className='proj_value_add'
                                            onClick={() => {
                                                let updated = val;
                                                updated.content[index].extra_desc_list.push('test1');
                                                hndlChange('list', field, { ...updated })
                                            }}
                                        />
                                    </div>
                                </div>
                                <FiMinusSquare
                                    onClick={() => {
                                        let updated = val;
                                        updated.content = updated.content.filter((x, i) => i !== index);
                                        hndlChange('list', field, { ...updated })
                                    }}
                                    className='edit_item_close'
                                />
                            </div>
                        ))}
                        <FiPlusSquare
                            className='project_add'
                            onClick={() => {
                                hndlChange('list', field, {
                                    ...val,
                                    content: [
                                        ...val.content,
                                        {
                                            name: "Project Name",
                                            project_link: "Project Link",
                                            github_link: "Github Link",
                                            primary_desc: "",
                                            sec_desc_type: "unordered_list",
                                            sec_desc_list: [
                                                "Highlight your responsibilites, your contributions and your achievements in the position."
                                            ],
                                            extra_desc_type: "plain_list",
                                            extra_desc_list: [""]
                                        }
                                    ]
                                })
                            }}
                        />
                    </div>
                    <div className='drag_icon'  {...provided.dragHandleProps}>
                        <RiDragMove2Line className='h-full w-full' />
                    </div>
                </div>
            case 'education':
                return <div className="education_view">
                    <div className="header">
                        <input className='header_title' style={{ ...calcInWidth("header_title", val?.title) }} type="text" value={val?.title} onChange={(ev) => hndlChange('list', field, { ...val, title: ev.target.value })} />
                    </div>
                    <div className="education_content">
                        {val?.content && val?.content.map((edu, index) => (
                            <div key={index} className="education_content_item">
                                <div className="education_titles">
                                    <div className="education_titles_left">
                                        <input className='education_course' style={{ ...calcInWidth("education_course", edu.course) }} type="text" value={edu.course} onChange={(ev) => {
                                            let clone = [...val.content];
                                            let obj = clone[index];
                                            obj.course = ev.target.value;
                                            clone[index] = obj;
                                            hndlChange('list', field, { ...val, content_data: [...clone] })
                                        }} />
                                        <input className='education_institute' style={{ ...calcInWidth("education_institute", edu.institute) }} type="text" value={edu.institute} onChange={(ev) => {
                                            let clone = [...val.content];
                                            let obj = clone[index];
                                            obj.institute = ev.target.value;
                                            clone[index] = obj;
                                            hndlChange('list', field, { ...val, content_data: [...clone] })
                                        }} />
                                    </div>
                                    <div className="education_titles_right">
                                        <input className='education_location' style={{ ...calcInWidth("education_location", edu.location.value) }} type="text" value={edu.location.value} onChange={(ev) => {
                                            let clone = [...val.content];
                                            let obj = clone[index];
                                            obj.location.value = ev.target.value;
                                            clone[index] = obj;
                                            hndlChange('list', field, { ...val, content_data: [...clone] })
                                        }} />
                                        <div className='education_period'>
                                            <input
                                                className='education_period_from'
                                                style={{ ...calcInWidth("education_period_from", edu.period.from) }}
                                                type="text"
                                                value={edu.period.from}
                                                onChange={(ev) => {
                                                    let clone = [...val.content];
                                                    let obj = clone[index];
                                                    obj.period.from = ev.target.value;
                                                    clone[index] = obj;
                                                    hndlChange('list', field, { ...val, content_data: [...clone] })
                                                }}
                                            />
                                            <span>-</span>
                                            <input
                                                className='education_period_to'
                                                style={{ ...calcInWidth("education_period_to", edu.period.to) }}
                                                type="text"
                                                value={edu.period.to}
                                                onChange={(ev) => {
                                                    let clone = [...val.content];
                                                    let obj = clone[index];
                                                    obj.period.to = ev.target.value;
                                                    clone[index] = obj;
                                                    hndlChange('list', field, { ...val, content_data: [...clone] })
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
                                            let clone = [...val.content];
                                            let obj = clone[index];
                                            obj.grade_value = ev.target.value;
                                            if (obj.grade_value.includes("%")) {
                                                obj.grade_label = "Percentage"
                                            } else {
                                                obj.grade_label = "CGPA"
                                            }
                                            clone[index] = obj;
                                            hndlChange('list', field, { ...val, content_data: [...clone] })
                                        }} /> */}
                                </div>
                                <FiMinusSquare
                                    onClick={() => {
                                        let updated = val;
                                        updated.content = updated.content.filter((x, i) => i !== index);
                                        hndlChange('list', field, { ...updated })
                                    }}
                                    className='edit_item_close'
                                />
                            </div>
                        ))}
                        <FiPlusSquare className='education_add' onClick={() => {
                            hndlChange('list', field, {
                                ...val,
                                content: [
                                    ...val.content,
                                    {
                                        course: "Your course / degree",
                                        institute: "Your institute / school",
                                        location: {
                                            isVisible: true,
                                            value: "Institute / School Location"
                                        },
                                        period: {
                                            isVisible: true,
                                            from: "XXXX",
                                            to: "XXXX"
                                        },
                                        grade_label: "",
                                        grade_type: "",
                                        grade_value: ""
                                    }
                                ]
                            })
                        }} />
                    </div>
                    <div className='drag_icon'  {...provided.dragHandleProps}>
                        <RiDragMove2Line className='h-full w-full' />
                    </div>
                </div>
            case 'achievements':
                return <div className="achievements_view">
                    <div className="header">
                        <input className='header_title' style={{ ...calcInWidth("header_title", val?.title) }} type="text" value={val?.title} onChange={(ev) => hndlChange('list', field, { ...val, title: ev.target.value })} />
                    </div>
                    <div className="achievements_content">
                        {val?.content_data && val?.content_data.map((ach, index) => (
                            <div key={index} className="achievements_content_item">
                                <input
                                    className="achievements_item"
                                    type="text"
                                    value={ach}
                                    onChange={(ev) => {
                                        let list = [...val.content_data];
                                        list[index] = ev.target.value;
                                        hndlChange('list', field, { ...val, content_data: [...list] })
                                    }} />
                                <FiMinusSquare
                                    onClick={() => {
                                        let updated = val;
                                        updated.content_data = updated.content_data.filter((x, i) => i !== index);
                                        hndlChange('list', field, { ...updated })
                                    }}
                                    className='edit_item_close'
                                />
                            </div>
                        ))}
                        <FiPlusSquare className='achievements_add' onClick={() => {
                            hndlChange('list', field, { ...val, content_data: [...val.content_data, 'achievement_3'] })
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