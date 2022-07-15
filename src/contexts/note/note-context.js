import axios from "axios";
import { 
    createContext, 
    useContext, 
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
import { Toast } from "../../Components";

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


    const getNotes = async() => {
        try {
            if(isUserLoggedIn) {
                const {data: {notes}} = await axios.get("/api/notes", 
                { 
                    headers: {
                    authorization: userInfo.encodedToken
                } 
            });
                dataListDispatch({type: "GET_NOTES", payload: notes})
            }
        }
        catch(error) {
            console.error(error);
        }
    }

    const addNote = async(note) => {
        try {
            const {data: {notes}, status} = await axios.post("/api/notes", 
            {note}, 
            { 
                headers: {
                    authorization: userInfo.encodedToken
                } 
            });

            if(status === 201) {
                dataListDispatch({type: "GET_NOTES", payload: notes});
                Toast({
                    message: "Note added successfully",
                    type: "success"
                });
            }
            
        }
        catch(error){
            console.error(error);
            Toast({
                message: "Couldn't add the note. Please try again later",
                type: "error"
            });
        }
        
    }

    const updateNote = async(note) => {
        try {
            const {data: {notes}} = await axios.post(`/api/notes/${note._id}`,
            {note}, 
            { 
                headers: {
                    authorization: userInfo.encodedToken
                } 
            });
            Toast({
                message: "Note was updated successfully",
                type: "success"
            });
            dataListDispatch({type: "GET_NOTES", payload: notes})
        }
        catch(error) {
            console.error(error);
            Toast({
                message: "Couldn't update the note. Please try again later",
                type: "error"
            });
        }
    }

    const archiveNote = async(note) => {
        try {
            const {data: {archives, notes}} = await axios.post(`/api/notes/archives/${note._id}`,
            {note},
            { 
                headers: {
                    authorization: userInfo.encodedToken
                } 
            }
            )
            Toast({
                message: "Note was archived",
                type: "info"
            });
            dataListDispatch({type: "GET_ARCHIVED_NOTES", payload: archives});
            dataListDispatch({type: "GET_NOTES", payload: notes })
        }
        catch(error) {
            console.error(error);
            Toast({
                message: "Couldn't archive the note. Please try again later",
                type: "error"
            })
        }
    }

    const getArchivedNotes = async() => {
        try {
            let  {data: {archives}} = await axios.get("/api/archives",
            { 
                headers: {
                    authorization: userInfo.encodedToken
                } 
            }
            );
            dataListDispatch({type: "GET_ARCHIVED_NOTES", payload: archives});

        }
        catch(error) {
            console.error(error);
        }
    }

    const restoreArchivedNote = async(note) => {
        try {
            const {data : {archives, notes}} = await axios.post(`/api/archives/restore/${note._id}`,
            {},
            { 
                headers: {
                    authorization: userInfo.encodedToken
                } 
            }
            )
            Toast({
                message: "Note restored from archives",
                type: "success"
            });
            dataListDispatch({type: "GET_ARCHIVED_NOTES", payload: archives});
            dataListDispatch({type: "GET_NOTES", payload: notes });
        }
        catch(error) {
            console.error(error);
            Toast({
                message: "Couldn't restore the note. Please try again later",
                type: "error"
            });
        }
    }


    const deleteArchivedNote = async(note) => {
        try {
            console.log(note._id);
            const {data: {archives}} = await axios.post(`/api/archives/trash/${note._id}`,
            {
                note
            },
            { 
                headers: {
                    authorization: userInfo.encodedToken
                } 
            }
            )
            Toast({
                message: "Note deleted from archives",
                type: "success"
            })
            dataListDispatch({type: "GET_ARCHIVED_NOTES", payload: archives});
        }
        catch(error) {
            console.error(error);
            Toast({
                message: "Couldn't delete the note. Please try again later",
                type: "error"
            })
        }
    }

    const getTrashedNotes = async() => {
        try {
            if(isUserLoggedIn) {
                const {data: {trash}} = await axios.get("/api/trash", 
                { 
                    headers: {
                    authorization: userInfo.encodedToken
                } 
            });
                dataListDispatch({type: "GET_TRASHED_NOTES", payload: trash})
            }
        }
        catch(error) {
            console.error(error);
        }
    }

    const restoreTrashedNote = async(note) => {
        try {
            const {data : {trash, notes}} = await axios.post(`/api/trash/restore/${note._id}`,
            {},
            { 
                headers: {
                    authorization: userInfo.encodedToken
                } 
            }
            )
            Toast({
                message: "Note restored from trash",
                type: "success"
            })
            dataListDispatch({type: "GET_TRASHED_NOTES", payload: trash});
            dataListDispatch({type: "GET_NOTES", payload: notes });
        }
        catch(error) {
            console.error(error);
            Toast({
                message: "Couldn't restore the note. Please try again later",
                type: "error"
            })
        }
    }

    const deleteNote = async(note) => {
        try {
            const {data : {trash, notes}} = await axios.post(`/api/notes/trash/${note._id}`,
            {},
            { 
                headers: {
                    authorization: userInfo.encodedToken
                } 
            }
            )
            Toast({
                message: "Note deleted from myNotes",
                type: "success"
            })
            dataListDispatch({type: "GET_TRASHED_NOTES", payload: trash});
            dataListDispatch({type: "GET_NOTES", payload: notes});
        }
        catch(error) {
            console.error(error);
            Toast({
                message: "Couldn't delete the note. Please try again later",
                type: "error"
            })
        }
    }


    const permanentlyDeleteNote = async(note) => {
        try {
            const {data : {trash}} = await axios.delete(`/api/trash/delete/${note._id}`,
            { 
                headers: {
                    authorization: userInfo.encodedToken
                } 
            }
            )
            Toast({
                message: "Note deleted from trash",
                type: "success"
            })
            dataListDispatch({type: "GET_TRASHED_NOTES", payload: trash});
        }
        catch(error) {
            console.error(error);
            Toast({
                message: "Couldn't delete the note. Please try again later",
                type: "error"
            })
        }
    }

    return (
        <NoteContext.Provider 
        value = {
            { 
                getNotes,
                getArchivedNotes,
                getTrashedNotes,
                restoreTrashedNote,
                permanentlyDeleteNote,
                deleteNote,
                addNote,
                updateNote,
                archiveNote, 
                noteDispatch, 
                restoreArchivedNote,
                deleteArchivedNote,
                newNote, 
                dataList,
                hideNewNoteEditor,
                setNewNoteEditor,
                optionDispatch,
                optionState,
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