import React from "react";
import CurrentTrack from "./Components/CurrentTrack";
import PlayerControler from "./Components/PlayerControl";

const Mediaplayer = () => {
 
    return(
        <>
        <div className="inte--mediaPlayer">
            <CurrentTrack/>
            <PlayerControler/>    
        </div>
        </>
    )
}

export default Mediaplayer;