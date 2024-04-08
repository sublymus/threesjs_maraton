import { useEffect, useRef, useState } from 'react'
import './GenericList.css'
import './Elements.css'
import { EventEmiter } from '../../../Tools/eventEmiter'
import { ListSearchBar } from "./ListSearchBar/ListSearchBar";
import { ListPaging } from "./ListPaging/ListPaging";
import { Selector } from "../../Component/Selector/Selector";


/*
 overflowY, 'hidden'|scroll


 itemSelection 
 onItemsSelected, 
  multiple

*/





export type MapperOption = {
    size: number,
    size_interval: [number, number]
    resizable: boolean,
    editable: boolean,
}
export type Mapper = {
    getView: (label: string, value: any, e: {
        onResize: (columnName: string, callBack: (d: {
            width: number,
            height: number
        }) => any) => any,
        id: string
    }) => HTMLElement,
    option?: Partial<MapperOption>
}
export type MapperJSX = {
    getView: (label: string, value: any, e: {
        onResize: (columnName: string, callBack: (d: {
            width: number,
            height: number
        }) => any) => any,
        id: string,
        onMyItemSelected: (columnName: string, callBack: (item:Record<string,any>) => any) => any,
        onAnyItemSelected: (columnName: string, callBack: (item:Record<string,any>) => any) => any,
        onMyCellSelected: (columnName: string, callBack: (value:any) => any) => any,
        onAnyCellSelected: (columnName: string, callBack: (value:any) => any) => any,
    }, setRef: (ref: HTMLElement | null) => any) => JSX.Element,
    option?: Partial<MapperOption>
}

export type ItemsMapper = {
    [key: string]: Mapper
}
export type ItemsMapperJSX = {
    [key: string]: MapperJSX
}

export type MapperBuilder<T extends Record<string, any> = {}> = (option?: Partial<MapperOption> & T) => Mapper

export type MapperBuilderJSX<T extends Record<string, any> = {}> = (option?: Partial<MapperOption> & T) => MapperJSX

const DEFAULT_ITEM_HEIGHT = 80;
// const DEFAULT_OVERFLOW = 'hidden';
const DEFAULT_TOP_HEIGHT = 40;
// const DEFAULT_TOP_FIXED = true;


const StringElementJSX: MapperBuilderJSX = (option) => {
    return {
        getView(colunm, value, e, setRef) {
            return <div key={e.id + colunm} ref={setRef}>{value?.toString()}</div>
        },
        option
    }
};

const ImageElementJSX: MapperBuilderJSX<{ schadow: string }> = (option) => {
    return {
        getView(colunm, value, e, setRef) {
            let img: HTMLElement | null = null
            e.onResize(colunm, (d) => {
                if (!img) return
                img.style.width = `${Math.min(d.height, d.width) * 0.9}px`;
                img.style.height = `${Math.min(d.height, d.width) * 0.9}px`;
            })

            return <div ref={setRef} key={colunm}>
                <div className="image-element" ref={(ref) => img = ref} style={{ boxShadow: `1px 1px 10px ${option?.schadow}`, backgroundImage: `url(${value})` }}></div>
            </div>
        },
        option
    }
};

export type FilterInterval = [[number, number], [number, number]]
export type FilterLevel = [[number, number], number]
export type FilterCollector = [string[], string[]]
export type FilterListCollector = [string[], string[]]
export type FilterSwitch = boolean;
type FilterOption = {
    interval: FilterInterval,
    level: FilterLevel,
    collector: FilterCollector,
    swich: FilterSwitch,
    listCollector: FilterListCollector
}
type FilterValues<T extends keyof FilterOption> = {
    type: T,
    values: FilterOption[T],
    name: string;
    icon?: string
}
type FilterQuery = {
    page: number,
    sortBy: string,
    limit: number,

};

