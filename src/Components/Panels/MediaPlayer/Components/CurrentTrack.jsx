import axios from "axios";
import React from "react";
import { useStateProvider } from "../../../../Util/StateProvider";
import { useEffect } from "react";
import { reducerCases } from "../../../../Util/Constants";

const CurrentTrack = () => {
    const [{ token, currentlyplaying }, dispatch] = useStateProvider();
    useEffect(() => {
        const getuserInfo = async () => {
           
            const responses = await axios.get("https://api.spotify.com/v1/me/player/currently-playing",
                {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (responses.data !== "") {
                const { item,progress_ms } = responses.data;
                const currentlyplaying = {
                    id: item.id,
                    name: item.name,
                    artists: item.artists.map((artist) => artist.name),
                    image: item.album.images[2].url,
                    duration_ms:item.duration_ms,
                    progress_ms:progress_ms,
                };

                dispatch({ type: reducerCases.SET_PLAYING, currentlyplaying })
            }
            // console.log(responses.data,"state")
        }
        setInterval(() => {
            getuserInfo();
        }, 1000);
        


    }, [dispatch, token])
    const msTMinutesAndSeconds = (ms) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000 /1000).toFixed(0));
        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }
    return (
        <>
            {currentlyplaying ?
                <div className="inte--curently-playing">
                    <img height={60} width={60} src={currentlyplaying?.image} />
                    <div className="inte-currentlyplaying-details">
                        <span className="inte-current-title">
                            {currentlyplaying?.name}
                        </span>
                        <div className="inte-current-auther">
                            {currentlyplaying.artists.map((data, index) => {
                                return (
                                    <span>
                                        {data + ","}
                                    </span>
                                )
                            })}
                        </div>
                    </div>
                    <div className="song-progress">
                    <span>{msTMinutesAndSeconds(currentlyplaying.progress_ms)}</span>
                        <input type={'range'} value={currentlyplaying.progress_ms} min={0} max={currentlyplaying.duration_ms}/>
                        <span>{msTMinutesAndSeconds(currentlyplaying.duration_ms)}</span>
                    </div>
                </div>
                :
                <span>Nothing is playing </span>}
        </>
    )
}

export default CurrentTrack;