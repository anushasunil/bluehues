import { useLogin } from "../contexts";
import { Navigate } from "react-router-dom";
export const RequiresAuth = ({children}) => {
    const { isUserLoggedIn } = useLogin();
    return (
        isUserLoggedIn? children : <Navigate replace to="/login"/>
    )
}