import './TopBar.css'
import { useAppRouter } from "../../AppStore"; 
;

export function TopBar() {
    const {  setAbsPath ,check } = useAppRouter();
    return check('top_bar')&&(
        <div className="top-bar">
            <div className="top-bar-ctn">
                <div className="logo" onClick={() => {
                    setAbsPath(['catalogue'])
                }}> <span>By</span> Sublymus</div>
                
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