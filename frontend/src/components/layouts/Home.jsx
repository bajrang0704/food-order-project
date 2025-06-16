import React, { useEffect } from 'react'
import CountRestaurant from './CountRestaurant'
import Restaurant from './Restaurant';
import { getRestaurants, SortByRatings, SortByReviews, ToggleVegOnly } from "../../actions/restaurantAction";
import { useDispatch, useSelector } from 'react-redux';
import Loader from "./Loader";
import Message from './Message';

export default function Home() {
  const dispatch = useDispatch();
  
  const { 
    loading: restaurantLoading, 
    error: restaurantError, 
    restaurants, 
    showVegOnly 
  } = useSelector((state) => state.restaurants);

  useEffect(() => {
    console.log("Home component mounted, fetching restaurants...");
    dispatch(getRestaurants());
  }, [dispatch]);

  const handleSortByReview = () => {
    dispatch(SortByReviews());
  };
  
  const handleSortByRatings = () => {
    dispatch(SortByRatings());
  }

  const handleVegOnly = () => {
    dispatch(ToggleVegOnly());
  }

  console.log("Home component render state:", {
    loading: restaurantLoading,
    error: restaurantError,
    restaurantsCount: restaurants?.length,
    showVegOnly
  });

  return (
    <>
      <CountRestaurant />
      {restaurantLoading ? (
        <div className="text-center">
          <Loader />
          <p>Loading restaurants...</p>
        </div>
      ) : restaurantError ? (
        <Message variant="danger">
          {restaurantError}
          <br />
          <small>Please check your internet connection and try again.</small>
        </Message>
      ) : (
        <>
          <section>
            <div className="sort">
              <button className="sort_veg veg p-3" onClick={handleVegOnly}>
                {showVegOnly ? "Show All" : "Pure veg"}
              </button>
              <button className="sort_veg veg p-3" onClick={handleSortByReview}>
                Sort By Review
              </button>
              <button className="sort_veg veg p-3" onClick={handleSortByRatings}>
                Sort By Ratings
              </button>
            </div>
            <div className="row mt-4">
              {restaurants && restaurants.length > 0 ? (
                restaurants.map((restaurant) => 
                  (!showVegOnly || (showVegOnly && restaurant.isVeg)) ? (
                    <Restaurant key={restaurant._id} restaurant={restaurant} />
                  ) : null
                )
              ) : (
                <Message variant="info">
                  No restaurants found. Please try again later.
                </Message>
              )}
            </div>
          </section>
        </>
      )}
    </>
  );
}
