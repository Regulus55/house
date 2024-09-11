import React, { useEffect, useState } from "react";
import {Alert, Button, Col, Container, Form, Row, Spinner} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaBackspace } from "react-icons/fa";
import styled from "styled-components";
import {useForm} from "react-hook-form";
import useLoginUser from "../hooks/useLoginUser";


const Login = () => {
    const {
        register, handleSubmit, formState: {errors}
    } = useForm()

  
  // const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const submitHandler = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const userInput = {
  //       email: email,
  //       password: password,
  //     };
  //     console.log(userInput);
  //     const url = "http://localhost:7070/api/auth/login"
  //     const { data, status } = await axios.post(url, userInput);
  //     console.log('+++++++++++++',status)
  //     if (status === 200) {
  //       localStorage.setItem("token", data.token);
  //       navigate("/profile");
  //     }
  //   } catch (err) {
  //     // if (
  //     //   err.response.data.message.includes("Wrong") ||
  //     //   err.response.data.message.includes("User")
  //     // ) {
  //     //   alert("잘못된 아이디 혹은 비밀번호 입니다");
  //     //   console.log("---", err);
  //     // } else {
  //       console.log("로그인 에러", err);
  //     // }
  //   }
  // };

    const {isLoading, mutateAsync, data, error} = useLoginUser()
    // console.log('++++loginPageData',data.token)

    const submitHandler = async (values) => {
        console.log("+++values",values)
        await mutateAsync(values)
       // await localStorage.setItem("token", data.token)
       //  if(localStorage.getItem('token')){
       //       navigate('/profile')
       //  }
    }
  //
  // useEffect(() => {
  //   // if (token !== null) {
  //   //   navigate("/profile");
  //   // }
  // },[]);

const socialLogin =  () => {
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
            <img src={'kakaoicon'}/>
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
              style={{ width: "100%" }}
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
              <Col />
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
                  <Row>
                  <div>SNS계정으로 간편 로그인/회원가입</div>
                  <button onClick={()=>{
                      socialLogin()
                  }}>아이콘</button>
                  </Row>
                  <Row>
                <span>비회원으로 주문 조회하기</span>
                  </Row>
              </Col>
              <Col />
            </Row>
          </Form>
        </Col>
        <Col></Col>
      </Row>

      <Row />
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
