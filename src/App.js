import React from 'react';
import {RouterProvider} from 'react-router-dom';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Container} from "react-bootstrap";
import {FaBackspace} from "react-icons/fa";
import styled from 'styled-components';

const App = () => {
    const token = localStorage.getItem('token');

    const backButton = () => {
        window.history.go(-1);
    }

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>

                    <BackButton onClick={backButton}
                                // style={{fontSize: '3rem',cursor: 'pointer'}}
                    />
                    <Navbar.Brand href="/"> 오늘의 집 </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {token !== null ?
                                (
                                    <>
                                        <Nav.Link href="/profile">프로필</Nav.Link>
                                        <Nav.Link>로그아웃 </Nav.Link>
                                    </>
                                ) : (
                                    <>
                                        <Nav.Link href="/login">로그인</Nav.Link>
                                        <Nav.Link href="/signup">회원가입</Nav.Link>
                                        <Nav.Link href="/forgot/password">비밀번호찾기</Nav.Link>
                                    </>
                                )
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {/*<FaBackspace className={'m-3'} style={{fontSize: '2rem'}}/>*/}

            <RouterProvider router={router}/>
        </>
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
    }`

export default App;