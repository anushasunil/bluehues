const getTodaysDate = () => {
    const today = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const [month, date, year] = [months[today.getMonth()], today.getDate(), today.getFullYear() ];
    return `${month} ${date},  ${year}`
}

const defaultFiltersApplied = {
    color: [],
    tags: []
}

const defaultNote =  {
    title: "",
    content: "",
    status: "NO_STATUS",
    priority: 0,
    tags: [],
    color: "default",
    isPinned: false,
    createdAt: getTodaysDate()
}

const defaultDataReceived = {
    notesList: [],
    archivedNotes: [],
    trashedNotes: [],
    pinnedNotes: []
}

const defaultOptionState = {
    colorPalette : false
} 

const filterReducer = (state, {type, payload}) => {
    switch(type) {
        case "FILTER_BY_COLOR" :
            switch(payload.action){
                case "ADD":
                    return ({...state, color: [...state.color, payload.value]});
                case "REMOVE":
                    return ({...state, color: state.color.filter(color => color !== payload.value)});
            }
        case "FILTER_BY_TAGS" :
            switch(payload.action){
                case "ADD":
                    return ({...state, tags: [...state.tags, payload.value]});
                case "REMOVE":
                    return ({...state, tags: state.tags.filter(tags => tags !== payload.value)});
            }
        default: return (defaultFiltersApplied)
    }
}

const optionReducer = (state, {type, payload}) => {
    switch(type) {
        case "SHOW_PALETTE" :
            return ({...state, colorPalette: payload});
        default: return (defaultOptionState)
    }
}

const dataReducer = (state, {type, payload}) => {
    switch(type) {
        case "GET_NOTES":
            return ({...state, notesList : payload});
        case "GET_ARCHIVED_NOTES" :
            return ({...state, archivedNotes: payload });
        case "GET_PINNED_NOTES" :
            return ({...state, pinnedNotes: payload });
        case "GET_TRASHED_NOTES":
            return ({...state, trashedNotes: payload})
        default : return (defaultDataReceived)
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
        case "IS_PINNED" : 
            console.log("in reducer", payload)
            return ({...newNote, isPinned : payload})
        case "UPDATE_NOTE" :
            return ({...payload});
        default: return (defaultNote);
    }
}

export {
    defaultDataReceived,
    defaultNote,
    defaultOptionState,
    defaultFiltersApplied,
    noteReducer,
    dataReducer,
    optionReducer,
    filterReducer
}