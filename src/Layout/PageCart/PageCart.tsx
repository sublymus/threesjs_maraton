import { useAppStore } from "../../AppStore"
import './PageCart.css'
import { useRegisterStore } from "../PageRegister/RegisterStore";
import React from "react";


export function PageCart() {
    const { check } = useAppStore();
    const {user}= useRegisterStore();
    return (check('cart') &&
        <div className="page-cart">
            {JSON.stringify(user)}
        </div>
    )
}