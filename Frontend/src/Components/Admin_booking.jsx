import { useEffect,useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import {getBookings,statusUpdate} from "../Redux/Booking/action"
import {
    Table,Thead,Tbody,
    Button,Tr,Th,Td,
    TableContainer,Image,
  } from '@chakra-ui/react'

export const Booking = () =>{

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getBookings())
    },[])

    const [decision,setDecision] = useState({
        stts:false,
        index:-1
    })
    const {bookings} = useSelector((store)=> store.book)

    return <div>
        <div>
            <TableContainer style={{marginTop:"3%",border:"2px groove brown"}}>
                <Table variant="striped" colorScheme="purple" fontWeight={900} fontSize={20}>
                    <Thead>
                    <Tr>
                        <Th>SL.No</Th>
                        <Th>Image</Th>
                        <Th>Type</Th>
                        <Th >Weight</Th>
                        <Th>Bookie</Th>    
                        <Th>Email</Th>
                        <Th>Phone</Th>	
                        <Th>Status</Th>	
                    </Tr>
                    </Thead>
                        <Tbody>
                    {bookings?.map(({pet,owner,status,_id},index)=>(
                    <>
                        <Tr key={index}>
                            <Td>{index+1}</Td>
                            <Td>
                            <Image borderRadius='full' boxSize='160px'
                            src={pet.image}
                            alt='Pets'/>
                            </Td>
                            <Td>{pet.type}</Td>
                            <Td >{pet.weight}</Td>
                            <Td>{owner.name}</Td>
                            <Td>{owner.email}</Td>
                            <Td>{owner.phone}</Td>
                            <Td> <Button variant='solid' 
                            colorScheme={status?"green":"red"}
                                onClick={()=>{setDecision({...decision,stts:status?false:true,index});
                                    dispatch(statusUpdate(_id,decision.stts,pet._id,owner._id))
                                }}>
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