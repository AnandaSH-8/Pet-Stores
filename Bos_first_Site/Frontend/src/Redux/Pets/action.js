import axios from "axios"
export const PETS_DETAILS = "PETS_DETAILS";

export const petsDetails = (payload) =>({type:PETS_DETAILS,payload});


export const PetsDetails = (id) => (dispatch) =>{

    axios.get(`https://bos-first-site-api.herokuapp.com/pets/store/${id}`)
    .then(({data})=>{
        dispatch(petsDetails(data))
    })
}

export const AddPet =(data) => (dispatch) =>{
    alert("Please Wait for confirmation")
    axios.post(`https://bos-first-site-api.herokuapp.com/pets`,data)
    .then(({data})=>{
        alert(data.message)
        dispatch(PetsDetails())
    })
}