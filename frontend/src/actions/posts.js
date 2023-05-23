import * as api from '../api'; //import all from the actions as api

export const getPosts = () => async (dispatch) => {
    try{
        const {data} = await api.fetchPosts();
        dispatch({type: 'FETCH_ALL', payload: data});
    }catch(err){
        console.log(err.message);
    }
    
}

export const createPost = (Post) => async (dispatch) => {
    try{
        const {data} = await api.createPost(Post);
        dispatch({type: 'CREATE', payload: data});
    }catch(err){
        console.log(err.message);
    }
}

export const updatePost = (id, Post) => async (dispatch) => {
    try{
        const {data} = await api.updatePost(id, Post);
        dispatch({type: 'UPDATE', payload: data});
    }catch(err){
        console.log(err.message);
    }
}
