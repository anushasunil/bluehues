import axios from "axios";
import { createContext, useContext, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginContext = createContext("");
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
    console.log("got it here in login ", action);

    switch(action.type) {
        case "DETAILS" : 
            return {...userInfo, details: action.payload}
        case "ENCODED_TOKEN" :
            return {...userInfo, encodedToken: action.payload}
        default: return ({...userInfoTemplate})
    }
}

const LoginContextProvider = ({children}) => {
    const [userCredentials, loginDispatch] = useReducer(loginReducer, defaultCredentialTemplate);
    const [isUserLoggedIn , setUserLoggedIn] = useState(false);
    const [userInfo, userInfoDispatch] = useReducer(userInfoReducer, userInfoTemplate);
    const [validationMessage, setValidationMessage] = useState("");
    const navigate = useNavigate();

    const loginHandler = async (e, creds) => {
        e.preventDefault();
        try {
            const emptyFields = Object.keys(creds).filter(attribute => creds[attribute] === "");
            if(emptyFields.length === 0)
            {
                const response = await axios.post("/api/auth/login", creds);
                setValidationMessage("");
                if(response.status === 200) {
                    setUserLoggedIn(true);
                    userInfoDispatch({type: "DETAILS", payload : response.data.foundUser});
                    userInfoDispatch({type: "ENCODED_TOKEN", payload : response.data.encodedToken});
                    navigate("/");
                    localStorage.setItem("userName", response.data.foundUser.firstName);
                    localStorage.setItem("token", response.data.encodedToken);
                }
            }
            else {
                setValidationMessage("*Please fill all the fields");
            }
        }
        catch(error) {
            if(error.response.status === 401) {
                setValidationMessage("*Incorrect Password. Please try again!");
            }
            else if(error.response.status === 404) {
                navigate("/signup");
            }
            else {
                setValidationMessage("");
            }
        };
    }

    const logoutHandler = () => {
        loginDispatch("KEEP_DEFAULT");
        setUserLoggedIn(false);
        localStorage.setItem("userName", "");
        localStorage.setItem("token", "");
    }

    return (
        <LoginContext.Provider value={{userCredentials, loginDispatch, loginHandler, isUserLoggedIn, setUserLoggedIn, userInfo, logoutHandler, validationMessage, userInfoDispatch}}>
            {children}
        </LoginContext.Provider>
    )
}

const useLogin = () => useContext(LoginContext);

export {useLogin, LoginContextProvider}