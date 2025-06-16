import {
    ADD_TO_CART,
    REMOVE_ITEM_CART,
    UPDATE_CART_QUANTITY,
    CLEAR_CART,
    SAVE_DELIVERY_INFO,
    SET_RESTAURANT_ID,
    FETCH_CART,
    UPDATE_CART_ITEM,

} from "../constants/cartConstant";




export const cartReducer = (state = { cartItems: [], restaurant: {} }, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state,
                restaurant: action.payload.restaurant,
                cartItems: action.payload.items,
            };
        case UPDATE_CART_ITEM:
            return {
                ...state,
                cartItems: action.payload.items,
            };
        case FETCH_CART:
            return {
                ...state,
                restaurant: action.payload.restaurant,
                cartItems: action.payload.items,
            };
        case REMOVE_ITEM_CART:
            if (action.payload.cart === undefined) {
                return {
                    ...state,
                    cartItems: [],
                };
            } else {
                return {
                    ...state,
                    cartItems: action.payload.card.items,
                };
            }
        case SAVE_DELIVERY_INFO:
            return {
                ...state,
                deliveryInfo: action.payload,
            };

        case CLEAR_CART:
            return {
                ...state,
                cartItems: [],
            };
        case SET_RESTAURANT_ID:
            return {
                ...state,
                restaurant: action.payload,
            };
        default:
            return state;
    }
};