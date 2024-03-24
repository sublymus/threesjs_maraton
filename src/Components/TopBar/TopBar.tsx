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
                <div className="nav-link">
                    <div className="link" onClick={() => {
                         setAbsPath(['product'])
                    }}>Products</div>
                    <div className="link" onClick={() => {
                         setAbsPath(['service'])
                    }}>customer service</div>
                    <div className="link" onClick={() => {
                         setAbsPath(['blog'])
                    }}>blog</div>
                    <div className="link" onClick={() => {
                         setAbsPath(['about'])
                    }}>about us</div>
                </div>
                <div className="research">
                    <input type="text" />
                    <div className="icon-research"></div>
                </div>
                <div className="cart">
                  
                </div>
                <div className="myprofile" onClick={()=>{
                     setAbsPath(['profile','user']);
                }}>
                </div>
                
            </div>
        </div>
    )
} 