import { useEffect, useRef, useState } from 'react';
import '../styles/Editor.css';

import { AiFillMobile, AiFillHome } from 'react-icons/ai';
import { GrMail } from 'react-icons/gr';
import { BsLinkedin } from 'react-icons/bs';
import { FaGithubSquare } from 'react-icons/fa';
import { phone_codes } from '../utils/editorValues';

const EditableLink = (props) => {
    const { pageWidth, field, val, handleInputChange } = props;

    const [editVal, setEditVal] = useState(val);
    const [editOn, setEditOn] = useState(false);
    const inWidth = (value) => {
        if (value === undefined) {
            return { width: '0ch' }
        }
        return { width: value.length + 'ch' };
    }

    useEffect(() => {
        setEditVal(val);
    }, [val])

    const changeHandler = () => {
    }

    const calcFontDimensions = () => {
        switch (field) {
            case 'socials_phone':
            case 'socials_email':
            case 'socials_portfolio':
            case 'socials_linkedin':
            case 'socials_github': { return { fontSize: `calc(${pageWidth}px * 0.019)`, lineHeight: `calc(${pageWidth}px * 0.019)` } }
        }
    }

    const linkIcon = () => {
        switch (field) {
            case 'socials_phone': return <AiFillMobile className="social_icons" />
            case 'socials_email': return <GrMail className="social_icons" />
            case 'socials_portfolio': return <AiFillHome className="social_icons" />
            case 'socials_linkedin': return <BsLinkedin className="social_icons" />
            case 'socials_github': return <FaGithubSquare className="social_icons" />
        }
    }

    const normalView = () => {
        switch (field) {
            case 'socials_phone':
                return <div className='flex flex-row gap-1 items-center' onClick={() => setEditOn(true)} style={calcFontDimensions()}>
                    {linkIcon()} {editVal.code + " " + editVal.number}
                </div>
            case 'socials_email':
                return <div className='flex flex-row gap-1 items-center' onClick={() => setEditOn(true)} style={calcFontDimensions()}>
                    {linkIcon()} {editVal}
                </div>
            case 'socials_portfolio':
                return <div className='flex flex-row gap-1 items-center' onClick={() => setEditOn(true)} style={calcFontDimensions()}>
                    {linkIcon()} {editVal}
                </div>
            case 'socials_linkedin':
                return <div className='flex flex-row gap-1 items-center' onClick={() => setEditOn(true)} style={calcFontDimensions()}>
                    {linkIcon()} {editVal}
                </div>
            case 'socials_github':
                return <div className='flex flex-row gap-1 items-center' onClick={() => setEditOn(true)} style={calcFontDimensions()}>
                    {linkIcon()} {editVal}
                </div>
        }
    }

    const editView = () => {
        switch (field) {
            case 'socials_phone':
                return <div className='flex flex-row gap-1'>
                    <select className='editSelect' style={{ ...calcFontDimensions() }} value={editVal.code} onChange={(ev) => setEditVal({ code: ev.target.value, number: editVal.number })}>
                        <option value=""> </option>
                        {phone_codes.map(item => (
                            <option value={item.value}>{item.label}</option>
                        ))}
                    </select>
                    <input className='editInput' style={{ ...calcFontDimensions(), ...inWidth(editVal.number) }} type="tel" maxLength={10} value={editVal.number} onChange={(ev) => setEditVal({ code: editVal.code, number: ev.target.value })} />
                </div>
            case 'socials_email':
                return <div className='flex flex-row gap-1'>
                    <input className='editInput' style={{ ...calcFontDimensions(), ...inWidth(editVal) }} type="email" value={editVal} onChange={(ev) => setEditVal(ev.target.value)} />
                </div>
            case 'socials_portfolio':
                return <div className='flex flex-row gap-1'>
                    <input className='editInput' style={{ ...calcFontDimensions(), ...inWidth(editVal) }} type="text" value={editVal} onChange={(ev) => setEditVal(ev.target.value)} />
                </div>
            case 'socials_linkedin':
                return <div className='flex flex-row gap-1'>
                    <input className='editInput' style={{ ...calcFontDimensions(), ...inWidth(editVal) }} type="text" value={editVal} onChange={(ev) => setEditVal(ev.target.value)} />
                </div>
            case 'socials_github':
                return <div className='flex flex-row gap-1'>
                    <input className='editInput' style={{ ...calcFontDimensions(), ...inWidth(editVal) }} type="text" value={editVal} onChange={(ev) => setEditVal(ev.target.value)} />
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