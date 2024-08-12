import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaBackspace } from "react-icons/fa";
import styled from "styled-components";

const Login = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const userInput = {
        email: email,
        password: password,
      };
      console.log(userInput);
      const url = "http://localhost:7070/api/auth/login";
      const { data, status } = await axios.post(url, userInput);
      if (status === 200) {
        localStorage.setItem("token", data.token);
        navigate("/profile");
      }
    } catch (err) {
      // if (
      //   err.response.data.message.includes("Wrong") ||
      //   err.response.data.message.includes("User")
      // ) {
      //   alert("잘못된 아이디 혹은 비밀번호 입니다");
      //   console.log("---", err);
      // } else {
        console.log("로그인 에러", err);
      // }
    }
  };

  useEffect(() => {
    if (token !== null) {
      navigate("/profile");
    }
  });

  return (
    <Container>
      <Row className={"mt-5"}>
        <Col></Col>
        <Col xs={6}>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label></Form.Label>
              <Form.Control
                type="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label></Form.Label>
              <Form.Control
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                <span>비회원으로 주문 조회하기</span>
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
