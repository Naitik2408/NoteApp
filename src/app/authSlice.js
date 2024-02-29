import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
            localStorage.setItem('userData', JSON.stringify(action.payload.userData));
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
            localStorage.removeItem('userData');
        },
        loadUserData: (state, action) => {
            const userData = JSON.parse(localStorage.getItem('userData'));
            if (userData) {
                state.status = true;
                state.userData = userData;
            }
        }
     }
})

export const {login, logout, loadUserData} = authSlice.actions;

export default authSlice.reducer;