import {
    Table,Thead,Tbody,
    Button,Tr,Th,Td,
    TableContainer,Select,
  } from '@chakra-ui/react'
import { useEffect, useState,useRef} from 'react'
import {allBoardslist, boardDetails,AllBoards, getCities} from "../Redux/Board/actions"
import {useSelector,useDispatch} from "react-redux"
import { Link, Navigate } from 'react-router-dom'

export const Home = () =>{

    const {boards} = useSelector((store)=>store.site)
    const {cities} = useSelector((store)=>store.site)
    
    const{count,site} = boards;

    const dispatch = useDispatch()
    
    const [page,setPage] = useState(1)
    const [city,setCity] =  useState(0)
    const [cost,setCost] =  useState("asc")
    const [rating,setRating] =  useState("asc")
    const [verified,setVerified] =  useState(true)

    useEffect(()=>{

        dispatch(allBoardslist(cost,rating,verified))
    },[cost,rating,verified])

    useEffect(()=>{
        dispatch(AllBoards(city,page))
    },[city,page])

    useEffect(()=>{
        dispatch(getCities())
    },[])

    return <div>
        <div className="buttonsGroups">
            <Button style={{width:120}}  variant="solid" colorScheme="yellow"
            onClick={()=>{dispatch(AllBoards())}}>ALL</Button>
            
            <Button style={{width:120}}  variant="solid" colorScheme={cost=="asc"?"green":"red"}
            onClick={()=>{setCost(cost=="asc"?"desc":"asc")}}>Cost Per Day</Button>
            
            <Button style={{width:120}}  variant="solid" colorScheme={rating=="asc"?"green":"red"}
            onClick={()=>{setRating(rating=="asc"?"desc":"asc")}}>Rating</Button>
            
            <Button style={{width:120}}  variant="solid" colorScheme="pink"
            onClick={()=>{setVerified(verified==true? false:true )}}>{verified?"True":"False"}</Button>
            
            <div>
                <Select placeholder='Select City'size="md" style={{width:175,border:"2px solid teal"}}
                onChange={(e)=>{setCity(e.target.value)}}>
                    {cities?.map((city,index)=>(
                    <option key={index} value={city}>{city}</option> ))}
                </Select>
            </div>

        </div>
        <TableContainer style={{marginTop:"3%",border:"2px groove brown"}}>
            <Table variant="striped" colorScheme='orange'>
                <Thead>
                <Tr>
                    <Th>Id</Th>
                    <Th>Name</Th>
                    <Th >City</Th>
                    <Th>Address</Th>
                    <Th>Capacity</Th>
                    <Th>Cost per day</Th>
                    <Th>Verified</Th>
                    <Th>Rating</Th>	
                    <Th>Details</Th>			
                </Tr>
                </Thead>
                <Tbody>
              {site?.map((el,index)=>(
                <Tr key={index}>
                    <Td>{index+1}</Td>
                    <Td>{el.name}</Td>
                    <Td >{el.city}</Td>
                    <Td>{el.address}</Td>
                    <Td>{el.capacity}</Td>
                    <Td >{el.costPerDay}</Td>
                    <Td>{el.verified?"True":"False"}</Td>
                    <Td>{el.rating}</Td>
                    <Td> <Button colorScheme='orange' variant='solid' 
                        onClick={()=>{dispatch(boardDetails(el._id))}}>
                        <Link to={`/listing/${el._id}`}>Details</Link> 
                        </Button> 
                    </Td>
                </Tr>
              ))}
                </Tbody>
            </Table>
        </TableContainer>
        <div className='footer'>
            <Button disabled={page==1} width="120px" variant='solid'
             colorScheme={page===1?"red":"blue"} 
            onClick={()=>{setPage(page-1)}}>Prev</Button> 
            <b>Total:{count}</b>
            <Button width="120px" variant='solid' colorScheme="green" 
            onClick={()=>{setPage(page+1)}}>Next</Button> 
        </div>
    </div>
}