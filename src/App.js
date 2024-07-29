import React from 'react';
import {RouterProvider} from 'react-router-dom';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Container} from "react-bootstrap";

const App = () => {
    const token = localStorage.getItem('token');

    const logout = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
            console.log('config', config)
            const url = 'http://localhost:7070/api/auth/logout'
            // const {data, status} = await axios.post(url, config)
            // if (status === 201) {
            //     alert('logout complete')
            // }
        } catch (e) {
            console.log('로그아웃 에러', e)
        }
    }

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>


                    <Navbar.Brand href="/"> 오늘의 집 </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {token !== null ?
                                (
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
                                )
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <RouterProvider router={router}/>
        </>
    );
};


export default App;