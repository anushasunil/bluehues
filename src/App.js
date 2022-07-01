import { Routes, Route, Navigate } from "react-router-dom";
import { Nav, Footer } from "../src/Components"
import { Home, MockbeeHome, MockmanComponent, LoginPage, SignUpPage, Dashboard} from "../src/pages"
import { useLogin } from "./contexts/login/login-context";

function App() {
  const { isUserLoggedIn } = useLogin();
  return (
    <div className="App">
      <Nav/>
      <Routes>
        <Route path="/mockbee" element={<MockbeeHome/>}/>
        <Route path="/mockman" element={<MockmanComponent/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/dashboard" element={(isUserLoggedIn || localStorage.getItem("token"))? <Dashboard/> : <Navigate replace to="/login"/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;