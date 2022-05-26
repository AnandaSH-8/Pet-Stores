import {ALLBOARDS, ONEBOARD,CITY} from "./actions" 

const initState = {
    boards:[],
    board:[],
    cities:[]
}

export const boardReducer = (state = initState,{type,payload})=>{
    switch (type)
    {
        case ALLBOARDS:
            return {...state,boards:payload};
        case ONEBOARD:
            return {...state,board:payload};
        case CITY:
            return {...state,cities:payload};
        default:
            return state;
    }
    
}