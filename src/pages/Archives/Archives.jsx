import { useEffect, useState } from "react";
import { 
    Background, 
    Aside, 
    NewNote, 
    NotesToDisplay 
} from "../../Components";
import { useNotes } from "../../contexts";
import "./Archives.css"

export const Archives = () => {

    const {
        hideNewNoteEditor, 
        setNewNoteEditor,
        dataList: {archivedNotes},
        getArchivedNotes,
        restoreArchivedNote,
        deleteArchivedNote
    } = useNotes();

    useEffect(()=>{
        getArchivedNotes();
    },[]);

    return (
        <div className="archives-dashboard">
            
        <Aside setNewNote={setNewNoteEditor}/>
        <NewNote 
            hideNewNoteEditor={hideNewNoteEditor} 
            setNewNoteEditor={setNewNoteEditor}
        />
        <div className="main-container flex-grow">
            <h4 className="heading">Archived</h4>
            {
                (archivedNotes.length !== 0)?
                (
                <div className="notes-container">
                   { archivedNotes.map(( note ) => {
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
                            <i className="fa-solid fa-box-open icons clickable-image"
                                onClick={()=>{
                                    console.log(note._id, "for restore note")
                                    restoreArchivedNote(note);
                                }}
                            ></i>
                            <i className="fa-solid fa-trash-can icons clickable-image"
                                onClick={()=>{
                                    deleteArchivedNote(note);
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