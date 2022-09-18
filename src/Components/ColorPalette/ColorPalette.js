import "./ColorPalette.css";
import { useNotes } from "../../contexts";

const colorSet = [
    "red", "teal", "green", "yellow", "pink", "default"
]

const ColorPalette = ({showPalette}) => {
    const {noteDispatch} = useNotes();

    return (
        <div className="color-palette display-align-center" style={{display: showPalette?"flex":"none"}}>
        {
            colorSet.map(color => {
                return (
                    <div className= {`color-pastel ${color}`} 
                    onClick={()=>{
                        noteDispatch({type: "NOTE_COLOR", payload: color })
                }}
                key={color}
                ></div>
                )
            })
        }
        </div>
    )
}

export {
    ColorPalette,
    colorSet
}