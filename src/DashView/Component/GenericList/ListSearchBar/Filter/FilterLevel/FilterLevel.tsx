import { FilterMapper } from '../../../type';
import './FilterLevel.css'


export const FilterLevel = (filterInterval: [number, number], defaultValue: number): FilterMapper => {

    return {
        getView(name, _onChange) {

            return <div className="filter-level" ref={(ref) => {
                if (!ref) return;
                if (ref.dataset.init) return;
                ref.dataset.init = 'level';
                const roudRef = ref.querySelector('.round') as HTMLDivElement;
                const level = ref.querySelector('.level') as HTMLDivElement;
                const frontBar = ref.querySelector('.front-bar') as HTMLDivElement;
                const label = roudRef.querySelector('.label') as HTMLDivElement;
                const m = 20/2
                const setFronBar = (width: number) => {
                    frontBar.style.width = `${width}px`;
                }
                const min = Math.min(...filterInterval);
                const max = Math.max(...filterInterval);
                const intervalWidth = 300;
                const dI = max - min;
                const setResult = (value: number, w: number) => {
                    const res = Math.round((value / w) * dI + min);
                    label.textContent = `${res}`;
                   if(res) _onChange(res)
                }

                setResult(0,0);
                label.textContent = `${0}`;
                setFronBar(0);
                
                label.textContent = `${max}`;
                window.addEventListener('mousemove', (e) => {
                    let ex = e.clientX;
                    const intervalRect = level?.getBoundingClientRect();
                    if (roudRef?.dataset?.x0) {
                        const w = (intervalRect.width || intervalWidth);
                        const x0 = Number(roudRef.dataset.x0);
                        const l0 = Number(roudRef.dataset.l0 || '0');
                        let l = l0 + (ex - x0);
                        l = (l < -m ? -m : l > w - m ? w - m : l);
                        roudRef.style.left = `${l}px`;
                        const lRes = l + m;
                        setResult(lRes, w);
                        setFronBar(l)
                    }
                })
                const clear = () => {
                    if (roudRef) roudRef.dataset.x0 = '';
                }
                window.addEventListener('mouseup', clear)
                window.addEventListener('mouseleave', clear)
            }}>
                <div className="name">{name}</div>
                <div className="level">
                    <div className="back-bar"></div>
                    <div className="front-bar"></div>
                    <div className="round" style ={{left:'-20px'}}ref={(ref) => {
                        if (!ref) return;
                        if (ref.dataset.init) return;
                        ref.dataset.init = 'left';
                        ref.addEventListener('mousedown', (e) => {
                            ref.dataset.x0 = e.clientX + '';
                            ref.dataset.l0 = ref.style.left.replace('px', '');
                            console.log('left down x0', ref.dataset.x0);
                        })
                    }}>
                        <div className="lable-ctn">
                            <div className="label">0</div>
                        </div>
                    </div>
                </div>
            </div>
        }
    }
}