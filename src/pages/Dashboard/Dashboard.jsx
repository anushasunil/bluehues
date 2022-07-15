import { useEffect } from "react";
import { 
    Background, 
    Aside, 
    NewNote
} from "../../Components";
import { useNotes } from "../../contexts";
import "./Dashboard.css"
import "../../Components/NoteCard/NoteCard.css"

export const Dashboard = () => {
    const {
        hideNewNoteEditor, 
        setNewNoteEditor,
        noteDispatch,
        dataList: {notesList},
        getNotes,
        archiveNote,
        deleteNote
    } = useNotes();

    useEffect(()=>{
        getNotes();
    },[]);

    return ( 
        <div className="dashboard">
            
            <Aside setNewNote={setNewNoteEditor}/>
            <NewNote 
                hideNewNoteEditor={hideNewNoteEditor} 
                setNewNoteEditor={setNewNoteEditor}
            />
            <div className="main-container flex-grow">
            <h4 className="heading">My Notes</h4>
            {
                (notesList.length !== 0)?
                (
                <div className="notes-container">
                   { notesList.map(( note ) => {
                        const {
                            color, 
                            title,
                            tags, 
                            priority, 
                            content, 
                            createdAt
                        } = note;

                        return (
                    
                        <div className="note display-flex-column display-justify-space-between" 
                        style={{backgroundColor: (color == false)? "var(--color-faint-white)" : color}}
                        key={note._id}
                        >
                            {/* <i className="fa-solid fa-thumbtack icon-pin"></i> */}
                            <div className="header display-align-center display-justify-space-between">
                                <h5 className="note-title">
                                    {title}
                                </h5>
                                <p className="badge notification text" 
                                    style={{display: priority? "block" : "none"}}>
                                    {priority}
                                </p>
                            </div>
                            <textarea 
                                value={content} 
                                spellCheck={false} 
                                readOnly 
                                className="note-content"
                            />
                            <div className="tags-to-display display-align-center">
                                {
                                    tags.map(tagName => {
                                        return (
                                            <div className="tags">
                                                <p>{tagName}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="created-details display-align-center">
                                <small> 
                                    {createdAt}
                                </small>
                            </div>
                            <div className="action-box display-justify-end">
                                <i className="fa-solid fa-pen-to-square icons clickable-image"
                                    onClick={() => {                                            
                                        noteDispatch({type: "UPDATE_NOTE", payload: note});
                                        setNewNoteEditor("");
                                    }}
                                ></i>
                                <i className="fa-solid fa-box-archive icons clickable-image"
                                    onClick={()=>{
                                        archiveNote(note);
                                    }}
                                ></i>
                                <i className="fa-solid fa-trash-can icons clickable-image"
                                    onClick={()=>{
                                        deleteNote(note);
                                    }}
                                ></i>
                            </div>
                        </div>
                    )
                })
            }
                </div>)
                
        :
        <div>
            <p className="thoughts text-align-center">no notes to display</p>
        </div> 
}
        </div>
        </div>       
    )
}        