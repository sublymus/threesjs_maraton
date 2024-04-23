// import React from 'react'
import { useEffect, useState } from 'react'
import { Selector } from '../../Selector/Selector'
import './ListSearchBar.css'
import { type FilterMapper } from '../type'

export function ListSearchBar({ sortBy, onSortChange, onInputChange, filter , onFilterChange, onCancel , onSearchRequired}: { sortBy: string[], filter: Record<string, FilterMapper>, onInputChange?: (text: string) => any, onSortChange?: (sortBy: string) => any, onFilterChange?: (query: Record<string, any>) => any , onCancel?: () => any, onSearchRequired?:(query:Record<string, any>)=>any }) {
    const [_sortBy, setSortBy] = useState(sortBy[0]);
    const [isDesc, setIsDesc] = useState(true);
    const [text, setText] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [query]= useState<Record<string, any>>({});

    useEffect(() => {
        onSortChange?.(_sortBy + '_' + (isDesc ? 'desc' : 'asc'));
    }, [_sortBy, isDesc]);
    return (
        <div className="list-search-bar">
            <div className="search">
                <input type="text" placeholder='Search by Id , text' onChange={(e) => {
                    setText(e.currentTarget.value)
                }} onKeyUp={(e)=>{
                    if(e.code == 'Enter'){
                        onInputChange?.(text)
                    }
                }}/>
                <div className="icon" onClick={() => {
                    onInputChange?.(text)
                }}></div>
            </div>
            <div className="filter-btn" onClick={() => {
                setIsFilterOpen(!isFilterOpen);
            }}>
                <div className="icon"></div>
                <div className="label">Filter</div>
            </div>
            <div className="sort-btn">
                <div className={"icon " + (isDesc ? 'desc' : 'asc')} onClick={() => {
                    setIsDesc(!isDesc);
                }}></div>
                <Selector placeholder={`sort by ${_sortBy}`} list={sortBy} selected={[_sortBy]} setSelectedColumns={(s) => {
                    setSortBy(s[0]);
                }} />
            </div>
            {isFilterOpen && <div className='filter-page' onClick={(e) => {
                if (e.currentTarget == e.target) setIsFilterOpen(!isFilterOpen);
            }}>
                <div className="ctn-filters" >
                    <div className="ctn2-filters" >
                        {
                            Object.keys(filter).map((f) => {
                                return filter[f].getView(f, (value) => {
                                    query[f] = value;
                                    onFilterChange?.(query)//TODO
                                })
                            })
                        }
                    </div>
                    <div className="filter-bottom">
                        <div className="search-btn cancel" onClick={(e) => {
                            if (e.currentTarget == e.target) setIsFilterOpen(!isFilterOpen);
                            onCancel?.();
                        }}>
                            Cancel
                        </div>
                        <div className="search-btn" onClick={(e) => {
                            if (e.currentTarget == e.target) setIsFilterOpen(!isFilterOpen);
                            onSearchRequired?.(query);
                        }}>
                            Search
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}