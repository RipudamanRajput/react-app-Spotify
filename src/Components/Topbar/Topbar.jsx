import React from "react";
import { User } from "react-feather";
import { useStateProvider } from "../../Util/StateProvider";
import './style.css';

const Topbar = () =>{
    const [{userInfo}] = useStateProvider();
    return(
        <>
        <div className="inte--topBar">
            <div className="inte--topbar-body">
                <span className="inte-topbar-avtar">
                    <User/> {userInfo.userName}
                </span>
            </div>
        </div>
        </>
    )
}
export default Topbar;