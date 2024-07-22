// import '../styles/Editor.css';

const EditableInput = (props) => {
    const { field, editorWidth, editOn, val, hndlChange } = props;

    const inWidth = (field, value) => {
        let fntSize;
        switch (field) {
            case 'fullname': { fntSize = editorWidth * 0.042; break; }
            case 'role': { fntSize = editorWidth * 0.022; break; }
            default: fntSize = editorWidth * 0.018;
        }

        const inpWidth = fntSize / 2 * (value.length + 1.5);
        console.log("width", inpWidth)
        return { width: inpWidth + 'px' }
    }

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
            case 'skill_label': return <div className='edit_root'>
                <span className='edit_label'>{field}</span>
                <input type="text" className='edit_input' style={{ ...inWidth(field, val) }} value={val} onChange={(ev) => hndlChange('string', field, ev.target.value)} />
            </div>
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