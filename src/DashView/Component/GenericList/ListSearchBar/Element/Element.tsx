
import './Elements.css'
import { MapperBuilderJSX } from "../../type";
export const StringElementJSX: MapperBuilderJSX = (option) => {
    return {
        getView(colunm, value, e, setRef) {
            return <div key={e.id + colunm} ref={setRef}>{value?.toString()}</div>
        },
        option
    }
};

export const DateStringElementJSX: MapperBuilderJSX = (option) => {
    return {
        getView(colunm, value, e, setRef) {
            return <div key={e.id + colunm} ref={setRef}>{new Date(value).toDateString()}</div>
        },
        option
    }
};

export const ImageElementJSX: MapperBuilderJSX<{ schadow: string }> = (option) => {
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
