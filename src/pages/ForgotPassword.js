import React, {useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {BackButton, ViewContainer} from "../components";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    const sendEmailHandler = async (e) => {
        try {
            const url = 'http://localhost:7070/api/auth/find/password'
            const {status} = await axios.post(url, {email})
            if (status === 201) {
                alert('email send successfully')

                navigate('/login')
            }
        } catch (err) {
            console.log('-------', err)
        }
    }

    return (
        <ViewContainer>
            <Row className={'mt-4'}>
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

                    </Form>
                </Col>
                <Col/>
            </Row>
            <Row/>
        </ViewContainer>
    );
};

export default ForgotPassword;