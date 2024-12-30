import { configureStore } from '@reduxjs/toolkit'
import authSlice from "./authSlice"
import postSlice from "./postSlice"

// Note the registeration is done inside the reducer attribute using the below syntax
// SliceName: Creating the slice funciton name
const store = configureStore({
    reducer: {
        auth: authSlice,
        post: postSlice
    }
})

export default store;