import { useEffect, useRef, useState } from 'react'
import './GenericList.css'
import { EventEmiter } from '../../../Tools/eventEmiter'
import { ListSearchBar } from "./ListSearchBar/ListSearchBar";
import { ListPaging } from "./ListPaging/ListPaging";
import { Selector } from "../../Component/Selector/Selector";
import { ImageElementJSX, StringElementJSX, DateStringElementJSX } from "./ListSearchBar/Element/Element";
// import {  } from "./ListSearchBar/Filter/Filter";
import type { FilterQuery, ItemsMapperJSX, Mapper, filterType } from "./type";
import { FilterInterval } from './ListSearchBar/Filter/FilterInterval/FilterInterval';

const DEFAULT_ITEM_HEIGHT = 80;
const DEFAULT_TOP_HEIGHT = 40;
const DEFAULT_LIMIT = 25;

//TODO bug lor de la permutation des colonne, les deux colone consernee ne pas etre dragee imediatement
const _GenericList = ({ canPaginate ,datas, disableFilterBar, itemsMapper, items_height, top_height, overflow, filter, onQuery, onItemsSelected, multiple, canAddNew, onNewRequired }: { canPaginate?:boolean ,disableFilterBar?: boolean, canAddNew?: boolean, onNewRequired?: () => any, onItemsSelected?: (selectedItems: (Record<string, any> & { $itemRef: HTMLDivElement | null })[], items: (Record<string, any> & { $itemRef: HTMLDivElement | null })[]) => any, multiple?: boolean, onQuery?: (query: FilterQuery) => any, filter?: filterType, top_height?: number, items_height?: number, overflow?: 'scroll' | 'hidden' | 'displayFlex'/* TODO display flex */, id: string | number, datas: Record<string, any>[], itemsMapper: ItemsMapperJSX }) => {

    const [selectedColumn, setSelectedColumn] = useState(Object.keys(itemsMapper));
    const [selectedItems, setSelectedItems] = useState<Record<string, any>[]>([]);

    const [query, setQuery] = useState({
        page: filter?.page || 1,
        sortBy: filter?.sortBy.includes('_') ? filter?.sortBy : filter?.sortBy + '_desc' || filter?.sortableColumns?.[0] + '_desc' || '',
        limit: filter?.limit || DEFAULT_LIMIT,
        query: {} as Record<string, any>
    });
    const [cache] = useState({
        lastResized: '',
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
    const ListTop = useRef<HTMLDivElement | null>(null);


    const _items_height = items_height ?? DEFAULT_ITEM_HEIGHT;
    const _top_height = top_height ?? DEFAULT_TOP_HEIGHT;
    const sortableColumns = filter?.sortableColumns ?? []
    const cursorW = 5;
    const _overflow = overflow || 'displayFlex';

    let idx: string | undefined;
    let cdx: string | undefined;

    useEffect(() => {
        onQuery?.(query);
    }, [query])
    useEffect(() => {
        if (!currentResize) {
            clearInterval(cache.interval_id);
            cache.emitter.emit('endResize', cache.lastResized);
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
        cache.lastResized = currentResize
        cache.emitter.emit('startResize', currentResize);
        console.log('startResize', currentResize);
    }, [currentResize]);
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

    return (
        <div className="generic-list" >
            {(!disableFilterBar) && <div className="list-filter-top">
                <ListSearchBar filter={filter?.filter || {}} sortBy={sortableColumns} onInputChange={(text) => {
                    setQuery({
                        ...query,
                        query: {
                            ...query.query,
                            text
                        },
                    })
                }}
                    onFilterChange={(_query) => {
                        // setQuery({
                        //     ...query,
                        //     query: _query,
                        // })
                    }}
                    onSortChange={(sortBy) => {
                        setQuery({
                            ...query,
                            sortBy
                        })
                    }}
                    onSearchRequired={() => {
                        console.log('SearchRequired');
                        onQuery?.(query)
                    }} />
                <Selector placeholder='column' multiple list={Object.keys(itemsMapper)} selected={selectedColumn} setSelectedColumns={(s) => { setSelectedColumn(s) }} />
                {canAddNew && (<div className='new-btn' onClick={onNewRequired}>ADD NEW</div>)}
            </div>
            }
            <div className="list">
                <div className="top-ctn" style={{ height: `${_top_height}px` }}>
                    <div className={'top ' + (_overflow == 'displayFlex' ? 'flex' : '')} ref={ListTop} style={{ height: `${_top_height}px` }}>
                        {
                            selectedColumn.sort((a, b) => {
                                return (cache.map[a]?.index || 0) - (cache.map[b]?.index || 0)
                            }).map((k, i) => {
                                const option = itemsMapper[k].option;
                                cache.map[k] ? null : (cache.emitter.when('startResize', () => {
                                    const l = cache.map[k].label;
                                    if (l) l.draggable = false;
                                }).when('endResize', () => {
                                    const l = cache.map[k].label;
                                    if (l) l.draggable = true;
                                })) && (cache.map[k] = {
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
                                })
                                return <>
                                    <div key={k + '_l'} ref={(ref) => cache.map[k].label = ref} className="label" style={{ width: `${(cache.map[k].w || option?.size || 100)}px` }}
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
                                    <div key={k + '_c'} className="cursor" style={{ minWidth: `${cursorW}px`, maxWidth: `${cursorW}px`, cursor: option?.resizable === false ? 'initial' : 'ew-resize' }} onMouseDown={(e) => {
                                        cache.map[k].x0 = e.clientX;
                                        cache.map[k].w0 = cache.map[k].label?.getBoundingClientRect().width || 100;
                                        setCurrentResize(k);
                                    }}></div>
                                </>
                            })
                        }
                    </div>
                </div>
                <div className={'items ' + (_overflow == 'displayFlex' ? 'flex' : '')} style={{ overflowX: _overflow === 'displayFlex' ? 'hidden' : (_overflow == 'scroll' ? 'auto' : 'hidden'), height: `calc(100% - ${_top_height}px)`, }} onScroll={(e) => {
                    if (ListTop.current) ListTop.current.style.transform = `translateX(${-e.currentTarget.scrollLeft}px)`
                }} >
                    {
                        datas.map(d => {
                            return <div ref={(ref) => d.$itemRef = ref} key={d.id} className={'item ' + (_overflow == 'displayFlex' ? 'flex' : '')} style={{ height: `${_items_height}px` }} onClick={() => {
                                let is = multiple ?
                                    [...(selectedItems.includes(d) ? selectedItems.filter(a => a !== d) : [...selectedItems, d])] :
                                    [d];
                                setSelectedItems(is);
                                onItemsSelected?.(is as any, datas as any);
                            }} >
                                {
                                    selectedColumn.sort((a, b) => {
                                        return (cache.map[a]?.index || 0) - (cache.map[b]?.index || 0)
                                    }).map(k => {
                                        let viewRef: HTMLElement | null = null;
                                        const val = d[k as keyof typeof d] as any;

                                        cache.emitter.when(k, (columnSize) => {
                                            if (viewRef) viewRef.style.width = `${columnSize}px`;
                                            if (_overflow != 'displayFlex' && d.$itemRef) d.$itemRef.style.width = `${ListTop.current?.getBoundingClientRect().width}px`;
                                            else if (d.$itemRef) d.$itemRef.style.width = `${ListTop.current?.parentElement?.getBoundingClientRect().width || 0}px`;
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
                                            id: `${d.id}_${k}`,
                                            //TODO ajouter le plus d'evernement, le cellule doit pouvoir influer sur le tableau
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
            { canPaginate &&<ListPaging page={filter?.page || 1} limit={filter?.limit || DEFAULT_LIMIT} total={filter?.total || 1} setPage={(page) => {
                setQuery({
                    ...query,
                    page
                });
            }} />}
        </div>
    )
}




const GenericList: typeof _GenericList & {
    StringElement: typeof StringElementJSX,
    ImageElement: typeof ImageElementJSX,
    DateStringElement: typeof DateStringElementJSX,
    filter: {
        FilterInterval: typeof FilterInterval,
    }
} = _GenericList as any

GenericList.StringElement = StringElementJSX;
GenericList.ImageElement = ImageElementJSX;
GenericList.DateStringElement = DateStringElementJSX
// GenericList.SwitchElement = SwitchElement;
// GenericList.RadioElement = RadioElement;
// GenericList.InputTextElement = InputTextElement;
// GenericList.InputFileElement = InputFileElement;
// GenericList.InputPasswordElement = InputPasswordElement;
// GenericList.InputSelectorElement = InputSelectorElement;
// GenericList.InputCollectorElement = InputCollectorElement;

export { GenericList }


