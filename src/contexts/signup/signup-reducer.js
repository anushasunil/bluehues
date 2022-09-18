const defaultSignUpdetailsTemplate = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
}

const signupReducer = (signupDetails, action) => {
    switch(action.type) {
        case "EMAIL" :
            return {...signupDetails, email : action.payload}
        case "PASSWORD" : 
            return {...signupDetails, password : action.payload}
        case "FIRST_NAME" : 
            return {...signupDetails, firstName : action.payload}
        case "LAST_NAME" : 
            return {...signupDetails, lastName : action.payload}
        default: return ({...defaultSignUpdetailsTemplate})
    }
}

export {
    defaultSignUpdetailsTemplate,
    signupReducer
}