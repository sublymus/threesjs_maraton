import { useEffect, useState } from 'react';
import { AddHorizontalScrollIcon } from '../../../Tools/ScrollTools'
import { useAppRouter } from '../../AppStore';
import { useProductStore } from '../../Layout/PageProducts/ProductStore';
import './MoreProduct.css'
import { ProductCard } from '../ProductCard/ProductCard';
import { ListType, ProductInterface } from '../../../DataBase';
import { useRegisterStore } from '../../Layout/PageRegister/RegisterStore';

export function MoreProduct({ mode }: { mode?: 'v' | 'h' }) {
    const { qs } = useAppRouter();
    const { product, fetchProducts } = useProductStore();
    const { store } = useRegisterStore()
    const [moreProducts, setMoreProducts] = useState<ListType<ProductInterface>>()

    useEffect(() => {
        fetchProducts({
            no_save: true,
            // lol:true,
            category_id: product?.category_id
        }).then((ps) => {
            if (ps?.list) {
                setMoreProducts(ps)
            }
        });
    }, [product, store]);
    const refresh = (_p: ProductInterface) => {
        moreProducts &&  fetchProducts({
            product_id: _p.id,
            no_save: true,
            lol:true,
        }).then((p) => {
            if (p?.list[0].id) {
                const newP = { ...p?.list[0] };
                moreProducts && setMoreProducts({
                    ...moreProducts,
                    list: moreProducts.list.map(p => p.id == newP.id ? newP : p)
                })
            }
        })
        
    }
    return <div className={"more-products " + (mode || 'h')}>
        <h1 className='title more'>More Products<span></span></h1>
        <div className="list" ref={AddHorizontalScrollIcon({ posistion: 20 })}>
            {
                moreProducts?.list.map((p) => (
                    <ProductCard aspect={mode == 'v' ? 1.4 : undefined} mode='inlist' key={p.id} product={p} active={product?.id == p.id} onClick={() => {
                        qs({ product_id: p.id }).setAbsPath(['products', 'detail'])
                    }}onRefresh={(_p)=>{
                        refresh(_p)
                    }}/>
                ))
            }
        </div>
    </div>
}