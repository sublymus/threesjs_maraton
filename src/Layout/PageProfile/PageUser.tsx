import { useAppStore } from "../../AppStore"
import './PageUser.css'
import { useRegisterStore } from "../PageRegister/RegisterStore";


export function PageUser() {
    const { check } = useAppStore();
    const {user}= useRegisterStore();
    return (check('user') &&
        <div className="user-page">
            {JSON.stringify(user)}
        </div>
    )
}