import React, {useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import axios from "axios";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [forgotPassword, setForgotPassword] = useState('');
    const [emailCheckEnable, setEmailCheckEnable] = useState(false)

    const sendEmailHandler = async (e) => {
        try {
            const userInput = {
                email
            }
            const url = 'http://localhost:7070/api/auth/email/send'
            const {data, status} = await axios.post(url, userInput)
            if (status === 201) {
                alert('email send successfully')
            }
            setEmailCheckEnable(true)
            console.log(userInput)
        } catch (err) {
            console.log('-------', err)
        }
    }

    const checkEmailHandler = async (e) => {
        try {
            const userInput = {
                email,
                code
            }
            const url = 'http://localhost:7070/api/auth/email/check'
            const {data, status} = await axios.post(url, userInput)
            if (status === 201) {
                alert('email check ok')
                setEmailCheckEnable(false)
            }
        } catch (err) {
            console.log('-------', err)
        }
    }

    const submitHandler = async (e) => {
        try {
            const userInput = {
                password: forgotPassword,
            }
            const url = 'http://localhost:7070/api/auth/email/check'
            const {data, status} = await axios.post(url, userInput)
            console.log(userInput)
            if (status === 200) {
                alert('password forgot?')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Container>
            <Row style={{height: '100px'}}/>
            <Row>
                <Col/>
                <Col xs={6}>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label/>
                            <Form.Text className="text-muted">
                                가입한 이메일 주소를 입력해주세요.
                            </Form.Text>
                            <Form.Control
                                type="email"
                                placeholder="이메일"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}/>
                            <Button
                                className={'mt-3'}
                                style={{width: '100%'}}
                                onClick={sendEmailHandler}
                            >이메일 발송</Button>
                        </Form.Group>

                        {emailCheckEnable ? (
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    placeholder="코드"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}/>

                                <Button
                                    className={'mt-3'}
                                    style={{width: '100%'}}
                                    onClick={checkEmailHandler}
                                >코드 인증하기</Button>
                            </Form.Group>

                        ) : null}


                    </Form>
                </Col>
                <Col/>
            </Row>
            <Row/>
        </Container>
    );
};

export default ForgotPassword;