const getTodaysDate = () => {
    const today = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const [month, date, year] = [months[today.getMonth()], today.getDate(), today.getFullYear() ];
    return `${month} ${date},  ${year}`
}

const defaultNote =  {
    title: "",
    content: "",
    status: "NO_STATUS",
    priority: 0,
    tags: [],
    color: "",
    createdAt: getTodaysDate()
}

const defaultDataReceived = {
    notesList: [],
    archievedNotes: [],
    trashedNotes: [],
    pinnedNotes: []
}

const defaultOptionState = {
    colorPalette : false,
    createTags : false
}

const optionReducer = (state, {type, payload}) => {
    switch(type) {
        case "SHOW_PALETTE" :
            return ({...state, colorPalette: payload});
        case "SHOW_TAGS" :
            return ({...state, createTags: payload});
        default: return (defaultOptionState)
    }
}

const dataReducer = (state, {type, payload}) => {
    switch(type) {
        case "GET_NOTES":
        case "ADD_NOTES":
            return ({...state, notesList : payload})
    }
}

const noteReducer = (newNote, { type, payload }) => {
    switch(type) {
        case "TITLE" : 
            return ({...newNote, title: payload});
        case "CONTENT" : 
            return ({...newNote, content: payload});
        case "STATUS" :
            return ({...newNote, status: payload});
        case "PRIORITY" : 
            return ({...newNote, priority: payload});
        case "TAGS" :  
            switch(payload.action){
                case "ADD":
                    return ({...newNote, tags: [...newNote.tags, payload.value]});
                case "REMOVE":
                    return ({...newNote, tags: newNote.tags.filter(tag => tag !== payload.value)});
            }
        case "NOTE_COLOR" : 
            return ({...newNote, color: payload});
        case "CREATED_AT" :
            return ({...newNote, createdAt : payload});
        case "UPDATE_NOTE" :
            return ({...payload});
        default: return (defaultNote);
    }
}

export {
    defaultDataReceived,
    defaultNote,
    defaultOptionState,
    noteReducer,
    dataReducer,
    optionReducer
}