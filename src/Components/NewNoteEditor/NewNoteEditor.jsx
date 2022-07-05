import "./NewNoteEditor.css"
import { 
    ColorPalette, 
    TagBox, 
    TagSelect, 
    clearAllTags 
} from "..";
import { useNotes } from "../../contexts";

export const NewNote = ({hideNewNoteEditor, setNewNoteEditor}) => {
    const {
        newNote, 
        noteDispatch, 
        addNotes,
        optionState,
        optionDispatch 
    } = useNotes();
    const {
        title, 
        content, 
        priority, 
        color
    } = newNote;

    const clickHandler = (e) => {
        e.preventDefault();
        setNewNoteEditor("hide");
        optionDispatch({type: "CLEAR_OPTIONS"});
        noteDispatch({type: "DEFAULT_NOTE"});
        clearAllTags()

    }

    return (
        <div className={"note-content-form display-align-center display-justify-center " + hideNewNoteEditor}>
            <form style={{backgroundColor: color}}>
                <div className="form-header display-align-center display-justify-end">
                    <div>
                        <select  
                            value={priority}
                            onChange={(e)=>{
                                noteDispatch({type: "PRIORITY", payload: e.target.value})
                        }}>
                            <option value="">Select Priority</option>
                            <option value="HIGH">High</option>
                            <option value="MODERATE">Moderate</option>
                            <option value="LOW">Low</option>
                        </select>
                    </div>
                    <button 
                        className="btn-cancel" 
                        onClick={(e)=>{
                           clickHandler(e);
                    }}>
                        <i className="fa-solid fa-x"></i>
                    </button>
                </div>
                <input 
                    type="text" 
                    placeholder="New Note" 
                    className="new-note-title" 
                    value={title}
                    onChange={(e)=>
                        noteDispatch({type: "TITLE", payload: e.target.value}) 
                    }
                />
                <textarea 
                    placeholder="Note it down quick"
                    onChange={(e)=>
                        noteDispatch({type: "CONTENT", payload: e.target.value})
                    }
                    value={content}
                />
                <TagBox/>
                <div className="action-box">
                    <i className="fa-solid fa-palette icons clickable-object" 
                        onClick={()=>
                            {
                                optionDispatch({type: "SHOW_PALETTE", payload: !optionState.colorPalette});
                                if(optionState.createTags) optionDispatch({type: "SHOW_TAGS", payload: false});
                            }
                        }
                    ></i>
                    <i className="fa-solid fa-box-archive icons clickable-object"></i>
                    <i className="fa-solid fa-trash-can icons clickable-object"></i>
                    <i className="fa-solid fa-tags icons clickable-object" 
                        onClick={()=>
                            {
                                optionDispatch({type: "SHOW_TAGS", payload: !optionState.createTags});
                                if(optionState.colorPalette) optionDispatch({type: "SHOW_PALETTE", payload: false});
                            }
                        }
                    ></i>
                </div>
                <ColorPalette showPalette={optionState.colorPalette} />
                <TagSelect showCreateTag={optionState.createTags} optionDispatch={optionDispatch}/>
                <div className="display-justify-end">
                    <button className={`solid-primary btn-save ${(title.trim())? "" : "solid-disabled"}`}
                    onClick={(e)=>{
                       clickHandler(e);
                       addNotes(newNote);
                    }}
                > 
                    Save
                </button>
                </div>
            </form>
        </div>
    )
}