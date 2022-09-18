import { 
    Routes, 
    Route 
} from "react-router-dom";
import { RequiresAuth } from "./Router/RequiresAuth";
import { 
    Home, 
    MockbeeHome, 
    MockmanComponent, 
    LoginPage, 
    SignUpPage, 
    Dashboard,
    Archives,
    TrashedNotes
} from "../src/pages"

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/trashedNotes" element={<TrashedNotes/>}/>
            <Route path="/archives" element={<Archives/>}/>
            <Route path="/mockbee" element={<MockbeeHome/>}/>
            <Route path="/mockman" element={<MockmanComponent/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/signup" element={<SignUpPage/>}/>
            <Route path="/dashboard" 
                element={
                <RequiresAuth children={<Dashboard/>}></RequiresAuth>
            }/>
        </Routes>
    )
}