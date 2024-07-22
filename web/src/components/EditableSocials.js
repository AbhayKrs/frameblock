import { useEffect, useRef, useState } from 'react';
// import '../styles/Editor.css';

import { RiPhoneFill } from "react-icons/ri";
import { AiFillMobile, AiFillHome } from 'react-icons/ai';
import { GrMail } from 'react-icons/gr';
import { BsLinkedin } from 'react-icons/bs';
import { FaGithubSquare } from 'react-icons/fa';
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
    const [editVal, setEditVal] = useState(val);
    const socials_field = fetchDefaultData(tmpID).socials;

    const inWidth = (value) => {
        const fntSize = editorWidth * 0.014;
        const inpWidth = fntSize / 2 * (value.length + 1.5) + 15;
        console.log("width", inpWidth)
        return { width: inpWidth + 'px' }
    };

    useEffect(() => {
        setEditVal(val);
    }, [val]);

    useEffect(() => {
        console.log("test", editVal);
        // hndlChange('object', 'socials', editVal);
    }, [editVal])

    const linkIcon = (type) => {
        switch (tmpID) {
            case '66672b6efe02b86cb6927af8': switch (type) {
                case 'phone': return <RiPhoneFill className="socials_icon" />
                case 'email': return <GrMail className="socials_icon" />
                case 'portfolio': return <AiFillHome className="socials_icon" />
                case 'linkedin': return <BsLinkedin className="socials_icon" />
                case 'github': return <FaGithubSquare className="socials_icon" />
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
        }
    }

    const normalView = () => {
        return <div className='socials_normal'>
            {editVal && editVal.phone_code && editVal.phone_number && <div className='socials_normal_item'>
                {val.icons && <div className="socials_icon_root"> {linkIcon("phone")}</div>}
                <p>{editVal?.phone_code + " " + editVal?.phone_number}</p>
            </div>}
            {editVal && editVal.email && <div className='socials_normal_item'>
                {val.icons && <div className="socials_icon_root"> {linkIcon("email")}</div>}
                <p>{editVal?.email}</p>
            </div>}
            {editVal && editVal.portfolio_label && editVal.portfolio_value && <div className='socials_normal_item'>
                {val.icons && <div className="socials_icon_root">{linkIcon("portfolio")}</div>}
                <p>{editVal?.portfolio_label}</p>
            </div>}
            {editVal && editVal.linkedin_label && editVal.linkedin_value && <div className='socials_normal_item'>
                {val.icons && <div className="socials_icon_root"> {linkIcon("linkedin")}</div>}
                <p>{editVal?.linkedin_label}</p>
            </div>}
            {editVal && editVal.github_label && editVal.github_value && <div className='socials_normal_item'>
                {val.icons && <div className="socials_icon_root">{linkIcon("github")}</div>}
                <p>{editVal?.github_label}</p>
            </div>}
        </div>
    }

    const editView = () => {
        return <div className='socials_edit_root'>
            <div className='socials_edit_fields'>
                {editVal.phone_code !== undefined && <div className='socials_edit_item'>
                    <span className='edit_label'>phone</span>
                    <select
                        className='edit_select'
                        style={{ ...inWidth(phone_codes.find(item => item.value === editVal?.phone_code).label) }}
                        value={editVal?.phone_code}
                        onChange={(ev) => setEditVal(prevVal => ({
                            ...prevVal,
                            phone_code: ev.target.value
                        }))}
                    >
                        <option value="" />
                        {phone_codes.map(item => (
                            <option value={item.value}>{item.label}</option>
                        ))}
                    </select>
                    <input className='edit_input' style={{ ...inWidth(editVal?.phone_number) }} type="tel" maxLength={10} value={editVal?.phone_number} onChange={(ev) => {
                        console.log("sfsfa", ev.target.value);
                        setEditVal(prevVal => ({
                            ...prevVal,
                            phone_number: ev.target.value
                        }))
                    }} />
                    <MdClose onClick={() => {
                        let updated = editVal;
                        delete updated.phone_code;
                        delete updated.phone_number;
                        setEditVal({ ...updated });
                    }} className='edit_value_close' />
                </div>}
                {editVal.email !== undefined && <div className='socials_edit_item'>
                    <span className='edit_label'>email</span>
                    <input className='edit_input' style={{ ...inWidth(editVal?.email) }} type="email" value={editVal?.email} onChange={(ev) => setEditVal(prevVal => ({
                        ...prevVal,
                        email: ev.target.value
                    }))} />
                    <MdClose onClick={() => {
                        let updated = editVal;
                        delete updated.email;
                        setEditVal({ ...updated });
                    }} className='edit_value_close' />
                </div>}
                {editVal.portfolio_label !== undefined && editVal.portfolio_value !== undefined && <div className='socials_edit_item'>
                    <span className='edit_label'>portfolio</span>
                    <input className='edit_input' style={{ ...inWidth(editVal?.portfolio_label) }} type="text" value={editVal?.portfolio_label} onChange={(ev) => setEditVal(prevVal => ({
                        ...prevVal,
                        portfolio_label: ev.target.value
                    }))} />
                    <span>&#9679;</span>
                    <input className='edit_input' style={{ ...inWidth(editVal?.portfolio_value) }} type="text" value={editVal?.portfolio_value} onChange={(ev) => setEditVal(prevVal => ({
                        ...prevVal,
                        portfolio_value: ev.target.value
                    }))} />
                    <MdClose onClick={() => {
                        let updated = editVal;
                        delete updated.portfolio_label;
                        delete updated.portfolio_value;
                        setEditVal({ ...updated });
                    }} className='edit_value_close' />
                </div>}
                {editVal.linkedin_label && editVal.linkedin_value && <div className='socials_edit_item' >
                    <span className='edit_label'>linkedin</span>
                    <input className='edit_input' style={{ ...inWidth(editVal?.linkedin_label) }} type="text" value={editVal?.linkedin_label} onChange={(ev) => setEditVal(prevVal => ({
                        ...prevVal,
                        linkedin_label: ev.target.value
                    }))} />
                    <span>&#9679;</span>
                    <input className='edit_input' style={{ ...inWidth(editVal?.linkedin_value) }} type="text" value={editVal?.linkedin_value} onChange={(ev) => setEditVal(prevVal => ({
                        ...prevVal,
                        linkedin_value: ev.target.value
                    }))} />
                    <MdClose onClick={() => {
                        let updated = editVal;
                        delete updated.linkedin_label;
                        delete updated.linkedin_value;
                        setEditVal({ ...updated });
                    }} className='edit_value_close' />
                </div>}
                {editVal.github_label && editVal.github_value && <div className='socials_edit_item'>
                    <span className='edit_label'>github</span>
                    <input className='edit_input' style={{ ...inWidth(editVal?.github_label) }} type="text" value={editVal?.github_label} onChange={(ev) => setEditVal(prevVal => ({
                        ...prevVal,
                        github_label: ev.target.value
                    }))} />
                    <span>&#9679;</span>
                    <input className='edit_input' style={{ ...inWidth(editVal?.github_value) }} type="text" value={editVal?.github_value} onChange={(ev) => setEditVal(prevVal => ({
                        ...prevVal,
                        github_value: ev.target.value
                    }))} />
                    <MdClose onClick={() => {
                        let updated = editVal;
                        delete updated.github_label;
                        delete updated.github_value;
                        setEditVal({ ...updated });
                    }} className='edit_value_close' />
                </div>}
            </div >
            <div className='socials_edit_add'>
                {!(editVal.phone_code && editVal.phone_number) && <span className="add_field" onClick={() => { setEditVal({ ...editVal, phone_code: socials_field.phone_code, phone_number: socials_field.phone_number }) }} ><MdAdd className='skills_value_add' />phone</span>}
                {!editVal.email && <span className="add_field" onClick={() => { setEditVal({ ...editVal, email: socials_field.email }) }} ><MdAdd className='skills_value_add' />email</span>}
                {!(editVal.portfolio_label && editVal.portfolio_value) && <span className="add_field" onClick={() => { setEditVal({ ...editVal, portfolio_label: socials_field.portfolio_label, portfolio_value: socials_field.portfolio_value }) }}><MdAdd className='skills_value_add' />portfolio</span>}
                {!(editVal.linkedin_label && editVal.linkedin_value) && <span className="add_field" onClick={() => { setEditVal({ ...editVal, linkedin_label: socials_field.linkedin_label, linkedin_value: socials_field.linkedin_value }) }} ><MdAdd className='skills_value_add' />linkedin</span>}
                {!(editVal.github_label && editVal.github_value) && <span className="add_field" onClick={() => { setEditVal({ ...editVal, github_label: socials_field.github_label, github_value: socials_field.github_value }); }} ><MdAdd className='skills_value_add' />github</span>}
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