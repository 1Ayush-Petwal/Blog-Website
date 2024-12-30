import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null
}

//Name of the slice is auth
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true,
            state.userData = action.payload.userData
        },
        logout: (state) => {
            state.status = false,
            state.userData = null
        }
    }
})


// Export the funciton of the reducers 
export const {login, logout} = authSlice.actions;

// For registering the reducers in the store
export default authSlice.reducer;