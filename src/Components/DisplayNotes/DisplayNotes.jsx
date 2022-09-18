import { useNotes } from "../../contexts";
import "../../Components/NoteCard/NoteCard.css"

export const DisplayNotes = ({list}) => {
    const {
        setNewNoteEditor,
        noteDispatch,
        archiveNote,
        deleteNote,
    } = useNotes();
    return (
        <div className="notes-container">
        { list.map(( note ) => {
                const {
                    color, 
                    title,
                    tags, 
                    priority, 
                    content,
                    isPinned, 
                    createdAt
                } = note;

                return (
            
                <div className="note display-flex-column display-justify-space-between clickable-object" 
                style={{backgroundColor: (color == false)? "var(--color-faint-white)" : `var(--color-pastel-${color})`}}
                key={note._id}
                >
                    { isPinned && (<i className="fa-solid fa-thumbtack icons img-pin"></i>)}
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
            })}
        </div> 
    )
}