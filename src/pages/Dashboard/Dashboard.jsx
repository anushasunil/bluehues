import { useState } from "react";
import { 
    Background, 
    Aside, 
    NewNote, 
    NotesToDisplay 
} from "../../Components";
import "./Dashboard.css"

export const Dashboard = () => {
    const [hideNewNoteEditor, setNewNoteEditor] = useState("hide");

    return ( 
        <div className="dashboard">
            
            <Background/>
            <Aside setNewNote={setNewNoteEditor}/>
            <NewNote 
                hideNewNoteEditor={hideNewNoteEditor} 
                setNewNoteEditor={setNewNoteEditor}
            />

            <div className="main-container flex-grow">
               <NotesToDisplay/>
            </div>
        </div>       
    )
}        