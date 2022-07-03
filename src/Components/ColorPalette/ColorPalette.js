import "./ColorPalette.css";
import { useNotes } from "../../contexts";

export const ColorPalette = ({showPalette}) => {
    const {noteDispatch} = useNotes();

    const colorSet = [
        "red", "teal", "green", "yellow", "pink"
    ]

    return (
        <div className="color-palette display-align-center" style={{display: showPalette?"flex":"none"}}>
        {
            colorSet.map(color => {
                return (
                    <div className= {`color-pastel ${color}`} 
                    onClick={()=>{
                        noteDispatch({type: "NOTE_COLOR", payload: `var(--color-pastel-${color})` })
                }}></div>
                )
            })
        }
        </div>
    )
}