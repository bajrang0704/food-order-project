import { CLEAR_CART } from "../constants/cartConstant";
import { CLEAR_ERRORS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS, REGISTER_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS,
    UPDATE_PROFILE_REQUEST,UPDATE_PROFILE_SUCCESS,UPDATE_PROFILE_FAIL,UPDATE_PASSWORD_REQUEST,UPDATE_PASSWORD_FAIL,UPDATE_PASSWORD_SUCCESS,NEW_PASSWORD_REQUEST,NEW_PASSWORD_SUCCESS,NEW_PASSWORD_FAIL,FORGOT_PASSWORD_FAIL,FORGOT_PASSWORD_REQUEST,FORGOT_PASSWORD_SUCCESS,
 } from "../constants/userConstant"
import axios from "axios";
import config from '../config';

//login
export const login=(email,password)=> async(dispatch)=>{
    try{
        dispatch({type:LOGIN_REQUEST});
        const config ={
            headers:{
                "Content-Type":"application/json",
            },
        };
        //make a post request
        const { data }=await axios.post(`${config.API_URL}/users/login`,{email,password},config);
        dispatch({
            type:LOGIN_SUCCESS,
            payload:data.data.user,
        });
    }catch(error){
        dispatch({
            type:LOGIN_FAIL,
            payload:"Login Failed",
        });
    }
};

//register

export const register=(userData)=>async(dispatch)=>{
    try{
        dispatch({type:REGISTER_USER_REQUEST});
        const config={
            headers:{"Content-Type":"multipart/form-data"},
        };
        const {data}=await axios.post(`${config.API_URL}/users/signup`,userData,config);
        dispatch({
            type:REGISTER_USER_SUCCESS,
            payload:data.data.user,
        });
        return data.data.user;
    }catch(error){
        dispatch({
            type:REGISTER_USER_FAIL,
            payload:error.response.data.message,
        });

    }
};

//load uset action

export const loadUser =()=>async(dispatch)=>{
    try{
        dispatch({type:LOAD_USER_REQUEST});
        const {data}=await axios.get(`${config.API_URL}/users/me`);
        dispatch({
            type:LOAD_USER_SUCCESS,
            payload:data.user,
        });
    }catch(error){
        dispatch({
            type:LOAD_USER_FAIL,
            payload:error.response.data.message,
        });

    }
}

// Update profile action
export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({
        type: UPDATE_PROFILE_REQUEST,
        });
        const config = {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        };
        const { data } = await axios.put(`${config.API_URL}/users/me/update`, userData, config);
        dispatch({
        type: UPDATE_PROFILE_SUCCESS,
        payload: data.success,
        });
    } catch (error) {
        dispatch({
        type:UPDATE_PROFILE_FAIL,
        payload: error.response.data.message,
        });
    }
    };


// Update password action
export const updatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch({
        type: UPDATE_PASSWORD_REQUEST,
        });
        const config = {
        headers: {
            "Content-Type": "application/json",
        },
        };
        const { data } = await axios.put(`${config.API_URL}/users/password/update`, passwords, config);
        dispatch({
        type: UPDATE_PASSWORD_SUCCESS,
        payload: data.success,
        });
    } catch (error) {
        dispatch({
        type: UPDATE_PASSWORD_FAIL,
        payload: error.response.data.message,
        });
    }
    };


    export const forgotPassword = (email) => async (dispatch) => {
        try {
            dispatch({
            type: FORGOT_PASSWORD_REQUEST,
            });
            const config = {
            headers: {
                "Content-Type": "application/json",
            },
            };
            const { data } = await axios.post(`${config.API_URL}/users/forgetPassword`, email, config);
            dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data.success,
            });
        } catch (error) {
            dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message,
            });
        }
        };

// Reset password action
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        dispatch({
        type: NEW_PASSWORD_REQUEST,
        });
        const config = {
        headers: {
            "Content-Type": "application/json",
        },
        };
        const { data } = await axios.patch(`${config.API_URL}/users/resetPassword/${token}`, passwords, config);
        dispatch({
        type: NEW_PASSWORD_SUCCESS,
        payload: data.success,
        });
    } catch (error) {
        dispatch({
        type: NEW_PASSWORD_FAIL,
        payload: error.response.data.message,
        });
    }
    };



//logout action

export const logout=()=>async(dispatch)=>{
    try{
        await axios.get(`${config.API_URL}/users/logout`);
        dispatch({
            type:LOGOUT_SUCCESS,

        });
        dispatch({type:CLEAR_CART});
    }catch(error){
        dispatch({
            type:LOGOUT_FAIL,
            payload:error.response.data.message,
        });
    }

};

//clear errors 
export const clearErrors=()=> async(dispatch)=>{
    dispatch({
        type:CLEAR_ERRORS,
    });
};

