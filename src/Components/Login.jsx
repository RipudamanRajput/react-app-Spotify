import React from "react";

function Login () {
    const handleClick = () => {
        const clientId = "0bd88ae2fbe04c7fa1469642e152883c";
        const redirectUrl = "http://localhost:3000/";
        const apiUrl = "https://accounts.spotify.com/authorize";
        const scope = [
            "user-read-email",
            "user-read-private",
            "user-modify-playback-state",
            "user-read-playback-state",
            "user-read-currently-playing",
            "user-read-recently-played",
            "user-read-playback-position",
            "user-top-read",
        ];
        window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(
            " "
        )}&response_type=token&show_daialog=true`;
    }
    return(
        <>
        <h1>Login page</h1>
        <button onClick={()=>handleClick()}>
            Spotify login
        </button>
        </>
    )
}

export default Login;