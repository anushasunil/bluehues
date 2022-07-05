import "./Aside.css"

export const Aside = ({setNewNote}) => {
    return (
        <aside>
        <ul>
            <li className="display-align-center clickable-object">
                <i className="fa-solid fa-house inner-icon"></i>
                <p>Home</p>
            </li>
            <li className="display-align-center clickable-object">
                <i className="fa-solid fa-box-archive inner-icon"></i>
                <p>Archived</p>
            </li>
            <li className="display-align-center clickable-object">
                <i className="fa-solid fa-trash-can inner-icon "></i>
                <p>Trash</p>
            </li>
            <li className="display-align-center clickable-object">
                <i className="fa-solid fa-user-large inner-icon"></i>
                <p>Profile</p>
            </li>
        </ul>
        <button className="solid-primary btn-create-note btn-expanded" onClick={()=>setNewNote("")}>Create a new Note</button>
        <button className="solid-primary btn-create-note btn-collapsed" onClick={()=>setNewNote("")}>
            <i className="fa-solid fa-plus"></i>
        </button>
    </aside>
    )
}