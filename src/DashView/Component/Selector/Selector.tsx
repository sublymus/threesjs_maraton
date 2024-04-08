import { useRef, useState } from "react";
import "./Selector.css";

export
    function Selector({ list, selected, setSelectedColumns, multiple, placeholder }: { placeholder?: string, multiple?: boolean, list: string[], selected: string[], setSelectedColumns: (selectedColumn: string[]) => any }) {

    const [selectOpen, setSelectOpen] = useState(false);
    const selectListRef = useRef<HTMLDivElement | null>(null)
    selected = multiple ? selected : [selected[0]];
    return (
        <div className="selector" onClick={() => {
            const select = !selectOpen;
            setSelectOpen(select);
            if (!selectListRef.current) {
                return;
            }

            if (select) {
                selectListRef.current.style.display = 'block';
            } else {
                const s = selectListRef.current;
                setTimeout(() => {
                    s.style.display = 'none';
                }, 200);
            }
        }}>
            <div className="selector-label">
                {placeholder}
            </div>
            <div className="icon"></div>
            <div ref={selectListRef} className={"select-list " + (selectOpen ? 'open' : 'close')}>
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
        </div>
    )
}



