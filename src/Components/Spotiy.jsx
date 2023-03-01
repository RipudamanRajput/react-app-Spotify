import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { reducerCases } from "../Util/Constants";
import { useStateProvider } from "../Util/StateProvider";
import Home from "./Panels/Home/Home";
import Mediaplayer from "./Panels/MediaPlayer/Mediaplayer";
import Sidebar from "./Sidebar/Sidebar";
import Topbar from "./Topbar/Topbar";

function Spotify () {
    const [{token},dispatch] = useStateProvider();
    useEffect(()=>{
        const getuserInfo = async () => {
            const {data} = await axios.get("https://api.spotify.com/v1/me",
            {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            }
        );
        const userInfo = {
            userID: data.id,
            userName: data.display_name,
        };
        dispatch({ type:reducerCases.SET_USER, userInfo});
        
       }
       getuserInfo();
    },[dispatch,token])
    return(
        <>
        
       <Topbar/>
       <Sidebar/>
       <Home/>
       <Mediaplayer/>
        </>
    )
}

export default Spotify;