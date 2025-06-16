import { ALL_RESTAURANTS_REQUEST, ALL_RESTAURANTS_SUCCESS ,ALL_RESTAURANTS_FAIL,SORT_BY_RATINGS,SORT_BY_REVIEWS,CLEAR_ERROR,TOGGLE_VEG_ONLY} from "../constants/restaurantsConstant"
import axios from "axios";
import config from "../config";

export const getRestaurants =()=>{
    return async(dispatch) =>{
        try{
        dispatch({type: ALL_RESTAURANTS_REQUEST });
        const {data} =await axios.get(`${config.API_URL}/eats/stores`);
        console.log("Restaurants data:", data);
        const {restaurants, count}= data;
        dispatch({
            type: ALL_RESTAURANTS_SUCCESS,
            payload:{restaurants,count},
        });
    }catch(err){
        console.error("Error fetching restaurants:", err);
        dispatch({
            type: ALL_RESTAURANTS_FAIL,
            payload: err.response?.data?.message || "Error fetching restaurants",
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