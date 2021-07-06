import React, { Fragment, useContext, useState } from 'react'
import { Button, Row, Col, Form, FormGroup, Label, Input, CardImg } from 'reactstrap';
// import {  } from 'react';


import axios from 'axios'
import { AuthContext } from '../App'
import { Container } from 'reactstrap'
const qs = require('querystring')

const api = 'http://localhost:8080/api'

export default function LoginComponent() {
    const { dispatch } = useContext(AuthContext)

    const initialState = {
        isSubmitting: false,
        errorMessage: null,
        
    }

    const [data, setData] = useState(initialState)

    const handleInputChange = event => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        })

    }


    const handleFormSubmit = event => {
        event.preventDefault()
        setData({
            ...data,
            isSubmitting: true,
            errorMessage: null
        })


        const requestBody = {
            username: data.username,
            password: data.password

        }

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        axios.post(api + '/login', qs.stringify(requestBody), config)
            .then(res => {
                if (res.data.success === true) {
                    dispatch({
                        type: "LOGIN",
                        payload: res.data
                    })
                }
                else {
                    setData({
                        ...data,
                        isSubmitting: false,
                        errorMessage: res.data.message
                    })
                }

                throw res
            })
    }
    return (

            <Fragment>
                <Container>

                    <br />
                    <Row>
                        <Col>
                        <CardImg width="50%" src="https://mk0mitraissited2cion.kinstacdn.com/wp-content/uploads/2019/09/website.jpg"/>
                        </Col>
                        <Col>
                        <h1>Login Form</h1>
                        <hr/>
                            <Form onSubmit={handleFormSubmit}>
                                <FormGroup>
                                    <Label for="exampleusername">Username</Label>
                                    <Input 
                                        type="text"
                                        name="username" 
                                        id="exampleusername" 
                                        placeholder="with a placeholder" 
                                        value={data.username} 
                                        onChange={handleInputChange}/>
                                </FormGroup>
                                <br/>
                                <FormGroup>
                                    <Label for="examplePassword">Password</Label>
                                    <Input 
                                        type="password"
                                        name="password" 
                                        id="examplePassword" 
                                        placeholder="password placeholder"
                                        value={data.password} 
                                        onChange={handleInputChange} />
                                </FormGroup>

                                <FormGroup>
                                    {data.errorMessage && (
                                        <div className="alert alert-danger" role="alert">
                                            {data.errorMessage}
                                        </div>
                                    )}
                                </FormGroup>
                                <FormGroup>
                                    <Button disabled={data.isSubmitting}>
                                        {data.isSubmitting ? (
                                            "..Loading"
                                        ) :
                                            (
                                                "Login"
                                            )
                                        }
                                    </Button>
                                </FormGroup>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </Fragment>

    )
}
