import "./ColorPalette.css";
import { useNotes } from "../../contexts";

export const ColorPalette = ({showPalette}) => {
    const {noteDispatch} = useNotes();
    return (
        <div className="color-palette display-align-center" style={{display: showPalette?"flex":"none"}}>
            <div className="color-pastel red" 
                onClick={()=>{
                    noteDispatch({type: "NOTE_COLOR", payload: "var(--color-pastel-red"})
                }
            }></div>
            <div className="color-pastel teal" 
                onClick={()=>{
                    noteDispatch({type: "NOTE_COLOR", payload: "var(--color-pastel-teal"})
                }
            }></div>
            <div className="color-pastel green" 
                onClick={()=>{
                    noteDispatch({type: "NOTE_COLOR", payload: "var(--color-pastel-green"})
                }
            }></div>
            <div className="color-pastel yellow" 
                onClick={()=>{
                    noteDispatch({type: "NOTE_COLOR", payload: "var(--color-pastel-yellow"})
                }
            }></div>
            <div className="color-pastel pink" 
                onClick={()=>{
                    noteDispatch({type: "NOTE_COLOR", payload: "var(--color-pastel-pink"})
                }
            }></div>
        </div>
    )
}