import { AppRoutes } from "./AppRoutes";
import { Nav, Footer } from "../src/Components"
import { ToastContainer } from "react-toastify"

function App() {
  return (
    <div className="App">
      <Nav/>
      <AppRoutes/>
      <ToastContainer/>
      <Footer/>
    </div>
  );
}

export default App;