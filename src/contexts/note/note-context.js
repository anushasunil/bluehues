import axios from "axios";
import { 
    createContext, 
    useContext, 
    useEffect, 
    useReducer, 
    useState
} from "react";
import { useLogin } from "../login/login-context";
import { 
    defaultNote, 
    defaultDataReceived, 
    noteReducer, 
    dataReducer,
    defaultOptionState,
    optionReducer 
} from "./note-reducer";

const NoteContext = createContext("");

const NoteContextProvider = ({children}) => {
    const [optionState, optionDispatch] = useReducer(optionReducer, defaultOptionState);
    const [newNote, noteDispatch] = useReducer(noteReducer, defaultNote);
    const [dataList, dataListDispatch] = useReducer(dataReducer, defaultDataReceived);
    const { 
        isUserLoggedIn, 
        userInfo
    } = useLogin();
    const [hideNewNoteEditor, setNewNoteEditor] = useState("hide");
    const [currentNoteList, setCurrentNoteList] = useState(dataList.notesList);


    const getNotes = async() => {
        try {
            if(isUserLoggedIn) {
                const {data: {notes}} = await axios.get("/api/notes", { headers: {
                    authorization: userInfo.encodedToken
                } });
                console.log(notes, "getnotes")
                setCurrentNoteList(notes)
                dataListDispatch({type: "GET_NOTES", payload: notes})
            }
        }
        catch(error) {
            console.error(error);
        }
    }

    const addNotes = async(note) => {
        try {
            const response = await axios.post("/api/notes", 
            {note}, 
            { 
                headers: {
                    authorization: userInfo.encodedToken
                } 
            });
            const { data : {notes}} = response;
            console.log(notes, "addnotes")
            setCurrentNoteList(notes)
            dataListDispatch({type: "ADD_NOTES", payload: notes})
        }
        catch(error){
            console.error(error);
        }
        
    }

    const updateNote = async(note) => {
        try {
            const response = await axios.post(`/api/notes/${note._id}`,
            {note}, 
            { 
                headers: {
                    authorization: userInfo.encodedToken
                } 
            });
            console.log(response);
        }
        catch(error) {
            console.error(error);
        }
    }

    useEffect(()=>{
        getNotes()
    }, [newNote])

    return (
        <NoteContext.Provider 
        value = {
            { 
                addNotes,
                updateNote, 
                noteDispatch, 
                newNote, 
                dataList,
                hideNewNoteEditor,
                setNewNoteEditor,
                optionDispatch,
                optionState,
                currentNoteList,
                setCurrentNoteList
            }
        }>
            {children}
        </NoteContext.Provider>
    )
}

const useNotes = () => useContext(NoteContext);

export {
    useNotes, 
    NoteContextProvider
}