import React, {useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitHandler = async (e) => {
        e.preventDefault()

        try {
            const userInput = {
                email: email,
                password: password
            }
            console.log(userInput)
            const url = 'http://localhost:7070/api/auth/login'
            const {data, status} = await axios.post(url, userInput)
            if(status ===200){
                navigate('/profile')
            }
        } catch (err) {
            console.log('---', err)
        }
    }


    return (
        <Container>
            <Row style={{height: '100px'}}/>

            <Row>
                <Col></Col>
                <Col xs={3}>
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label></Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label></Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button className="mb-3" variant="primary" type="submit" style={{width: '100%'}}>
                            로그인
                        </Button>
                        <Form.Group className="mb-3">
                            <Link to={'/forgot/password'}> <Button
                                style={{color: "black", background: "white", border: 'none'}}>비밀번호
                                찾기</Button></Link>{" "}
                            <Link to={'/signup'}> <Button style={{
                                width: '49%',
                                color: "black",
                                background: "white",
                                border: 'none'
                            }}>회원가입</Button></Link>
                        </Form.Group>

                        <Row>
                            <Col/>
                            <Col xs={3} style={{
                                width: '100%',
                                paddingTop: '50px',
                                borderTop: '1px solid black',
                                display: 'flex',
                                justifyContent: 'center'
                            }}>
                                비회원으로 주문 조회하기
                            </Col>
                            <Col/>
                        </Row>

                    </Form>
                </Col>
                <Col></Col>
            </Row>

            <Row/>
        </Container>
    );
};

export default Login;