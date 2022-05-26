import { useState } from 'react'
import './App.css'
import { Link, Route, Routes,Navigate } from 'react-router-dom'
import { Home } from './Components/Home'
import { Entity } from './Components/entity'
import { Create } from './Components/create'
import { SignInUp } from './Components/SignInUp'
import {Navbar} from "./Components/Navabar"
import { Pets } from './Components/Pets';
import {PetAdd} from "./Components/AddPets"
import {useSelector} from "react-redux"
import {EditBoard} from "./Components/EditBoard"
import {Booking} from "./Components/Admin_booking"
import { UserStatus } from './Components/user_status'

function App() {

  const {isAuth} = useSelector((store)=> store.user) || JSON.parse(localStorage.getItem("auth")) || false

  const data = useSelector((store)=> store.user.userDetails) 

  const {type,id} = JSON.parse(localStorage.getItem("user")) || data

  const PrivateRouter = ({children}) =>{
    return isAuth? children : <Navigate to="/signUpIn"/>
  } 

  const AdminRouter = ({children}) =>{
    return type=="admin"?children:<Navigate to="/"/>
  }

  return (
    <div className="App">
      <Navbar userType={type} isAuth={isAuth} status={id}/>
     <Routes>
            <Route path="/" element={
              <PrivateRouter>
                <Home/>
              </PrivateRouter>}>
            </Route>
       
       <Route path="/listing/create" element={
         <AdminRouter>
            <Create/>
         </AdminRouter>
       }></Route>

       <Route path="/listing/:id" element={<Entity userType={type}/>}></Route>
       <Route path="/board/edit/:id" element={<EditBoard/>}></Route>
       <Route path="/signUpIn" element={<SignInUp/>}></Route>
       <Route path="/pets/:id" element={<Pets/>}></Route>
       <Route path="/pet/create/:id" element={<PetAdd/>}></Route>
       <Route path="/pets/status/:id" element={<UserStatus/>}></Route>
       <Route path="/pet/bookings" element={
         <AdminRouter>
           <Booking/>
         </AdminRouter>
       }></Route>
     </Routes>
    </div>
  )
}

export default App
