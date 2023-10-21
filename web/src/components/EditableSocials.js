import { useEffect, useRef, useState } from 'react';
import '../styles/Editor.css';

import { AiFillMobile, AiFillHome } from 'react-icons/ai';
import { GrMail } from 'react-icons/gr';
import { BsLinkedin } from 'react-icons/bs';
import { FaGithubSquare } from 'react-icons/fa';
import { BiCheck } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';

import { phone_codes } from '../utils/editorValues';

const EditableSocials = (props) => {
    const { draftID, pageWidth, field, val, handleSubmit, handleInputChange } = props;
    const [editVal, setEditVal] = useState(val);
    const [editOn, setEditOn] = useState(false);

    const inWidth = (value) => {
        if (value === undefined) {
            return { width: '0ch' }
        }
        let len = value.length;
        len += 1;
        return { width: len + 'ch' };
    }

    useEffect(() => {
        setEditVal(val);
    }, [val])

    const calcFontDimensions = (type) => {
        switch (type) {
            case 'phone':
            case 'email':
            case 'portfolio':
            case 'linkedin':
            case 'github': { return { fontSize: `calc(${pageWidth}px * 0.018)`, lineHeight: `calc(${pageWidth}px * 0.020)` } }
            case 'editLabel': { return { fontSize: `calc(${pageWidth}px * 0.012)`, lineHeight: `calc(${pageWidth}px * 0.014)`, top: `calc(${pageWidth}px * -0.007)` } }
        }
    }

    const calcIconDimensions = () => {
        return { height: `calc(${pageWidth}px * 0.016)`, width: `calc(${pageWidth}px * 0.016)` }
    }

    const calcPadding = () => {
        return { padding: `calc(${pageWidth}px * 0.008) calc(${pageWidth}px * 0.008)` }
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
            <div className='socials_normal_item' onClick={() => setEditOn(true)} style={calcFontDimensions("phone")}>
                {linkIcon("phone")} {editVal?.phone_code + " " + editVal?.phone_number}
            </div>
            <div className='socials_normal_item' onClick={() => setEditOn(true)} style={calcFontDimensions("email")}>
                {linkIcon("email")} {editVal?.email}
            </div>
            <div className='socials_normal_item' onClick={() => setEditOn(true)} style={calcFontDimensions("portfolio")}>
                {linkIcon("portfolio")} {editVal?.portfolio_label}
            </div>
            <div className='socials_normal_item' onClick={() => setEditOn(true)} style={calcFontDimensions("linkedin")}>
                {linkIcon("linkedin")} {editVal?.linkedin_label}
            </div>
            <div className='socials_normal_item' onClick={() => setEditOn(true)} style={calcFontDimensions("github")}>
                {linkIcon("github")} {editVal?.github_label}
            </div>
        </div>
    }

    const editView = () => {
        return <div className='socials_edit'>
            <div className='absolute top-1 right-1 flex items-center'>
                <BiCheck onClick={() => { handleSubmit('object', 'socials', { ...editVal, portfolio_label: editVal?.portfolio_label, portfolio_value: editVal?.portfolio_value }); setEditOn(false) }} className='h-7 w-7 text-neutral-800 cursor-pointer' />
                <MdClose onClick={() => { setEditOn(false) }} className='h-6 w-6 text-neutral-800 cursor-pointer' />
            </div>
            <div className='socials_edit_item' style={{ ...calcPadding() }}>
                <span style={{ ...calcFontDimensions("editLabel") }} className='edit_label'>phone</span>
                <select className='editSelect' style={{ ...calcFontDimensions("phone"), width: `calc(${pageWidth}px * 0.07)` }} value={editVal?.phone_code} onChange={(ev) => setEditVal(prevVal => ({
                    ...prevVal,
                    phone_code: ev.target.value
                }))}>
                    <option value="" />
                    {phone_codes.map(item => (
                        <option value={item.value}>{item.label}</option>
                    ))}
                </select>
                <input className='editInput' style={{ ...calcFontDimensions("phone"), ...inWidth(editVal?.phone_number) }} type="tel" maxLength={10} value={editVal?.phone_number} onChange={(ev) => setEditVal(prevVal => ({
                    ...prevVal,
                    phone_number: ev.target.value
                }))} />
            </div>
            <div className='socials_edit_item' style={{ ...calcPadding() }}>
                <span style={{ ...calcFontDimensions("editLabel") }} className='edit_label'>email</span>
                <input className='editInput' style={{ ...calcFontDimensions("email"), ...inWidth(editVal?.email) }} type="email" value={editVal?.email} onChange={(ev) => setEditVal(prevVal => ({
                    ...prevVal,
                    email: ev.target.value
                }))} />
            </div>
            <div className='socials_edit_item' style={{ ...calcPadding() }}>
                <span style={{ ...calcFontDimensions("editLabel") }} className='edit_label'>portfolio</span>
                <input className='editInput' style={{ ...calcFontDimensions("portfolio"), ...inWidth(editVal?.portfolio_label) }} type="text" value={editVal?.portfolio_label} onChange={(ev) => setEditVal(prevVal => ({
                    ...prevVal,
                    portfolio_label: ev.target.value
                }))} />
                <span style={{ ...calcFontDimensions("portfolio") }}>&#9679;</span>
                <input className='editInput' style={{ ...calcFontDimensions("portfolio"), ...inWidth(editVal?.portfolio_value) }} type="text" value={editVal?.portfolio_value} onChange={(ev) => setEditVal(prevVal => ({
                    ...prevVal,
                    portfolio_value: ev.target.value
                }))} />
            </div>
            <div className='socials_edit_item' style={{ ...calcPadding() }}>
                <span style={{ ...calcFontDimensions("editLabel") }} className='edit_label'>linkedin</span>
                <input className='editInput' style={{ ...calcFontDimensions("linkedin"), ...inWidth(editVal?.linkedin_label) }} type="text" value={editVal?.linkedin_label} onChange={(ev) => setEditVal(prevVal => ({
                    ...prevVal,
                    linkedin_label: ev.target.value
                }))} />
                <span style={{ ...calcFontDimensions("linkedin") }}>&#9679;</span>
                <input className='editInput' style={{ ...calcFontDimensions("linkedin"), ...inWidth(editVal?.linkedin_value) }} type="text" value={editVal?.linkedin_value} onChange={(ev) => setEditVal(prevVal => ({
                    ...prevVal,
                    linkedin_value: ev.target.value
                }))} />
            </div>
            <div className='socials_edit_item' style={{ ...calcPadding() }}>
                <span style={{ ...calcFontDimensions("editLabel") }} className='edit_label'>github</span>
                <input className='editInput' style={{ ...calcFontDimensions("github"), ...inWidth(editVal?.github_label) }} type="text" value={editVal?.github_label} onChange={(ev) => setEditVal(prevVal => ({
                    ...prevVal,
                    github_label: ev.target.value
                }))} />
                <span style={{ ...calcFontDimensions("github") }}>&#9679;</span>
                <input className='editInput' style={{ ...calcFontDimensions("github"), ...inWidth(editVal?.github_value) }} type="text" value={editVal?.github_value} onChange={(ev) => setEditVal(prevVal => ({
                    ...prevVal,
                    github_value: ev.target.value
                }))} />
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