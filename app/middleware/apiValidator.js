import Validator from 'validator';

const validateDraftEdit_Primary = (data) => {
    let errorMsg = '';
    if (Validator.isEmpty(data.templateID) || Validator.isEmpty(data.template_name) || Validator.isEmpty(data.draft_name)) {
        errorMsg = "Required fields not found.";
    }
    return { errorMsg, isValid: Validator.isEmpty(errorMsg) };
}

const validateDraftEdit_Content = (data) => {
    let errorMsg = '';
    if (Validator.isEmpty(data)) {
        errorMsg = "Draft data is empty.";
    }
    return { errorMsg, isValid: Validator.isEmpty(errorMsg) };
}


export { validateDraftEdit_Primary, validateDraftEdit_Content }