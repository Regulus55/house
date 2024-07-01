import React, {useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import axios from "axios";

const ForgotPassword = () => {
    const [forgotPassword, setForgotPassword] = useState('');

    const submitHandler = async (e) => {
        try{
            const userInput = {
                password: forgotPassword,
            }
            const url = 'http://localhost:7070/api/auth/email/check'
            const {data, status} = await axios.post(url, userInput)
            console.log(userInput)
            if(status ===200){
                alert('password forgot?')
            }
        }catch(error){
            console.log(error)
        }
    }

    return (
        <Container>
            <Row style={{height: '100px'}}/>
            <Row>
                <Col/>
                <Col xs={3}>
                    <Form >
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label/>
                            <Form.Text className="text-muted">
                                가입한 이메일 주소를 입력해주세요.
                            </Form.Text>
                            <Form.Control
                                type="email"
                                placeholder="이메일"
                                value={forgotPassword}
                                onChange={(e) => setForgotPassword(e.target.value)}/>
                            <Button className={'mt-3'} style={{width: '100%'}}>패스워드 찾기</Button>
                        </Form.Group>
                    </Form>
                </Col>
                <Col/>
            </Row>
            <Row/>
        </Container>
    );
};

export default ForgotPassword;