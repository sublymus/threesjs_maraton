import { useEffect, useState } from "react";
import "./ImageViewer.css";
import { Host } from "../../../Config";
import { useDashStore } from "../../dashStore";

export type ImageViewerMapper = Record<string, {
    img: string,
    index: number,
    isLocal?: boolean,
    file?: File,
    name: string,
}>
let i = 0;
const imageMapperCache: Record<string, ImageViewerMapper> = {}
let currentDragImage: (ImageViewerMapper[string] & { id: string, expireAt: number }) | null = null;
const ListenerCache: Record<string, (k: string) => any> = {}
export function ImageViewer({ images = [], optionPosition = "bottom", onSave, name, autosave, cannotEdit }: { cannotEdit?: boolean, name: string, images?: string[], onImageChange?: (images: string[]) => any, onSave?: (images: ImageViewerMapper) => any, onImageAdded?: (files: FileList) => any, autosave?: boolean, optionPosition?: 'bottom' | 'right' }) {
    const [LocalImage] = useState(images.map(i => i));
    const [canSave, setCanSave] = useState(false);
    const [id] = useState((Math.random() + (i++)).toString());
    const { openChild } = useDashStore();
    const [imageMapper, setImageMapper] = useState({} as ImageViewerMapper);
    const [localLength, setLocalLength] = useState(0);
    useEffect(() => {
        const r = {} as ImageViewerMapper
        for (let i = 0; i < LocalImage.length; i++) {
            const img = LocalImage[i];
            r[img] = { img, index: i, name: img };
        }
        setImageMapper(r);
    }, [LocalImage]);

    let Dimg: string | undefined;
    let Dtarg: string | undefined;

    const newFiles = (files: FileList | File[]) => {
        if (!files || files.length == 0) return
        const r = {} as ImageViewerMapper;
        for (let i = files.length - 1; i >= 0; i--) {
            const file = files[i];
            console.log(file.type);
            
            if(!file.type.startsWith('image/')) continue;
            const n = `${name}_${localLength + i}`;
            r[n] = { img: URL.createObjectURL(files[i]), index: -(localLength + i), file, isLocal: true, name: n };
        }
        const p = { ...r, ...imageMapper };
        Object.keys(p).sort((a, b) => {
            return (p[a]?.index || 0) - (p[b]?.index || 0)
        }).forEach((_k, i) => {
            p[_k].index = i;
        });
        setImageMapper(p);
        console.log(' blob', p);
        if (autosave) onSave?.(p)
        setCanSave(true)
        setLocalLength(localLength + files.length);
    }
    const receiverDropImage = (img: typeof currentDragImage) => {
        if (!img) return;
        if (img.isLocal && img.file) {
            newFiles([img.file]);
            ListenerCache[img.id](img.name);
            setCanSave(true);
            if (autosave) onSave?.(imageMapper)
        } else {
            fetch(`${Host}${img.img}`).then(r => r.blob()).then((blob) => {
                newFiles([blob as File]);
                ListenerCache[img.id](img.name);
                setCanSave(true);
                if (autosave) onSave?.(imageMapper)
                return
            });
        }
    }
    const dragLeave = (e: any) => {
        e.currentTarget.style.backgroundColor = '';
        e.preventDefault();
        e.stopPropagation();
    }
    const dragOver = (e: any) => {
        e.currentTarget.style.backgroundColor = '#3454';
        e.preventDefault();
        e.stopPropagation()
    }
    const deleteImage = (k: string) => {
        let localCount = 0;
        const list = Object.keys(imageMapper).filter(f => f !== k).sort((a, b) => {
            return (imageMapper[a]?.index || 0) - (imageMapper[b]?.index || 0)
        }).map((_k, i) => {
            imageMapper[_k].index = i;
            imageMapper[_k].name = _k.startsWith(name + '_') ? (name + '_' + (localCount++)) : _k;
            return imageMapper[_k];
        });

        setLocalLength(localCount);

        const r = {} as ImageViewerMapper;
        for (let i = 0; i < list.length; i++) {
            const m = list[i];
            r[m.name] = m;
        }
        setImageMapper(r);

        console.log('apres', r, localCount);
        if (autosave) onSave?.(r);
        setCanSave(true)
    }
    imageMapperCache[id] = imageMapper;
    ListenerCache[id] = deleteImage;
    
    return (
        <div className='image-viewer'>
            <div className={"top-viewer " + optionPosition}>
                <div className="image-ctn" onDragOver={(e) => {
                    if (cannotEdit) return
                    dragOver(e);
                }} onDragLeave={(e) => {
                    if (cannotEdit) return
                    dragLeave(e)
                }} onDragExit={(e) => {
                    if (cannotEdit) return
                    dragLeave(e)
                }} onDrop={(e) => {
                    if (cannotEdit) return
                    dragLeave(e)
                    e.preventDefault();
                    e.stopPropagation()
                    console.log("File(s) dropped", e.dataTransfer.files);
                    const img = currentDragImage;
                    currentDragImage = null;
                    if (e.dataTransfer.files.length > 0) {
                        newFiles(e.dataTransfer.files);
                    } else if (img && Date.now() < img.expireAt && img.id !== id) {
                        receiverDropImage(img);
                    }
                }}>
                    {
                        (Object.keys(imageMapper).length == 0) && <label htmlFor={id + 'add'} className="empty-image image">
                            <div className="label">Drag and Drop</div>
                        </label>
                    }
                    {
                        Object.keys(imageMapper).map((k) => {
                            return (
                                <div key={k} draggable className="image" style={{ background: `no-repeat center/cover url(${imageMapper[k].isLocal ? '' : (imageMapper[k].img.startsWith('/') ? Host : '')}${`${imageMapper[k].img}`})` }} onDragStartCapture={(e) => {
                                    if (cannotEdit) return
                                    Dimg = k;
                                    Dtarg = k;
                                    e.currentTarget.dataset.id = id;
                                    currentDragImage = { ...imageMapper[k], id, expireAt: Date.now() + 5000 };
                                }} onDragEnter={(e) => {
                                    if (cannotEdit) return
                                    e.currentTarget.style.opacity = '0.5'
                                    Dtarg = k;
                                }}
                                    onDragLeave={(e) => {
                                        if (cannotEdit) return
                                        e.currentTarget.style.opacity = '';
                                    }}
                                    onDragExit={(e) => {
                                        if (cannotEdit) return
                                        e.currentTarget.style.opacity = '';
                                    }}
                                    onDrop={(e) => {
                                        if (cannotEdit) return
                                        e.currentTarget.style.opacity = '';
                                    }} onDragEnd={() => {
                                        if (cannotEdit) return
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
                                        setCanSave(true);
                                        if (autosave) onSave?.(r)
                                    }} onClick={() => {
                                        openChild(<ImageViewerPage selectedKey={k} imagesMapper={imageMapper} />, true);
                                    }}>
                                    {
                                        !cannotEdit && <span className="delete-img" onClick={(e) => {
                                            e.stopPropagation();
                                            const confirm = e.currentTarget.parentElement?.querySelector('.confirm-delete-image') as HTMLDivElement;
                                            if (!confirm) return;
                                            confirm.style.display = 'flex'
                                        }}></span>
                                    }
                                    <span className="open-img"></span>
                                    <div className="confirm-delete-image" onClick={(e) => {
                                        e.stopPropagation();
                                    }}>
                                        <div className="message">Delete this Image</div>
                                        <div className="option">
                                            <div className="cancel" onClick={(e) => {
                                                e.currentTarget.parentElement!.parentElement!.style.display = 'none'
                                            }}>Cancel</div>
                                            <div className="delete" onClick={() => {
                                                deleteImage(k)
                                            }}>Delete</div>
                                        </div>
                                    </div>
                                </div>)
                        })
                    }
                </div>
                <div className={"option " + optionPosition}>
                    <input type="file" accept="image/*" multiple style={{ display: 'none' }} name="img" id={id + 'add'} onChange={(e) => {
                        if (cannotEdit) return
                        if (e.target.files && e.target.files[0]) {
                            newFiles(e.target.files);
                        }
                    }} />
                    {
                        !cannotEdit && <label htmlFor={id + 'add'} className="add">
                            <div className="icon"></div>
                            <div className="label">NEW</div>
                        </label >
                    }
                    {(Object.keys(imageMapper).length > 0) && <div className="open" onClick={() => {
                        openChild((
                            <ImageViewerPage selectedKey={Object.keys(imageMapper)[0]} imagesMapper={imageMapper} />
                        ), true)
                    }}>
                        <div className="icon"></div>
                        <div className="label">OPEN</div>
                    </div>}
                    {(!autosave && !cannotEdit)&& <div className={"save " + (canSave ? 'can-save' : '')} style ={{opacity:canSave?'1':'0.2'}}onClick={() => {
                        onSave?.(imageMapper);
                        setCanSave(false)
                    }}>
                        <div className="icon"></div>
                        <div className="label">SAVE</div>
                    </div>}
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
            <div className="image-ctn" style={{ background: `no-repeat center/cover url(${imagesMapper[selected].isLocal ? '' : (imagesMapper[selected].img.startsWith('/') ? Host : '')}${`${imagesMapper[selected].img}`})` }} onClick={(e) => {
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
                            <div key={k} className={"min-img " + (selected == k ? 'selected' : '')} style={{ background: `no-repeat center/cover url(${imagesMapper[k].isLocal ? '' : (imagesMapper[selected].img.startsWith('/') ? Host : '')}${`${imagesMapper[k].img}`})` }} onClick={() => {
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
