import {BOOKINGS,USER_BOOKINGS} from "./action";

const initState = {
    bookings:[],
    userBooking:[]
}

export const bookingReducer = (state = initState,{type,payload})=>{

    switch(type)
    {
        case BOOKINGS:
            return {...state,bookings:payload};
        case USER_BOOKINGS:
            return {...state,userBooking:payload}
        default:
            return state;
    }
}