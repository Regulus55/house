import React from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";

const ForgotPassword = () => {
    return (
        <Container>
            <Row style={{height: '100px'}}/>
            <Row>
                <Col/>
                <Col xs={3}>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label/>
                            <Form.Text className="text-muted" >
                                가입한 이메일 주소를 입력해주세요.
                            </Form.Text>
                            <Form.Control type="email" placeholder="이메일"/>
                            <Button className={'mt-3'} style={{width:'100%'}}>이메일로 인증코드 받기</Button>
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