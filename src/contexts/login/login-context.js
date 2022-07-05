import axios from "axios";
import { 
    createContext, 
    useContext, 
    useEffect, 
    useReducer, 
    useState 
} from "react";
import { useNavigate } from "react-router-dom";
import { 
    userInfoTemplate, 
    userInfoReducer, 
    defaultCredentialTemplate,  
    loginReducer
} from "./login-reducer";

const LoginContext = createContext("");

const LoginContextProvider = ({children}) => {
    const [userCredentials, loginDispatch] = useReducer(loginReducer, defaultCredentialTemplate);
    const [isUserLoggedIn , setUserLoggedIn] = useState(false);
    const [userInfo, userInfoDispatch] = useReducer(userInfoReducer, userInfoTemplate);
    const [validationMessage, setValidationMessage] = useState("");
    const navigate = useNavigate();

    
   useEffect(()=>{
       if(localStorage.getItem("token")){
            setUserLoggedIn(true)
            userInfoDispatch({type: "DETAILS", payload: JSON.parse(localStorage.getItem("userInfo"))});
            userInfoDispatch({type: "ENCODED_TOKEN", payload: localStorage.getItem("token")});
       }
   },[isUserLoggedIn])

    const loginHandler = async (e, creds) => {
        e.preventDefault();
        try {
            const emptyFields = Object.keys(creds).filter(attribute => creds[attribute] === "");
            if(emptyFields.length === 0)
            {
                const {data : {foundUser, encodedToken}, status} = await axios.post("/api/auth/login", creds);
                setValidationMessage("");
                if(status === 200) {
                    setUserLoggedIn(true);
                    userInfoDispatch({type: "DETAILS", payload : foundUser});
                    userInfoDispatch({type: "ENCODED_TOKEN", payload : encodedToken});
                    navigate("/");
                    localStorage.setItem("userName", foundUser.firstName);
                    localStorage.setItem("token", encodedToken);
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
        };
    }

    const logoutHandler = () => {
        loginDispatch("KEEP_DEFAULT");
        setUserLoggedIn(false);
        localStorage.removeItem("userInfo");
        localStorage.removeItem("token");
    }

    return (
        <LoginContext.Provider value={{userCredentials, loginDispatch, loginHandler, isUserLoggedIn, setUserLoggedIn, userInfo, logoutHandler, validationMessage, userInfoDispatch}}>
            {children}
        </LoginContext.Provider>
    )
}

const useLogin = () => useContext(LoginContext);

export {useLogin, LoginContextProvider}