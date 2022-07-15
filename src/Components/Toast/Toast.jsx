import { Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Toast.css"

export const Toast = ({ message, type }) => {
  return toast(message, {
    position: toast.POSITION.BOTTOM_CENTER,
    autoClose: 3000,
    type: type,
    transition: Slide,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    
  });
}