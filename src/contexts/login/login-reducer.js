const defaultCredentialTemplate = {
    email: "",
    password: ""
}

const userInfoTemplate = {
    details: "",
    encodedToken: ""
};

const loginReducer = (userCredentials, action) => {
    switch(action.type) {
        case "EMAIL" :
            return {...userCredentials, email : action.payload}
        case "PASSWORD" : 
            return {...userCredentials, password : action.payload}
        default: return ({...defaultCredentialTemplate})
    }
}

const userInfoReducer = (userInfo, action) => {
    switch(action.type) {
        case "DETAILS" : 
            return {...userInfo, details: action.payload}
        case "ENCODED_TOKEN" :
            return {...userInfo, encodedToken: action.payload}
        default: return ({...userInfoTemplate})
    }
}

export {
    defaultCredentialTemplate, 
    userInfoReducer, 
    userInfoTemplate, 
    loginReducer
}