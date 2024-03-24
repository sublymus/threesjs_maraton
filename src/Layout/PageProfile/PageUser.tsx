import { useAppStore } from "../../AppStore"
import './PageUser.css'
import { useProfileStore } from "./ProfileStore";


export function PageUser() {
    const { check } = useAppStore();
    const {user}= useProfileStore();
    return (check('user') &&
        <div className="user-page">
            {JSON.stringify(user)}
        </div>
    )
}