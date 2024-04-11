import './FilterListCollector.css'
import { FilterMapper } from "../../../type";

const cache: Record<string, any> = {}

export const FilterListCollector = (collection: string[], collected: string[], multiple: boolean = true): FilterMapper => {

    return {
        getView(name, _onChange) {
            return <div className="filter-list-collector" ref={(ref) => {
                if (!ref) return;
                if (ref.dataset.init) return;
                ref.dataset.init = 'filter-list-collector';
                cache[name] = ref;
                cache[name].collected = collected
                cache[name].open = false;
                cache[name].count = ref.querySelector('.count');
                cache[name].collection = ref.querySelector('.collection')
                cache[name].collectionseeall = ref.querySelector('.collection-seeall');
            }}>
                <div className="top-collection">
                    <div className="name">{name}</div>
                    <div style={{display:'flex'}}>
                        <div className="count">{collected.length}</div>
                        <div className="collection-seeall" onClick={() => {
                            const open = !cache[name].open;
                            cache[name].open = open;
                            const collection = cache[name].collection as HTMLDivElement;
                            if (cache[name].open) {
                                cache[name].classList.add('all');
                                collection.scrollTop = 0;
                                collection.classList.add('all');
                                cache[name].style.marginTop = '0px';
                                cache[name].collectionseeall.textContent = 'Close';
                            } else {
                                collection.scrollTop = 0;
                                cache[name].classList.remove('all');
                                collection.classList.remove('all');
                                cache[name].style.marginTop = '';
                                cache[name].collectionseeall.textContent = 'See All';
                            }

                        }}>See All</div>
                    </div>
                </div>
                <div className="collection" ref={(ref) => {
                    if (!ref) return;

                    if (!ref) return;
                    ref.style.display = 'flex';
                    if (ref.dataset.full) return;
                    ref.dataset.full = 'ok';

                    const sortItems = (items: (HTMLDivElement & { dataset: { active: string, item: string } })[]) => {
                        const sortedItems = items.sort((a, b) =>
                            a.dataset.active ? (b.dataset.active ? (a.dataset.item > b.dataset.item ? 1 : -1) : -1) : (b.dataset.active ? 1 : (a.dataset.item > b.dataset.item ? 1 : -1))
                        )
                        ref.append(...sortedItems);
                        cache[name].count.textContent = cache[name].collected.length;
                    }
                    const items = collection.map((c) => {
                        const item = document.createElement('div');
                        item.className = 'collection-item';
                        item.dataset.item = c;
                        item.dataset.active = '';
                        item.addEventListener('click', () => {
                            const includes = (cache[name].collected as string[]).includes(c);
                            if (includes) {
                                cache[name].collected = (cache[name].collected as string[]).filter(f => f != c)
                                item.style.background = '';
                                item.style.color = '';
                                item.dataset.active = '';
                                _onChange(cache[name].collected);
                                sortItems(items as any)
                                return;
                            }
                            if (multiple) {
                                (cache[name].collected as string[]).push(c);
                                item.style.background = 'rgb(0, 0, 150)';
                                item.style.color = '#fff';
                                item.dataset.active = 'yes';
                            } else {
                                items.forEach(i => {
                                    i.style.background = '';
                                    i.style.color = '';
                                    item.dataset.active = '';
                                })
                                item.style.background = 'rgb(0, 0, 150)';
                                item.style.color = '#fff';
                                item.dataset.active = 'yes';
                                cache[name].collected = [c];
                            }
                            _onChange(cache[name].collected);
                            sortItems(items as any)
                        })
                        item.textContent = c;
                        return item;
                    })
                    ref.append(...items);
                }}>
                </div>

            </div>
        }
    }
}