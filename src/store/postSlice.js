// Concurreny will be reduced significantly by using Redux Toolkit
// on the posts, while Increasing the posts time for a single user
import { createSlice } from '@reduxjs/toolkit';

const initialPostState = {
    posts: [],
    post: null
}

const postSlice = createSlice({
    name: 'post',
    initialState: initialPostState,
    reducers: {
        // Action Payload has the entire post object
        addPost: (state, action) => {
            state.posts.push(action.payload)
        },
        // Action Payload has the id of the post to be deleted
        deletePost: (state, action) => {
            state.posts = state.posts.filter((post) => post.$id !== action.payload)
        },
        updatePost: (state, action) => {
            state.posts = state.posts.map((post) => {
                if(post.$id === action.payload.$id){
                    return action.payload
                }
                return post
            })
        }
    }
})

export const { addPost, deletePost, updatePost } = postSlice.actions;

export default postSlice.reducer;