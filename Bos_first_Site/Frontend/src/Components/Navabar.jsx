
import { Link, useNavigate} from 'react-router-dom'
import {Button} from '@chakra-ui/react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { logOut } from '../Redux/SignUpIn/action'

export const Navbar = ({userType,isAuth,status}) =>{

    const dispatch = useDispatch()
    const navigate = useNavigate()

    return <div className="navbar">
            <h3> <Link to="/">Home</Link></h3>

           {isAuth? <h3> 
               <Link to={`pets/status/${status}`}>Status</Link>
               </h3>:""}
            
            {userType == "admin"?<h3> 
                <Link to="/listing/create">Create</Link>
                </h3>: ""}

            {userType == "admin"?<h3> 
                 <Link to="/pet/bookings">Booking</Link>
                </h3>: ""}

            <Button style={{position:"sticky",left:"90%"}} colorScheme={isAuth?"red":"green"}
            onClick={()=>{
                navigate("/signUpIn")
                dispatch(logOut())
                isAuth = false
            }}>{isAuth?"Logout":"Login"}</Button>
            
        </div>
}