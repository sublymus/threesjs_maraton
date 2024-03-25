import { useAppStore } from "../../AppStore"
import './PageCommand.css'
import { useRegisterStore } from "../PageRegister/RegisterStore";

export function PageCommand() {
    const { check } = useAppStore();
    const {}= useRegisterStore();
    return (check('command') && <div className="page-command">
            
        </div>
    )
}