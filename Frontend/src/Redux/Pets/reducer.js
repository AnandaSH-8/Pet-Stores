import {PETS_DETAILS} from "./action";

const initState = {
    data:[],
}

export const PetReducer = (state = initState,{type,payload})=>{

    switch(type)
    {
        case PETS_DETAILS:
            return {...state,data:payload};
        default:
            return state;
    }
}
