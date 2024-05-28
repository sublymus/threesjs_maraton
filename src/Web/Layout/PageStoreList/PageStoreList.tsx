import "./PageStoreList.css";
import { useWebRoute, useWebStore } from '../../WebStore'
import { Host } from "../../../Config";

export function PageStoreList() {

    const { current, setAbsPath } = useWebRoute();
    const { stores, setSelectedStore} = useWebStore();
   
    return current('store_list') && (
        <div className="page-list-store">
            <div className="center-content">
                <div className="center-left"></div>
                <div className="center-right">
                    <h1>Store List</h1>
                    <div className="list-ctn">
                        {
                            stores?.map((s) => {

                                return (
                                    <div key={s.name} className="store-tcn" onClick={() => {
                                        // const handle = window.open(
                                        //     `${Local}/dash/`,
                                        //     "mozillaWindow",
                                        // );
                                        setSelectedStore(s)
                                        setAbsPath(['edit_store'])
                                    }}>
                                        <div className="img" style={{background:`no-repeat center/cover url(${Host}${s.banners})`}}></div>
                                        <div className="text">
                                            <div className="name">{s.name.toUpperCase()}</div>
                                            <div className="id">#{s.id.split('-')[0]}</div>
                                        </div>
                                        <div className="email">{s.store_email}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="submit">
                        <div className="btn" onClick={() => {
                            setSelectedStore(undefined)
                            setAbsPath(['new_store'])
                        }}>
                            Add New Store
                        </div>
                    </div>
                </div>
            </div>

            <div className="bottom-bar">

            </div>
        </div>
    )
}