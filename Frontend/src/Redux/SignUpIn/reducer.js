import {USER_DETAILS,LOGOUT} from "./action" 

const initState = {
    isAuth:JSON.parse(localStorage.getItem("auth")) || false,
    userDetails:[]
}

export const userReducer = (state = initState,{type,payload})=>{
    switch (type)
    {
        case USER_DETAILS:
            localStorage.setItem("auth",JSON.stringify(true))
            return {...state,isAuth:true,userDetails:payload};
        case LOGOUT:
            localStorage.setItem("user",JSON.stringify({}))
            localStorage.setItem("auth",JSON.stringify(false))
            return {...state,isAuth:false,userDetails:[]}
        default:
            return state;
    }
    
}