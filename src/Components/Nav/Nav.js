import { useLogin } from "../../contexts/login/login-context"
import "./Nav.css"
import { Link } from "react-router-dom";

export const Nav = () => {
    const { isUserLoggedIn, userInfo : { details } , logoutHandler } = useLogin();
    return (
        <nav className="display-align-center display-justify-space-between">
            <h1 className="brand-name">bluehues</h1>
            <ul className="navbar display-align-center">
              { !isUserLoggedIn &&  <li className="navbar-action display-align-center clickable-object">
                    <i className="fa-solid fa-user"></i>
                    <Link to="/login"><p>Sign in</p></Link>
                </li>}
                { isUserLoggedIn &&  <li className="navbar-action display-align-center clickable-object">
                <i className="fa-solid fa-user navbar-icon"></i>
                <p>{details}</p>
            </li>}
            { isUserLoggedIn && <li className="navbar-action display-align-center clickable-object">
                <i className="fa-solid fa-power-off navbar-icon" onClick={logoutHandler}></i>
            </li>}
            </ul>
        </nav>
    )
}