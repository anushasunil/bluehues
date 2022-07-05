import "./TagBox.css";
import { useState } from "react";
import { useNotes } from "../../contexts/note/note-context";

const clearAllTags = () => {
    let tagBox = document.querySelector(".tags-display");
    while(tagBox.firstChild)
        tagBox.removeChild(tagBox.lastChild);
}

const addInTagBox = (tagNameValue, color, noteDispatch) => {

    noteDispatch({type: "TAGS", payload: {action: "ADD", value: tagNameValue}});

    let tagColor = color;
    let tagBox = document.querySelector(".tags-display");

    let tag = document.createElement("div");
    tag.className = `tags display-align-center`

    let tagName = document.createElement("p");
    tagName.innerHTML = tagNameValue;

    let xMark = document.createElement("i");
    xMark.addEventListener("click", ()=>{
        tagBox.removeChild(tag);
        noteDispatch({type: "TAGS", payload: {action: "REMOVE", value: tagNameValue}});
    })
    xMark.className = `fa-solid fa-circle-xmark icon clickable-image ${tagColor}`;

    tag.appendChild(tagName);
    tag.appendChild(xMark);
    tagBox.appendChild(tag);
}

const TagBox = () => {
    return (
        <div className="tags-display display-align-center">
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
                        addInTagBox(newTag, newNote.color, noteDispatch)
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
    clearAllTags
}