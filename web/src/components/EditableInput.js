import { useEffect, useRef, useState } from 'react';
import '../styles/Editor.css';

import { BiCheck } from 'react-icons/bi';

const EditableInput = (props) => {
    const { pageWidth, field, val, handleSubmit } = props;

    const [editVal, setEditVal] = useState(val);
    const [editOn, setEditOn] = useState(false);

    useEffect(() => {
        setEditVal(val);
    }, [val])

    const inWidth = () => {
        return { width: editVal.length + 'ch' };
    }

    const calcFontDimensions = () => {
        switch (field) {
            case 'fullname': { return { fontSize: `calc(${pageWidth}px * 0.039)`, lineHeight: `calc(${pageWidth}px * 0.039)` } }
            case 'role': { return { fontSize: `calc(${pageWidth}px * 0.023)`, lineHeight: `calc(${pageWidth}px * 0.023)` } }
        }
    }

    const normalView = () => {
        switch (field) {
            case 'fullname': return <h1 onClick={() => setEditOn(true)} className={field} style={calcFontDimensions()}>{editVal}</h1>
            case 'role': return <h2 onClick={() => setEditOn(true)} className={field} style={calcFontDimensions()}>{editVal}</h2>
            case 'objective_title': return <h2 onClick={() => setEditOn(true)} className={field} style={calcFontDimensions()}>{editVal}</h2>
            case 'skill_label': return <div onClick={() => setEditOn(true)} style={calcFontDimensions()} >{editVal}</div>
        }
    }

    return (
        <>
            {!editOn ?
                normalView()
                :
                <div className='flex flex-row gap-1 items-center'>
                    <input className='editInput' style={{ ...calcFontDimensions(), ...inWidth() }} type="text" value={editVal} onChange={(ev) => setEditVal(ev.target.value)} />
                    <BiCheck onClick={() => { handleSubmit(field, editVal); setEditOn(false) }} className='h-7 w-7 text-green-500 cursor-pointer' />
                </div>
            }
        </>
    )
}

export default EditableInput;