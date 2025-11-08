import {configureStore} from '@reduxjs/toolkit'
import playerReducer from '../feature/playerSclice'

const store = configureStore({
    reducer: {
        player : playerReducer,
    }
})

export default store;