// import '../styles/Editor.css';
import { useEffect, useState } from "react";

const EditableInput = (props) => {
    const { field, editorWidth, editOn, val, hndlChange } = props;

    const [editInWidth, setEditInWidth] = useState(editorWidth * 0.018);

    const getTextWidth = (text, inputElement) => {
        const computedStyle = inputElement ? window.getComputedStyle(inputElement) : null;
        const font = `${computedStyle?.fontStyle} ${computedStyle?.fontVariant} ${computedStyle?.fontWeight} ${computedStyle?.fontSize} ${computedStyle?.fontFamily}`;

        // Handle text-transform
        const transform = computedStyle?.textTransform;
        if (transform === 'uppercase') {
            text = text.toUpperCase();
        } else if (transform === 'lowercase') {
            text = text.toLowerCase();
        } else {
            text = text.replace(/\b\w/g, char => char.toUpperCase()) + " ";
        }

        // Get letter-spacing
        let letterSpacing = 0;
        const spacingStr = computedStyle?.letterSpacing;
        if (spacingStr && spacingStr !== 'normal') {
            letterSpacing = parseFloat(spacingStr); // px
        }

        // Setup canvas
        const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
        const context = canvas.getContext("2d");
        context.font = font;

        let totalWidth = 0;
        for (let i = 0; i < text.length; i++) {
            totalWidth += context.measureText(text[i]).width;
            if (i < text.length - 1) totalWidth += letterSpacing;
        }

        return totalWidth + 5;
    }

    useEffect(() => {
        if (val) {
            const inputElement = document.querySelector(`input.${field}`);
            const inpWidth = getTextWidth(val, inputElement);
            setEditInWidth(inpWidth);
        }
    }, [editOn, editorWidth, val]);

    const normalView = () => {
        switch (field) {
            case 'fullname': return <h1 className={field}>{val}</h1>
            case 'role': return <h2 className={field}>{val}</h2>
        }
    }

    const editView = () => {
        switch (field) {
            case 'fullname':
            case 'role':
            case 'objective_title':
            case 'skill_label': return <input className={field} type="text" style={{ width: editInWidth + "px" }} value={val} onChange={(ev) => hndlChange('string', field, ev.target.value)} />
            default: return null
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