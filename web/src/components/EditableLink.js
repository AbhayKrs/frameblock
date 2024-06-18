import { useEffect, useRef, useState } from 'react';
// import '../styles/Editor.css';

import { AiFillMobile, AiFillHome } from 'react-icons/ai';
import { GrMail } from 'react-icons/gr';
import { BsLinkedin } from 'react-icons/bs';
import { FaGithubSquare } from 'react-icons/fa';
import { BiCheck } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';

import { phone_codes } from '../utils/editorValues';

const EditableLink = (props) => {
    const { draftID, editorWidth, field, val, handleSubmit, handleInputChange } = props;

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

    const calcFontDimensions = () => {
        switch (field) {
            case 'socials_phone':
            case 'socials_email':
            case 'socials_portfolio':
            case 'socials_linkedin':
            case 'socials_github': { return { fontSize: `calc(${editorWidth}px * 0.016)`, lineHeight: `calc(${editorWidth}px * 0.019)` } }
        }
    }

    const calcIconDimensions = () => {
        return { height: `calc(${editorWidth}px * 0.016)`, width: `calc(${editorWidth}px * 0.016)` }
    }

    const linkIcon = () => {
        switch (field) {
            case 'socials_phone': return <AiFillMobile style={calcIconDimensions()} className="social_icons" />
            case 'socials_email': return <GrMail style={calcIconDimensions()} className="social_icons" />
            case 'socials_portfolio': return <AiFillHome style={calcIconDimensions()} className="social_icons" />
            case 'socials_linkedin': return <BsLinkedin style={calcIconDimensions()} className="social_icons" />
            case 'socials_github': return <FaGithubSquare style={calcIconDimensions()} className="social_icons" />
        }
    }

    const normalView = () => {
        switch (field) {
            case 'socials_phone':
                return <div className='socials_item_normal' onClick={() => setEditOn(true)} style={calcFontDimensions()}>
                    {linkIcon()} {editVal.code + " " + editVal.number}
                </div>
            case 'socials_email':
                return <div className='socials_item_normal' onClick={() => setEditOn(true)} style={calcFontDimensions()}>
                    {linkIcon()} {editVal}
                </div>
            case 'socials_portfolio':
                return <div className='socials_item_normal' onClick={() => setEditOn(true)} style={calcFontDimensions()}>
                    {linkIcon()} {editVal.label}
                </div>
            case 'socials_linkedin':
                return <div className='socials_item_normal' onClick={() => setEditOn(true)} style={calcFontDimensions()}>
                    {linkIcon()} {editVal.label}
                </div>
            case 'socials_github':
                return <div className='socials_item_normal' onClick={() => setEditOn(true)} style={calcFontDimensions()}>
                    {linkIcon()} {editVal.label}
                </div>
        }
    }

    const editView = () => {
        switch (field) {
            case 'socials_phone':
                return <div className='socials_item_edit'>
                    <select className='editSelect' style={{ ...calcFontDimensions() }} value={editVal.code} onChange={(ev) => setEditVal({ code: ev.target.value, number: editVal.number })}>
                        <option value="" />
                        {phone_codes.map(item => (
                            <option value={item.value}>{item.label}</option>
                        ))}
                    </select>
                    <input className='editInput' style={{ ...calcFontDimensions(), ...inWidth(editVal.number) }} type="tel" maxLength={10} value={editVal.number} onChange={(ev) => setEditVal({ code: editVal.code, number: ev.target.value })} />
                    <BiCheck onClick={() => { handleSubmit('object', 'socials', { phone_code: editVal.code, phone_number: editVal.number }); setEditOn(false) }} className='h-7 w-7 text-neutral-800 cursor-pointer' />
                    <MdClose onClick={() => { setEditOn(false) }} className='h-6 w-6 text-neutral-800 cursor-pointer' />
                </div>
            case 'socials_email':
                return <div className='socials_item_edit'>
                    <input className='editInput' style={{ ...calcFontDimensions(), ...inWidth(editVal) }} type="email" value={editVal} onChange={(ev) => setEditVal(ev.target.value)} />
                    <BiCheck onClick={() => { handleSubmit('object', 'socials', { email: editVal }); setEditOn(false) }} className='h-7 w-7 text-neutral-800 cursor-pointer' />
                    <MdClose onClick={() => { setEditOn(false) }} className='h-6 w-6 text-neutral-800 cursor-pointer' />
                </div>
            case 'socials_portfolio':
                return <div className='socials_item_edit'>
                    <input className='editInput' style={{ ...calcFontDimensions(), ...inWidth(editVal.label) }} type="text" value={editVal.label} onChange={(ev) => setEditVal({ label: ev.target.value, value: editVal.value })} />
                    <input className='editInput' style={{ ...calcFontDimensions(), ...inWidth(editVal.value) }} type="text" value={editVal.value} onChange={(ev) => setEditVal({ label: editVal.label, value: ev.target.value })} />
                    <BiCheck onClick={() => { handleSubmit('object', 'socials', { portfolio_label: editVal.label, portfolio_value: editVal.value }); setEditOn(false) }} className='h-7 w-7 text-neutral-800 cursor-pointer' />
                    <MdClose onClick={() => { setEditOn(false) }} className='h-6 w-6 text-neutral-800 cursor-pointer' />
                </div>
            case 'socials_linkedin':
                return <div className='socials_item_edit'>
                    <input className='editInput' style={{ ...calcFontDimensions(), ...inWidth(editVal.label) }} type="text" value={editVal.label} onChange={(ev) => setEditVal({ label: ev.target.value, value: editVal.value })} />
                    <input className='editInput' style={{ ...calcFontDimensions(), ...inWidth(editVal.value) }} type="text" value={editVal.value} onChange={(ev) => setEditVal({ label: editVal.label, value: ev.target.value })} />
                    <BiCheck onClick={() => { handleSubmit('object', 'socials', { linkedin_label: editVal.label, linkedin_value: editVal.value }); setEditOn(false) }} className='h-7 w-7 text-neutral-800 cursor-pointer' />
                    <MdClose onClick={() => { setEditOn(false) }} className='h-6 w-6 text-neutral-800 cursor-pointer' />
                </div>
            case 'socials_github':
                return <div className='socials_item_edit'>
                    <input className='editInput' style={{ ...calcFontDimensions(), ...inWidth(editVal.label) }} type="text" value={editVal.label} onChange={(ev) => setEditVal({ label: ev.target.value, value: editVal.value })} />
                    <input className='editInput' style={{ ...calcFontDimensions(), ...inWidth(editVal.value) }} type="text" value={editVal.value} onChange={(ev) => setEditVal({ label: editVal.label, value: ev.target.value })} />
                    <BiCheck onClick={() => { handleSubmit('object', 'socials', { github_label: editVal.label, github_value: editVal.value }); setEditOn(false) }} className='h-7 w-7 text-neutral-800 cursor-pointer' />
                    <MdClose onClick={() => { setEditOn(false) }} className='h-6 w-6 text-neutral-800 cursor-pointer' />
                </div>
        }
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

export default EditableLink;