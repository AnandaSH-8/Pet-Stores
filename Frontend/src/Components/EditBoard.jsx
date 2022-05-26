
import {
    FormControl,FormLabel,Input,Checkbox,
    Stack, Textarea,Select,Radio, RadioGroup,
    NumberInput, NumberInputField,Button
} from '@chakra-ui/react'

import {useReducer} from "react"
import {updateBoard} from "../Redux/Board/actions"
import {useDispatch,useSelector} from "react-redux"
import { useParams} from "react-router-dom"

const InputStyle = {
    border:"1px solid brown",
    borderRadius:8,
    marginTop:"3px"
}

const initState = {
    name:"",
    city:"",
    address:"",
    capacity:0,
    costPerDay:0,
    verified:"",
    rating:0,
    details:{
       summary:"",
       pets:0,
       types:[],
       size:"",
       supervision:"",
       place:"",
       sleep:"",
       breaks:"",
       walks:0,
       stay:'',
       areaSize:"",
       emergency:"",
    }
}

const petReducer = (state,{type,payload})=>{
    switch (type){
        case "NAME":
            return {...state,name:payload}
        case "CITY":
            return {...state,city:payload} 
        case "ADDRESS":
            return {...state,address:payload} 
        case "CAPACITY":
            return {...state,capacity:(+payload)} 
        case "COSTPERDAY":
            return {...state,costPerDay:(+payload)} 
        case "VERIFIED":
            return {...state,verified:payload} 
        case "RATING":
            return {...state,rating:(+payload)}      
        case "SUMMARY":
            return {...state,details:{...state.details,summary:payload}}
        case "PETS":
            return {...state,details:{...state.details,pets:(+payload)}} 
        case "TYPES":
            return {...state,details:{...state.details,types:[...state.details.types,payload]}} 
        case "SIZE":
            return {...state,details:{...state.details,size:payload}} 
        case "SUPERVISION":
            return {...state,details:{...state.details,supervision:payload}} 
        case "PLACE":
            return {...state,details:{...state.details,place:payload}} 
        case "SLEEP":
            return {...state,details:{...state.details,sleep:payload}} 
        case "BREAKS":
            return {...state,details:{...state.details,breaks:payload}} 
        case "WALKS":
            return {...state,details:{...state.details,walks:(+payload)}} 
        case "STAY":
            return {...state,details:{...state.details,stay:payload}} 
        case "AREASIZE":
            return {...state,details:{...state.details,areaSize:payload}}
        case "EMERGENCY":
            return {...state,details:{...state.details,emergency:payload}} 
    }
}

