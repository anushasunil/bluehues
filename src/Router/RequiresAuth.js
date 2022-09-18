import { useLogin } from "../contexts";
import { Navigate } from "react-router-dom";
export const RequiresAuth = ({children}) => {
    const { isUserLoggedIn } = useLogin();
    return (
        (isUserLoggedIn || localStorage.getItem("token"))? children : <Navigate replace to="/login"/>
    )
}