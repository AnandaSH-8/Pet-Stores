import {
    FormControl,FormLabel,Input, Stack,Button
} from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { AddPet } from '../Redux/Pets/action'
import { useState } from 'react'
import {useParams} from "react-router-dom"

const InputStyle = {
    border:"2px solid blue",
    borderRadius:8,
    marginTop:"3px",
    background:"white"
}

export const PetAdd = () =>{

    const dispatch = useDispatch()
    const {id} = useParams()

    const userId = JSON.parse(localStorage.getItem("user"))

    const [pet,setPet] = useState({
        type:"",
        weight:"",
        image:"",
        store:id,
        owner:userId.id
    })

    return <div style={{margin:"auto",
            width:"30%",marginTop:"3%"}}>
        <div style={{width:"95%",margin:"auto"}}>
        <h1 style={{color:"brown",fontSize:"26px",fontWeight:900,transform:"translate(110px,-20px)"}}>
            Add Your Pet</h1>

        <FormControl className="FormControl" style={{width:"95%"}}>
            <Stack spacing={4}>
                <FormLabel>Type</FormLabel>
                <Input value={pet.type} placeholder="Type of pet or className"  type='text' style={InputStyle}  
                onChange={(e)=>{setPet({...pet,type:e.target.value})}}/>
                
                <FormLabel>Weight</FormLabel>
                <Input value={pet.weight} placeholder="Weight of Pet in KG"  type='number' style={InputStyle}  
                onChange={(e)=>{setPet({...pet,weight:e.target.value})}}/>
            
                <FormLabel>Image Link</FormLabel>
                <Input value={pet.image} placeholder="Image of pet, a link"   type='text' style={InputStyle} 
                onChange={(e)=>{setPet({...pet,image:e.target.value})}}/>
                </Stack>
            </FormControl>
                <Button className="signInUp-Button" colorScheme={"red"}
                onClick={()=>{
                    setPet(
                    {type:"",
                    weight:"",
                    image:""}); dispatch(AddPet(pet))}} >Add Pet</Button>
        </div>
    </div>
}