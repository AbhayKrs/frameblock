import { useEffect, useRef, useState } from 'react';
import '../styles/Editor.css';

import { BiCheck } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';

const EditableInput = (props) => {
    const { pageWidth, field, editOn, val, handleSubmit } = props;

    const [editVal, setEditVal] = useState(val);

    useEffect(() => {
        setEditVal(val);
    }, [val])

    const inWidth = () => {
        let len = editVal.length;
        len += 1.5;
        return { width: len + 'ch' };
    }

    const calcStyling = (type) => {
        switch (type) {
            case 'edit_root': { return { padding: `calc(${pageWidth}px * 0.012)`, borderRadius: `calc(${pageWidth}px * 0.004)` } }
            case 'fullname': { return { fontSize: `calc(${pageWidth}px * 0.044)`, lineHeight: `calc(${pageWidth}px * 0.046)` } }
            case 'role': { return { fontSize: `calc(${pageWidth}px * 0.024)`, lineHeight: `calc(${pageWidth}px * 0.026)` } }
            case 'edit_actions': { return { top: `calc(${pageWidth}px * -0.007)`, right: 0 } }
            case 'edit_icon': { return { height: `calc(${pageWidth}px * 0.020)`, width: `calc(${pageWidth}px * 0.020)` } }
        }
    }

    const normalView = () => {
        switch (field) {
            case 'fullname': return <h1 className={field} style={calcStyling("fullname")}>{editVal}</h1>
            case 'role': return <h2 className={field} style={calcStyling("role")}>{editVal}</h2>
        }
    }

    const editView = () => {
        switch (field) {
            case 'fullname':
            case 'role':
            case 'objective_title':
            case 'skill_label': return <div className='edit_root' style={{ ...calcStyling("edit_root") }}>
                <input autoFocus className='edit_input' style={{ ...calcStyling(field), ...inWidth() }} type="text" value={editVal} onChange={(ev) => setEditVal(ev.target.value)} />
                <div className='edit_actions' style={{ ...calcStyling("edit_actions") }}>
                    <BiCheck onClick={() => { handleSubmit('string', field, editVal) }} style={{ ...calcStyling("edit_icon") }} className='edit_icon' />
                    <MdClose style={{ ...calcStyling("edit_icon") }} className='edit_icon' />
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