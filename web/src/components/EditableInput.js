import { useEffect, useRef, useState } from 'react';
import '../styles/Editor.css';

import { BiCheck } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';

const EditableInput = (props) => {
    const { pageWidth, field, val, handleSubmit } = props;

    const [editVal, setEditVal] = useState(val);
    const [editOn, setEditOn] = useState(false);

    useEffect(() => {
        setEditVal(val);
    }, [val])

    const inWidth = () => {
        let len = editVal.length;
        len += 1;
        return { width: len + 'ch' };
    }

    const calcFontDimensions = (type) => {
        if (type === "normal") {
            switch (field) {
                case 'fullname': { return { fontSize: `calc(${pageWidth}px * 0.044)`, lineHeight: `calc(${pageWidth}px * 0.046)` } }
                case 'role': { return { fontSize: `calc(${pageWidth}px * 0.024)`, lineHeight: `calc(${pageWidth}px * 0.026)` } }
            }
        } else if (type === "edit") {
            switch (field) {
                case 'fullname': { return { fontSize: `calc(${pageWidth}px * 0.044)`, lineHeight: `normal` } }
                case 'role': { return { fontSize: `calc(${pageWidth}px * 0.024)`, lineHeight: `normal` } }
            }
        }
    }

    const normalView = () => {
        switch (field) {
            case 'fullname': return <h1 onClick={() => setEditOn(true)} className={field} style={calcFontDimensions("normal")}>{editVal}</h1>
            case 'role': return <h2 onClick={() => setEditOn(true)} className={field} style={calcFontDimensions("normal")}>{editVal}</h2>
            case 'objective_title': return <h2 onClick={() => setEditOn(true)} className={field} style={calcFontDimensions("normal")}>{editVal}</h2>
            case 'skill_label': return <div onClick={() => setEditOn(true)} style={calcFontDimensions("normal")} >{editVal}</div>
        }
    }

    return (
        <>
            {!editOn ?
                normalView()
                :
                <div className='flex flex-row items-center border-b-2 border-gray-300'>
                    <input autoFocus className='editInput' style={{ ...calcFontDimensions("edit"), ...inWidth() }} type="text" value={editVal} onChange={(ev) => setEditVal(ev.target.value)} />
                    <BiCheck onClick={() => { handleSubmit('string', field, editVal); setEditOn(false) }} className='h-7 w-7 text-neutral-800 cursor-pointer' />
                    <MdClose onClick={() => { setEditOn(false) }} className='h-6 w-6 text-neutral-800 cursor-pointer' />
                </div>
            }
        </>
    )
}

export default EditableInput;