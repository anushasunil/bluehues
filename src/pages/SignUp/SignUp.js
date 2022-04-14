import "../LoginPage/LoginPage.css"
import "./SignUp.css"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useSignup } from "../../contexts/signup-context";

export const SignUpPage = () => {

    const {signupDetails, signupDispatch, validationMessage, signupHandler} = useSignup();
    const [inputType, setInputType] = useState("password");
    const [isAPasswordMatch, setPasswordMatch] = useState("");
    const inputTypeHandler = () => {
        (inputType === "password")?
            setInputType("text")
            : 
            setInputType("password");
    }

    const passwordCheck = (confirmPassword) => {
        if(confirmPassword !== signupDetails.password && confirmPassword !== signupDetails.password.length)
            setPasswordMatch("*Passwords do not match");
        else if(confirmPassword === signupDetails.password)
            setPasswordMatch("")
    }

    return(
        <div className="sign-up-page display-align-center display-justify-center">
            <div className="image-container display-align-start">
                <img src="assets/signup-header.svg" alt="login-header-img"/>
            </div>
            <form className="signup-form" onSubmit={(e) => {signupHandler(e, signupDetails)}}>
                <h3 className="form-heading">Log In</h3>
                <ul>
                    <li>
                        <label forlabel="Email-Address">
                            Email Address
                        </label>
                        <div className="input-box display-flex-column">
                            <div className="input-icon-container">
                                <input 
                                type="email" 
                                placeholder="anusha@neog.camp" 
                                className="flex-grow"
                                onChange={(e)=>{
                                    if(e.target.value.length !== 0)
                                        signupDispatch({type: "EMAIL", payload: e.target.value})
                                }}  
                                />
                            </div>
                        </div>
                    </li>
                    <li>
                        <label forlabel="first-name">
                            First Name
                        </label>
                        <div className="input-box display-flex-column">
                            <div className="input-icon-container">
                                <input 
                                type="text" 
                                placeholder="first name" 
                                className="flex-grow"
                                onChange={(e)=>{
                                    if(e.target.value.length !== 0)
                                        signupDispatch({type: "FIRST_NAME", payload: e.target.value})
                                }}  
                                />
                            </div>
                        </div>
                    </li>
                    <li>
                        <label forlabel="first-name">
                            Last Name
                        </label>
                        <div className="input-box display-flex-column">
                            <div className="input-icon-container">
                                <input 
                                type="text" 
                                placeholder="last name" 
                                className="flex-grow"
                                onChange={(e)=>{
                                    if(e.target.value.length !== 0)
                                        signupDispatch({type: "LAST_NAME", payload: e.target.value})
                                }}  
                                />
                            </div>
                        </div>
                    </li>
                    <li>
                        <label forlabel="first-name">
                                Password
                        </label>
                        <div className="input-box display-flex-column">
                            <div className="input-icon-container display-align-center">
                                <input 
                                    type={inputType} 
                                    placeholder="password" 
                                    className="flex-grow"
                                    onChange={(e)=>{
                                        if(e.target.value.length !== 0)
                                            signupDispatch({type: "PASSWORD", payload: e.target.value})
                                    }}  
                                />
                                <i 
                                    className="fa-solid fa-eye inner-icon clickable-object"
                                    onClick={inputTypeHandler}
                                ></i>
                            </div>
                        </div>
                    </li>
                    <li>
                        <label forlabel="confirm-password">
                                Confirm Password
                        </label>
                        <div className="input-box display-flex-column">
                            <div className="input-icon-container display-align-center">
                                <input 
                                    type={inputType} 
                                    placeholder="re-enter password" 
                                    className="flex-grow"
                                    onChange={(e)=>{
                                        if(e.target.value.length !== 0)
                                            passwordCheck(e.target.value)
                                    }}  
                                />
                                <i 
                                    className="fa-solid fa-eye inner-icon clickable-object"
                                    onClick={inputTypeHandler}
                                ></i>
                            </div>
                        </div>
                    </li>
                    <li>
                        {isAPasswordMatch && <small className="validation-message">{isAPasswordMatch}</small>}
                    </li>
                    <li>
                        <label forlabel="phone-no">
                            Contact no.
                        </label>
                        <div className="input-box display-flex-column">
                            <div className="input-icon-container">
                                <input 
                                type="number" 
                                maxLength={10}

                                placeholder="phone no." 
                                className="flex-grow"
                                onChange={(e)=>{
                                    if(e.target.value.length !== 0)
                                        signupDispatch({type: "PHONE_NO", payload: e.target.value})
                                }}  
                                />
                            </div>
                        </div>
                    </li>
                    <li>
                         {validationMessage && (<small className="validation-message bold">{validationMessage}</small>)} 
                    </li>
                </ul>
                <div className="action-btn display-flex-column">
                    <button 
                        className="solid-primary" 
                        type="submit"
                    >
                        <p className="bold">SIGN UP</p>
                    </button>
                    <button className="icon-with-text transparent display-align-center display-justify-center clickable-object">
                        <p>
                            <Link to="/login">Already have an account? LOG IN</Link>
                        </p>
                        <i className="fa-solid fa-angle-right"></i>
                    </button>
                </div>
            </form>
        </div>
    )
}