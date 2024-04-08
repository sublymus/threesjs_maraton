// import React from 'react'
import { useEffect, useState } from 'react'
import { Selector } from '../../Selector/Selector'
import './ListSearchBar.css'

export function ListSearchBar({sortBy  , onSortChange , onInputChange}:{sortBy:string[] , onInputChange:(text:string)=>any , onSortChange:(sortBy:string)=>any , onFilterChange:(query:Record<string,any>)=>any}) {
    const [_sortBy , setSortBy] = useState(sortBy[0]);
    const [isDesc, setIsDesc] = useState(true);
    const [text, setText] = useState('');
    useEffect(()=>{
        onSortChange(_sortBy+'_'+(isDesc?'desc':'asc'));
    },[_sortBy,isDesc])
    return (
        <div className="list-search-bar">
            <div className="search">
                <input type="text" placeholder='Search by Id , text' onChange={(e)=>{
                    setText(e.currentTarget.value)
                }}/>
                <div className="icon" onClick={()=>{
                    onInputChange(text)
                }}></div>
            </div>
            <div className="filter-btn">
                <div className="icon"></div>
                <div className="label">Filter</div>
            </div>
            <div className="sort-btn">
                <div className={"icon "+(isDesc?'desc':'asc')}  onClick={()=>{
                    setIsDesc(!isDesc);
                }}></div> 
                <Selector placeholder={`sort by ${_sortBy}`} list={sortBy} selected={[_sortBy]} setSelectedColumns={(s)=>{
                    setSortBy(s[0]);
                }}/>
            </div>
        </div>
    )
}