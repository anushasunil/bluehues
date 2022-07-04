import "./TagBox.css";
import { useState } from "react";
import { useNotes } from "../../contexts/note/note-context";

const TagBox = () => {
    const {newNote, noteDispatch} = useNotes();
    const {tags, color} = newNote;
    return (
        <div className="tags-display display-align-center">
            {
                tags.map(tag => {
                    return(
                         <div className="tags display-align-center">
                            <p>{tag}</p>
                            <i className={`fa-solid fa-circle-xmark icon clickable-image ${color}`}
                            onClick={()=>{
                                noteDispatch({type: "TAGS", payload: {action: "REMOVE", value: tag}});
                            }}
                            ></i>
                         </div>
                    )
                })
            }
        </div>
    )
}

const TagSelect = ({showCreateTag, optionDispatch}) => {
    const [newTag, setNewTag] = useState("");
    const {newNote, noteDispatch} = useNotes();
    return (
        <div className="select-tags display-align-center" style={{display: showCreateTag? "flex": "none"}}>
            <input 
                type="text" 
                className="tag-name" 
                onChange={(e) => setNewTag(e.target.value)} 
                autoFocus
            />
            <i className="fa-solid fa-plus icons display-align-center clickable-image" 
                onClick={()=>{
                    if(!newNote.tags.includes(newTag)) 
                    noteDispatch({type: "TAGS", payload: {action: "ADD", value: newTag}});
                    }
                }>
            </i>
            <i className="fa-solid fa-rectangle-xmark icons clickable-image"
                onClick={()=>optionDispatch({type: "SHOW_TAGS", payload: false})}
            ></i>
        </div>
    )
}

export {
    TagBox, 
    TagSelect, 
}