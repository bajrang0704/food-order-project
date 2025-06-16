import {legacy_createStore as createStore, combineReducers,applyMiddleware,compose,} from "redux";
import thunk from "redux-thunk"; // for data fetching
import { restaurantReducer } from "./reducer/restaurantReducer";
import { menuReducer } from "./reducer/menuReducer";
import { authReducer, forgotPasswordReducer, userReducer } from "./reducer/userReducer";
import { cartReducer } from "./reducer/cartReducer";
import { myOrdersReducer, newOrderReducer, orderDetailsReducer } from "./reducer/orderReducer";

const reducer =combineReducers({
    restaurants:restaurantReducer,
    menus:menuReducer,
    auth:authReducer,
    user:userReducer,
    forgotPassword:forgotPasswordReducer,
    cart:cartReducer,
    newOrder:newOrderReducer,
    myOrders:myOrdersReducer,
    orderDetails:orderDetailsReducer,
});
const composeenhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
compose;

const middleware =[thunk];
const store = createStore(
    reducer ,
    composeenhancers(applyMiddleware(...middleware))
);

export default store;