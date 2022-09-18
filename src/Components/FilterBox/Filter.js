import { useState } from "react"
import "./Filter.css"
import { 
    colorSet,
    tagsList
 } from "..";
import { useNotes } from "../../contexts";

export const Filter = () => {
    const [showFilterBox, setShowFilter] = useState(false);
    const {
        filterDispatch,
        filtersApplied
    } = useNotes();
    return (
        <>
        <button className="btn-show-filter"
            onClick={() => {
                setShowFilter( current => !current);
            }}
        >
            Filter by</button>
        <div className="filter-box" 
            style = {{
                display: (showFilterBox)? "block" : "none"
            }}
        >
            <section>
                <h6>Color</h6>
                <div className="filter-color-box display-align-center">
                {
                    colorSet.map(color => {
                        return (
                            <div className="color clickable-object display-align-center" 
                                style={{
                                    backgroundColor: `var(--color-pastel-${color})`
                                }}
                                onClick={()=>{
                                    (filtersApplied.color.includes(color))? filterDispatch({type: "FILTER_BY_COLOR", payload: {action: "REMOVE", value: color}})
                                    :
                                    filterDispatch({type: "FILTER_BY_COLOR", payload: {action: "ADD", value: color}})
                                }}
                                key={color}
                            >
                                <i className="fa-solid fa-check icon-check"
                                    style={{display: (filtersApplied.color.includes(color))? "block": "none"}}
                                ></i>
                            </div>
                        )
                    })
                }
                </div>
            </section>
            <section>
                <h6>Tags</h6>
                <div className="filter-tag-box display-align-center">
                {
                    tagsList.map(tag => {
                        return (
                            <div className="tags clickable-object display-align-center" 
                            onClick={()=>{
                                (filtersApplied.tags.includes(tag))? filterDispatch({type: "FILTER_BY_TAGS", payload: {action: "REMOVE", value: tag}})
                                :
                                filterDispatch({type: "FILTER_BY_TAGS", payload: {action: "ADD", value: tag}})
                                console.log(tag, " tag selected")
                            }}
                            key={tag}
                            >{tag}
                            <i className="fa-solid fa-check icon-check for-tags"
                                    style={{display: (filtersApplied.tags.includes(tag))? "block": "none"}}
                                ></i>
                            </div>
                        ) 
                    })
                }
                </div>
            </section>
        </div>
        </>
        
    )
}