import "./TagBox.css";
import { useNotes } from "../../contexts/note/note-context";

const tagsList = ["work", "chores", "creativity", "health"];

const TagBox = () => {
    const {newNote, noteDispatch} = useNotes();
    const { color, tags } = newNote;
    return (
        <>
        <div className="tags-selected-display display-align-center">
             {
                 tags.map(tag => {
                     return(
                          <div className="tags display-align-center"
                          style={{backgroundColor: (color === "var(--color-pastel-default)")? "var(--color-tertiary-variant1)" : true}}
                          >
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
        <div className="tags-display display-align-center">
            {
                tagsList.map( tag => {
                    return (
                        <div className="tags display-align-center clickable-object"
                             style={{backgroundColor: (color === "var(--color-pastel-default)")? "var(--color-tertiary-variant1)" : true}}
                             onClick={()=>{
                                noteDispatch({type: "TAGS", payload: {action: "ADD", value: tag}})
                             }}
                        >
                           <p>{tag}</p>
                        </div>
                    )
                })
            }
        </div>
        </>
    )
}

export {
    tagsList,
    TagBox
}