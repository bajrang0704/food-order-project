import React, { useEffect } from 'react'
import CountRestaurant from './CountRestaurant'
import Restaurant from './Restaurant';
import{getRestaurants, SortByRatings, SortByReviews, ToggleVegOnly} from "../../actions/restaurantAction";
import { useDispatch, useSelector } from 'react-redux';
import Loader from "./Loader";
import Message from './Message';



export default function Home() {
  const dispatch = useDispatch();
  
 const {loading: restaurantLoading,error:restaurantError,restaurants, showVegOnly}= useSelector((state)=>state.restaurants);


  useEffect(()=>{
    dispatch(getRestaurants());
  },[dispatch]);

  const handleSortByReview=()=>{
    dispatch(SortByReviews());
  };
  
  const handleSortByRatings=()=>{
    dispatch(SortByRatings());
  }
  const handleVegOnly=()=>{
    dispatch(ToggleVegOnly());
  }

  return (
    <>
      <CountRestaurant />
      {restaurantLoading ? (<Loader/>) : restaurantError ? (<Message varent="danger">{restaurantError}</Message>):
      (
        <>
      <section>
        <div className="sort">
            <button className="sort_veg veg p-3" onClick={handleVegOnly}>
              {showVegOnly ? "Show All " : "Pure veg"}
            </button>
            <button className="sort_veg veg p-3" onClick={handleSortByReview}>Sort By Review</button>
            <button className="sort_veg veg p-3" onClick={handleSortByRatings}>Sort By Ratings</button>
        </div>
        <div className="row mt-4">
            {restaurants ? restaurants.map((restaurant)=>(!showVegOnly || (showVegOnly && restaurant.isVeg)?(
              <Restaurant key={restaurant._id} restaurant={restaurant}/>)
            :null)):(<Message variant="info">No Restaurant is Found</Message>)}
        </div>
      </section>
    </>
      )}
      </>
  );
}
