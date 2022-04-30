import {
    FormControl,FormLabel,Input, Stack,Button
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import {Navigate} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { SignUp,logIn } from '../Redux/SignUpIn/action'

const InputStyle = {
    border:"1px solid blue",
    borderRadius:8,
    marginTop:"3px",
    height:35,
    background:"white"
}

export const SignInUp = () =>{

    const dispatch = useDispatch()
    const {isAuth} = useSelector((store)=> store.user)
    
    const [signUp,setSignUp] = useState({
        name:"",
        username:"",
        email:"",
        phone:0,
        password:""
    })

    const [signIn,setSignIn]= useState({
        username:"",
        password:""
    })

    if(isAuth)
    {
        return <Navigate to={"/"}/>
    }

    return <div style={{display:"flex",justifyContent:"space-around"}}>
        <div className='signInUp'>
        <h1>Register</h1>
    
        <FormControl className="FormControl" style={{width:"95%"}}>
        <Stack spacing={4}>
            <FormLabel>Name</FormLabel>
            <Input   type='text' style={InputStyle}  
            onChange={(e)=>{setSignUp({...signUp,name:e.target.value})}}/>
            
            <FormLabel>Username</FormLabel>
            <Input   type='text' style={InputStyle}  
            onChange={(e)=>{setSignUp({...signUp,username:e.target.value})}}/>
        
            <FormLabel>Email</FormLabel>
            <Input   type='text' style={InputStyle} 
            onChange={(e)=>{setSignUp({...signUp,email:e.target.value})}}/>
            
            <FormLabel>Phone</FormLabel>
            <Input   type='text' style={InputStyle} 
            onChange={(e)=>{setSignUp({...signUp,phone:(+e.target.value)})}}/>
        
            <FormLabel>Password</FormLabel>
            <Input   type='text' style={InputStyle} 
            onChange={(e)=>{setSignUp({...signUp,password:e.target.value})}}/>
            </Stack>
        </FormControl>
        <Button className="signInUp-Button" colorScheme={"red"}
        onClick={()=>{dispatch(SignUp(signUp))}} >Register</Button>
        </div>

        <div className='signInUp' style={{height:350}}> 
        <h1>Login</h1>
        <FormControl className="FormControl" style={{width:"95%"}}>
        <Stack spacing={4}>
            <FormLabel>Username</FormLabel>
            <Input   type='text' style={InputStyle}  
            onChange={(e)=>{setSignIn({...signIn,username:e.target.value})}}/>
            
            <FormLabel>Password</FormLabel>
            <Input   type='text' style={InputStyle}  
            onChange={(e)=>{setSignIn({...signIn,password:e.target.value})}}/>
            </Stack>
        </FormControl>
        <Button className="signInUp-Button" colorScheme="green"
        onClick={()=>{dispatch(logIn(signIn))}}>Login</Button>
        </div>
    </div>
}