import {
    FormControl,FormLabel,Input, Stack,Button, Textarea
} from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import {useDispatch} from "react-redux";
import { addToBooking } from "../Redux/Booking/action"

const InputStyle = {
    border:"2px solid blue",
    borderRadius:8,
    marginTop:"3px",
    background:"white"
}

export const PeriodBox = ({prop,status}) =>{

    const dispatch = useDispatch()

    const {pet,user,index,display} = prop;

    const [visible,setVisible] = useState()

    useEffect(()=>{
        setVisible(display)
    },[display])

    const [pass,setPass] = useState({
        pet:"",
        status:false,
        owner:"",
        startDate:"",
        endDate:"",
    })

    const handleChange =()=>{
        status(index)
        dispatch(addToBooking(pass))
    }


    return <div className="periodsBox" 
    style={{display:visible?"inherit":"none"}}>
        <b style={{fontSize:27,cursor:"pointer",display:visible?"inherit":"none"}} onClick={()=>{
           setVisible(display?false:true)
        }}>X</b>
        <FormControl className="FormControl" style={{width:"95%"}}>
            <Stack spacing={4}>
                <FormLabel>Address</FormLabel>
                <Textarea placeholder="Enter Your Address"  type='text' style={InputStyle}/>
                
                <FormLabel>Start Date</FormLabel>
                <Input  placeholder="Start date of Booking Period."  type='date' style={InputStyle}  
                onChange={(e)=>{
                    setPass({...pass,startDate:e.target.value})}}/>
            
                <FormLabel>End Date</FormLabel>
                <Input  placeholder="End date of Booking Period"   type='date' style={InputStyle} 
                onChange={(e)=>{
                    setPass({...pass,endDate:e.target.value})
                }}/>
                </Stack>
            </FormControl>
                <Button className="signInUp-Button" style={{marginLeft:"30%"}} colorScheme={"orange"}
                onClick={()=>{
                    console.log(user,pet)
                    setPass({
                        ...pass,
                        owner:user,
                        status:false,
                        pet,
                    })
                    handleChange()
                }}>Confirm Book</Button>
    </div>
}