import './PageFavorites.css'
import { useAppRouter } from "../../AppStore";
import { PageAuth } from '../PageRegister/PageAuth';
import { useRegisterStore } from '../PageRegister/RegisterStore';
import { useFavoritesStore } from "./FavoritesStore";

import { useEffect, useState } from 'react';
import { useCommandStore } from "../PageCommand/CommandStore";
import { FavoritesInterface } from '../../../DataBase';
import { LabelToColor, getImg } from '../../../Tools/StringFormater';
import { toFilter } from '../../../Tools/FilterColor';
import { ProductQuantity } from "../../Components/ProductQuantity/ProductQuantity";
import { Visites } from '../../Components/Visites/Visites';
import { MoreProduct } from '../../Components/MoreProduct/MoreProduct';
import { AddHorizontalScrollIcon } from '../../../Tools/ScrollTools';

export function PageFavorites() {
    const { pathList, check, navBack } = useAppRouter();
    const { user } = useRegisterStore();
    const { favorites, fetchFavorites, setFavorites, deleteFavorite } = useFavoritesStore();
    const { addProductToCart } = useCommandStore()

    const [currentLabel, setCurrentLabel] = useState('All');
    useEffect(() => {
        fetchFavorites({
            add_labels: true,
            label: currentLabel == 'All' ? undefined : currentLabel
        });
    }, [user, pathList, currentLabel]);
    return check('favorites') && (!user ? <div className='page-favorites'>
        <PageAuth detail='Google connexion is required to access your favorites' />
    </div> : <div className='page-favorites'>
        <div className="top-favorites _flex">
            <div className="return" onClick={() => {
                navBack();
            }}></div>
            <div className="label _lr-auto">Favorites</div>
        </div>
        <div className="favorites-ctn">
            <div className="left">
                <div className="filter-by-label-ctn">
                    <div className="filter-by" ref={AddHorizontalScrollIcon({
                        posistion: 20
                    })}>
                        <h4>labels : </h4>
                        <span className={"label " + (currentLabel == 'All' ? 'all' : '')} onClick={() => {
                            setCurrentLabel('All')
                        }}>All</span>
                        {
                            favorites?.labels?.map(l => (
                                <span className="label" style={{ background: currentLabel == l ? LabelToColor(l) : '', boxShadow: `${LabelToColor(l)} 0px 0px 3px, ${LabelToColor(l)} 0px 0px 3px, ${LabelToColor(l)} 0px 0px 3px` }} onClick={() => {
                                    setCurrentLabel(l);
                                }}>{l}</span>
                            ))
                        }
                    </div>
                </div>
                {
                    favorites?.list.map(f => (
                        <FavoriteItem key={f.id} favorite={f} onQuantityChange={() => {
                            fetchFavorites({ favorite_id: f.id }).then((newList) => {
                                if (newList?.list[0]) {
                                    const newF = newList?.list[0];
                                    favorites && setFavorites({
                                        ...newList,
                                        list: favorites.list.map(m => m.id == f.id ? newF : m)
                                    })
                                }
                            })
                        }} addProductToCart={() => {
                            f.product && addProductToCart({ product_id: f.product.id, quantity: 1 }).then((c) => {
                                if (c?.id) {
                                    fetchFavorites({ favorite_id: f.id }).then((newList) => {
                                        if (newList?.list[0]) {
                                            const newF = newList?.list[0];
                                            favorites && setFavorites({
                                                ...newList,
                                                list: favorites.list.map(m => m.id == f.id ? newF : m)
                                            })
                                        }
                                    })
                                }
                            })
                        }} onDelete={() => {
                            deleteFavorite(f.id)
                        }} />
                    ))
                }
            </div>
            <div className="right">

            </div>
        </div>
        <Visites />
        <MoreProduct />
    </div>)
}



function FavoriteItem({ favorite, onClick, changeLabel, onDelete, onShare, onQuantityChange, addProductToCart }: { addProductToCart: () => any, onQuantityChange?: (c: number) => any, onDelete?: (c: FavoritesInterface) => any, onShare?: (c: FavoritesInterface) => any, onClick?: (c: FavoritesInterface) => any, changeLabel?: (c: FavoritesInterface) => any, selected?: boolean, favorite: FavoritesInterface }) {

    const product = favorite.product;
    const { qs } = useAppRouter();
    console.log(favorite.id, product?.quantity != undefined,
        product?.quantity != null,
        parseInt(product?.quantity + '') != 0,
        product?.quantity?.toString() != '0');


    return product && <div className="favorites-item" onClick={() => {
        onClick?.(favorite);
        qs({ product_id: favorite.product_id }).setAbsPath(['products', 'detail']);
    }}>
        <div className="infos">
            <div className="image" style={{ background: getImg(product.images[0]) }}></div>
            <div className="info-right  _limit-text">
                <div className="top">
                    <div className="a">
                        <h3 className="name _limit-text"><span className='product-title'>{product.title}</span> <span className='slash'>/</span> <span>{product.description}</span></h3>
                        <div className="stars">
                            <div className={"star " + (product.note?.star ? '' : 'vide')}></div>
                            {/* <NoteStars note={favorite.product?.note?.note || 0} /> */}
                            <div className="note">{product.note?.star || 0}</div>
                            <div className="point"></div>
                            <div className="vote">{product.note?.votes || 0}</div>
                            <div className="users"></div>
                            {!product.note?.star && <div className="new">New</div>}
                        </div>
                    </div>
                    <div className="price ">
                        <span className="current">{(product.price).toLocaleString()} {'$'}</span>
                        {/* <span className="initial-price">{3300} {'$'}</span> */}
                    </div>

                    {(
                        product.quantity != undefined &&
                        product.quantity != null &&
                        parseInt(product.quantity + '') != 0 &&
                        product.quantity?.toString() != '0') ? <ProductQuantity canNull product={product} onChange={(count) => {
                            onQuantityChange?.(count)
                        }} /> : <div className="add-btn" onClick={(e) => {
                            addProductToCart();
                            e.stopPropagation();
                            e.preventDefault();

                        }}>Add <span> to cart</span></div>}

                </div>
                <div className="btm">
                    <div className="options" style={{ position: 'relative' }} onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault()
                    }}>
                        <div style={{ filter: toFilter(/* contrast */'#123').result.filter }} className="delete" onClick={() => {
                            onDelete?.(favorite)
                        }}><span></span></div>
                        <div style={{ filter: toFilter(/* contrast */'#123').result.filter }} className="share" onClick={() => onShare?.(favorite)}><span></span></div>
                    </div>
                    <div className='label' style={{ background: LabelToColor(favorite.label) }} onClick={(e) => {
                        changeLabel?.(favorite);
                        e.stopPropagation();
                        e.preventDefault()
                    }}>{favorite.label} { }</div>
                </div>
            </div>
        </div>
    </div>
}