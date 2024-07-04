import { FilterMapper } from '../../../type';
import './FilterSwitch.css'




export const FilterSwitch = (active?: boolean, simple?:boolean): FilterMapper => {

    return {
        getView(name, _onChange) {

            return <div className="filter-switch" style={{all:simple?'unset':'initial'}} ref={(ref) => {
                if (!ref) return;
                if (ref.dataset.init) return;
                ref.dataset.init = 'filter-switch';
                ref.dataset.active = (!active) ? 'ok' : '';
                const m = 20;
                const frontBar= ref.querySelector('.front-bar') as HTMLDivElement;
                const switchElem = ref.querySelector('.switch') as HTMLDivElement;
                const round= ref.querySelector('.round') as HTMLDivElement;
                const change =  () => {
                    const w = switchElem?.getBoundingClientRect().width||50;
                    const newActive = !(ref.dataset.active);
                    ref.dataset.active = newActive ? 'ok' : '';
                    round.style.left = newActive ? `${w-m}px` : `${0}px`;
                    round.style.background = newActive ? `rgb(55, 0, 255)` : `rgb(70, 70, 70)`;
                    round.style.border = newActive ? `2px solid #3168ff` : ` 2px solid #222`;
                    frontBar.style.width = newActive ? `100%` : `${m/2}px`;
                    _onChange(newActive);
                }
                round.style.left = `0px`;
                switchElem.addEventListener('mousedown',change);
                change();
            }}>
                <div className="name">{name}</div>
                <div className="switch">
                    <div className="back-bar"></div>
                    <div className="front-bar"></div>
                    <div className="round" style={{ left: '-20px' }} >
                    </div>
                </div>
            </div>
        }
    }
}