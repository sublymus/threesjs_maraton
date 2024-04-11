import { FilterMapper } from '../../../type';
import './FilterInterval.css'


export const FilterInterval = (filterInterval: [number, number], defaultValue: [number, number]): FilterMapper => {

    return {
        getView(name, _onChange) {
            
            return <div className="filter-interval" ref={(ref) => {
                if (!ref) return;
                if (ref.dataset.init) return;
                ref.dataset.init = 'interval';
                const leftRef = ref.querySelector('.left-round') as HTMLDivElement;
                const rightRef = ref.querySelector('.right-round') as HTMLDivElement;
                const interval = ref.querySelector('.interval') as HTMLDivElement;
                const frontBar = ref.querySelector('.front-bar') as HTMLDivElement;
                const rLabel = rightRef.querySelector('.label') as HTMLDivElement;
                const lLabel = leftRef.querySelector('.label') as HTMLDivElement;

                const m = 20
                const setFronBar = (width: number, left?: number) => {
                    if (left) frontBar.style.left = `${left + m / 2}px`;
                    frontBar.style.width = `${width}px`;
                }
                const min = Math.min(...filterInterval);
                const max = Math.max(...filterInterval);
                const intervalWidth = 300;
                const dI = max - min;
                const result = [0, intervalWidth];
                const setResult = (index: number, value: number, w: number) => {
                    result[index] = value;
                    const lRes = Math.round((result[0] / w) * dI + min);
                    const rRes = Math.round((result[1] / w) * dI + min);
                    lLabel.textContent = `${lRes}`;
                    rLabel.textContent = `${rRes}`;
                    _onChange([lRes, rRes])
                }
                lLabel.textContent = `${Math.min(...defaultValue)}`;
                rLabel.textContent = `${Math.max(...defaultValue)}`;
                window.addEventListener('mousemove', (e) => {
                    let ex = e.clientX;
                    const intervalRect = interval?.getBoundingClientRect();
                    const leftRect = leftRef?.getBoundingClientRect();
                    const rightRec = rightRef?.getBoundingClientRect();
                    if (leftRef?.dataset?.x0) {
                        const w = (intervalRect.width || intervalWidth);
                        const x0 = Number(leftRef.dataset.x0);
                        const l0 = Number(leftRef.dataset.l0 || '0');
                        const r_r = w - Number(rightRef.style.right.replace('px', '') || '0') - m;
                        let l = l0 + (ex - x0);
                        l = (l < -m ? -m : l > r_r - m ? r_r - m : l);
                        leftRef.style.left = `${l}px`;
                        const dif = rightRec.x - leftRect.x - m;
                        const lRes = l + m;
                        lLabel.style.zIndex = '20';
                        rLabel.style.zIndex = '0';
                        setFronBar(dif + m, l);
                        setResult(0, lRes, w)
                    }
                    else if (rightRef?.dataset?.x0) {
                        const x0 = Number(rightRef.dataset.x0);
                        const r0 = Number(rightRef.dataset.r0 || '0');
                        const w = (intervalRect.width || intervalWidth);
                        const l_l = w - Number(leftRef.style.left.replace('px', '') || '0') - m;
                        let r = r0 - (ex - x0);
                        r = (r < -m ? -m : r > l_l - m ? l_l - m : r);
                        rightRef.style.right = `${r}px`;
                        const dif = rightRec.x - leftRect.x - m;
                        const rRes = w - r - m;
                        rLabel.style.zIndex = '20';
                        lLabel.style.zIndex = '0';
                        setFronBar(dif + m);
                        setResult(1, rRes, w)
                    }
                })
                const clear = () => {
                    if (leftRef) leftRef.dataset.x0 = '';
                    if (rightRef) rightRef.dataset.x0 = '';
                }
                window.addEventListener('mouseup', clear)
                window.addEventListener('mouseleave', clear)
            }}>
                <div className="name">{name}</div>
                <div className="interval">
                    <div className="back-bar"></div>
                    <div className="front-bar"></div>
                    <div className="left-round" style ={{left:'-20px'}}ref={(ref) => {
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
                    <div className="right-round" style={{right:'-20px'}} ref={(ref) => {
                        if (!ref) return;
                        if (ref.dataset.init) return;
                        ref.dataset.init = 'right';
                        ref.addEventListener('mousedown', (e) => {
                            ref.dataset.x0 = e.clientX + '';
                            ref.dataset.r0 = ref.style.right.replace('px', '');
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