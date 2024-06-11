import './ModeratorProfile.css'
import { useAdminRoute } from '../../../AdminStore'
import { useModeratorStore } from '../ModeratorStore';
import { useEffect, useState } from 'react';
import { useWindowSize } from '../../../../Hooks';
import { InputText } from '../../../../DashView/Component/Form/Input';
import { ImageViewer } from '../../../../DashView/Component/ImageViewer/ImageViewer';
import { GenericList } from '../../../../DashView/Component/GenericList/GenericList';
import { Host } from '../../../../Config';
import { StatusElement } from '../../../../DashView/Component/ChoiseStatus/ChoiseStatus';
import { OpenChat } from "../../../../DashView/Component/OpenChat/OpenChat";
import { bindToParentScroll } from '../../../../Tools/BindToParentScroll';
import { useRegisterStore } from '../../PageAuth/RegisterStore';
export function ModeratorProfile() {

    const { current, json } = useAdminRoute();
    const { selectedModerator, setModeratorById } = useModeratorStore();
    const [btmList, setBtmList] = useState('commands');
    const {user} = useRegisterStore()
    const [isCheckRequired] = useState(false);
    const size = useWindowSize();
    const wrap = size.width < 1000 ? 'wrap' : '';

    useEffect(() => {
        current('moderator_profile') && json?.moderator_id && setModeratorById(json?.moderator_id)
    }, [json, user])

    return current('moderator_profile') && (!selectedModerator ? (
        <div className="not-found">
            <div className="img"></div>
        </div>
    ) : (
        <div className="moderator-profile" ref={bindToParentScroll}>
            <h1>Moderator Information</h1>
            <section className={"editor " + wrap}>
                <div className="left-right">
                    <ImageViewer name='moderator_profile' images={selectedModerator.photos || []} cannotEdit />
                </div>
                <div className="left-side">
                    <InputText isCheckRequired={isCheckRequired} label='Moderator Id' value={(selectedModerator?.id || '')} />
                    <InputText prompt='Moderator Name' isCheckRequired={isCheckRequired} min={3} check='auto' max={50} label='Name' placeholder='Catalog Label' value={selectedModerator?.name} />
                    <InputText prompt='Moderator Email' isCheckRequired={isCheckRequired} min={3} check='auto' max={50} label='Email' placeholder='Catalog Label' value={selectedModerator?.email} />
                    <InputText label='created At' value={selectedModerator?.created_at} />
                    <InputText label='Join Store At' value={selectedModerator?.join_at} />
                    <OpenChat user={selectedModerator} channel='sessions' />
                </div>
            </section>
            <>
                <div className="btm-list">

                    <h1 >Products That Use This Catalog</h1>
                    <div className={"btn " + (btmList == 'commands' ? 'active' : '')} onClick={() => {
                        setBtmList('commands');
                    }}>
                        <div className="icon"></div>
                        <div className="label">Commands</div>
                    </div>
                    <div className={"btn " + (btmList == 'visites' ? 'active' : '')} onClick={() => {
                        setBtmList('visites');
                    }}>
                        <div className="icon"></div>
                        <div className="label">Visites</div>
                    </div>

                    <h2 className='see-all' onClick={() => {
                        // btmList == 'visites' ?
                        // setAbsPath(['products']) :
                        // setAbsPath(['command'])
                    }}>SEE ALL</h2>
                </div>
                {
                    btmList == 'commands' && <GenericList
                        disableFilterBar
                        items_height={80}
                        id={'product-use-catalog_list'}
                        datas={[]}
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
                            // title: GenericList.StringElement({ size_interval: [50, 200] }),
                            stock: GenericList.StringElement(),
                            // category_id: {
                            //     getView(_, value, e, setRef) {
                            //         return (
                            //             <div ref={setRef} key={e.id}>#{value.split('-')[0]}</div>
                            //         )
                            //     }
                            // },
                            price: GenericList.StringElement({ size: 200 }),
                            status: StatusElement,
                            created_at: GenericList.DateStringElement({ size: 200 }),
                        }}
                        onItemsSelected={() => {
                            // s(item[0] as any);
                            // setAbsPath(['command']);
                        }}
                    >

                    </GenericList>
                }{
                    btmList == 'visites' && <GenericList
                        disableFilterBar
                        items_height={80}
                        id={'product-use-catalog_list'}
                        datas={[]}
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
                            title: GenericList.StringElement({ size: 200 }),
                            visited_at: GenericList.DateStringElement({ size: 200 }),
                        }}
                        onItemsSelected={(_item) => {
                            // qs({product_id:item[0].id}).setAbsPath(['products', 'dash_product']);
                        }}
                    >

                    </GenericList>
                }
            </>

        </div>
    ))
}
