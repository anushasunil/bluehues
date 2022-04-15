import { useLogin } from "../../contexts/login-context"
import { Link } from "react-router-dom"
import "./Nav.css"

export const Nav = () => {
    const { isUserLoggedIn, userInfo, logoutHandler } = useLogin();
    return (
        <nav className="display-align-center display-justify-space-between">
            <h1 className="brand-name">bluehues</h1>
            <ul className="navbar display-align-center">
              { (isUserLoggedIn)? 
                <li className="navbar-action display-align-center clickable-object">
                    <i className="fa-solid fa-user navbar-icon"></i>
                    <p>{userInfo.details.firstName}</p>
                    <i className="fa-solid fa-power-off navbar-icon" onClick={logoutHandler}></i>
                </li> 
                : 
                <li className="navbar-action display-align-center clickable-object">
                    <i className="fa-solid fa-user navbar-icon"></i>
                    <Link to="/login"><p>Login</p></Link>
                </li>}
            </ul>
        </nav>
    )
}