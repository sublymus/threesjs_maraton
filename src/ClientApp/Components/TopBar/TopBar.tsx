import './TopBar.css'
import { useAppRouter, useAppStore } from "../../AppStore"; 
import { useRegisterStore } from '../../Layout/PageRegister/RegisterStore';
import { getImg } from '../../../Tools/StringFormater';
import { SearchProduct } from "../SearchProduct/SearchProduct";
import { useProductStore } from '../Products/ProductStore';
import { useProfileStore } from '../../Layout/PageProfile/ProfileStore';

export function TopBar() {
    const {  setAbsPath ,check } = useAppRouter();
    const {store}  = useRegisterStore();
    const { selectProduct } = useProductStore()
    const { setLastPath} = useProfileStore()
    const { openChild ,  } = useAppStore();
    return check('top_bar')&&(
        <div className="top-bar">
            <div className="top-bar-ctn">
                <div className="logo" onClick={() => {
                    setAbsPath(['catalogue'])
                }}> 
                <div className="img" style={{background:getImg(store?.logo[0]||'')}}></div>
                <div className="name">{store?.name}</div>
                </div>
                
                <div className="research" onClick={()=>{
                        openChild(<SearchProduct  setProduct={(p)=>{
                            selectProduct(p);
                            setAbsPath(['product'])
                        }}/>, true)
                    }}>
                    <div className="icon-research"></div>
                </div>
                <div style={{display:'flex'}}>
                <div className="cart"  onClick={()=>{
                    check('product') && setLastPath(1);
                    check('catalogue') && setLastPath(0);
                     setAbsPath(['profile','cart']);
                }}></div>
                <div className="myprofile" onClick={()=>{
                    check('product') && setLastPath(1);
                    check('catalogue') && setLastPath(0);
                     setAbsPath(['profile','user']);
                }}>
                </div>
                </div>
                
            </div>
        </div>
    )
} 