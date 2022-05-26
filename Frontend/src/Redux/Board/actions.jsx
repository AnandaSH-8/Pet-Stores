
import axios from "axios";

export const ALLBOARDS = "ALLBOARDS";

export const allBoards = (payload)=>({type:ALLBOARDS,payload})

export const ONEBOARD = "ONEBOARD";

export const oneboard = (payload)=>({type:ONEBOARD,payload})

export const CITY = "CITY";

export const cityList = (payload)=>({type:CITY,payload})


export const getCities = () =>(dispatch)=>{

    let object = {}
    axios.get(`https://bos-first-site-api.herokuapp.com/boards?city=0`)
    .then(({data})=>{
        data.site.map((name)=>{
            object[name.city]=1;
        })
        let cities = Object.keys(object)
        dispatch(cityList(cities))
    })
    
}

export const AllBoards = (ct,page) =>(dispatch)=>{

    let city = ct || 0;

    axios.get(`https://bos-first-site-api.herokuapp.com/boards?city=${city}&page=${page}`)
    .then(({data})=>{
        dispatch(allBoards(data))
    })
}

export const allBoardslist = (cost,rating,verified) =>(dispatch)=>{
    
    axios.get(`https://bos-first-site-api.herokuapp.com/boards?cost=${cost}&rating=${rating}&verified=${verified}&city=0`)
    .then(({data})=>{
        dispatch(allBoards(data))
    })
}

export const boardDetails = (id) =>(dispatch)=>{
   
    axios.get(`https://bos-first-site-api.herokuapp.com/boards/${id}`)
    .then((res)=>{
        dispatch(oneboard(res.data))
    })
}

export const createBoard = (state) =>(dispatch)=>{
    
    axios.post(`https://bos-first-site-api.herokuapp.com/boards`,state)
    .then(({data})=>{
        alert(data.message)
        dispatch(allBoardslist())
    })
}

export const updateBoard = (data,id) =>(dispatch)=>{
    alert("Please Wait. We are updating....")
    axios.put(`https://bos-first-site-api.herokuapp.com/boards/${id}`,data)
    .then(({data})=>{
        alert(data.message)
    })
}

export const deleteBoard = (id) =>(dispatch)=>{
    
    axios.delete(`https://bos-first-site-api.herokuapp.com/boards/${id}`)
    .then(({data})=>{
        alert(data.message)
    })
}

