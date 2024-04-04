import { useEffect, useRef, useState } from 'react'
import { DataBase } from '../../../DataBase'
import './GenericList.css'
import { EventEmiter } from '../../../Tools/eventEmiter'

type Option = {
    size: number,
    size_interval: [number, number]
    resizable: boolean,
    editable: boolean,
    sortable: boolean
}
type Mapper = { getView: (label: string, value: any)=>HTMLElement, option?: Partial<Option>|undefined }
type LabelsType = {
    [key: string]: Mapper
}

const StringElement = (option?: Partial<Option>|undefined) => {
    return {
        getView(_: string, value: any) {
            const view = document.createElement('div');
            view.textContent = value?.toString();
            return view
        },
        option
    }
};
const ImageElement = (option?: Partial<Option>|undefined) => {
    return {
        getView(_: string, value: any) {
            const view = document.createElement('div');
            view.className = 'image-element';
            view.style.backgroundImage = `url(${value})`
            return view
        },
        option
    }
};
const c = {
    top_height: 50,
    items_height: 300,
    overflow: 'scroll',// compact
}
const GenericListCache: Record<string, boolean> = {}
const GenericList = ({ id }: { id: string | number }) => {
    const datas = DataBase.rings_Products;
    const [options, setOptions] = useState<Record<string, Option>>({});
    const labels: LabelsType = {
        id: StringElement({
            size:300,
        }),
        title: StringElement(),
        images: ImageElement(),
        status: StringElement(),
        stock: StringElement(),
        category_id: StringElement(),
        price: StringElement(),
        features: StringElement(),
        created_at: StringElement(),
    }
    const listRef = useRef<HTMLDivElement | null>(null);
    
    useEffect(() => {
        if (GenericListCache[id]) return;
        const cursorW = 5;
        const emitter = new EventEmiter();
        const map: Record<string, {
            option:Mapper['option'],
            x0: number,
            dx: number,
            w0: number,
            label: HTMLDivElement,
            resize: boolean,
        }> = {}
        GenericListCache[id] = true;
        const top = document.createElement('div');
        top.className = 'top';
        top.style.height = `${c.top_height}px`;
        const items = document.createElement('div');
        items.className = 'items';
        items.style.height = `${c.items_height}px`;
        let current: string | undefined;
        Object.keys(labels).forEach((k) => {
            const label = document.createElement('div');

            label.className = 'label';
            label.textContent = k
            const cursor = document.createElement('div');
            map[k] = {
                option:labels[k].option,
                x0: 0,
                w0: 0,
                dx: 0,
                label,
                resize: false
            };
            cursor.addEventListener('mousedown', (e) => {
                map[k].x0 = e.clientX;
                map[k].w0 = label.getBoundingClientRect().width;
                current = k;
            })
            cursor.className = 'cursor';
            cursor.style.width = `${cursorW}px`
            top.append(label, cursor);
        })
        listRef.current?.childNodes.forEach((e) => e.remove())
        listRef.current?.append(top, items);
        datas.forEach(d => {
            const item = document.createElement('div');
            item.className = 'item';
            items.append(item);
            Object.keys(labels).forEach((k) => {
                const v = d[k as keyof typeof d] as any;
                const view = labels[k].getView(k,v);
                view.classList.add('value', k);
                view.style.width = `${map[k].label.getBoundingClientRect().width+cursorW}px`
                emitter.when(k,(v)=>view.style.width = `${v}px`)
                item.append(view);
            })
        });
        window.addEventListener('mousemove', (e) => {
            if (!current) return;
            console.log(e.clientX);
            const w = map[current].w0 + (e.clientX - map[current].x0)
            map[current].label.style.width = `${w}px`;
            emitter.emit(current,w+cursorW)
        });
        const stopCurrent = () => {
            current = undefined
        }
        window.addEventListener('mouseup', stopCurrent);
    }, [])

    return (
        <div className="generic-list" ref={listRef}>

        </div>
    )
}

export { GenericList }