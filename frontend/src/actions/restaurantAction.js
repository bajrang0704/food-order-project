import { ALL_RESTAURANTS_REQUEST, ALL_RESTAURANTS_SUCCESS ,ALL_RESTAURANTS_FAIL,SORT_BY_RATINGS,SORT_BY_REVIEWS,CLEAR_ERROR,TOGGLE_VEG_ONLY} from "../constants/restaurantsConstant"
import axios from "axios";

export const getRestaurants =()=>{
    return async(dispatch) =>{
        try{
        dispatch({type: ALL_RESTAURANTS_REQUEST });
        let link = '/api/v1/eats/stores';
        const {data} =await axios.get(link);
        console.log(data);
        const {restaurants, count}= data;
        dispatch({
            type: ALL_RESTAURANTS_SUCCESS,
            payload:{restaurants,count},
        });
    }catch(err){
        dispatch({
            type: ALL_RESTAURANTS_FAIL,
            payload:err.response.data.message,
        });
        
        
    }
    };
};


export const SortByRatings =() =>{
    return {
        type:SORT_BY_RATINGS,
    }
}

export const SortByReviews =() =>{
    return {
        type:SORT_BY_REVIEWS,
    }
}

export const ToggleVegOnly =() =>{
    return {
        type:TOGGLE_VEG_ONLY,
    }
}


export const ClearErrors =() =>{
    return {
        type:CLEAR_ERROR,
    }
}