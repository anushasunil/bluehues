import "./Nav.css"
export const Nav = () => {
    return (
        <nav className="display-align-center display-justify-space-between">
            <h1 className="brand-name">bluehues</h1>
            <ul className="navbar">
                <li className="navbar-action display-align-center clickable-object">
                    <i class="fa-solid fa-user"></i>
                    <p>Login</p>
                </li>
            </ul>
        </nav>
    )
}