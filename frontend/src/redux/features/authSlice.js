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
        setUserNotifs: (state, action) => {
            if(state.user) {
                state.user.newNotifications = action.payload;
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
    setUserNotifs,
 } = authSlice.actions;

// export reducer
export default authSlice.reducer;