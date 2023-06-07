import { createContext, useEffect, useReducer } from "react";
import axios from "axios";

import { postReducer } from "../reducers/postReducer";
import { PostReducerConstant, apiUrl, LOCAL_STORAGE_TOKE_NAME, DELETE_POST, UPDATE_POST, FIND_POST } from "./constants";
import { useState } from "react";


export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
    const [postState, dispatch] = useReducer(postReducer, PostReducerConstant);


    const [showAddPostModal, setShowAddPostModal] = useState(false);
    const [showUpdatePostModal, setshowUpdatePostModal] = useState(false);
    const [toast, setToast] = useState({
        show: false,
        message: '',
        type: null
    });

    const getPosts = async () => {
        try {
            const response = await axios.get(`${apiUrl}/post`)

            if (response.data.success) {
                dispatch({
                    type: 'POST_LOADED_SUCCESS',
                    payload: response.data.posts
                })
            }

        } catch (e) {
            dispatch({
                type: 'POST_LOADED_FAILED',
            })
        }
    }

    // Addpost
    const addPost = async newPost => {
        try {
            const res = await axios.post(`${apiUrl}/post`, newPost)
            if (res.data.success) {
                dispatch({
                    type: 'ADD_POST',
                    payload: res.data.post
                })
                return res.data
            }
        } catch (e) {
            return e.res.data ? e.res.data
                : { success: false, message: 'server Error' }
        }
    }

    // DELETE POST
    const deletePost = async postId => {
        try {
            const res = await axios.delete(`${apiUrl}/post/delete-post/${postId}`)
            if (res.data.success) {
                dispatch({
                    type: DELETE_POST,
                    payload: postId
                })
            }
        } catch (e) {
            return e.res.data ? e.res.data
                : { success: false, message: 'server Error' }
        }
    }
    // find post when click update Post 
    const findPostId = postId => {
        const post = postState.posts.find(post => post._id === postId);
        dispatch({
            type: FIND_POST, payload: post
        })
    }
    // updatePost
    const updatePost = async updatePost => {
        try {
            const res = await axios.put(`${apiUrl}/post/update-post/${updatePost._id}`, updatePost)
            if (res.data.success) {
                dispatch({
                    type: UPDATE_POST,
                    payload: res.data.post
                })
                return res.data;
            }
        } catch (e) {
            return e.res.data ? e.res.data
                : { success: false, message: 'server Error' }
        }
    }



    const PostContextData = {
        postState, getPosts, showAddPostModal,
        setShowAddPostModal, addPost, toast, setToast, deletePost, updatePost, findPostId,
        showUpdatePostModal, setshowUpdatePostModal
    };
    return (
        <PostContext.Provider value={PostContextData}>
            {children}
        </PostContext.Provider>
    )
}

export default PostContextProvider;