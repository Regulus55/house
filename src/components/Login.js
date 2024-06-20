import React, {useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {Link} from "react-router-dom";



const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        const userInput = {
            email,
            password
        }
        console.log(userInput)
    }


    return (
        <Container>
            <Row style={{height: '100px'}}/>

            <Row >
                <Col></Col>
                <Col xs={3}>
                    <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}

                        />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                       <Link to={'/forgot/password'}> <Button>비밀번호 찾기</Button></Link>{" "}
                       <Link to={'/signup'}> <Button>회원가입</Button></Link>
                    </Form.Group>
                    <Button variant="primary" type="submit" style={{width:'100%'}}>
                        Submit
                    </Button>
                </Form>
                </Col>
                <Col></Col>
            </Row>

            <Row/>
        </Container>
    );
};

export default Login;