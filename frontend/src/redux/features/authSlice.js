import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.token = action.payload.token;
        },
        setLogout: (state, action) => {
            state.user = null;
            state.token = null;
        },
        setUser: (state, action) => {
            state.user = action.payload.user;
        },
        setUserFollowings: (state, action) => {
            if(state.user) {
                state.user.followings = action.payload.followings;
            } else {
                console.log("User non-existent :(");
            }
        },
        setUserFollowers: (state, action) => {
            if(state.user) {
                state.user.followers = action.payload.followers;
            } else {
                console.log("User non-existent :(");
            }
        },
        setUserCollects: (state, action) => {
            if(state.user) {
                state.user.collects = action.payload.updatedCollects;
            } else {
                console.log("User non-existent :(");
            }
        },
        increaseUserNotif: (state, action) => {
            if(state.user) {
                state.user.newNotifCount += 1;
            } else {
                console.log("User non-existent :(");
            }
        },
        clearUserNotif: (state, action) => {
            if(state.user) {
                state.user.newNotifCount = 0;
            } else {
                console.log("User non-existent :(");
            }
        },
    }
})


// export actions
export const { 
    setLogin, 
    setLogout, 
    setUser,
    setUserFollowings, 
    setUserFollowers, 
    setUserCollects,
    increaseUserNotif,
    clearUserNotif,
 } = authSlice.actions;

// export reducer
export default authSlice.reducer;