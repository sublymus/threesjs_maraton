import "./Selector.css";
import { useDashStore } from "../../dashStore";
import { useEffect, useRef } from "react";
import { limitPopupPosition } from "../../../Tools/BindToParentScroll";

export
    function Selector({w, list, selected, setSelectedColumns, multiple, placeholder }: {w?:number, placeholder?: string, multiple?: boolean, list: string[], selected: string[], setSelectedColumns: (selectedColumn: string[]) => any }) {

    selected = multiple ? selected : [selected[0]];
        const {openChild} = useDashStore()
    return (
        <div className="selector" onClick={(e) => {
          openChild(<SelectorList w={w} x={e.clientX} y={e.clientY} setSelectedColumns={setSelectedColumns} multiple selected={selected} list={list}/>)
        }}>
            <div className="selector-label">
                {placeholder}
            </div>
            <div className="icon"></div>

        </div>
    )
}

function SelectorList({ w,x,y, list , selected ,  multiple , setSelectedColumns}: {w?:number, x:number , y:number, setSelectedColumns:(selectedColumn: string[]) => any, list: string[] , selected:string[] ,multiple?:boolean}) {
    const ref = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        ref.current && limitPopupPosition(ref.current)
    })
    return (
        <div ref={ref} className={"selector-list"}  style={{width:w?`${w}px`:'',top:`${y}px`,left:`${x}px`}}>
            {
                list.map(c => (
                    <div key={c} className={selected.includes(c) ? 'active' : ''} onClick={() => {
                        let cs = multiple ?
                            [...(selected.includes(c) ? selected.filter(a => a !== c) : [...selected, c])] :
                            [c];
                        setSelectedColumns(cs)
                    }}>{c}</div>
                ))
            }
        </div>
    )
}