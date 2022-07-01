import axios from "axios";
import { 
    createContext, 
    useContext, 
    useReducer, 
    useState 
} from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../login/login-context";
import { 
    signupReducer, 
    defaultSignUpdetailsTemplate 
} from "./signup-reducer";

const SignupContext = createContext("");

const SignupContextProvider = ({children}) => {
    const [signupDetails, signupDispatch] = useReducer(signupReducer, defaultSignUpdetailsTemplate);
    const [validationMessage, setValidationMessage] = useState("");
    const navigate = useNavigate();
    const {setUserLoggedIn, userInfoDispatch} = useLogin();


    const signupHandler = async (e, creds) => {
        try {
            e.preventDefault();
            const emptyFields = Object.keys(creds).filter(attribute => creds[attribute] === "");
            if(emptyFields.length === 0)
            {
                const response = await axios.post("/api/auth/signup", creds);
               if(response.status === 201)
               {
                    setUserLoggedIn(true);
                    userInfoDispatch({type: "DETAILS", payload : creds});
                    navigate("/");
               }
            }
            else {
                setValidationMessage("*Please fill all the fields")
            }
        }
        catch(error) {
            console.error(error)
        }
    }

    return (
        <SignupContext.Provider value={{signupDetails, signupDispatch, signupHandler, validationMessage}}>
            {children}
        </SignupContext.Provider>
    )
}

const useSignup = () => useContext(SignupContext);

export {
    useSignup, 
    SignupContextProvider
}