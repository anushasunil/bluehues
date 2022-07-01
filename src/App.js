import { Routes, Route } from "react-router-dom";
import { Nav, Footer } from "./Components"
import { Home, MockbeeHome, MockmanComponent, LoginPage, SignUpPage} from "./pages"

function App() {
  return (
    <div className="App">
      <Nav/>
      <Routes>
        <Route path="/mockbee" element={<MockbeeHome/>}/>
        <Route path="/mockman" element={<MockmanComponent/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;