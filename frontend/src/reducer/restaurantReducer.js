import { ALL_RESTAURANTS_REQUEST, ALL_RESTAURANTS_SUCCESS,ALL_RESTAURANTS_FAIL, SORT_BY_RATINGS, SORT_BY_REVIEWS, TOGGLE_VEG_ONLY, CLEAR_ERROR } from "../constants/restaurantsConstant";

const initialState={
    restaurants: [],
};
export const restaurantReducer =(state= initialState,action) =>{
  switch(action.type){
    case ALL_RESTAURANTS_REQUEST:
      return{
            ...state,
            loading:true,
            error:null,
      };
    case ALL_RESTAURANTS_SUCCESS:
        return {
            ...state,
            loading:false,
            count: action.payload.count,
            restaurants: action.payload.restaurants,
        };
    case ALL_RESTAURANTS_FAIL:
      return{
        ...state,
        loading:false,
        error:action.payload,
      };
    case SORT_BY_RATINGS:
        return{
          ...state,
          restaurants:[...state.restaurants].sort((a,b)=>b.ratings-a.ratings),
        };

    case SORT_BY_REVIEWS:
          return{
            ...state,
            restaurants:[...state.restaurants].sort((a,b)=>b.numOfReviews-a.numOfReviews),
          };

    case TOGGLE_VEG_ONLY:
            return{
              ...state,
              showVegOnly: !state.showVegOnly,
              pureVegRestaurantsCount: calculatePureVegOnly(
                state.restaurants,
                !state.showVegOnly,
              ),
          };
    case CLEAR_ERROR:
      return{
        ...state,
        error:null,
      }

    default:
      return state;
  }
};

const calculatePureVegOnly =(restaurants,showVegOnly)=>{
  if(!showVegOnly){
    return restaurants.length;
  }else{
    return restaurants.filter((restaurant)=>restaurant.isVeg).length;
  }

}