import React from "react";
import { useEffect } from "react";
import { useStateProvider } from "../../../Util/StateProvider";
import axios from "axios";
import { reducerCases } from "../../../Util/Constants";

const Playlist = () => {
    const [{token,playlists},dispatch] = useStateProvider();
    useEffect(()=>{
        const getPlaylistData = async () => {
            const response = await axios.get("https://api.spotify.com/v1/me/playlists",
                {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                }
            );
            const {items} = response.data;
            const playlists = items.map(({name, id})=>{
                return {name,id};
            })
            dispatch({ type:reducerCases.SET_PLAYLISTS,playlists });
        }
        getPlaylistData();
    },[token,dispatch]);
    return(
        <>
            <ul>
                {
                    playlists.map((name,id)=>{
                        return(
                            <li key={id}>{name.name}</li>
                        )
                    })
                }
            </ul>
        </>
    )
} 
export default Playlist;