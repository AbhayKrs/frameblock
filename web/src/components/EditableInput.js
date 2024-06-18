import { useEffect, useRef, useState } from 'react';
// import '../styles/Editor.css';

import { BiCheck } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';

const EditableInput = (props) => {
    const { field, editOn, val, handleSubmit } = props;
    const [editVal, setEditVal] = useState(val);

    useEffect(() => {
        setEditVal(val);
    }, [val])

    const inWidth = () => {
        let len = editVal.length;
        len += 1.5;
        return { width: len + 'ch' };
    }

    const normalView = () => {
        switch (field) {
            case 'fullname': return <h1 className={field}>{editVal}</h1>
            case 'role': return <h2 className={field}>{editVal}</h2>
        }
    }

    const editView = () => {
        switch (field) {
            case 'fullname':
            case 'role':
            case 'objective_title':
            case 'skill_label': return <div className='edit_root' >
                <input autoFocus className='edit_input' style={{ ...inWidth() }} type="text" value={editVal} onChange={(ev) => setEditVal(ev.target.value)} />
                <div className='edit_actions' >
                    <BiCheck onClick={() => { handleSubmit('string', field, editVal) }} className='edit_icon' />
                    <MdClose className='edit_icon' />
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