import './StorePage.css'
import { useWebRoute, useWebStore } from '../../WebStore'
import { useEffect, useState } from 'react';
import { StoreCard } from '../PageHome/PageHome';
import { ListType, StoreInterface } from '../../../DataBase';

export function StorePage() {

    const { current, pathList } = useWebRoute();
    const { fetchStores, owner } = useWebStore();
    const [stores, setStores] = useState<ListType<StoreInterface> | undefined>()
    const [searchValue, setSearchValue] = useState('')
    useEffect(() => {
        owner && current('store_list') && fetchStores({
            name: searchValue,
            only_owner: true
        }).then((res) => {
            setStores(res)
        })
    }, [pathList, owner, searchValue])
    return current('store_list') && <div className="store-list">
        <div className="page-top">
            <h1 className="title">The list of your own stores </h1>
        </div>
        <div className="section-search">
            <label htmlFor="home-search" className="search">
                <div className="icon"></div>
                <input id="home-search" type="text" placeholder="Store name" onChange={(e) => {
                    setSearchValue(e.currentTarget.value)
                }} />
            </label>
            <div className="add-new"><span></span>Add New Store</div>
        </div>
        <div className="list">
            <div className="stores">
                {stores?.list.map((s) => <StoreCard key={s.id} setSelectedStore={() => { }} store={s} />)}
            </div>
        </div>
    </div>
}