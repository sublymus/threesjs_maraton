// import { useAppStore } from '../../AppStore';
// import { useRegisterStore } from '../../Layout/PageRegister/RegisterStore';
// import './ConnexionRequired.css'

// export function ConnexionRequired() {

//     const { openChild} = useAppStore()
//     const { getAccess } = useRegisterStore();

//     return <div className="connexion-required" >
//         <div className="ctn" onClick={(e) => {
//             e.preventDefault()
//             e.stopPropagation()
//         }}>
//             <div className="close" onClick={() => {
//                 openChild(undefined)
//             }}></div>
//             <h1 className="title">LOGIN</h1>
//             <div className="btn" onClick={() => {
//                 getAccess();
//                 openChild(undefined)
//             }}>
//                 <div className="logo"></div>
//                 <div className="label">Google Connexion</div>
//             </div>
//         </div>
//     </div>
// }