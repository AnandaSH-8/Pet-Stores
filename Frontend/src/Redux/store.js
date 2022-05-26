import thunk from "redux-thunk";
import { applyMiddleware, combineReducers, createStore,compose} from "redux";
import { boardReducer } from  "./Board/reducer" 
import {userReducer} from "./SignUpIn/reducer";
import { PetReducer } from "./Pets/reducer"
import { bookingReducer } from "./Booking/reducer"

const rootreducer = combineReducers({
    site:boardReducer,
    user:userReducer,
    pets:PetReducer,
    book:bookingReducer
})

export const store = createStore(rootreducer,
    compose(applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))