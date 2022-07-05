import "./NoteCard.css"
import "../TagBox/TagBox.css"
import { useNotes } from "../../contexts"

export const NotesToDisplay = () => {
    const {dataList} = useNotes();

return(
    ( dataList.noteslist.length !== 0)?
        dataList.noteslist.map((
            {
                color, 
                title,
                tags, 
                priority, 
                content, 
                createdAt
            }
        ) => {
            return (
        
            <div className="note display-flex-column display-justify-space-between" 
            style={{backgroundColor: (color == false)? "var(--color-faint-white)" : color}}
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
                    <i className="fa-solid fa-pen-to-square icons clickable-icon"></i>
                    <i className="fa-solid fa-palette icons clickable-object"></i>
                    <i className="fa-solid fa-box-archive icons clickable-object"></i>
                    <i className="fa-solid fa-trash-can icons clickable-object"></i>
                </div>
            </div>
         )
     })
     :
    <div>
        <p className="thoughts text-align-center">no notes to show</p>
    </div> 

)
        
}

