import React,{useEffect} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Table,Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {usersList} from '../actions/userActions'

const UserListScreen = () => {

    const dispatch = useDispatch()
    const userList = useSelector(state => state.userList)
    const {loading, users, error} = userList

    useEffect(() => {
        dispatch(usersList())
    }, [dispatch])
        
    const deleteUserHandler = (id)=>{
        console.log('delete:', id)
    }

    return (
        <>
            <h1>User List</h1>
            {loading?<Loader/> 
            :error?<Message variant='danger'>{error}</Message>
            :(<Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Admin</th>
                        <th>Operation</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user=>(
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.isAdmin ? (<i className='fas fa-check' style={{color:'green'}}></i>) : 
                            (<i className='fas fa-times' style={{color:'red'}}></i>)}</td>
                            <td>
                                <LinkContainer to={`/user/${user._id}/edit`}>
                                    <Button variant='light' className='btn-sm'>
                                        <i className='fas fa-edit'></i>
                                    </Button>
                                </LinkContainer>
                                <Button variant='danger' className='btn-sm' onClick={()=>deleteUserHandler(user._id)}>
                                        <i className='fas fa-trash'></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                </Table>)}
        </>
    )
}

export default UserListScreen
