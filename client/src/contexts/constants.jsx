export const apiUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:8080/api' : 'somedeployUrl'

export const LOCAL_STORAGE_TOKE_NAME = 'learnit-mern'

export const AuthReducerConstant = {
    authLoading: true,
    isAuthenticated: false,
    user: null
}

export const PostReducerConstant = {
    post: null,
    posts: [],
    postsLoading: true
}


export const DELETE_POST = "DELETE_POST"
export const UPDATE_POST = "UPDATE_POST"
export const FIND_POST = 'FIND_POST';