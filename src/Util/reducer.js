import { reducerCases, devicecases } from "./Constants";

export const initialState = {
    token: null,
    playlists:[],
    userInfo:"Login",
    deviceId:[],
    selectedPlaylistId:"79V74dXtgqqoYfEX4QQRe1",
    selectedPlaylist: null,
    currentlyplaying: null,
};

const reducer = (state=initialState, action) => {
    console.log(state,"state")
    switch (action.type) {
        // eslint-disable-next-line no-lone-blocks
        case reducerCases.SET_TOKEN: {
            return {
                ...state,
                token:action.token,
            }
        };
        case reducerCases.SET_PLAYLISTS: {
            return {
                ...state,
                playlists:action.playlists,
            }
        }
        case reducerCases.SET_USER: {
            return {
                ...state,
                userInfo:action.userInfo,
            }
        }
        case devicecases.DEVICE_ID :{
            return {
                ...state,
                deviceId:action.deviceinfo,
            }
        }
        case reducerCases.SET_PLAYLIST: {
            return {
                ...state,
                selectedPlaylist:action.selectedPlaylist,
            }
        }
        case reducerCases.SET_PLAYING :{
            return {
                ...state,
                currentlyplaying:action.currentlyplaying,
            }
        }
        default:
            return state;
    }
};

export default reducer;