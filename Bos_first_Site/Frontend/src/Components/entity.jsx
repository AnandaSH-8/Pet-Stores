import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams,Link,useNavigate } from "react-router-dom"
import { boardDetails,deleteBoard} from "../Redux/Board/actions"
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Button
  } from '@chakra-ui/react'

const tablestyles = {
    margin:"auto",
    width:"88%",
    marginTop:"2%",
    fontSize:20,
    border:"2px groove brown",
    borderRadius:20

}

export const Entity = ({userType}) =>{

    const {id} = useParams()
    const {board} = useSelector((store)=> store.site)
    const navigate = useNavigate()

    const dispatch = useDispatch()

    useEffect(()=>{
       
        dispatch(boardDetails(id))
    },[])

    if(board == false)
    {
        return <div></div>
    }

    const {summary,pets,types,size,supervision, place, 
        sleep, breaks, walks, stay,areaSize,emergency} = board?.details

    return <div>
        <div className="heading">
            <h1>{board.name} Pet Serices</h1>
            <h3>{board.address}, {board.city}</h3>
            <h4>{board.rating}⭐</h4>
        </div>

            <Button style={{marginLeft:"8%",marginTop:"1%"}} colorScheme={"orange"}>
                <Link to={`/pets/${id}`}>See Pets</Link>
            </Button>
            
        {userType == "admin"?
            <div style={{display:"flex",justifyContent:"right"}}>
                <Button style={{marginRight:"5vw",width:"100px"}} colorScheme="twitter">
                <Link to={`/board/edit/${id}`}>Edit</Link>
                </Button>
                <Button style={{marginRight:"10vw",width:"100px"}} colorScheme="red"
               onClick={()=>{ 
                    navigate(`/listing/${id}`)
                    dispatch(deleteBoard(id))}} >Delete</Button>
            </div> :""
        }   

      <TableContainer style={tablestyles}>
        <Table variant="striped" colorScheme='orange' size="lg">
            <Thead>
                <Tr>
                    <Th>Queries</Th>
                    <Th>Details</Th>			
                </Tr>
            </Thead>
            <Tbody>
            <Tr>
                <Td>Summary</Td>
                <Td>{summary}</Td>
            </Tr>
            <Tr>
                <Td>Number of pets that will be watched at one time.</Td>
                <Td>{pets}</Td>
            </Tr>
            <Tr>
                <Td>Accepted Pet Types</Td>
                <Td>{types.join(" , ")}</Td>
            </Tr>
            <Tr>
                <Td>Accepted Pet size</Td>
                <Td>{size}</Td>
            </Tr>
            <Tr>
                <Td>Level of adult supervision.</Td>
                <Td>{supervision}</Td>
            </Tr>
            <Tr>
                <Td>The place your pet will be if they are left unsupervised at home.</Td>
                <Td>{place}</Td>
            </Tr>
            <Tr>
                <Td>The place your pet will sleep at night.</Td>
                <Td>{sleep}</Td>
            </Tr>
            <Tr>
                <Td>The number of potty breaks provided per day.</Td>
                <Td>{breaks}</Td>
            </Tr>
            <Tr>
                <Td>The number of walks provided per day.</Td>
                <Td>{walks}</Td>
            </Tr>
            <Tr>
                <Td>The type of home I stay in.</Td>
                <Td>{stay}</Td>
            </Tr>
            <Tr>
                <Td>My outdoor area size.</Td>
                <Td>{areaSize}</Td>
            </Tr>
            <Tr>
                <Td>Emergency transport.</Td>
                <Td>{emergency}</Td>
            </Tr>
            </Tbody>
        </Table>
    </TableContainer>
</div>
}