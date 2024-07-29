import React, {useEffect, useState} from 'react';
import {Button, Container, Form, Col, Row} from "react-bootstrap";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import {BackButton, ViewContainer} from "../components";

const ChangePassword = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search)
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== passwordCheck) {
            alert('please ckeck password and confirm your password')
            return
        }
        // console.log(location.search.includes('token'))
        // console.log('++++++++',queryParams.get('token'))
        try {
            const userInput = {
                token: queryParams.get('token'),
                password
            }
            console.log(userInput)
            const url = 'http://localhost:7070/api/auth/change/password'
            const {data, status} = await axios.put(url, userInput)

            if (status === 200) {
                alert('password chance ok')
                navigate('/login')
            }
            console.log(userInput)
        } catch (e) {
            console.log('---------', e)
        }
    }

    return (
        <ViewContainer>

            <Row>
                <Col/>
                <Col className={'mt-5'} xs={6}>
                    <Form onSubmit={submitHandler}>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>새 비밀번호</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="8자 이상의 영문, 숫자, 특수기호 포함"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>비밀번호 확인</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="동일한 비밀번호 입력"
                                value={passwordCheck}
                                onChange={(e) => setPasswordCheck(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            비밀번호 변경
                        </Button>
                    </Form>
                </Col>
                <Col/>
            </Row>
            <Row/>
        </ViewContainer>);
};

export default ChangePassword;