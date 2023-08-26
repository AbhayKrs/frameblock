import { useEffect, useRef, useState } from 'react';
import '../styles/Editor.css';

const EditableLink = (props) => {
    const { pageWidth, field, in_type, val, handleInputChange } = props;

    const [editOn, setEditOn] = useState(false);
    const inWidth = () => {
        return { width: val.length + 'ch' };
    }

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

    const normalView = () => {
        switch (field) {
            case 'socials_phone': return <span onClick={() => setEditOn(true)} style={calcFontDimensions()}>{val}</span>
            case 'socials_email': return <span onClick={() => setEditOn(true)} style={calcFontDimensions()}>{val}</span>
            case 'socials_portfolio': return <span onClick={() => setEditOn(true)} style={calcFontDimensions()}>{val}</span>
            case 'socials_linkedin': return <span onClick={() => setEditOn(true)} style={calcFontDimensions()}>{val}</span>
            case 'socials_github': return <span onClick={() => setEditOn(true)} style={calcFontDimensions()}>{val}</span>
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

export default EditableLink;