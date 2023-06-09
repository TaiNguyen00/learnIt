import { FIND_POST } from "../contexts/constants"

export const postReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case 'POST_LOADED_SUCCESS':
            return {
                ...state,
                posts: payload,
                postsLoading: false
            }
        case 'POST_LOADED_FAILED':
            return {
                ...state,
                posts: [],
                postsLoading: false
            }
        case 'ADD_POST':
            return {
                ...state,
                posts: [...state.posts,
                    payload]
            }
        case 'DELETE_POST':
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== payload)
            }
        case "FIND_POST":
            return {
                ...state,
                post: payload
            }
        case 'UPDATE_POST':
            const newPost = state.posts.map(post => post._id === payload._id ? payload : post)
            return {
                ...state,
                posts: newPost
            }
        default:
            return state
    }
}