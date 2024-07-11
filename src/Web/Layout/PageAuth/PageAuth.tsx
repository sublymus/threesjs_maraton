import { useWebStore } from "../../WebStore";
import '../../../DashView/Layout/PageAuth/PageAuth'

export function PageAuth() {
    
    const {createOwner}  = useWebStore();
    return (
        <div className="page-auth" >
            <div className="auth-ctn" onClick={(e)=>{
                e.stopPropagation();
                e.preventDefault()
            }}>
                <div className="image"></div>
                <div className="form">
                    <h1 className="auth-title">JOIN US NOW</h1>
                    <h5 className="auth-prompt">{ 'Read more ?'} <span onClick={() => {
                    //    setOpenAuth(openAuth == 'login' ? 'signup' : 'login')
                    }}>{'Click here'}</span></h5>
                    <div className="google" onClick={()=>{
                        createOwner();
                    }}>
                        <div className="icon"></div>
                        <div className="label">Connexion</div>
                    </div>
                    <p>Google connexion is required to get access to sublymus service.</p>
                </div> 
            </div>
        </div>
    );
}