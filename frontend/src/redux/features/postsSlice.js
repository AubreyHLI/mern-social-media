import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    collectedPosts: null,
};

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setAPost: (state, action) => {
            if(state.posts?.length === 0) {
                state.posts.push(action.payload.post);
            } else {
                const updatedPosts = state.posts.map(p => {
                    // only update the updated post
                    if(p?._id === action.payload?.post?._id) {
                        return action.payload.post;
                    } else {
                        return p;
                    }
                });
                state.posts = updatedPosts;
            }
        },
        setSomePosts: (state, action) => {
            const updatedPosts = state.posts.map(p => {
                const { profile } = action.payload;
                if(p?.author?._id === profile?._id) {
                    p.author.username = profile.username;
                    p.author.bio = profile.bio;
                    p.author.imageUrl = profile.imageUrl;
                    p.author.coverImage = profile.coverImage;
                }
                return p;
            });
            state.posts = updatedPosts;
        },
        setSomePostsFollowings: (state, action) => {
            const updatedPosts = state.posts.map(p => {
                const { profileId, profileFollowings } = action.payload;
                if(p?.author?._id === profileId) {
                    p.author.followings = profileFollowings;
                }
                return p;
            });
            state.posts = updatedPosts;
        },
        setSomePostsFollowers: (state, action) => {
            const updatedPosts = state.posts.map(p => {
                const { profileId, profileFollowers } = action.payload;
                if(p?.author?._id === profileId) {
                    p.author.followers = profileFollowers;
                }
                return p;
            });
            state.posts = updatedPosts;
        },
        setPostComments: (state, action) => {
            const updatedPost = state.posts.find(p => p?._id === action.payload.postId);
            updatedPost.comments = action.payload.comments;
            state.posts.forEach((p, index) => {
                if(p?._id === action.payload.postId) {
                    state.posts[index] = updatedPost
                }
            })
        },
        setCollectedPosts: (state, action) => {
            state.collectedPosts = [...action.payload.collectedPosts];
        },
        resetColloctedPosts: (state, action) => {
            state.collectedPosts = null
        },
    }
})


// export actions
export const { 
    setPosts, 
    setAPost,
    setSomePosts,
    setSomePostsFollowings,
    setSomePostsFollowers,
    setPostComments,
    setCollectedPosts,
    resetColloctedPosts
 } = postsSlice.actions;

// export reducer
export default postsSlice.reducer;