export const EditBoard = () =>{

    const ReduxDispatch = useDispatch()
    const {id} = useParams()

    const {board} = useSelector((store)=> store.site)
    const [state,dispatch] = useReducer(petReducer,initState)

    if(board == false)
    {
        return <div></div>
    }

    const {summary,pets,types,size,supervision, place, 
        sleep, breaks, walks, stay,areaSize,emergency} = board?.details

   
    return <>
    <div className="topbar">
        <b>Forms</b>
        <Button variant="solid" colorScheme="orange"
        onClick={()=>{ReduxDispatch(updateBoard(state,id))}}>Submit</Button>
    </div>

    <div style={{display:"flex",justifyContent:"space-evenly"}} >
        <div style={{width:"25%"}} className="forms">
        <FormControl className="FormControl" style={{width:"95%"}}>
        <Stack spacing={4}>
            <FormLabel>Name</FormLabel>
            <Input placeholder={board.name}   type='text' style={InputStyle}  
            onChange={(e)=>{dispatch({type:"NAME",payload:e.target.value})}}/>
            
            <FormLabel>City</FormLabel>
            <Input placeholder={board.city}   type='text' style={InputStyle}  
            onChange={(e)=>{dispatch({type:"CITY",payload:e.target.value})}}/>
        
            <FormLabel>Address</FormLabel>
            <Input placeholder={board.address}   type='text' style={InputStyle} 
            onChange={(e)=>{dispatch({type:"ADDRESS",payload:e.target.value})}}/>
            
            <FormLabel>Capacity</FormLabel>
            <NumberInput style={InputStyle} >
                    <NumberInputField placeholder={board.capacity}
                    onChange={(e)=>{dispatch({type:"CAPACITY",payload:e.target.value})}} />
                </NumberInput>
        
            <FormLabel>Cost Per Day</FormLabel>
            <Input placeholder={board.costPerDay}   type='text' style={InputStyle} 
            onChange={(e)=>{dispatch({type:"COSTPERDAY",payload:e.target.value})}}/>
            
            <RadioGroup placeholder='2'>
                <Stack spacing={5} direction='row'>
                    <Radio colorScheme='orange' value="true"
                    onChange={(e)=>{dispatch({type:"VERIFIED",payload:true})}}>
                    True
                    </Radio>
                    <Radio colorScheme='red' value="false"
                    onChange={(e)=>{dispatch({type:"VERIFIED",payload:false})}}>
                    False
                    </Radio>
                </Stack>
            </RadioGroup>
            
            <FormLabel>Rating</FormLabel>
                <NumberInput style={InputStyle} >
                    <NumberInputField placeholder={board.rating}
                     onChange={(e)=>{dispatch({type:"RATING",payload:e.target.value})}}/>
                </NumberInput>
            </Stack>
        </FormControl>
    </div>

    <div style={{width:"34%"}} className="forms">
        <FormControl className="FormControl" style={{width:"95%"}}>
            <Stack spacing={5}>
                <FormLabel>Summary</FormLabel>
                <Textarea placeholder={summary} style={InputStyle}
                onChange={(e)=>{dispatch({type:"SUMMARY",payload:e.target.value})}} />
            
                <FormLabel>Level of adult supervision.</FormLabel>
                <Input placeholder={supervision} type='text' style={InputStyle} 
                onChange={(e)=>{dispatch({type:"SUPERVISION",payload:e.target.value})}}/>
                
                <FormLabel>The place your pet will sleep at night.</FormLabel>
                <Input placeholder={sleep} type='text' style={InputStyle} 
                onChange={(e)=>{dispatch({type:"SLEEP",payload:e.target.value})}}/>

                <FormLabel>The place your pet will be if they are left unsupervised at home.</FormLabel>
                <Input placeholder={place} type='text' style={InputStyle} 
                onChange={(e)=>{dispatch({type:"PLACE",payload:e.target.value})}}/>
                
                <FormLabel>The number of potty breaks provided per day.</FormLabel>
                <Input placeholder={breaks} type='text' style={InputStyle} 
                onChange={(e)=>{dispatch({type:"BREAKS",payload:e.target.value})}}/>

                <FormLabel>The type of home I stay in.</FormLabel>
                <Input placeholder={stay} type='text' style={InputStyle} 
                onChange={(e)=>{dispatch({type:"STAY",payload:e.target.value})}}/>
            </Stack>
        </FormControl>
    </div>
        <div style={{width:"34%"}} className="forms">
            <FormControl className="FormControl" style={{width:"95%"}}>
                <Stack spacing={5}>

                    <FormLabel>The number of walks provided per day.</FormLabel>
                    <NumberInput style={InputStyle}>
                        <NumberInputField placeholder={walks}
                        onChange={(e)=>{dispatch({type:"WALKS",payload:e.target.value})}}/>
                    </NumberInput>

                    <FormLabel>Number of pets that will be watched at one time.</FormLabel>
                    <NumberInput style={InputStyle}>
                        <NumberInputField placeholder={pets}
                        onChange={(e)=>{dispatch({type:"PETS",payload:e.target.value})}}/>
                    </NumberInput>

                    <FormLabel>Accepted Pet Types</FormLabel>
                    <Stack spacing={5} direction='row'>
                        <Checkbox colorScheme='red'
                         onChange={(e)=>{dispatch({type:"TYPES",payload:e.target.checked?"Dogs":""})}}>
                            Dogs
                        </Checkbox>
                        <Checkbox colorScheme='green'
                         onChange={(e)=>{dispatch({type:"TYPES",payload:e.target.checked?"Cats":""})}}>
                            Cats
                        </Checkbox>
                        <Checkbox colorScheme='orange'
                         onChange={(e)=>{dispatch({type:"TYPES",payload:e.target.checked?"Rabbits":""})}}>
                            Rabbits
                        </Checkbox>
                    </Stack>
                    
                    <FormLabel>Accepted Pet size</FormLabel>
                    <Select placeholder='Select option'  style={InputStyle}
                    onChange={(e)=>{dispatch({type:"SIZE",payload:e.target.value})}}>
                        <option value='1-5kg'>1-5kg</option>
                        <option value='5-10kg'>5-10kg</option>
                        <option value='10-20kg'>10-20kg</option>
                        <option value='20-40kg'>20-40kg</option>
                        <option value='40+kg'>40+kg</option>
                    </Select>

                    <FormLabel>My outdoor area size.</FormLabel>
                    <Select placeholder='Select option' style={InputStyle} 
                    onChange={(e)=>{dispatch({type:"AREASIZE",payload:e.target.value})}}>
                        <option value='Small'>Small</option>
                        <option value='Medium'>Medium</option>
                        <option value='Large'>Large</option>
                    </Select>

                    <FormLabel>Emergency transport</FormLabel> 
                    <RadioGroup defaultValue='2'>
                        <Stack spacing={5} direction='row'>
                            <Radio colorScheme='red' value='No' 
                            onChange={(e)=>{dispatch({type:"EMERGENCY",payload:e.target.value})}}>
                            No
                            </Radio>
                            <Radio colorScheme='green' value='Yes'
                            onChange={(e)=>{dispatch({type:"EMERGENCY",payload:e.target.value})}}>
                            Yes
                            </Radio>
                        </Stack>
                    </RadioGroup>
                </Stack> 
            </FormControl>
        </div>
    </div>
    </>
}