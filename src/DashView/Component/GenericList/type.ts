
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
        onMyItemSelected: (columnName: string, callBack: (item: Record<string, any>) => any) => any,
        onAnyItemSelected: (columnName: string, callBack: (item: Record<string, any>) => any) => any,
        onMyCellSelected: (columnName: string, callBack: (value: any) => any) => any,
        onAnyCellSelected: (columnName: string, callBack: (value: any) => any) => any,
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

export type FilterInterval = [[number, number], [number, number]]
export type FilterLevel = [[number, number], number]
export type FilterCollector = [string[], string[]]
export type FilterListCollector = [string[], string[]]
export type FilterSwitch = boolean;


export type FilterOption = {
    interval: FilterInterval,
    level: FilterLevel,
    collector: FilterCollector,
    swich: FilterSwitch,
    listCollector: FilterListCollector
}
export type FilterValues<T extends keyof FilterOption> = {
    type: T,
    values: FilterOption[T],
    name: string;
    icon?: string
}
export type FilterQuery = {
    page: number,
    sortBy: string,
    limit: number,

};

export type filterType = {
    sortableColumns?: string[],
    page?: number,
    total?: number,
    limit?: number,
    sortBy: string;
    filter?: FilterValues<keyof FilterOption>[]
}