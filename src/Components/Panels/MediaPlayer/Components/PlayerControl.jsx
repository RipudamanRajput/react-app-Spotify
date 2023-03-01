import axios from "axios";
import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Shuffle, ChevronLeft, ChevronRight, Play, Pause } from "react-feather";
import { devicecases } from "../../../../Util/Constants";
import { useStateProvider } from "../../../../Util/StateProvider";

const PlayerControler = () => {
    const [play, setplay] = useState(false);
    const myref = useRef(null)
    const [{ token, deviceId }, dispatch] = useStateProvider();
    
    useEffect(() => {
        // get playback state 
        const PlaybackInfo = async () => {
            const response = await axios.get("https://api.spotify.com/v1/me/player", {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            });
            if (response.data) {
                const { device } = response.data
                const deviceinfo = {
                    id: device.id,
                    name: device.name,
                    is_active: device.is_active
                };
                dispatch({ type: devicecases.DEVICE_ID, deviceinfo })

            }
        }
        PlaybackInfo()
    }, [])
    // Transfer playback 
    const Transferplayback = async () => {
        const response = await axios({
            method: "put",
            url: "https://api.spotify.com/v1/me/player",
            data: {
                "device_ids": [
                    deviceId.id
                ],
                "Play": "true"
            },
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },

        });
        console.log(response, "response")

    }
    // Get Available Devices 
    const Available_Devices = async () => {
        const response = await axios.get("https://api.spotify.com/v1/me/player/devices", {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
        });
        console.log(response, "response")
    }

    // start/resume playback
    const start_resume_playback = async () => {
        const response = await axios({
            method: "put",
            url: "https://api.spotify.com/v1/me/player/play",
            data: {
                "device_id": [
                    deviceId.id
                ]
            },
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },

        });
        setplay(!play)
        console.log(response, "response")
    }

    // pause playback
    const pause_playback = async () => {
        const response = await axios({
            method: "put",
            url: "https://api.spotify.com/v1/me/player/pause",
            data: {
                "device_id": [
                    deviceId.id
                ]
            },
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },

        });
        setplay(!play)
        console.log(response, "response")
    }

    // skip to next
    const skip_to_next = async () => {
        const response = await axios({
            method: "post",
            url: "https://api.spotify.com/v1/me/player/next",
            data: {
                "device_id": [
                    deviceId.id
                ]
            },
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },

        });
        console.log(response, "response")
    }

    // skip to previous
    const skip_to_previoust = async () => {
        const response = await axios({
            method: "post",
            url: "https://api.spotify.com/v1/me/player/previous",
            data: {
                "device_id": [
                    deviceId.id
                ]
            },
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },

        });
        console.log(response, "response")
    }

    // change volume of song 
    const change_volume = async () => {
        if(myref.current.value){ 
        const response = await axios({
            method: "put",
            url: `https://api.spotify.com/v1/me/player/volume?volume_percent=${myref.current.value}&device_id=${deviceId.id}`,
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },

        });
    }
    }
    
    return (
        <div className="media-controler">
            <div className="suffle">
                <Shuffle />
            </div>
            <div className="previous">
                <ChevronLeft onClick={() => skip_to_previoust()} />
            </div>
            <div className="Pause-play">
                {play ? <Play onClick={() => start_resume_playback()} /> : <Pause onClick={() => { pause_playback() }} />}
            </div>
            <div className="next">
                <ChevronRight onClick={() => skip_to_next()} />
            </div>
            <div className="volume-controler">
                <input ref={myref} onChange={() => change_volume()} type={"range"} />
            </div>
        </div>
    )
}

export default PlayerControler;