const validations = {
    rules: {
        fullname: {
            emptyCheck: false,
            minLenCheck: 8,
            maxLenCheck: 16,
            specialCharsCheck: false,
            numberCheck: false
        },
        mailid: {
            emptyCheck: false,
            NEUMailIDCheck: true
        },
        password: {
            emptyCheck: false,
            minLenCheck: 8,
            maxLenCheck: 16,
            specialCharsCheck: true,
            numberCheck: true,
            uppercaseLettersCheck: true,
            lowercaseLettersCheck: true
        }
    },

    errorMessages: {
        fullname: {
            emptyCheck: "fullname cannot be empty",
            minLenCheck: "fullname should have minimum 8 characters",
            maxLenCheck: "fullname should not exceed 16 characters",
            specialCharsCheck: "fullname should not contain special characters",
            numberCheck: "fullname should not contain numbers",
        },
        mailid: {
            emptyCheck: "Email cannot be empty",
            NEUMailIDCheck: "Please enter northeastern mail id",
        },
        password: {
            emptyCheck: "Password cannot be empty",
            minLenCheck: "Password should have minimum 8 characters",
            maxLenCheck: "Password should not exceed 16 characters",
            specialCharsCheck: "Password should contain atleast 1 special character",
            numberCheck: "Password should contain atleast 1 number",
            uppercaseLettersCheck: "Password should contain atleast one uppercase letter",
            lowercaseLettersCheck: "Password should contain atleast one lowercase letter"
        }
    },

    emptyCheck: (input, rule) => {
        if (input === null || input === "" || input.length === 0) {
            return false
        } else {
            return true
        }
    },

    maxLenCheck: (input, max) => {
        return input.length > max ? false : true
    },

    minLenCheck: (input, min) => {
        return input.length < min ? false : true
    },

    specialCharsCheck: (input, rule) => {
        const regex = /[^((0-9)|(a-z)|(A-Z)|_|\-|\s)]/
        const result = regex.test(input)
        if (result === rule)
            return true
        return false
    },

    numberCheck: (input, rule) => {
        const regex = /\d/
        const result = regex.test(input)
        if (result === rule)
            return true
        return false
    },

    NEUMailIDCheck: (input, rule) => {
        const regex = /([\w\.]+)@(northeastern)\.(edu)/
        const result = regex.test(input)
        if (result === rule)
            return true
        return false
    },

    alphabetsCheck: (input, rule) => {
        const regex = /[A-Za-z]/
        const result = regex.test(input)
        if (result === rule)
            return true
        return false
    },

    uppercaseLettersCheck: (input, rule) => {
        const regex = /[A-Z]/
        const result = regex.test(input)
        if (result === rule)
            return true
        return false
    },

    lowercaseLettersCheck: (input, rule) => {
        const regex = /[a-z]/
        const result = regex.test(input)
        if (result === rule)
            return true
        return false
    }
}

function validateUser(fullname, mailid, password) {
    const errorMsgs = {
    };

    if(fullname != null){
        errorMsgs.fullnameErrors= []
        Object.entries(validations.rules.fullname).forEach((k) => {
            if (!validations[k[0]](fullname, k[1])) {
                errorMsgs["fullnameErrors"].push(validations.errorMessages.fullname[k[0]])
            }
        })
        if(errorMsgs.fullnameErrors.length<= 0)
            delete errorMsgs.fullnameErrors
    }

    if(mailid != null){
        errorMsgs.mailErrors= []
        Object.entries(validations.rules.mailid).forEach((k) => {
            if (!validations[k[0]](mailid, k[1])) {
                errorMsgs["mailErrors"].push(validations.errorMessages.mailid[k[0]])
            }
        })

        if(errorMsgs.mailErrors.length<= 0)
            delete errorMsgs.mailErrors
    }

    if(password != null){
        errorMsgs.passwordErrors= []
        Object.entries(validations.rules.password).forEach((k) => {
            if (!validations[k[0]](password, k[1])) {
                errorMsgs["passwordErrors"].push(validations.errorMessages.password[k[0]])
            }
        })
        if(errorMsgs.passwordErrors.length<= 0)
            delete errorMsgs.passwordErrors
    }

    return errorMsgs;
}
module.exports = validateUser