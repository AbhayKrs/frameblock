import { useEffect, useRef, useState } from 'react';
import '../styles/Editor.css';

import { AiFillMobile, AiFillHome } from 'react-icons/ai';
import { GrMail } from 'react-icons/gr';
import { BsLinkedin } from 'react-icons/bs';
import { FaGithubSquare } from 'react-icons/fa';
import { BiCheck } from 'react-icons/bi';
import { MdAdd, MdClose } from 'react-icons/md';

import { phone_codes } from '../utils/editorValues';

const EditableSocials = (props) => {
    const { tmpID, pageWidth, field, editOn, val, handleSubmit } = props;
    const [editVal, setEditVal] = useState(val);

    const socials_field = {
        phone_code: "+91",
        phone_number: "XXXXXXXXXX",
        email: "xyz_qwe@email.com",
        portfolio_label: "www.abc.com",
        portfolio_value: "https://www.abc.com",
        linkedin_label: "asfkasa",
        linkedin_value: "https://www.asfkasa.linkedin.com",
        github_label: "asqs1",
        github_value: "https://www.asqs1.github.com",
    };

    const inWidth = (value) => {
        if (value === undefined) {
            return { width: '0ch' }
        }
        let len = value.length;
        len = len < 7 ? 7 : len;
        len += 1.5;
        return { width: len + 'ch' };
    }

    useEffect(() => {
        setEditVal(val);
    }, [val])

    const calcStyling = (type) => {
        switch (type) {
            case 'edit_root': { return { padding: `calc(${pageWidth}px * 0.012)`, borderRadius: `calc(${pageWidth}px * 0.004)` } }
            case 'edit_item_root': { return { gap: `calc(${pageWidth}px * 0.010)`, padding: `calc(${pageWidth}px * 0.010)`, borderRadius: `calc(${pageWidth}px * 0.004)` } }
            case 'edit_fields': { return { gap: `calc(${pageWidth}px * 0.014)` } }
            case 'socials_normal_item': { return { fontSize: `calc(${pageWidth}px * 0.018)`, lineHeight: `calc(${pageWidth}px * 0.020)`, gap: `calc(${pageWidth}px * 0.008)`, padding: `0 calc(${pageWidth}px * 0.012)` } }
            case 'phone':
            case 'email':
            case 'portfolio':
            case 'linkedin':
            case 'github': { return { fontSize: `calc(${pageWidth}px * 0.018)`, lineHeight: `calc(${pageWidth}px * 0.020)`, paddingRight: `calc(${pageWidth}px * 0.012)` } }
            case 'edit_actions': { return { top: `calc(${pageWidth}px * -0.007)`, right: 0 } }
            case 'edit_icon': { return { height: `calc(${pageWidth}px * 0.020)`, width: `calc(${pageWidth}px * 0.020)` } }
            case 'edit_label': { return { fontSize: `calc(${pageWidth}px * 0.012)`, lineHeight: `calc(${pageWidth}px * 0.014)`, top: `calc(${pageWidth}px * -0.007)` } }
            case 'edit_value_close': { return { height: `calc(${pageWidth}px * 0.014)`, width: `calc(${pageWidth}px * 0.014)`, top: `calc(${pageWidth}px * -0.007)` } }
        }
    }

    const calcIconDimensions = () => {
        return { height: `calc(${pageWidth}px * 0.016)`, width: `calc(${pageWidth}px * 0.016)` }
    }

    const linkIcon = (type) => {
        switch (type) {
            case 'phone': return <AiFillMobile style={calcIconDimensions()} className="social_icons" />
            case 'email': return <GrMail style={calcIconDimensions()} className="social_icons" />
            case 'portfolio': return <AiFillHome style={calcIconDimensions()} className="social_icons" />
            case 'linkedin': return <BsLinkedin style={calcIconDimensions()} className="social_icons" />
            case 'github': return <FaGithubSquare style={calcIconDimensions()} className="social_icons" />
        }
    }

    const normalView = () => {
        return <div className='socials_normal divide-x-2 divide-blue-900'>
            {editVal && editVal.phone_code && editVal.phone_number && <div className='socials_normal_item' style={calcStyling("socials_normal_item")}>
                {linkIcon("phone")} {editVal?.phone_code + " " + editVal?.phone_number}
            </div>}
            {editVal && editVal.email && <div className='socials_normal_item' style={calcStyling("socials_normal_item")}>
                {linkIcon("email")} {editVal?.email}
            </div>}
            {editVal && editVal.portfolio_label && editVal.portfolio_value && <div className='socials_normal_item' style={calcStyling("socials_normal_item")}>
                {linkIcon("portfolio")} {editVal?.portfolio_label}
            </div>}
            {editVal && editVal.linkedin_label && editVal.linkedin_value && <div className='socials_normal_item' style={calcStyling("socials_normal_item")}>
                {linkIcon("linkedin")} {editVal?.linkedin_label}
            </div>}
            {editVal && editVal.github_label && editVal.github_value && <div className='socials_normal_item' style={calcStyling("socials_normal_item")}>
                {linkIcon("github")} {editVal?.github_label}
            </div>}
        </div>
    }

    const editView = () => {
        return <div className='socials_edit_root' style={{ ...calcStyling("edit_root") }}>
            <div className='socials_edit_fields' style={{ ...calcStyling("edit_fields") }}>
                <div className='edit_actions' style={{ ...calcStyling("edit_actions") }}>
                    <BiCheck onClick={() => { handleSubmit('object', 'socials', { ...editVal, portfolio_label: editVal?.portfolio_label, portfolio_value: editVal?.portfolio_value }) }} style={{ ...calcStyling("edit_icon") }} className='edit_icon' />
                    <MdClose style={{ ...calcStyling("edit_icon") }} className='edit_icon' />
                </div>
                {editVal.phone_code && editVal.phone_number && <div className='socials_edit_item' style={{ ...calcStyling("edit_item_root") }}>
                    <span style={{ ...calcStyling("edit_label") }} className='edit_label'>phone</span>
                    <select className='edit_select' style={{ ...calcStyling("phone"), ...inWidth(editVal?.phone_code) }} value={editVal?.phone_code} onChange={(ev) => setEditVal(prevVal => ({
                        ...prevVal,
                        phone_code: ev.target.value
                    }))}>
                        <option value="" />
                        {phone_codes.map(item => (
                            <option value={item.value}>{item.label}</option>
                        ))}
                    </select>
                    <input className='edit_input' style={{ ...calcStyling("phone"), ...inWidth(editVal?.phone_number) }} type="tel" maxLength={10} value={editVal?.phone_number} onChange={(ev) => setEditVal(prevVal => ({
                        ...prevVal,
                        phone_number: ev.target.value
                    }))} />
                    <MdClose onClick={() => {
                        let updated = editVal;
                        delete updated.phone_code;
                        delete updated.phone_number;
                        setEditVal({ ...updated });
                    }} style={{ ...calcStyling("edit_value_close") }} className='edit_value_close' />
                </div>}
                {editVal.email && <div className='socials_edit_item' style={{ ...calcStyling("edit_item_root") }}>
                    <span style={{ ...calcStyling("edit_label") }} className='edit_label'>email</span>
                    <input className='edit_input' style={{ ...calcStyling("email"), ...inWidth(editVal?.email) }} type="email" value={editVal?.email} onChange={(ev) => setEditVal(prevVal => ({
                        ...prevVal,
                        email: ev.target.value
                    }))} />
                    <MdClose onClick={() => {
                        let updated = editVal;
                        delete updated.email;
                        setEditVal({ ...updated });
                    }} style={{ ...calcStyling("edit_value_close") }} className='edit_value_close' />
                </div>}
                {editVal.portfolio_label && editVal.portfolio_value && <div className='socials_edit_item' style={{ ...calcStyling("edit_item_root") }}>
                    <span style={{ ...calcStyling("edit_label") }} className='edit_label'>portfolio</span>
                    <input className='edit_input' style={{ ...calcStyling("portfolio"), ...inWidth(editVal?.portfolio_label) }} type="text" value={editVal?.portfolio_label} onChange={(ev) => setEditVal(prevVal => ({
                        ...prevVal,
                        portfolio_label: ev.target.value
                    }))} />
                    <span style={{ ...calcStyling("portfolio") }}>&#9679;</span>
                    <input className='edit_input' style={{ ...calcStyling("portfolio"), ...inWidth(editVal?.portfolio_value) }} type="text" value={editVal?.portfolio_value} onChange={(ev) => setEditVal(prevVal => ({
                        ...prevVal,
                        portfolio_value: ev.target.value
                    }))} />
                    <MdClose onClick={() => {
                        let updated = editVal;
                        delete updated.portfolio_label;
                        delete updated.portfolio_value;
                        setEditVal({ ...updated });
                    }} style={{ ...calcStyling("edit_value_close") }} className='edit_value_close' />
                </div>}
                {editVal.linkedin_label && editVal.linkedin_value && <div className='socials_edit_item' style={{ ...calcStyling("edit_item_root") }}>
                    <span style={{ ...calcStyling("edit_label") }} className='edit_label'>linkedin</span>
                    <input className='edit_input' style={{ ...calcStyling("linkedin"), ...inWidth(editVal?.linkedin_label) }} type="text" value={editVal?.linkedin_label} onChange={(ev) => setEditVal(prevVal => ({
                        ...prevVal,
                        linkedin_label: ev.target.value
                    }))} />
                    <span style={{ ...calcStyling("linkedin") }}>&#9679;</span>
                    <input className='edit_input' style={{ ...calcStyling("linkedin"), ...inWidth(editVal?.linkedin_value) }} type="text" value={editVal?.linkedin_value} onChange={(ev) => setEditVal(prevVal => ({
                        ...prevVal,
                        linkedin_value: ev.target.value
                    }))} />
                    <MdClose onClick={() => {
                        let updated = editVal;
                        delete updated.linkedin_label;
                        delete updated.linkedin_value;
                        setEditVal({ ...updated });
                    }} style={{ ...calcStyling("edit_value_close") }} className='edit_value_close' />
                </div>}
                {editVal.github_label && editVal.github_value && <div className='socials_edit_item' style={{ ...calcStyling("edit_item_root") }}>
                    <span style={{ ...calcStyling("edit_label") }} className='edit_label'>github</span>
                    <input className='edit_input' style={{ ...calcStyling("github"), ...inWidth(editVal?.github_label) }} type="text" value={editVal?.github_label} onChange={(ev) => setEditVal(prevVal => ({
                        ...prevVal,
                        github_label: ev.target.value
                    }))} />
                    <span style={{ ...calcStyling("github") }}>&#9679;</span>
                    <input className='edit_input' style={{ ...calcStyling("github"), ...inWidth(editVal?.github_value) }} type="text" value={editVal?.github_value} onChange={(ev) => setEditVal(prevVal => ({
                        ...prevVal,
                        github_value: ev.target.value
                    }))} />
                    <MdClose onClick={() => {
                        let updated = editVal;
                        delete updated.github_label;
                        delete updated.github_value;
                        setEditVal({ ...updated });
                    }} style={{ ...calcStyling("edit_value_close") }} className='edit_value_close' />
                </div>}
            </div >
            <div className='socials_edit_add'>
                {!(editVal.phone_code && editVal.phone_number) && <span style={calcStyling("edit_label")} className="add_field" onClick={() => { setEditVal({ ...editVal, phone_code: socials_field.phone_code, phone_number: socials_field.phone_number }) }} ><MdAdd className='skills_value_add' />phone</span>}
                {!editVal.email && <span style={calcStyling("edit_label")} className="add_field" onClick={() => { setEditVal({ ...editVal, email: socials_field.email }) }} ><MdAdd className='skills_value_add' />email</span>}
                {!(editVal.portfolio_label && editVal.portfolio_value) && <span style={calcStyling("edit_label")} className="add_field" onClick={() => { setEditVal({ ...editVal, portfolio_label: socials_field.portfolio_label, portfolio_value: socials_field.portfolio_value }) }}><MdAdd className='skills_value_add' />portfolio</span>}
                {!(editVal.linkedin_label && editVal.linkedin_value) && <span style={calcStyling("edit_label")} className="add_field" onClick={() => { setEditVal({ ...editVal, linkedin_label: socials_field.linkedin_label, linkedin_value: socials_field.linkedin_value }) }} ><MdAdd className='skills_value_add' />linkedin</span>}
                {!(editVal.github_label && editVal.github_value) && <span style={calcStyling("edit_label")} className="add_field" onClick={() => { setEditVal({ ...editVal, github_label: socials_field.github_label, github_value: socials_field.github_value }); }} ><MdAdd className='skills_value_add' />github</span>}
            </div>
        </div>
    }

    return (
        <div className='socials_item'>
            {!editOn ?
                normalView()
                :
                editView()
            }
        </div>
    )
}

export default EditableSocials;