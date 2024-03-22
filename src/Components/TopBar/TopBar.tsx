import './TopBar.css'
import { useAppStore } from "../../AppStore"; 
export function TopBar() {
    const { page, setPage } = useAppStore();
    return (
        <div className="top-bar">
            <div className="top-bar-ctn">
                <div className="logo" onClick={() => {
                    setPage(page == 'catalogue' ? 'product' : 'catalogue')
                }}>SUBLYMUS</div>
                <div className="nav-link">
                    <div className="link" onClick={() => {
                        setPage('product')
                    }}>Products</div>
                    <div className="link" onClick={() => {
                        setPage('service')
                    }}>customer service</div>
                    <div className="link" onClick={() => {
                        setPage('blog')
                    }}>blog</div>
                    <div className="link" onClick={() => {
                        setPage('about')
                    }}>about us</div>
                </div>
                <div className="research">
                    <input type="text" />
                    <div className="icon-research"></div>
                </div>
                <div className="cart">
                  
                </div>
                <div className="myprofile" onClick={()=>{
                    setPage('profile');
                }}>
                </div>
                
            </div>
        </div>
    )
} 