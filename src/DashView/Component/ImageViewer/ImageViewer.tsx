import { useEffect, useState } from "react";
import "./ImageViewer.css";
import { Host } from "../../../Config";
import { useDashStore } from "../../dashStore";

type ImageViewerMapper = Record<string, {
    img: string,
    index: number,
    isLocal?: boolean,
    file?: File,
    name: string,
}>
let i = 0;
export function ImageViewer({ images=[], optionPosition = "bottom", onSave, name,autosave  }: { name: string, images?: string[], onImageChange?: (images: string[]) => any,  onSave?: (images:ImageViewerMapper) => any, onImageAdded?: (files: FileList) => any, autosave?: boolean, optionPosition?: 'bottom' | 'right' }) {
    const [LocalImage] = useState(images.map(i => i));
    const [id] = useState((Math.random() + (i++)).toString());
    const { openChild } = useDashStore();
    const [imageMapper, setImageMapper] = useState({} as ImageViewerMapper);
    const [length, setLength] = useState(0);
    useEffect(() => {
        const r = {} as ImageViewerMapper
        for (let i = 0; i < LocalImage.length; i++) {
            const img = LocalImage[i];
            r[img] = { img, index: i, name: img};
        }
        setImageMapper(r);
    }, [LocalImage]);

    let Dimg: string | undefined;
    let Dtarg: string | undefined;

    return (
        <div className='image-viewer'>
            <div className={"top-viewer " + optionPosition}>
                <div className="image-ctn">
                    {
                        Object.keys(imageMapper).map((k) => {
                            return (
                                <div key={k} draggable className="image" style={{ background: `no-repeat center/cover url(${imageMapper[k].isLocal?'':Host}${`${imageMapper[k].img}`})` }} onDragStartCapture={() => {
                                        Dimg = k;
                                        Dtarg = k;
                                    }} onDragEnter={(e) => {
                                        e.currentTarget.style.opacity = '0.5'
                                    }}
                                    onDragLeave={(e) => {
                                        Dtarg = k;
                                        e.currentTarget.style.opacity = '';
                                    }} onDragEnd={() => {
                                        if (!Dtarg || !Dimg) return;
                                        let a = imageMapper[Dimg].index - imageMapper[Dtarg].index;
                                        a = (Math.abs(a) / a) * 0.5
                                        imageMapper[Dimg].index = imageMapper[Dtarg].index + 0;
                                        imageMapper[Dtarg].index = imageMapper[Dtarg].index + a;

                                        const list = Object.keys(imageMapper).sort((a, b) => {
                                            return (imageMapper[a]?.index || 0) - (imageMapper[b]?.index || 0)
                                        }).map((_k, i) => {
                                            imageMapper[_k].index = i;
                                            imageMapper[_k].name = _k;
                                            return imageMapper[_k]
                                        });

                                        const r = {} as ImageViewerMapper;
                                        for (let i = 0; i < list.length; i++) {
                                            const m = list[i];
                                            r[m.name] = m;
                                        }
                                        setImageMapper(r);
                                        if(autosave) onSave?.(r)
                                    }} onClick={() => {
                                        openChild(<ImageViewerPage selectedKey={k} imagesMapper={imageMapper} />);
                                    }}>

                                </div>
                            )
                        })
                    }
                </div>
                <div className={"option " + optionPosition}>
                    <input type="file" multiple style={{ display: 'none' }} name="img" id={id + 'add'} onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                            const r = {} as ImageViewerMapper;
                            for (let i = e.target.files.length - 1; i >= 0; i--) {
                                const file = e.target.files[i];
                                const n = `${name}_${length + i}`;
                                r[n] = { img: URL.createObjectURL(e.target.files[i]), index: -(length + i), file, isLocal: true, name: n };
                            }
                            const p = { ...r, ...imageMapper };
                            Object.keys(p).sort((a, b) => {
                                return (p[a]?.index || 0) - (p[b]?.index || 0)
                            }).forEach((_k, i) => {
                                p[_k].index = i;
                            });
                            setImageMapper(p);
                            if(autosave) onSave?.(p)
                            setLength(length + e.target.files.length);
                        }
                    }} />
                    <label htmlFor={id + 'add'} className="add">
                        <div className="icon"></div>
                        <div className="label">NEW</div>
                    </label >
                    <div className="open" onClick={() => {
                        openChild((
                            <ImageViewerPage selectedKey={Object.keys(imageMapper)[0]} imagesMapper={imageMapper} />
                        ))
                    }}>
                        <div className="icon"></div>
                        <div className="label">OPEN</div>
                    </div>
                    <div className="save" onClick={() => {
                        onSave?.(imageMapper);
                    }}>
                        <div className="icon"></div>
                        <div className="label">SAVE</div>
                    </div>
                </div>
            </div>

        </div>
    )
}

function ImageViewerPage({ imagesMapper, selectedKey }: { imagesMapper: ImageViewerMapper, selectedKey: string }) {
    const { openChild } = useDashStore();
    const [selected, setSelected] = useState(selectedKey);
    const [cache] = useState({
        next: (imagesMapper: any, selected: string, setSelected: Function) => {
            const next = imagesMapper[selected].index + 1;
            const k = Object.keys(imagesMapper).find((k) => imagesMapper[k].index == next);
            setSelected(k || selected);
        },
        prev: (imagesMapper: any, selected: string, setSelected: Function) => {
            const next = imagesMapper[selected].index - 1;
            const k = Object.keys(imagesMapper).find((k) => imagesMapper[k].index == next);
            setSelected(k || selected);
        },
        selected: selected,
        isInit: false,
    });
    cache.selected = selected;
    useEffect(() => {
        if (cache.isInit) return;
        cache.isInit = true;
        window.addEventListener('keyup', (e) => {
            console.log(imagesMapper[selected]);

            if (e.code == 'ArrowRight') {
                cache.next(imagesMapper, cache.selected, setSelected);
            } else if (e.code == 'ArrowLeft') {
                cache.prev(imagesMapper, cache.selected, setSelected)
            }
        })
    }, [])
    return (
        <div className="viewer-images" onClick={(e) => {
            e.stopPropagation();
            if (e.currentTarget == e.target)
                openChild(undefined);
        }}>
            <div className="close" onClick={() => {
                openChild(undefined);
            }}></div>
            <div className="image-ctn" style={{ background: `no-repeat center/cover url(${imagesMapper[selected].isLocal?'':Host}${`${imagesMapper[selected].img}`})` }} onClick={(e) => {
                e.preventDefault()
            }}>
                <div className="prev" onClick={() => {
                    cache.prev(imagesMapper, selected, setSelected);
                }}></div>
                <div className="next" onClick={() => {
                    cache.next(imagesMapper, selected, setSelected);
                }}></div>
            </div>
            <div className="list-img-ctn" onClick={(e) => {
                e.preventDefault()
            }}>
                <div className="prev"></div>
                <div className="list-img">
                    {
                        Object.keys(imagesMapper).map((k) => (
                            <div key={k} className={"min-img " + (selected == k ? 'selected' : '')} style={{ background: `no-repeat center/cover url(${imagesMapper[k].isLocal?'':Host}${`${imagesMapper[k].img}`})` }} onClick={() => {
                                setSelected(k);
                            }}></div>
                        ))
                    }
                </div>
                <div className="next"></div>
            </div>
        </div>
    )
}
