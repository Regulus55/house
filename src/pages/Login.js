import React, {useEffect, useState} from "react";
import {Alert, Button, Col, Container, Form, Row, Spinner} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {FaBackspace} from "react-icons/fa";
import styled from "styled-components";
import {useForm} from "react-hook-form";
import useLoginUser from "../hooks/useLoginUser";
import kakaoicon from '../kakaoicon.png'
import googleicon from '../googleicon.png'
import navericon from '../navericon.png'

const Login = () => {
    const {
        register, handleSubmit, formState: {errors}
    } = useForm()

    const {isLoading, mutateAsync, data, error} = useLoginUser()

    const submitHandler = async (values) => {
        console.log("+++values", values)
        await mutateAsync(values)
    }

    const socialInfos = [
        {
            title: 'google',
            img: googleicon,
            func: () => console.log('google')
        },
        {
            title: 'kakao',
            img: kakaoicon,
            func: () => console.log('kakao')
        },
        {
            title: 'naver',
            img: navericon,
            func: () => console.log('naver')
        }
    ]

    const socialLogin = () => {
        window.location.href = 'http://localhost:7070/api/auth/google'
    }


    return (
        <Container>
            <Row className={"mt-5"}>
                {isLoading && (
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                )}
                {error && (
                    <Alert variant={'danger'}>
                        {error}
                    </Alert>
                )}
                <Col></Col>
                <Col xs={6}>
                    <Form onSubmit={handleSubmit(submitHandler)}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label></Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="이메일"
                                // value={email}
                                // onChange={(e) => setEmail(e.target.value)}
                                {...register('email')}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label></Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="비밀번호"
                                // value={password}
                                // onChange={(e) => setPassword(e.target.value)}
                                {...register('password')}
                            />
                        </Form.Group>
                        <Button
                            className="mb-3"
                            variant="primary"
                            type="submit"
                            style={{width: "100%"}}
                        >
                            로그인
                        </Button>

                        <Form.Group className="mb-3">
                            <Link to={"/forgot/password"}>
                                <Button
                                    style={{
                                        width: "49%",
                                        color: "black",
                                        background: "white",
                                        border: "none",
                                        fontSize: "0.9rem",
                                    }}
                                >
                                    비밀번호 찾기
                                </Button>
                            </Link>{" "}
                            <Link to={"/signup"}>
                                {" "}
                                <Button
                                    style={{
                                        width: "49%",
                                        color: "black",
                                        background: "white",
                                        border: "none",
                                        fontSize: "0.9rem",
                                    }}
                                >
                                    회원가입
                                </Button>
                            </Link>
                        </Form.Group>

                        <Row>
                            <Col/>
                            <Col
                                xs={3}
                                style={{
                                    width: "100%",
                                    paddingTop: "50px",
                                    borderTop: "1px solid black",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                            </Col>
                            <Col/>
                        </Row>
                    </Form>

                    {/*소셜로그인*/}
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: "center"}}>
                        <div className='mb-3' style={{fontSize: '0.8rem'}}>SNS계정으로 간편 로그인/회원가입</div>
                        <div className='mb-4'>
                            {socialInfos?.map((social) => (
                                <button onClick={social.func} style={{border: 'none', background: "white"}}>
                                    <img
                                        src={social.img}
                                        style={{width: "50px", height: "50px", margin: '0 0.6rem 0 0.6rem'}}
                                        alt={social.title}
                                    />
                                </button>
                            ))}
                        </div>

                        {/*비회원주문*/}
                        <div>비회원으로 주문 조회하기</div>
                    </div>
                </Col>
                <Col/>
            </Row>

            <Row/>
        </Container>
    );
};

const BackButton = styled(FaBackspace)`
    background-color: white;
    cursor: pointer;
    transition: background-color 0.1s ease, transform 0.1s ease;
    font-size: 3rem;
    margin-right: 1rem;

    &:active {
        transform: scale(0.9);
    }
`;

export default Login;
