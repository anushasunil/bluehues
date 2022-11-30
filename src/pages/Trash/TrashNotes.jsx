import { useEffect } from "react";
import { 
    Background, 
    Aside, 
    NewNote
} from "../../Components";
import { useNotes } from "../../contexts";
import "./TrashNotes.css"

export const TrashedNotes = () => {

    const {
        hideNewNoteEditor, 
        setNewNoteEditor,
        dataList: {trashedNotes},
        getTrashedNotes,
        restoreTrashedNote,
        permanentlyDeleteNote
    } = useNotes();

    useEffect(()=>{
        getTrashedNotes();
    },[]);

    return (
        <div className="trash-dashboard">
            
        <Aside setNewNote={setNewNoteEditor}/>
        <NewNote 
            hideNewNoteEditor={hideNewNoteEditor} 
            setNewNoteEditor={setNewNoteEditor}
        />
        <div className="main-container flex-grow">
            <h4 className="heading">Trashed</h4>
            {
                (trashedNotes.length !== 0)?
                (
                <div className="notes-container">
                   { trashedNotes.map(( note ) => {
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
                        style={{backgroundColor: (color == false)? "var(--color-faint-white)" : `var(--color-pastel-${color})`}}
                        key={note._id}
                        >
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
                            <i className="fa-solid fa-trash-can-arrow-up icons clickable-image"
                                onClick={()=>{
                                    restoreTrashedNote(note);
                                }}
                            ></i>
                            <i className="fa-solid fa-trash-can icons clickable-image"
                                onClick={()=>{
                                    permanentlyDeleteNote(note);
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
            <img src="assets/empty.gif"/>
        </div> 
}
        </div>
    </div> 
    )
}