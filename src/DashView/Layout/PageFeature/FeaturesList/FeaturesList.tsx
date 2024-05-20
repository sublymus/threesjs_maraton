import './FeaturesList.css'
import { useDashRoute } from '../../../dashStore'
import { GenericList } from '../../../Component/GenericList/GenericList';
import { useFeatureStore } from '../FeatureStore'
import { getImg } from "../../../../Tools/StringFormater";
import { useEffect } from 'react';
import { useRegisterStore } from '../../PageAuth/RegisterStore';
export function FeaturesList() {

    const { current, setAbsPath } = useDashRoute();
    const {store} = useRegisterStore();
    const { features, fetchFeatures, setSelectedFeature } = useFeatureStore();
    useEffect(() => {
        current('features') && store && fetchFeatures()
    }, [store])
    return current('features') && (
        <div className="features-list">
            <div className="list-ctn">
                <GenericList filter={{
                    sortBy: 'id',
                    sortableColumns: ['id', 'collect_type', 'icon', 'name', 'created_at'],
                    limit: features?.limit,
                    page: features?.page,
                    total: features?.total,
                    filter:{}
                }}
                    items_height={80} id={'category_list'} datas={features?.list || []} itemsMapper={{
                        id: {
                            getView(_, value: string, e, setRef) {
                                return (
                                    <div ref={setRef} key={e.id}>#{value.split('-')[0]}</div>
                                )
                            }
                        },
                        name: GenericList.StringElement({ size_interval: [50, 200] }),
                        collect_type: GenericList.StringElement({ size: 150 }),
                        icon: {
                            getView(colunm, value, e, setRef) {
                                let img: HTMLElement | null = null
                                e.onResize(colunm, (d) => {
                                    if (!img) return
                                    img.style.width = `${Math.min(d.height, d.width) * 0.9}px`;
                                    img.style.height = `${Math.min(d.height, d.width) * 0.9}px`;
                                })
                                return <div ref={setRef} key={colunm}>
                                    <div className="image-element" ref={(ref) => img = ref} style={{ background:getImg(value[0]||'', '40%')}}></div>
                                </div>
                            }
                        },
                        created_at: GenericList.DateStringElement({ size: 200 }),
                    }}

                    onItemsSelected={(selectedItems, items) => {
                        items.forEach((item) => {
                            if (item.$itemRef) item.$itemRef.style.background = '';
                        })
                        selectedItems.forEach((item) => {
                            if (item.$itemRef) item.$itemRef.style.background = '#00f2';
                        });
                        setSelectedFeature(selectedItems[0] as any);
                        setAbsPath([ 'features','dash_features']);
                    }}
                    onQuery={(query) => {
                        console.log('query',query);
                        fetchFeatures(query)

                    }}
                    top_height={40}
                    canAddNew
                    canPaginate
                    onNewRequired={()=>{
                        setAbsPath(['features','new_feature']);
                    }}
                    >

                </GenericList>
            </div>
        </div>
    )
}
