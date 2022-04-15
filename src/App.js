import { Routes, Route } from "react-router-dom";
import { Nav, Footer } from "../src/Components"
import { Home, MockbeeHome, MockmanComponent} from "../src/pages"

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