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
        switch (type) {
            case 'fullname': { return { fontSize: `calc(${pageWidth}px * 0.044)`, lineHeight: `calc(${pageWidth}px * 0.046)` } }
            case 'role': { return { fontSize: `calc(${pageWidth}px * 0.024)`, lineHeight: `calc(${pageWidth}px * 0.026)` } }
            case 'edit_actions': { return { top: `calc(${pageWidth}px * -0.007)`, right: 0 } }
            case 'edit_icon': { return { height: `calc(${pageWidth}px * 0.018)`, width: `calc(${pageWidth}px * 0.018)` } }
        }
    }

    const normalView = () => {
        switch (field) {
            case 'fullname': return <h1 onClick={() => setEditOn(true)} className={field} style={calcFontDimensions("fullname")}>{editVal}</h1>
            case 'role': return <h2 onClick={() => setEditOn(true)} className={field} style={calcFontDimensions("role")}>{editVal}</h2>
        }
    }

    const editView = () => {
        switch (field) {
            case 'fullname':
            case 'role':
            case 'objective_title':
            case 'skill_label': return <div className='edit_root'>
                <input autoFocus className='edit_input' style={{ ...calcFontDimensions(field), ...inWidth() }} type="text" value={editVal} onChange={(ev) => setEditVal(ev.target.value)} />
                <div className='edit_actions' style={{ ...calcFontDimensions("edit_actions") }}>
                    <BiCheck onClick={() => { handleSubmit('string', field, editVal); setEditOn(false) }} style={{ ...calcFontDimensions("edit_icon") }} className='edit_icon' />
                    <MdClose onClick={() => { setEditOn(false) }} style={{ ...calcFontDimensions("edit_icon") }} className='edit_icon' />
                </div>
            </div>
        }
    }

    return (
        <>
            {!editOn ?
                normalView()
                :
                editView()
            }
        </>
    )
}

export default EditableInput;