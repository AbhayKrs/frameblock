import { useEffect, useRef, useState } from 'react';
// import '../styles/Editor.css';

import { RiPhoneFill } from "react-icons/ri";
import { AiFillMobile, AiFillHome } from 'react-icons/ai';
import { GrMail } from 'react-icons/gr';
import { BsLinkedin } from 'react-icons/bs';
import { FaGithubSquare, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { BiCheck } from 'react-icons/bi';
import { MdAdd, MdClose } from 'react-icons/md';
import { FaPhoneSquareAlt } from "react-icons/fa";
import { ImMail } from "react-icons/im";
import { IoTerminal } from "react-icons/io5";
import { IoLogoLinkedin } from "react-icons/io5";

import { phone_codes } from '../utils/editorValues';
import { fetchDefaultData } from '../utils/resume-structure';

const EditableSocials = (props) => {
    const { tmpID, editorWidth, field, editOn, val, hndlChange } = props;
    const socials_field = fetchDefaultData(tmpID).socials;
    const [editVal, setEditVal] = useState(val);

    const inWidth = (value) => {
        const fntSize = editorWidth * 0.014;
        const inpWidth = fntSize / 2 * (value.length + 1.5) + 15;
        console.log("width", inpWidth)
        return { width: inpWidth + 'px' }
    };


    const linkIcon = (type) => {
        switch (tmpID) {
            case '67586222aa81be4c55e55f6d': switch (type) {
                case 'phone': return <RiPhoneFill className="socials_icon" />
                case 'email': return <GrMail className="socials_icon" />
                case 'portfolio': return <AiFillHome className="socials_icon" />
                case 'linkedin': return <FaLinkedinIn className="socials_icon" />
                case 'github': return <FaGithub className="socials_icon" />
            }
            case '66672b96fe02b86cb6927afa': switch (type) {
                case 'phone': return <RiPhoneFill className="socials_icon" />
                case 'email': return <GrMail className="socials_icon" />
                case 'portfolio': return <AiFillHome className="socials_icon" />
                case 'linkedin': return <BsLinkedin className="socials_icon" />
                case 'github': return <FaGithubSquare className="socials_icon" />
            }
            case '66672b9cfe02b86cb6927afc': switch (type) {
                case 'phone': return <FaPhoneSquareAlt className="socials_icon" />
                case 'email': return <ImMail className="socials_icon" />
                case 'portfolio': return <IoTerminal className="socials_icon" />
                case 'linkedin': return <IoLogoLinkedin className="socials_icon" />
                case 'github': return <FaGithubSquare className="socials_icon" />
            }
            case '66672ba1fe02b86cb6927afe': switch (type) {
                case 'phone': return <span className="socials_icon">Phone</span>
                case 'email': return <span className="socials_icon">Email</span>
                case 'portfolio': return <span className="socials_icon">Portfolio</span>
                case 'linkedin': return <span className="socials_icon">LinkedIn</span>
                case 'github': return <span className="socials_icon">Github</span>
            }
        }
    }

    const normalView = () => {
        return <div className='socials_normal'>
            {val && val.phone_code && val.phone_number && <div className='socials_normal_item'>
                {val.isIconsVisible && <div className="socials_icon_root"> {linkIcon("phone")}</div>}
                <p>{val?.phone_code + " " + val?.phone_number}</p>
            </div>}
            {val && val.email && <div className='socials_normal_item'>
                {val.isIconsVisible && <div className="socials_icon_root"> {linkIcon("email")}</div>}
                <p>{val?.email}</p>
            </div>}
            {val && val.portfolio_label && val.portfolio_value && <div className='socials_normal_item'>
                {val.isIconsVisible && <div className="socials_icon_root">{linkIcon("portfolio")}</div>}
                <p>{val?.portfolio_label}</p>
            </div>}
            {val && val.linkedin_label && val.linkedin_value && <div className='socials_normal_item'>
                {val.isIconsVisible && <div className="socials_icon_root"> {linkIcon("linkedin")}</div>}
                <p>{val?.linkedin_label}</p>
            </div>}
            {val && val.github_label && val.github_value && <div className='socials_normal_item'>
                {val.isIconsVisible && <div className="socials_icon_root">{linkIcon("github")}</div>}
                <p>{val?.github_label}</p>
            </div>}
        </div>
    }

    const editView = () => {
        return <div className='socials_edit_root'>
            <div className='socials_edit_fields'>
                {val.phone_code !== undefined && <div className='socials_edit_item'>
                    <span className='edit_label'>phone</span>
                    <select
                        className='edit_select'
                        style={{ ...inWidth(phone_codes.find(item => item.value === val?.phone_code).label) }}
                        value={val?.phone_code}
                        onChange={(ev) => hndlChange('object', 'socials', { ...val, phone_code: ev.target.value })}
                    >
                        <option value="" />
                        {phone_codes.map(item => (
                            <option value={item.value}>{item.label}</option>
                        ))}
                    </select>
                    <input className='edit_input' style={{ ...inWidth(val?.phone_number) }} type="tel" maxLength={10} value={val?.phone_number} onChange={(ev) => {
                        hndlChange('object', 'socials', { ...val, phone_number: ev.target.value })
                    }} />
                    <MdClose onClick={() => {
                        let updated = val;
                        delete updated.phone_code;
                        delete updated.phone_number;
                        setEditVal({ ...updated });
                    }} className='edit_value_close' />
                </div>}
                {val.email !== undefined && <div className='socials_edit_item'>
                    <span className='edit_label'>email</span>
                    <input className='edit_input' style={{ ...inWidth(val?.email) }} type="email" value={val?.email} onChange={(ev) => hndlChange('object', 'socials', { ...val, email: ev.target.value })} />
                    <MdClose onClick={() => {
                        let updated = val;
                        delete updated.email;
                        setEditVal({ ...updated });
                    }} className='edit_value_close' />
                </div>}
                {val.portfolio_label !== undefined && val.portfolio_value !== undefined && <div className='socials_edit_item'>
                    <span className='edit_label'>portfolio</span>
                    <input className='edit_input' style={{ ...inWidth(val?.portfolio_label) }} type="text" value={val?.portfolio_label} onChange={(ev) => hndlChange('object', 'socials', { ...val, portfolio_label: ev.target.value })} />
                    <span>&#9679;</span>
                    <input className='edit_input' style={{ ...inWidth(val?.portfolio_value) }} type="text" value={val?.portfolio_value} onChange={(ev) => hndlChange('object', 'socials', { ...val, portfolio_value: ev.target.value })} />
                    <MdClose onClick={() => {
                        let updated = val;
                        delete updated.portfolio_label;
                        delete updated.portfolio_value;
                        setEditVal({ ...updated });
                    }} className='edit_value_close' />
                </div>}
                {val.linkedin_label !== undefined && val.linkedin_value !== undefined && <div className='socials_edit_item' >
                    <span className='edit_label'>linkedin</span>
                    <input className='edit_input' style={{ ...inWidth(val?.linkedin_label) }} type="text" value={val?.linkedin_label} onChange={(ev) => hndlChange('object', 'socials', { ...val, linkedin_label: ev.target.value })} />
                    <span>&#9679;</span>
                    <input className='edit_input' style={{ ...inWidth(val?.linkedin_value) }} type="text" value={val?.linkedin_value} onChange={(ev) => hndlChange('object', 'socials', { ...val, linkedin_value: ev.target.value })} />
                    <MdClose onClick={() => {
                        let updated = val;
                        delete updated.linkedin_label;
                        delete updated.linkedin_value;
                        setEditVal({ ...updated });
                    }} className='edit_value_close' />
                </div>}
                {val.github_label !== undefined && val.github_value !== undefined && <div className='socials_edit_item'>
                    <span className='edit_label'>github</span>
                    <input className='edit_input' style={{ ...inWidth(val?.github_label) }} type="text" value={val?.github_label} onChange={(ev) => hndlChange('object', 'socials', { ...val, github_label: ev.target.value })} />
                    <span>&#9679;</span>
                    <input className='edit_input' style={{ ...inWidth(val?.github_value) }} type="text" value={val?.github_value} onChange={(ev) => hndlChange('object', 'socials', { ...val, github_value: ev.target.value })} />
                    <MdClose onClick={() => {
                        let updated = val;
                        delete updated.github_label;
                        delete updated.github_value;
                        // setEditVal({ ...updated });
                    }} className='edit_value_close' />
                </div>}
            </div >
            <div className='socials_edit_add'>
                {!(val.phone_code && val.phone_number) && <span className="add_field" onClick={() => { hndlChange('object', 'socials', { ...val, phone_code: socials_field.phone_code, phone_number: socials_field.phone_number }) }} ><MdAdd className='skills_value_add' />phone</span>}
                {!(val.email !== undefined) && <span className="add_field" onClick={() => { hndlChange('object', 'socials', { ...val, email: socials_field.email }) }} ><MdAdd className='skills_value_add' />email</span>}
                {!(val.portfolio_label !== undefined && val.portfolio_value !== undefined) && <span className="add_field" onClick={() => { hndlChange('object', 'socials', { ...val, portfolio_label: socials_field.portfolio_label, portfolio_value: socials_field.portfolio_value }) }}><MdAdd className='skills_value_add' />portfolio</span>}
                {!(val.linkedin_label !== undefined && val.linkedin_value !== undefined) && <span className="add_field" onClick={() => { hndlChange('object', 'socials', { ...val, linkedin_label: socials_field.linkedin_label, linkedin_value: socials_field.linkedin_value }) }} ><MdAdd className='skills_value_add' />linkedin</span>}
                {!(val.github_label !== undefined && val.github_value !== undefined) && <span className="add_field" onClick={() => { hndlChange('object', 'socials', { ...val, github_label: socials_field.github_label, github_value: socials_field.github_value }) }} ><MdAdd className='skills_value_add' />github</span>}
            </div>
        </div >
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