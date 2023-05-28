import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';

import loginImg from '../assets/images/login.png';
import userIcon from '../assets/images/user.png';

import { AuthContext } from './../context/AuthContext';
import { BASE_URL } from './../utils/config';

import jwt_decode from "jwt-decode";

const Login = () => {
    window.scrollTo(0, 0)
    const [credentials, setCredentials] = useState({
        email: undefined,
        password: undefined,
    });

    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = e => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async e => {
        e.preventDefault();

        dispatch({ type: 'LOGIN_START' })

        try {
            const res = await fetch(`${BASE_URL}/auth/login`, {
                method: 'post', headers: {
                    'content-type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(credentials),
            });

            const result = await res.json();

            if (!res.ok) alert(result.message);

            dispatch({ type: 'LOGIN_SUCCESS', payload: result.data })

            if (result.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/')
            }

        } catch (err) {
            dispatch({ type: 'LOGIN_FAILURE', payload: err.message })
        }
    };

    async function handleCallbackResponse(response) {

        var userObject = jwt_decode(response.credential);

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

        const res2 = await fetch(`${BASE_URL}/auth/login`, {
            method: 'post', headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(result.data),
        });

        if (!res2.ok) {
            alert(result.message)
            return false;
        }

        dispatch({ type: 'LOGIN_SUCCESS', payload: result.data })

        if (res2.role === 'admin') {
            navigate('/admin');
        } else {
            navigate('/')
        }

    }

    useEffect(() => {

        window.google.accounts.id.initialize({
            client_id: "997467084892-90t5p891fpadl4l52fcvcrqd39pqcgl9.apps.googleusercontent.com",
            callback: handleCallbackResponse
        });

        window.google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: "outline", size: "large" }
        );
    }, []);


    return <section>
        <Container>
            <Row>
                <Col lg='8' className="m-auto">
                    <div className="login__container d-flex justify-content-between">
                        <div className="login__img">
                            <img src={loginImg} alt="" />
                        </div>

                        <div className="login__form">
                            <div className="user">
                                <img src={userIcon} alt="" />
                            </div>
                            <h2>Login</h2>

                            <Form onSubmit={handleClick}>
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
                                    type="submit">Login</Button>
                            </Form>
                            <p>Don't have an account? <Link to='/register'>Create</Link></p>
                            <p>or</p>

                            <div id="signInDiv"></div>

                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
};

export default Login;