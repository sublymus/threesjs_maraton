import './TopBar.css'
import { useAppStore } from "../../AppStore"; 
export function TopBar() {
    const {  setAbsPath ,check } = useAppStore();
    return check('top-bar')&&(
        <div className="top-bar">
            <div className="top-bar-ctn">
                <div className="logo" onClick={() => {
                    setAbsPath(['catalogue'])
                }}>SUBLYMUS</div>
                
                <div className="research">
                    <input type="text" />
                    <div className="icon-research"></div>
                </div>
                <div style={{display:'flex'}}>
                <div className="cart"  onClick={()=>{
                     setAbsPath(['profile','cart']);
                }}></div>
                <div className="myprofile" onClick={()=>{
                     setAbsPath(['profile','user']);
                }}>
                </div>
                </div>
                
            </div>
        </div>
    )
} 