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
            case 'experience_period_from': { return { fontSize: `calc(${pageWidth}px * 0.018)`, lineHeight: `calc(${pageWidth}px * 0.018)` } }
            case 'experience_period_to': { return { fontSize: `calc(${pageWidth}px * 0.018)`, lineHeight: `calc(${pageWidth}px * 0.018)` } }
            case 'exp_value': { return { fontSize: `calc(${pageWidth}px * 0.019)`, lineHeight: `calc(${pageWidth}px * 0.019)` } }
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
                        <h2 style={{ fontSize: `calc(${pageWidth}px * 0.028)`, lineHeight: `calc(${pageWidth}px * 0.023)` }}>{val?.title}</h2>
                        <hr className="header_line" />
                    </div>
                    <div className="experience_content">
                        {val?.content.map((exp, index) => (
                            <div key={index} className="experience_content_item">
                                <div className="experience_titles">
                                    <div className="experience_titles_left">
                                        <p style={{ fontSize: `calc(${pageWidth}px * 0.021)`, lineHeight: `calc(${pageWidth}px * 0.021)` }} className="experience_role">{exp.role}</p>
                                        <p style={{ fontSize: `calc(${pageWidth}px * 0.021)`, lineHeight: `calc(${pageWidth}px * 0.021)` }} className="experience_company">{exp.company}</p>
                                    </div>
                                    <div className="experience_titles_right">
                                        <p style={{ fontSize: `calc(${pageWidth}px * 0.018)`, lineHeight: `calc(${pageWidth}px * 0.018)` }} className="experience_location">{exp.location}</p>
                                        <p style={{ fontSize: `calc(${pageWidth}px * 0.018)`, lineHeight: `calc(${pageWidth}px * 0.018)` }} className="experience_period">{exp.period_from} - {exp.period_to}</p>
                                    </div>
                                </div>
                                <div className="experience_description">
                                    {exp.description_list.map((exp_desc_item, index) => (
                                        <li key={index} style={{ fontSize: `calc(${pageWidth}px * 0.019)`, lineHeight: `calc(${pageWidth}px * 0.019)`, marginLeft: 10 }}>{exp_desc_item}</li>
                                    ))}
                                </div>
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
                                        <input className='experience_location' style={{ ...calcFontDimensions('experience_location'), ...inWidth(exp.role) }} type="text" value={exp.location} onChange={changeHandler} />
                                        <div className='experience_period'>
                                            <input className='experience_period_from' style={{ ...calcFontDimensions('experience_period_from'), ...inWidth(exp.period_from) }} type="text" value={exp.period_from} onChange={changeHandler} />
                                            <input className='experience_period_to' style={{ ...calcFontDimensions('experience_period_to'), ...inWidth(exp.period_to) }} type="text" value={exp.period_to} onChange={changeHandler} />
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
        }
    }

    return (
        <div className={field}>
            {!mainEdit ? normalView() : editView()}
        </div>
    )
}

export default EditableObjective;