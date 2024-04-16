// import React from 'react'
// import { useState } from 'react';
import './ListPaging.css'



export function ListPaging({setPage , limit ,page ,total}:{setPage:(page:number)=>any, page:number, limit:number,total:number}) {
    
    limit = Number(limit);
    page = Number(page);
    total = Number(total);
    const pages = Math.ceil(total/limit);
    const list:JSX.Element[] = [];
    
    if(page>3)list.push(<div key={'a'} className='page'  onClick={()=>{
        setPage(1)
    }}>1</div>)
    if(page-4>0){
        list.push(<div key={'b'} className='page'>...</div>)    
    }
    if(page-2>0){
        list.push(<div key={'c'} className='page' onClick={()=>{
            setPage(page- 2)
        }}>{ page- 2}</div>)
    }
    if(page-1>0){
        list.push(<div key={'d'} className='page' onClick={()=>{
            setPage(page- 1)
        }}>{ page- 1}</div>)
    }
    list.push(<div key={'e'} className='page active' >{page}</div>)

    if(page+1<pages){
        list.push(<div key={'f'} className='page' onClick={()=>{
            setPage(page+1)
        }}>{ page+1}</div>) 
    }
    if(page+2<pages){
        list.push(<div key={'g'} className='page' onClick={()=>{
            setPage(page+2)
        }}>{ page+2}</div>) 
    }
    if(page+4<pages){
        list.push(<div key={'h'} className='page'>...</div>)    
    }
    if(page < pages)list.push(<div key={'i'} className='page' onClick={()=>{
            setPage(pages)
        }}>{pages}</div>)
    return(
        <div className="list-paging">
            <div className="change" onClick={()=>{
                if(page-1>=1)setPage(page-1)
            }}>Prev</div>
            {
                list
            }
            <div className="change" onClick={()=>{
                if(page+1<=pages)setPage(page+1)
            }}>Next</div>
        </div>
    )
}

































