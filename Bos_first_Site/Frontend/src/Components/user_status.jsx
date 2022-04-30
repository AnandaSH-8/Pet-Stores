import { useEffect,useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import {userPetStatus} from "../Redux/Booking/action";
import {useParams} from "react-router-dom";
import {
    Table,Thead,Tbody,
    Button,Tr,Th,Td,
    TableContainer,Image,
  } from '@chakra-ui/react'

export const UserStatus = () =>{

    const dispatch = useDispatch()
    const {id} = useParams();

    useEffect(()=>{
        dispatch(userPetStatus(id))
    },[])

    const {userBooking} = useSelector((store)=> store.book)


   if(userBooking.length === 0)
   {
       return <div>
           <h1 style={{ background:"black", position:"fixed",top:"40%", left:"20%", 
            color:"orange", fontWeight:800,fontSize:100}}>No Bookings!!!!</h1>
       </div>
   }

    return <div>
        <div>
            <TableContainer style={{marginTop:"3%",border:"2px groove brown"}}>
                <Table variant="striped" colorScheme="purple" fontWeight={900} fontSize={20}>
                    <Thead>
                    <Tr>
                        <Th>SL.No</Th>
                        <Th>Image</Th>
                        <Th>Type</Th>
                        <Th>Weight</Th>
                        <Th>Start Date</Th>
                        <Th>End Date</Th>	
                        <Th>Status</Th>	
                    </Tr>
                    </Thead>
                        <Tbody>
                    {userBooking?.map(({pet,status,_id,startDate,endDate},index)=>(
                   <>
                        <Tr key={index}>
                            <Td>{index+1}</Td>
                            <Td>
                            <Image borderRadius='full' boxSize='180px'
                            src={pet.image}
                            alt='Pets'/>
                            </Td>
                            <Td>{pet.type}</Td>
                            <Td >{pet.weight}</Td>
                            <Td>{startDate}</Td>
                            <Td>{endDate}</Td>
                            <Td> <Button variant='solid' 
                                colorScheme={status?"green":"red"}>
                                {status?"Approved":"Pending"}</Button> 
                            </Td>
                        </Tr>
                        <Tr >
                            <Td></Td>
                            <Td></Td>
                            <Td ></Td>
                            <Td></Td>
                            <Td></Td>
                            <Td></Td>
                        </Tr>
                    </>
                    ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </div>
    </div>
}