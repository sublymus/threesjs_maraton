import { getImg } from '../../../Tools/StringFormater';
import './PageAuth.css'
import { useRegisterStore } from './RegisterStore';

export function PageAuth({detail,image,title}:{image?:string,title?:string,readMore?:string,detail?:string}) {
    
    const {getAccess}  = useRegisterStore();
    return (
        <div className="page-auth" >
            <div className="auth-ctn" onClick={(e)=>{
                e.stopPropagation();
                e.preventDefault()
            }}>
                <div className="image" style={{background:image && getImg(image)}}></div>
                <div className="form">
                    <h1 className="auth-title">{title||'JOIN US NOW'}</h1>
                    <h5 className="auth-prompt">{ 'Read more ?'} <span onClick={() => {
                    //    setOpenAuth(openAuth == 'login' ? 'signup' : 'login')
                    }}>{'Click here'}</span></h5>
                    <div className="google" onClick={()=>{
                        getAccess();
                    }}>
                        <div className="icon"></div>
                        <div className="label">Connexion</div>
                    </div>
                    <p>{detail || 'Google connexion is required to get access to sublymus service.'}</p>
                </div> 
            </div>
        </div>
    );
}