type filterType = {
    sortableColumns?: string[],
    page?: number,
    total?: number,
    limit?: number,
    sortBy: string;
    filter?: FilterValues<keyof FilterOption>[]
}
const _GenericList = ({ datas, itemsMapper, items_height, top_height, overflow, filter, onQuery, onItemsSelected, multiple }: { onItemsSelected?: (selectedItems: (Record<string, any>&{$itemRef:HTMLDivElement|null})[], items: (Record<string, any>&{$itemRef:HTMLDivElement|null})[]) => any, multiple?: boolean, onQuery?: (query: FilterQuery) => any, filter: filterType, top_height?: number, items_height?: number, overflow?: 'scroll' | 'hidden', id: string | number, datas: Record<string, any>[], itemsMapper: ItemsMapperJSX }) => {
    const _items_height = items_height ?? DEFAULT_ITEM_HEIGHT;
    // const _overflow = overflow??DEFAULT_OVERFLOW;
    const _top_height = top_height ?? DEFAULT_TOP_HEIGHT;
    // const _to_fixed = top_fixed??DEFAULT_TOP_FIXED;
    const sortableColumns = filter.sortableColumns ?? []
    const [selectedColumn, setSelectedColumn] = useState(Object.keys(itemsMapper));
    const [selectedItems, setSelectedItems] = useState<Record<string,any>[]>([]);
    const [query, setQuery] = useState({
        page: filter.page || 1,
        sortBy: filter.sortBy || filter.sortableColumns?.[0] || '',
        limit: filter.limit || 25,
        query: {} as Record<string,any>
    });
    const cursorW = 5;
    const [cache] = useState({
        interval_id: 0,
        emitter: new EventEmiter(),
        x: 0,
        y: 0,
        map: {} as Record<string, {
            option: Mapper['option'],
            x0: number,
            dx: number,
            w0: number,
            w: number,
            label: HTMLDivElement | null,
            resize: boolean,
            index: number,
        }>
    });
    const [currentResize, setCurrentResize] = useState('');
    const ListTop = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (!currentResize) {
            clearInterval(cache.interval_id);
            return;
        }
        if (cache.map[currentResize].option?.resizable === false) return
        cache.interval_id = setInterval(() => {
            let w = cache.map[currentResize].w0 + (cache.x - cache.map[currentResize].x0)
            cache.map[currentResize].w = w;
            const i = cache.map[currentResize].option?.size_interval;
            if (i) {
                w = w > i[1] ? i[1] : w;
                w = w < i[0] ? i[0] : w;
            }
            const l = cache.map[currentResize].label;
            if (l) l.style.width = `${w}px`;
            cache.emitter.emit(currentResize, w + cursorW);
        }, 16);
    }, [currentResize])
    useEffect(() => {
        window.addEventListener('mousemove', (e) => {
            cache.x = e.clientX;
            cache.y = e.clientY;
        });
        const stopCurrentResize = () => {
            setCurrentResize('');
        }
        window.addEventListener('mouseup', stopCurrentResize);
        Object.keys(cache.map).map(k => {
            cache.emitter.emit(k, (cache.map[k].label?.getBoundingClientRect().width || 100) + cursorW);
        })
    }, [])

    useEffect(()=>{
        onQuery?.(query)
    },[query])
    let idx: string | undefined;
    let cdx: string | undefined;
    return (
        <div className="generic-list" >
            <div className="list-filter-top">
                <ListSearchBar sortBy={sortableColumns} onInputChange={(text)=>{
                  setQuery({
                    ...query,
                    query:{
                        ...query.query,
                        text
                    },
                })  
                }}onFilterChange={(_query)=>{
                      setQuery({
                        ...query,
                        query:_query,
                    })
                }}
                onSortChange={(sortBy) => {
                    setQuery({
                        ...query,
                        sortBy
                    })
                }} />
                <Selector placeholder='column' multiple list={Object.keys(itemsMapper)} selected={selectedColumn} setSelectedColumns={(s) => { setSelectedColumn(s) }} />
            </div>
            <div className="list">
                <div className="top" ref={ListTop} style={{ height: `${_top_height}px` }}>
                    {
                        selectedColumn.sort((a, b) => {
                            return (cache.map[a]?.index || 0) - (cache.map[b]?.index || 0)
                        }).map((k, i) => {
                            const option = itemsMapper[k].option;

                            cache.map[k] ? null : cache.map[k] = {
                                option: {
                                    ...option,
                                    size: 100,
                                    size_interval: [20, Number.MAX_VALUE],
                                },
                                x0: 0,
                                w0: 0,
                                w: 0,
                                dx: 0,
                                label: null,
                                resize: false,
                                index: i,
                            };
                            return <>
                                <div draggable key={k + '_l'} ref={(ref) => cache.map[k].label = ref} className="label" style={{ width: `${(cache.map[k].w || option?.size || 100)}px` }}
                                    onDragStartCapture={() => {
                                        cdx = k;
                                        idx = k;
                                    }} onDragEnter={(e) => {
                                        e.currentTarget.style.background = '#3455'
                                    }}
                                    onDragLeave={(e) => {
                                        idx = k;
                                        e.currentTarget.style.background = e.currentTarget.dataset.background || 'inherit';
                                    }}
                                    onDragEnd={() => {
                                        if (!idx || !cdx) return;
                                        let a = cache.map[cdx].index - cache.map[idx].index;
                                        a = (Math.abs(a) / a) * 0.5
                                        cache.map[cdx].index = cache.map[idx].index + 0;
                                        cache.map[idx].index = cache.map[idx].index + a;
                                        Object.keys(itemsMapper).sort((a, b) => {
                                            return (cache.map[a]?.index || 0) - (cache.map[b]?.index || 0)
                                        }).forEach((_k, i) => {
                                            if (cache.map[_k]) cache.map[_k].index = i;
                                        });
                                        const list = [...selectedColumn.sort((a, b) => {
                                            return (cache.map[a]?.index || 0) - (cache.map[b]?.index || 0)
                                        })]

                                        setSelectedColumn(list);
                                    }}
                                >{k}</div>
                                <div key={k + '_c'} className="cursor" style={{ width: `${cursorW}px`, cursor: option?.resizable === false ? 'initial' : 'ew-resize' }} onMouseDown={(e) => {
                                    cache.map[k].x0 = e.clientX;
                                    cache.map[k].w0 = cache.map[k].label?.getBoundingClientRect().width || 100;
                                    setCurrentResize(k);
                                }}></div>
                            </>
                        })
                    }
                </div>
                <div className='items' style ={{ overflowY:overflow||'scroll'}}onScroll={(e) => {

                    if (ListTop.current) ListTop.current.style.left = `${-e.currentTarget.scrollLeft}px`
                    console.log(ListTop.current?.style.left);
                }} >
                    {
                        datas.map(d => {
                             
                            return <div ref={(ref)=> d.$itemRef = ref} key={d.id} className="item" style={{ height: `${_items_height}px`, display: 'block' }} onClick={()=>{
                                let is = multiple ?
                                [...(selectedItems.includes(d) ? selectedItems.filter(a => a !== d) : [...selectedItems, d])] :
                                [d];
                            setSelectedItems(is);
                            onItemsSelected?.(is as any , datas as any);
                            console.log(d);
                            
                            }} >
                                {
                                    selectedColumn.sort((a, b) => {
                                        return (cache.map[a]?.index || 0) - (cache.map[b]?.index || 0)
                                    }).map(k => {

                                        let viewRef: HTMLElement | null = null;
                                        const val = d[k as keyof typeof d] as any;
                                        cache.emitter.when(k, (columnSize) => {
                                            if (viewRef) viewRef.style.width = `${columnSize}px`;
                                        })
                                        const setRef = (ref: HTMLElement | null) => {
                                            viewRef = ref
                                            if (ref) {
                                                ref.classList.add('gl-value', k);
                                                ref.style.width = `${(cache.map[k].label?.getBoundingClientRect().width || 0) + cursorW}px`;
                                            }
                                        }
                                        return itemsMapper[k].getView(k, val, {
                                            onResize(event: string, func: Function) {
                                                cache.emitter.when(event, (columnSize) => func({ width: columnSize, height: _items_height }))
                                            },
                                            id: val.id,
                                            onAnyCellSelected(_columnName, _callBack) {
                                                //TODO
                                            },
                                            onAnyItemSelected(_columnName, _callBack) {
                                                //TODO
                                            },
                                            onMyCellSelected(_columnName, _callBack) {
                                                //TODO
                                            },
                                            onMyItemSelected(_columnName, _callBack) {
                                                //TODO
                                            },
                                        }, setRef);
                                    })
                                }
                            </div>
                        })
                    }
                </div>
            </div>
            <ListPaging page={filter.page || 1} limit={filter.limit || 25} total={filter.total || 1} setPage={(page) =>
                setQuery({
                    ...query,
                    page
                })
            } />
        </div>
    )
}




const GenericList: typeof _GenericList & {
    StringElement: typeof StringElementJSX,
    ImageElement: typeof ImageElementJSX,
} = _GenericList as any

GenericList.StringElement = StringElementJSX;
GenericList.ImageElement = ImageElementJSX;
// GenericList.SwitchElement = SwitchElement;
// GenericList.RadioElement = RadioElement;
// GenericList.InputTextElement = InputTextElement;
// GenericList.InputFileElement = InputFileElement;
// GenericList.InputPasswordElement = InputPasswordElement;
// GenericList.InputSelectorElement = InputSelectorElement;
// GenericList.InputCollectorElement = InputCollectorElement;

export { GenericList }


