import { createSlice } from '@reduxjs/toolkit'
import { songs } from '../data/data'
// ... rest of your slice code

const index = Math.floor(Math.random() * songs.length)

const initialState = {
    isPlaying: false,
    currentSong: {

        title: songs[index].title,
        artist: songs[index].artist,
        songUrl: songs[index].songUrl,
        imageUrl: songs[index].imageUrl,
    },
    currentTime:0,
    duration:0,

}

const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers: {
        setcurrentSong: (state, action) => {
            state.currentSong = action.payload;
            state.isPlaying = true;
            state.currentTime = 0;
        },
        pause: (state) => {
            state.isPlaying = false;

        },
        play: (state) => {
            state.isPlaying = true;
        },
        prev: (state) => {
            const currentIndex = songs.findIndex(
                (song) => song.title === state.currentSong.title
            );
            const prevIndex = currentIndex > 0 ? currentIndex - 1 : songs.length - 1;
            state.currentSong = songs[prevIndex];
            state.currentTime = 0;
        },
        next: (state) => {
            const currentIndex = songs.findIndex(
                (song) => song.title === state.currentSong.title
            );
            const nextIndex = currentIndex < songs.length - 1 ? currentIndex + 1 : 0;
            state.currentSong = songs[nextIndex];
            state.currentTime = 0;
        },
        setCurrentTime:(state, action) => {
            state.currentTime = action.payload;
        },
        setDuration:(state,action) =>{
            state.duration = action.payload;
        }
    }
})

export default playerSlice.reducer;
export const { setcurrentSong, pause, play, prev, next,setCurrentTime,setDuration } = playerSlice.actions;