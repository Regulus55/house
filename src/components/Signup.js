import React from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";

const Signup = () => {
    return (
        <Container>
            <Row style={{height: '100px'}}/>

            <Row>
                <Col></Col>
                <Col xs={3}>

                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>이메일</Form.Label>
                            <Form.Control type="email" placeholder="Enter email"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>비밀번호</Form.Label>
                            <div style={{color:'grey'}}>영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.</div>
                            <Form.Control type="password" placeholder="비밀번호"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>비밀번호확인</Form.Label>
                            <Form.Control type="password" placeholder="비밀번호확인"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>닉네임</Form.Label>
                            <div style={{color: 'grey'}}>다른 유저와 겹치지 않도록 입력해주세요. (2~20자).</div>
                            <Form.Control type="password" placeholder="별명 (2~20글자)"/>
                        </Form.Group>

                        <Button variant="primary" type="submit">
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

export default Signup;