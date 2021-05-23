import React, { useState, useEffect,useRef } from 'react'
import { Form, Button, Row } from 'react-bootstrap'
import axios from 'axios'
import {Link} from 'react-router-dom'
const Register = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        const fetchUsers = async () => {
            const { data } = await axios.get('/users')
            var users = [];
            for (var i = 0; i < data.length; i++) {
                var user = data[i].email
                users.push(user)
            }
            setUsers(users)
        }
        fetchUsers()
    }, [])

    const [email, setEmail] = useState([])
    const handleEmail = (event) => {
        var email = event.currentTarget.value
        setEmail(email)
    }

    const [password1, setPassword1] = useState([])
    const handlePassword1 = (event) => {
        var password = event.currentTarget.value
        setPassword1(password)
    }

    const [password2, setPassword2] = useState([])
    const handlePassword2 = (event) => {
        var password = event.currentTarget.value
        setPassword2(password)
    }
    const inputEmail = useRef(null);
    const inputPwd1 = useRef(null);
    const inputPwd2 = useRef(null);

    const [success, setSuccess] = useState('')
    const handleSubmit = (event) => {
        event.preventDefault()
        if(inputEmail.current.innerText === inputPwd1.current.innerText & inputPwd1.current.innerText === inputPwd2.current.innerText & inputPwd2.current.innerText === 'Good!'){
            setSuccess('good')
        }else{
            setSuccess('invalid')
        }
    
    }

    return (
        <Row className="justify-content-md-center">
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>

                    <Form.Control type="email" placeholder="Enter email" name='email' onChange={handleEmail} />
                    <Form.Text ref={inputEmail} style={{color:'red'}}>
                        {email.length === 0 
                        ? '' 
                        : !/^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/.test(email)
                        ? 'Does not conform to the mailbox format.' 
                        :users.includes(email)  
                        ? 'This email has already been registered.' 
                        : 'Good!'}
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword1"> 
                    <Form.Label>Password</Form.Label>
                    <Form.Text className="text-muted">
                    At least uppercase letters, lowercase letters, numbers, and more than 8 digits
                    </Form.Text>
                    <Form.Control type="password" placeholder="Password" name='password1' onChange={handlePassword1}/>
                    <Form.Text ref={inputPwd1} style={{color:'red'}}>
                        {password1.length === 0 
                        ? '' 
                        : !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/.test(password1)
                        ? 'Invalid.' 
                        : 'Good!'}
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword2">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm" name='password2' onChange={handlePassword2} />
                    <Form.Text ref={inputPwd2} style={{color:'red'}}>
                        {password2.length === 0 
                        ? '' 
                        : password2 === password1
                        ? 'Good!' 
                        : 'Not same'}
                    </Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit" onClick={handleSubmit}  className='btn-block'>
                    Register
                </Button>
                <br />  
                {
                success === ''
                ? ''    
                :success === 'good'
                ? <Link to={{pathname:'/login', state:{email,password1}}}>Successful, click to login</Link>
                : 'Invalid, try again.'
            }
            </Form>
            
        </Row>
    )
}

export default Register
