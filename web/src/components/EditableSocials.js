import { useEffect, useRef, useState } from 'react';
// import '../styles/Editor.css';

import { RiPhoneFill } from "react-icons/ri";
import { AiFillMobile, AiFillHome } from 'react-icons/ai';
import { GrMail } from 'react-icons/gr';
import { BsLinkedin } from 'react-icons/bs';
import { FaGithubSquare, FaLinkedinIn, FaGithub, FaPhoneSquareAlt } from 'react-icons/fa';
import { FiPlusSquare, FiMinusSquare } from "react-icons/fi";
import { ImMail } from "react-icons/im";
import { IoTerminal, IoLogoLinkedin } from "react-icons/io5";

import { phone_codes } from '../utils/editorValues';
import { fetchDefaultData } from '../utils/resume-structure';

const EditableSocials = (props) => {
    const { tmpID, editorWidth, field, editOn, val, hndlChange } = props;
    const socials_field = fetchDefaultData(tmpID).socials;
    const [editVal, setEditVal] = useState(val);

    const [editInWidth, setEditInWidth] = useState({
        phone_code: editorWidth * 0.14,
        phone_number: editorWidth * 0.014,
        email: editorWidth * 0.014,
        portfolio_label: editorWidth * 0.014,
        portfolio_value: editorWidth * 0.014,
        linkedin_label: editorWidth * 0.014,
        linkedin_value: editorWidth * 0.014,
        github_label: editorWidth * 0.014,
        github_value: {}
    });


    const calcInWidth = (fld, val) => {
        const inputElement = document.querySelector(`input.${fld}`);
        const computedStyle = inputElement ? window.getComputedStyle(inputElement) : null;
        const fntSize = computedStyle ? parseFloat(computedStyle.fontSize) : editorWidth * 0.018; // Default to 16px if not found
        const inpWidth = fntSize / 2 * (val.length + 3);
        return inpWidth;
    };

    useEffect(() => {
        if (val) {
            const fldWidths = {
                phone_code: calcInWidth("phone_code", phone_codes.find(item => item.value === val?.phone_code).label || ''),
                phone_number: calcInWidth("phone_number", val.phone_number || ''),
                email: calcInWidth("email", val.email || ''),
                portfolio_label: calcInWidth("portfolio_label", val.portfolio_label || ''),
                portfolio_value: calcInWidth("portfolio_value", val.portfolio_value || ''),
                linkedin_label: calcInWidth("linkedin_label", val.linkedin_label || ''),
                linkedin_value: calcInWidth("linkedin_value", val.linkedin_value || ''),
                github_label: calcInWidth("github_label", val.github_label || ''),
                github_value: calcInWidth("github_value", val.github_value || '')
            };
            setEditInWidth(fldWidths);
        }
    }, [editOn, editorWidth, val])


    const linkIcon = (type) => {
        switch (tmpID) {
            case '67586222aa81be4c55e55f6d': switch (type) {
                case 'phone': return <RiPhoneFill className="socials_icon" />
                case 'email': return <GrMail className="socials_icon" />
                case 'portfolio': return <AiFillHome className="socials_icon" />
                case 'linkedin': return <FaLinkedinIn className="socials_icon" />
                case 'github': return <FaGithub className="socials_icon" />
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
            {val && val.phone_code && val.phone_number && <div className='socials_item'>
                {val.isIconsVisible && <div className="socials_icon_root"> {linkIcon("phone")}</div>}
                <p>{val?.phone_code + " " + val?.phone_number}</p>
            </div>}
            {val && val.email && <div className='socials_item'>
                {val.isIconsVisible && <div className="socials_icon_root"> {linkIcon("email")}</div>}
                <p>{val?.email}</p>
            </div>}
            {val && val.portfolio_label && val.portfolio_value && <div className='socials_item'>
                {val.isIconsVisible && <div className="socials_icon_root">{linkIcon("portfolio")}</div>}
                <a target='_blank' href={val.portfolio_value}>{val?.portfolio_label}</a>
            </div>}
            {val && val.linkedin_label && val.linkedin_value && <div className='socials_item'>
                {val.isIconsVisible && <div className="socials_icon_root"> {linkIcon("linkedin")}</div>}
                <a target="_blank" href={val.linkedin_value}>{val?.linkedin_label}</a>
            </div>}
            {val && val.github_label && val.github_value && <div className='socials_item'>
                {val.isIconsVisible && <div className="socials_icon_root">{linkIcon("github")}</div>}
                <a target="_blank" href={val.github_value}>{val?.github_label}</a>
            </div>}
        </div>
    }

    const editView = () => {
        return <div>
            <div className='socials_normal'>
                {val.phone_code !== undefined && <div className='socials_item'>
                    {/* <select
                        className='phone_code'
                        style={{ width: editInWidth.phone_code + "px" }}
                        value={val?.phone_code}
                        onChange={(ev) => hndlChange('object', 'socials', { ...val, phone_code: ev.target.value })}
                    >
                        <option value="" />
                        {phone_codes.map(item => (
                            <option value={item.value}>{item.label}</option>
                        ))}
                    </select> */}
                    <input className='phone_number' style={{ width: editInWidth.phone_number + "px" }} type="tel" maxLength={10} value={val?.phone_number} onChange={(ev) => {
                        hndlChange('object', 'socials', { ...val, phone_number: ev.target.value })
                    }} />
                    <FiMinusSquare onClick={() => {
                        let updated = val;
                        delete updated.phone_code;
                        delete updated.phone_number;
                        setEditVal({ ...updated });
                    }} className='edit_value_close' />
                </div>}
                {val.email !== undefined && <div className='socials_item'>
                    <input className='email' style={{ width: editInWidth.email + "px" }} type="email" value={val?.email} onChange={(ev) => hndlChange('object', 'socials', { ...val, email: ev.target.value })} />
                    <FiMinusSquare onClick={() => {
                        let updated = val;
                        delete updated.email;
                        setEditVal({ ...updated });
                    }} className='edit_value_close' />
                </div>}
                {val.portfolio_label !== undefined && val.portfolio_value !== undefined && <div className='socials_item'>
                    <input className='portfolio_label' style={{ width: editInWidth.portfolio_label + "px" }} type="text" value={val?.portfolio_label} onChange={(ev) => hndlChange('object', 'socials', { ...val, portfolio_label: ev.target.value })} />
                    <span>&#9679;</span>
                    <input className='portfolio_value' style={{ width: editInWidth.portfolio_value + "px" }} type="text" value={val?.portfolio_value} onChange={(ev) => hndlChange('object', 'socials', { ...val, portfolio_value: ev.target.value })} />
                    <FiMinusSquare onClick={() => {
                        let updated = val;
                        delete updated.portfolio_label;
                        delete updated.portfolio_value;
                        setEditVal({ ...updated });
                    }} className='edit_value_close' />
                </div>}
                {val.linkedin_label !== undefined && val.linkedin_value !== undefined && <div className='socials_item' >
                    <input className='linkedin_label' style={{ width: editInWidth.linkedin_label + "px" }} type="text" value={val?.linkedin_label} onChange={(ev) => hndlChange('object', 'socials', { ...val, linkedin_label: ev.target.value })} />
                    <span>&#9679;</span>
                    <input className='linkedin_value' style={{ width: editInWidth.linkedin_value + "px" }} type="text" value={val?.linkedin_value} onChange={(ev) => hndlChange('object', 'socials', { ...val, linkedin_value: ev.target.value })} />
                    <FiMinusSquare onClick={() => {
                        let updated = val;
                        delete updated.linkedin_label;
                        delete updated.linkedin_value;
                        setEditVal({ ...updated });
                    }} className='edit_value_close' />
                </div>}
                {val.github_label !== undefined && val.github_value !== undefined && <div className='socials_item'>
                    <input className='github_label' style={{ width: editInWidth.github_label + "px" }} type="text" value={val?.github_label} onChange={(ev) => hndlChange('object', 'socials', { ...val, github_label: ev.target.value })} />
                    <span>&#9679;</span>
                    <input className='github_value' style={{ width: editInWidth.github_value + "px" }} type="text" value={val?.github_value} onChange={(ev) => hndlChange('object', 'socials', { ...val, github_value: ev.target.value })} />
                    <FiMinusSquare onClick={() => {
                        let updated = val;
                        delete updated.github_label;
                        delete updated.github_value;
                        // setEditVal({ ...updated });
                    }} className='edit_value_close' />
                </div>}
            </div>
            <div className='socials_add'>
                {!(val.phone_code && val.phone_number) && <span className="add_field" onClick={() => { hndlChange('object', 'socials', { ...val, phone_code: socials_field.phone_code, phone_number: socials_field.phone_number }) }} ><FiPlusSquare className='skills_value_add' />phone</span>}
                {!(val.email !== undefined) && <span className="add_field" onClick={() => { hndlChange('object', 'socials', { ...val, email: socials_field.email }) }} ><FiPlusSquare className='skills_value_add' />email</span>}
                {!(val.portfolio_label !== undefined && val.portfolio_value !== undefined) && <span className="add_field" onClick={() => { hndlChange('object', 'socials', { ...val, portfolio_label: socials_field.portfolio_label, portfolio_value: socials_field.portfolio_value }) }}><FiPlusSquare className='skills_value_add' />portfolio</span>}
                {!(val.linkedin_label !== undefined && val.linkedin_value !== undefined) && <span className="add_field" onClick={() => { hndlChange('object', 'socials', { ...val, linkedin_label: socials_field.linkedin_label, linkedin_value: socials_field.linkedin_value }) }} ><FiPlusSquare className='skills_value_add' />linkedin</span>}
                {!(val.github_label !== undefined && val.github_value !== undefined) && <span className="add_field" onClick={() => { hndlChange('object', 'socials', { ...val, github_label: socials_field.github_label, github_value: socials_field.github_value }) }} ><FiPlusSquare className='skills_value_add' />github</span>}
            </div>
        </div >
    }

    return (
        <div className='socials_root'>
            {!editOn ?
                normalView()
                :
                editView()
            }
        </div>
    )
}

export default EditableSocials;