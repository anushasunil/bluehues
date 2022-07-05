import "./LoginPage.css"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useLogin } from "../../contexts/login/login-context";

export const LoginPage = () => {

    const [inputType, setInputType] = useState("password");
    const {
        userCredentials, 
        loginDispatch, 
        loginHandler, 
        validationMessage
    } = useLogin();
    const inputTypeHandler = () => {
        (inputType === "password")?
            setInputType("text")
            : 
            setInputType("password");
    }

    return(
        <div className="login-page display-align-center display-justify-center">
            <div className="image-container display-align-start">
                <img src="assets/login-header.svg" alt="login-header-img"/>
            </div>
            <form className="login-form"
                onSubmit={(e) => {loginHandler(e, userCredentials)}}
            >
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
                                            loginDispatch({type: "EMAIL", payload: e.target.value})
                                    }}  
                                />
                            </div>
                        </div>
                    </li>
                    <li>
                        <label forlabel="Password">
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
                                            loginDispatch({type: "PASSWORD", payload: e.target.value})
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
                         {validationMessage && (<small className="validation-message bold">{validationMessage}</small>)} 
                    </li>
                </ul>
                <div className="actions display-align-center display-justify-space-between">
                    <div className="save-my-info display-align-center">
                        <input 
                            type="checkbox" 
                            name="remember-me" 
                            className="checkbox"
                        />
                        <label className="">Save my Info</label>
                    </div>
                    <span>
                        <label className="clickable-image">Forgot your Password?</label>
                    </span>
                </div>
                <div className="action-btn display-flex-column">
                    <button 
                        className="solid-primary" 
                        type="submit"
                    >
                        <p className="bold">LOG IN</p>
                    </button>
                    <button className="icon-with-text transparent display-align-center display-justify-center">
                        <p>
                            <Link to="/signup">Create a New Account</Link>
                        </p>
                        <i className="fa-solid fa-angle-right"></i>
                    </button>
                </div>
            </form>
        </div>
    )
}