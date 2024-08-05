import { useEffect } from 'react';
import { AddHorizontalScrollIcon } from '../../../Tools/ScrollTools'
import { useAppRouter, useAppStore } from '../../AppStore';
import { useProductStore } from '../../Layout/PageProducts/ProductStore';
import { useRegisterStore } from '../../Layout/PageRegister/RegisterStore';
import './Visites.css'
import { ProductCard } from '../ProductCard/ProductCard';
import { PageAuth } from '../../Layout/PageRegister/PageAuth';
import { ProductInterface } from '../../../DataBase';

export function Visites({ mode }: { mode?: 'v' | 'h' }) {
    const { pathList, qs } = useAppRouter();
    const { visites, fetchVisites, setVisites, fetchProducts } = useProductStore();
    const { openChild } = useAppStore()
    const { user } = useRegisterStore()
    const refresh = (_p: ProductInterface) => {
        fetchProducts({
            product_id: _p.id,
            no_save: true
        }).then((p) => {
            if (p?.list[0].id) {
                const newP = { ...p?.list[0] };
                setVisites({
                    ...visites,
                    list: visites?.list.map(p => p.id == newP.id ? newP : p)
                })
            }
        })
        
    }
    useEffect(() => {
        !visites && user && fetchVisites({})
    }, [user, pathList]);
    return <div className={"comp-visites " + (mode || 'h')}>
        <h1 className='title'>Products Visited<span></span></h1>
        <div className="list" ref={AddHorizontalScrollIcon({ posistion: 20 })}>
            {!user && (
                <div style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => openChild(<PageAuth />, true,/* background 80% */ '#fffc')}>Connexion required</div>
            )}
            {
                visites?.list.map((p) => (
                    <ProductCard aspect={mode == 'v' ? 1.4 : undefined} mode='inlist' key={p.id} product={p} onClick={() => {
                        qs({ product_id: p.id }).setAbsPath(['products', 'detail'])
                    }} onRefresh={(_p) => {
                        refresh(_p)
                    }} />
                ))
            }
        </div>
    </div>
}