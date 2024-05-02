import { useDashRoute } from '../../../dashStore'
import './CategoryDash.css'
import { useEffect, useState } from 'react';
import { InputText } from '../../../Component/Form/Input';
import { useCategotyStore } from '../CategoryStore';
import { useWindowSize } from '../../../../Hooks';
import { Textarea } from '../../../Component/Form/Textarea';
import { FileLoader } from '../../../Component/LoaderImage/LoaderImage';
import { GenericList } from '../../../Component/GenericList/GenericList';
import { Host } from '../../../../Config';
import { ActionsCard } from '../../../Component/Chart/ActionsCard/ActionsCard';
import { Preview3DModelCard } from '../../../Component/Chart/Preview3DModelCard/Preview3DModelCard';
import { ChoiseCatalog } from '../../../Component/ChoiseCatalog/ChoiseCatalog';
import { useProductStore } from '../../PageProduct/ProductStore';
import { bindToParentScroll } from '../../../../Tools/BindToParentScroll';
import { EditorTopBar } from '../../../Component/EditorTopBar/EditorTopBar';
import { ChoiseStatus } from '../../../Component/ChoiseStatus/ChoiseStatus';

export function CategoryDash() {
    const { current, setAbsPath } = useDashRoute();
    const { selectedCategory, setSelectedCategory, fetchCategoryProducts, categoryProducts, updateCategory, createCategory, removeCategory } = useCategotyStore();
    const [collected] = useState<Record<string, any>>({});
    const { setSelectedProduct } = useProductStore();

    const [isCheckRequired] = useState(false);
    const size = useWindowSize();
    const wrap = size.width < 1000 ? 'wrap' : '';

    useEffect(() => {
        if (selectedCategory)
            fetchCategoryProducts({
                category_id: selectedCategory.id
            });
    }, [selectedCategory]);

    const isDash = current('dash_categories');
    const isNew = current('new_category');

    const Choser = <>

        {isDash && <ChoiseStatus status={selectedCategory?.status || 'PAUSE'} onChange={(value) => {
            isDash ? (selectedCategory && updateCategory({
                category_id: selectedCategory.id,
                status: value
            })) : collected['status'] = value
        }} />}
        <div className="editor-category">
            <ChoiseCatalog catalog_id={isDash && (selectedCategory?.catalog_id)} onChange={(id) => {
                isDash ? (selectedCategory && updateCategory({
                    category_id: selectedCategory.id,
                    catalog_id: id
                })) : collected['catalog_id'] = id;;
            }} />
        </div>
        <div className="editor-scene-file">
            <FileLoader ext={['zip']} label='Upload Scene File' onChange={(file) => {
                isDash ? (selectedCategory && updateCategory({
                    category_id: selectedCategory.id,
                    scene_dir: file
                })) : collected['scene_dir'] = file;;

            }} />
        </div>
    </>
    return (isDash || isNew) && (
        (!selectedCategory && isDash) ? (
            <div className="not-found">
                <div className="img"></div>
            </div>
        ) : (
            <div className="category-dash" ref={bindToParentScroll}>

                <EditorTopBar  terme='white' deteleKey={selectedCategory?.id || 'noga'} mode={isNew ? 'create' : 'delete'} title='Category Information' onCreate={() => {
                    createCategory(collected).then((error) => {
                        if (!error) return setAbsPath(['store', 'categories', 'dash_categories']);
                        // if (error.length) setError(error?.toString())
                    });
                }} onDelete={() => {
                    removeCategory(selectedCategory?.id).then((res) => {
                        if (res) {
                            setSelectedCategory(undefined)
                        }
                    })
                }} />
                <section className={"editor " + wrap}>
                    <div className="left-side">
                        {
                            isDash && <InputText isCheckRequired={isCheckRequired} label='Product Id' value={(selectedCategory?.id || '')} />
                        }
                        <div className="category-title">
                            <InputText editable prompt='Catalog Label' isCheckRequired={isCheckRequired} min={3} check='auto' max={50} label='Label' placeholder='Catalog Label' value={isDash && (selectedCategory?.label || '')} onChange={(value) => {
                                isDash ? (updateCategory({
                                    category_id: selectedCategory?.id,
                                    label: value
                                })) : collected['label'] = value;
                            }} />
                        </div>
                        <div className="category-description">
                            <Textarea editable prompt='Catalog Description' isCheckRequired={isCheckRequired} min={3} check='auto' max={250} label='Description' placeholder='Catalog Description' value={isDash && (selectedCategory?.description || '')} onChange={(value) => {
                                isDash ? (updateCategory({
                                    category_id: selectedCategory?.id,
                                    description: value
                                })) : collected['description'] = value;
                            }} />
                        </div>
                        {
                            isDash && Choser
                        }
                    </div>
                    <div className="right-side">
                        {isDash && <>
                            <ActionsCard />
                            <Preview3DModelCard onClick={() => {
                            }} direction='horizontal' />
                        </>}
                        {
                            isNew && Choser
                        }
                    </div>

                </section>
                {
                    isDash && <>
                        <div className="btm-list">
                            <h1 className=''>Products That Use This Category</h1>
                            <h2 className='see-all' onClick={() => {
                                setAbsPath(['store', 'products']); //TODO add QS json
                            }}>SEE ALL</h2>
                        </div>
                        <GenericList filter={{
                            sortBy: 'id',
                            limit: categoryProducts?.limit || 25,
                            page: categoryProducts?.page,
                            total: categoryProducts?.total,
                        }}
                            disableFilterBar
                            items_height={80}
                            id={'product-use-catalog_list'}
                            datas={categoryProducts?.list || []}
                            itemsMapper={{
                                images: {
                                    getView(label, value, e, setRef) {
                                        return (
                                            GenericList.ImageElement().getView(label, `${Host}${value[0]}`, e, setRef)
                                        )
                                    }
                                },
                                id: {
                                    getView(_, value: string, e, setRef) {
                                        return (
                                            <div ref={setRef} key={e.id}>#{value.split('-')[0]}</div>
                                        )
                                    }
                                },
                                title: GenericList.StringElement({ size_interval: [50, 200] }),
                                status: GenericList.StringElement({ size: 150 }),
                                stock: GenericList.StringElement(),
                                category_id: {
                                    getView(_, value, e, setRef) {
                                        return (
                                            <div ref={setRef} key={e.id}>#{value.split('-')[0]}</div>
                                        )
                                    }
                                },
                                price: GenericList.StringElement({ size: 200 }),
                                created_at: GenericList.DateStringElement({ size: 200 }),
                            }}
                            onItemsSelected={(item) => {
                                setSelectedProduct(item[0] as any);
                                setAbsPath(['store', 'products', 'dash_product']);
                            }}

                        >

                        </GenericList>
                    </>
                }
            </div>
        )
    )
}