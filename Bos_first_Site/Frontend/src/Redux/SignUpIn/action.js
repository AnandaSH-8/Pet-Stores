import axios from "axios";

export const USER_DETAILS = "USER_DETAILS";

export const userDetails = (payload)=>({type:USER_DETAILS,payload})

export const LOGOUT = "LOGOUT";

export const logOut = ()=>({type:LOGOUT})

export const SignUp = (details)  => (dispatch) =>{

    axios.post(`https://bos-first-site-api.herokuapp.com/register`,details)
    .then(({data})=>{
        alert(data.message,"Please Login to access the Site")
    })
}

export const logIn = (details) => (dispatch)=>{
    
    axios.post(`https://bos-first-site-api.herokuapp.com/login`,details)
    .then(({data})=>{
        alert("Please Wait...")
        dispatch(authenticate(data.token))
    })
}

const authenticate = (token) => (dispatch) =>{
    let link = {headers: {authorization : `Bearer ${token}`} }
    axios.get(`https://bos-first-site-api.herokuapp.com/home`,link)
    .then(({data})=>{
        let {user,message} = data
        let obj = {
            id:user._id,
            name:user.name,
            email:user.email,
            phone:user.phone,
            username:user.username,
            type:user.type
        }

        localStorage.setItem("user",JSON.stringify(obj))
        alert(message)
        if(data.message=="Login Successfull")
        {
            dispatch(userDetails(data.user))
        }
        
    })
}
