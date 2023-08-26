import { useEffect, useRef, useState } from 'react';
import '../styles/Editor.css';

const EditableInput = (props) => {
    const { pageWidth, field, in_type, val, handleInputChange } = props;

    const [editOn, setEditOn] = useState(false);
    const inWidth = () => {
        return { width: val.length + 'ch' };
    }

    const changeHandler = () => {
    }

    const calcFontDimensions = () => {
        switch (field) {
            case 'fullname': { return { fontSize: `calc(${pageWidth}px * 0.039)`, lineHeight: `calc(${pageWidth}px * 0.039)` } }
            case 'role': { return { fontSize: `calc(${pageWidth}px * 0.023)`, lineHeight: `calc(${pageWidth}px * 0.023)` } }
        }
    }

    const normalView = () => {
        switch (field) {
            case 'fullname': return <h1 onClick={() => setEditOn(true)} className={field} style={calcFontDimensions()}>{val}</h1>
            case 'role': return <h2 onClick={() => setEditOn(true)} className={field} style={calcFontDimensions()}>{val}</h2>
            case 'objective_title': return <h2 onClick={() => setEditOn(true)} className={field} style={calcFontDimensions()}>{val}</h2>
            case 'skill_label': return <div onClick={() => setEditOn(true)} style={calcFontDimensions()} >{val}</div>
        }
    }

    return (
        <>
            {!editOn ?
                normalView()
                :
                <input className='editInput' style={{ ...calcFontDimensions(), ...inWidth() }} type={in_type} value={val} onChange={changeHandler} />
            }
        </>
    )
}

export default EditableInput;