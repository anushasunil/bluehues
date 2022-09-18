import { useEffect } from "react";
import { 
    Aside, 
    NewNote,
    DisplayNotes,
    Filter
} from "../../Components";
import { useNotes } from "../../contexts";
import "./Dashboard.css"

export const Dashboard = () => {
    let {
        hideNewNoteEditor, 
        setNewNoteEditor,
        dataList: {notesList},
        getNotes,
        filtersApplied,
    } = useNotes();

    useEffect(()=>{
        getNotes();
    }, []);

    const pinnedNotes = notesList.filter(note => note.isPinned === true)


    if(filtersApplied.color.length !== 0) {
        notesList = notesList.filter(note => filtersApplied.color.includes(note.color));
    }
    if(filtersApplied.tags.length !== 0) {
        let temp = [];
        notesList.map(note =>{
            let matchCount = 0 ;
            for(let tag of note.tags) {
                if(filtersApplied.tags.includes(tag)) {
                    matchCount++;
                }
            }
            if(matchCount > 0) {
                temp = [...temp, note]
            }
            notesList = [...temp]
        })
    }


    return ( 
        <div className="dashboard">
            <Aside setNewNote={setNewNoteEditor}/>
            <NewNote 
                hideNewNoteEditor={hideNewNoteEditor} 
                setNewNoteEditor={setNewNoteEditor}
            />
            <div className="main-container flex-grow">
                <Filter/>
                <h4 className="heading">My Notes</h4>
                {
                    (notesList.length !== 0)? (
                        <>
                            {
                                ((pinnedNotes.length !== 0) && (
                                    <>
                                        <h5 className="sub-heading">Pinned Notes</h5>
                                        <DisplayNotes list={pinnedNotes}/>
                                    </>
                                )
                                )
                            }
                            <h5 className="sub-heading">All Notes</h5>
                            <DisplayNotes list={notesList}/>
                        </>
                    )   
                    :
                    <div className="header-img-empty">
                        <img src="assets/empty.gif"/>
                    </div>   
                }

            </div>
        </div>       
    )
}        