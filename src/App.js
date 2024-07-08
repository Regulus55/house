import React from 'react';
import {RouterProvider} from 'react-router-dom';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Container} from "react-bootstrap";

const App = () => {
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/">오늘의 집</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/login">로그인</Nav.Link>
                            <Nav.Link href="/signup">회원가입</Nav.Link>
                            <Nav.Link href="/forgot/password">비밀번호찾기</Nav.Link>
                            <Nav.Link href="/profile">프로필</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <RouterProvider router={router}/>
        </>
    );
};

export default App;