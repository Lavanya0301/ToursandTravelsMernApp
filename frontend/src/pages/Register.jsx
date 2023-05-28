import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col, Form, FormGroup, Button} from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';

import registerImg from '../assets/images/register.png';
import userIcon from '../assets/images/user.png';
import { AuthContext } from './../context/AuthContext';
import { BASE_URL } from './../utils/config';

import jwt_decode from "jwt-decode";


const Register = () => {
    window.scrollTo(0,0)
    const [credentials, setCredentials] = useState({
        userName:undefined,
        email:undefined,
        password:undefined,
    });

    const {dispatch} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = e => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async e=>{
        e.preventDefault();

        try {
            const res = await fetch(`${BASE_URL}/auth/register`,{ method:'post',headers:{'content-type':'application/json'
                },
                body: JSON.stringify(credentials),
            })
            const result = await res.json()

            if(!res.ok) alert(result.message)

            dispatch({type:'REGISTER_SUCCESS'})
            navigate('/login')

        } catch (err) {
            alert(err.message);
        }
    }; 
    
    async function handleCallbackResponse(response) {
        var userObject = jwt_decode(response.credential);

        try {
            const res = await fetch(`${BASE_URL}/auth/googleregister`, {
                method: 'post', headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(userObject),
            })
            const result = await res.json()

            if (!res.ok) {
                alert(result.message)
                return false;
            } 

            const res2 = await fetch(`${BASE_URL}/auth/login`,{
                method:'post',headers:{'content-type':'application/json'
                },
                body: JSON.stringify(result.data),
            });

            if (!res2.ok) {
                alert(result.message)
                return false;
            }

            dispatch({type:'LOGIN_SUCCESS', payload:result.data})

            if(res2.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/')
            }
        } catch (err) {
            alert(err.message);
        }


    }

    useEffect(()=>{
        
        window.google.accounts.id.initialize({
            client_id: "997467084892-sr6ujvughjahcqsf5scokr72m3elnfn7.apps.googleusercontent.com",
            callback: handleCallbackResponse
        })  ;

        window.google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: "outline", size: "large", buttonText: "Sign up with Google" }
        );
    }, []);
    
    return <section>
        <Container>
            <Row>
                <Col lg='8' className="m-auto">
                    <div className="login__container d-flex justify-content-between">
                        <div className="login__img">
                            <img src={registerImg} alt="" />
                        </div>

                        <div className="login__form">
                            <div className="user">
                                <img src={userIcon} alt="" />
                            </div>
                            <h2>Register</h2>

                            <Form onSubmit={handleClick}>
                                <FormGroup>
                                    <input 
                                      type="text" 
                                      placeholder="Username" 
                                      required 
                                      id="username"
                                      onChange={handleChange} 
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <input 
                                      type="email" 
                                      placeholder="Email" 
                                      required 
                                      id="email"
                                      onChange={handleChange} 
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <input 
                                      type="password" 
                                      placeholder="Password" 
                                      required 
                                      id="password"
                                      onChange={handleChange} 
                                    />
                                </FormGroup>
                                <Button className="btn secondary__btn auth__btn" 
                                type="submit">Create Account</Button>
                            </Form>
                            <p>or</p>
                            <div id="signInDiv"></div>
                            <p>
                               Already have an account? <Link to='/login'>Login</Link>
                            </p>
                            
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
};

export default Register;