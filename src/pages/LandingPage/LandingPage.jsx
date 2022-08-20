import { useLogin } from "../../contexts/login/login-context"
import "./LandingPage.css"
import { Link } from "react-router-dom";

export const Home = () => {
    const { isUserLoggedIn } = useLogin();
    return (
       <div className="home-page display-align-center display-justify-center">
           <div className="image-container">
              <img className="header-gif" src="assets/diary.gif" alt="header-gif"/>
           </div>
           <div className="contents display-flex-column">
                <h1 className="heading">Feel organized without the effort!</h1>
                <p className="brand-description"> 
                    <span className="bold">bluehues </span> 
                        helps you to prioritize ideas, journals and to-do lists, so nothing falls through the cracks!
                </p>
               <Link to={isUserLoggedIn? "/dashboard": "/login"}><button className="solid-primary clickable-object">get started</button></Link>
           </div>
       </div>
    )
}