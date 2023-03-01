import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { reducerCases } from "../../../Util/Constants";
import { useStateProvider } from "../../../Util/StateProvider";
import { Clock } from "react-feather";
import '../style.css';

const Home = () =>{
    const [{token, selectedPlaylistId, selectedPlaylist},dispatch] =useStateProvider();
    useEffect(()=>{
        const getInitialPlaylist = async () => {
            const response = await axios.get(`https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,{
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            })
            const selectedPlaylist = {
                id:response.data.id,
                name:response.data.name,
                description: response.data.description.startsWith("<a")
                ? ""
                : response.data.description,
                image:response.data.images,
                images: response.data.tracks.items.map(({track})=>({
                    id:track.id,
                    name:track.name,
                    artists:track.artists.map((artists)=>artists.name),
                    image: track.album.images[2].url,
                    duration: track.duration_ms,
                    album:track.album.name,
                    context_uri:track.album.uri,
                    track_number:track.track_number,
                })),
            };
            dispatch({type:reducerCases.SET_PLAYLIST, selectedPlaylist})
        }
        getInitialPlaylist();
    },[token,dispatch,selectedPlaylistId]);
    // console.log(selectedPlaylist,"data")

    const msTMinutesAndSeconds = (ms) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000 /1000).toFixed(0));
        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }
    return(
        <>
        <div className="inte--mainlyout">
            <div className="inte--banner">
                <div className="inte--image">
                    <img height={"100%"} width={"100%"} src={selectedPlaylist?.image[0]?.url}/>
                </div>
                <div className="inte--playlist-info">
                    <h3>Playlist</h3>
                    <h1 className="inte--playlist-title">{selectedPlaylist?.name}</h1>
                    <p className="inte-playlist--description">
                     {
                        selectedPlaylist?.description
                     }
                    </p>
                </div>
            </div>

            <div className="inte--playlist-grid">
                <table>
                    <thead>
                        <tr>
                            <th style={{textAlign:"left"}}>
                                #
                            </th>
                            <th style={{textAlign:"left"}}>Title</th>
                            <th style={{textAlign:"left"}}>Album</th>
                            <th style={{textAlign:"center"}}><Clock width={18} height={18}/></th>
                        </tr>
                    </thead>
                    <tbody>
                            { selectedPlaylist &&
                        selectedPlaylist?.images.map((data, index)=>{
                            return(
                                <tr key={index}>
                                    <td >
                                        {data?.track_number}
                                    </td>
                                    <td>
                                        <div className="list-image">
                                            <img width={"50px"} height={"50px"} src={data?.image}/>
                                            <div className="inte-auther-names">
                                                <span className="title">{data?.name}</span>
                                                <span>{data?.artists}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {data?.album}
                                    </td>
                                    <td style={{textAlign:"center"}}>
                                        {
                                         msTMinutesAndSeconds(data?.duration)
                                        }
                                    </td>
                                </tr>
                            )
                        })
                            }
                    </tbody>
                </table>
            </div>
            
        </div>
        </>
    )
}

export default Home; 