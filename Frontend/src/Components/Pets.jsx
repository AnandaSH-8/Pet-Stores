import { useEffect,useState} from "react"
import { useDispatch, useSelector } from "react-redux";
import {Button, filter} from '@chakra-ui/react';
import { PetsDetails } from "../Redux/Pets/action";
import { Link, useParams } from "react-router-dom";
import {PeriodBox} from "./Periods"


export const Pets = () =>{

    const dispatch = useDispatch()
    const {id} = useParams()
    const {data} = useSelector((store)=> store.pets)
    const [booked,setBooked] = useState(-1)
    const [props,setProps] = useState({
        pet:"",
        user:"",
        index:"",
        display:false
    })

    const user = JSON.parse(localStorage.getItem("user"))

    useEffect(()=>{
        dispatch(PetsDetails(id))
    },[])

    const bookStatus = (index) =>{
        setBooked(index)
    }

    return <div>
        <div style={{marginTop:"2%",textAlign:"right",marginRight:"5%"}}>
            <Button variant="solid" colorScheme="pink">
                <Link to={`/pet/create/${id}`}>Add Pet</Link>
            </Button>
        </div>
        <div className="PetsBox" >
            {data?.map((pet,index)=>(
                <div key={pet._id}>
                    <div style={{height:"65%"}}>
                        <img src={pet.image} alt={pet.type} style={{height:"100%"}}/>
                    </div>
                    <div style={{textAlign:"center"}}>
                        <b >Type : {pet.type}</b>
                        <h2>Weight : {pet.weight}Kg</h2>
                    </div>
                    <Button style={{marginLeft:"40%",marginTop:"2%"}} 
                    colorScheme={booked == index?"red":"whatsapp"}
                    onClick={(e)=>{ 
                        setProps({
                            ...props,
                            pet:pet._id,
                            user:user.id,
                            display:props.display?false:true,
                            index
                        })}}
                    >{booked == index?"Booked":"Book"}</Button>
                </div>
            ))}
        </div>
        <PeriodBox prop={props} status={bookStatus} /> 
    </div>
}

