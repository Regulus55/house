import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import {Container} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import {useNavigate} from "react-router-dom";

const Navbars = () => {
    const token = localStorage.getItem("token");
    // const navigate = useNavigate()

    const logout = async () => {
        try {
            localStorage.removeItem("token");
            alert("로그아웃 되었습니다.");
            // navigate('/login')
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
        </>
    );
};

export default Navbars;