import Validator from 'validator';

const validateSigninInput = (users, data) => {
    let errorMsg = '';
    let usernameList = users.map(item => { return item.username });
    if (Validator.isEmpty(data.username) || !Validator.isIn(data.username, usernameList)) {
        // Username checks
        errorMsg = "The entered username or email does not match any existing user.";
    } else if (Validator.isEmpty(data.password)) {
        // Password checks
        errorMsg = "Password field is required";
    }
    // isStrongPassword(data.password,{ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10 })
    return { errorMsg, isValid: Validator.isEmpty(errorMsg) };
}

const validateSignupInput = (userData) => {
    let errors = '';
    if (Validator.isEmpty(userData.name) || !Validator.isAlpha(userData.name, 'en-US', { ignore: " " })) {
        errors = 'Please enter a valid name for your account.'
    } else if (Validator.isEmpty(userData.username) || !Validator.isAlphanumeric(userData.username, 'en-US', { ignore: '-[]{}.()*_:' })) {
        errors = 'Please enter a valid username for your account.'
    } else if (Validator.isEmpty(userData.name) || !Validator.isEmail(userData.email)) {
        errors = 'Please enter a valid email for your account.'
    } else if (Validator.isEmpty(userData.password) || !Validator.isStrongPassword(userData.password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false })) {
        errors = 'Please enter a valid password for your account.'
    }

    return { errors, isValid: Validator.isEmpty(errors) };
}


export { validateSigninInput, validateSignupInput }