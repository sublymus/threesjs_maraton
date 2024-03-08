import './NavLink.css'
import { useAppStore } from "../../AppStore";
// import { useEffect } from "react";

export function NavLink() {
    const { page, isAllowed } = useAppStore();
    return isAllowed(page, 'nav_link') && (
        <div className="nav-link">
            <div className="link">Products</div>
            <div className="link">customer service</div>
            <div className="link">blog</div>
            <div className="link">about us</div>
        </div>
    )
}