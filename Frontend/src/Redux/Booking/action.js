import axios from "axios";

export const BOOKINGS = "BOOKINGS";

export const bookingsDetails = (payload)=>({type:BOOKINGS,payload})

export const USER_BOOKINGS = "USER_BOOKINGS";

export const userBooking = (payload)=>({type:USER_BOOKINGS,payload})
 



export const addToBooking = (data) => (dispatch) =>{
    console.log(data)
    axios.post(`https://bos-first-site-api.herokuapp.com/bookings`,data)
    .then(({data})=>{
        console.log(data.error)
        alert(data.message)
    })
}

export const getBookings = () => (dispatch)=>{

    axios.get(`https://bos-first-site-api.herokuapp.com/bookings`)
    .then(({data})=>{
        dispatch(bookingsDetails(data))
    })
}

export const statusUpdate = (id,decision,pet,owner) =>(dispatch)=>{

    let status = {status:decision?false:true}
    
    axios.put(`https://bos-first-site-api.herokuapp.com/bookings/${id}`,status)
    .then(({data})=>{
        dispatch(PetStatus(pet,owner,decision))
    })
}

const PetStatus = (pet,owner,decision) =>(dispatch)=>{

    let obj = {owner,booked:decision?false:true}
    alert("Please Wait...")
    axios.put(`https://bos-first-site-api.herokuapp.com/pets/${pet}`,obj)
    .then(({data})=>{
        alert("Processing...")
        alert(data.message)
        dispatch(getBookings())
    })
}

export const userPetStatus = (id) =>(dispatch) =>{
    axios.get(`https://bos-first-site-api.herokuapp.com/bookings/owner/${id}`)
    .then(({data})=>{
        dispatch(userBooking(data))
    })
}




