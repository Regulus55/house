import React from "react";
import {RouterProvider, useNavigate} from "react-router-dom";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {Container} from "react-bootstrap";
import ReactQueryWrapper from "./Provider";

const App = () => {
    const token = localStorage.getItem("token");

    const logout = async () => {
        try {
            localStorage.removeItem("token");
            alert("로그아웃 되었습니다.");
        } catch (e) {
            console.log("로그아웃 에러", e);
        }
    };

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/"> 우리집 </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {token !== null ? (
                                <>
                                    <Nav.Link href="/profile">프로필</Nav.Link>
                                    <Nav.Link onClick={logout}>로그아웃 </Nav.Link>
                                </>
                            ) : (
                                <>
                                    <Nav.Link href="/login">로그인</Nav.Link>
                                    <Nav.Link href="/signup">회원가입</Nav.Link>
                                    <Nav.Link href="/forgot/password">비밀번호찾기</Nav.Link>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <ReactQueryWrapper>
                <RouterProvider router={router}/>
            </ReactQueryWrapper>
        </>
    );
};

export default App;
