import axios from "axios";
import { 
    createContext, 
    useContext, 
    useEffect, 
    useReducer
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
    const {isUserLoggedIn, userInfo} = useLogin();

    const getNotes = async() => {
        try {
            if(isUserLoggedIn) {
                const {data} = await axios.get("/api/notes", { headers: {
                    authorization: userInfo.encodedToken
                } });
                dataListDispatch({type: "GET_NOTES", payload: data.notes})
                console.log("got notes in note-context", data.notes)
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
            const { status, data } = response;
            console.log(note, "sjgdjhgs", status, data);
            dataListDispatch({type: "ADD_NOTES", payload: data.notes})
        }
        catch(error){
            console.error(error)
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
                noteDispatch, 
                newNote, 
                dataList,
                optionDispatch,
                optionState
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