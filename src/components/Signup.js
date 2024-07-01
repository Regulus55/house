import React, {useState} from 'react';
import {Button, Col, Container, Dropdown, Form, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

const Signup = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordcheck, setPasswordcheck] = useState('');
    const [phonenumber, setPhonenumber] = useState('')
    const [check1, setCheck1] = useState(false)
    const [check2, setCheck2] = useState(false)
    const [check3, setCheck3] = useState(false)
    const [check4, setCheck4] = useState(false)
    const [check5, setCheck5] = useState(false)
    const [emailDisable, setEmailDisable] = useState(false)
    const [submitDisable, setSubmitDisable] = useState(false)
// 이 항목들은 스웨거 api 의 리퀘스트 바디에있는 항목들을 참고해서 만듦

    const sendEmailHandler = async (e) => {
        // ^^이메일 보내는 핸들러,  url이랑 userInput (email) 보낸다,   if 맞으면 메일 확인하라고 알람 보낸다
        try {
            const url = 'http://localhost:7070/api/auth/email/send'
            const userInput = {
                email: email
            }
            const {data, status} = await axios.post(url, userInput)
            if (status === 201) {
                alert('please check your email')
            }
        } catch (err) {
            console.log('---', err)
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            if (password !== passwordcheck) {
                alert("please ckeck password and confirm your password")
                return
                // 패스워드 체크했을때 일치않으면 alert 으로 알리고 return 으로 빠져나온다
            }
            if (email) {
                setEmailDisable(true)
            }
            const userInput = {
                userName: username,
                nickName: nickname,
                email: email,
                password: password,
                phone: phonenumber,
                consent: {
                    overTwenty: check1,
                    agreeOfTerm: check2,
                    agreeOfPersonalInfo: check3,
                    agreeOfMarketing: check4,
                    etc: check5
                }
                // ^ 스웨거api 의 폼 항목대로 userInput 을 만들었다
            }
            const url = 'http://localhost:7070/api/auth/signup'
            const {data, status} = await axios.post(url, userInput)
            // ^axios.post 로 url 과 userInput 을 보낸다, 그리고 밑에 if 항목으로 검사한다
            if (status === 201) {
                navigate('/login')
                // if 회원가입 성공시 (201) navigate 이용해서 로그인 페이지로 넘어감
            }
        } catch (err) {
            console.log('---', err)
        }


    }


    // const DropEmail = () => {
    //     return (<Dropdown>
    //         <Dropdown.Toggle variant="success" id="dropdown-basic" style={{backgroundColor: 'grey'}}>
    //             선택해주세요
    //         </Dropdown.Toggle>
    //
    //         <Dropdown.Menu>
    //             <Dropdown.Item href="#/action-1">naver.com</Dropdown.Item>
    //             <Dropdown.Item href="#/action-2">hanmail.net</Dropdown.Item>
    //             <Dropdown.Item href="#/action-3">Daum.net</Dropdown.Item>
    //         </Dropdown.Menu>
    //     </Dropdown>)
    // }


    return (
        <Container>
            <Row style={{height: '100px'}}/>

            <Row>
                <Col/>
                <Col xs={4}>
                    <Form onSubmit={submitHandler}>
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label>유저이름</Form.Label>
                            <div style={{display: 'flex', flexDirection: 'row'}}>
                                <Form.Control type="text"
                                              placeholder="유저이름"
                                              value={username}
                                              onChange={(e) => {
                                                  setUsername(e.target.value)
                                              }}
                                />
                                {/*<span style={{color: 'grey', margin: 'auto'}}>@</span><DropEmail/>*/}
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>닉네임</Form.Label>
                            <div style={{color: 'grey', fontSize: '13px'}}>다른 유저와 겹치지 않도록 입력해주세요. (2~20자).</div>
                            <Form.Control type="text"
                                          placeholder="별명 (2~20글자)"
                                          value={nickname}
                                          onChange={(e) => setNickname(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>이메일</Form.Label>
                            <div style={{display: 'flex', flexDirection: 'row'}}>
                                <Form.Control type="email"
                                              placeholder="이메일"
                                              value={email}
                                              onChange={(e) => {
                                                  setEmail(e.target.value)
                                              }}
                                />
                                {/*<span style={{color: 'grey', margin: 'auto'}}>@</span><DropEmail/>*/}
                            </div>
                            <Button
                                className={'mt-3'}
                                disabled={emailDisable}
                                onClick={sendEmailHandler}
                            >
                                이메일 인증하기
                            </Button>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>비밀번호</Form.Label>
                            <div style={{color: 'grey', fontSize: '13px'}}>영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.</div>
                            <Form.Control type="password"
                                          placeholder="비밀번호"
                                          value={password}
                                          onChange={(e) => setPassword(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>비밀번호확인</Form.Label>
                            <Form.Control type="password"
                                          placeholder="비밀번호확인"
                                          value={passwordcheck}
                                          onChange={(e) => setPasswordcheck(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>전화번호</Form.Label>
                            <Form.Control type="text"
                                          placeholder="전화번호"
                                          value={phonenumber}
                                          onChange={(e) => setPhonenumber(e.target.value)}/>
                        </Form.Group>

                        <Form.Label>약관동의</Form.Label>
                        <div style={{border: '1px solid #c3cacd', padding: '0 15px', marginBottom: '30px'}}>
                            {['checkbox'].map((type) => (
                                <div key={`default-${type}`} className="mb-3">

                                    <Form.Check style={{marginBottom: '5px'}}
                                                type={type}
                                                id={'나이약관'}
                                                label={'14세 이상입니다(필수)'}
                                                value={check1}
                                                onChange={(e) => setCheck1(true)}
                                    />
                                    <Form.Check style={{marginBottom: '5px'}}
                                                type={type}
                                                id={'이용약관'}
                                                label={'이용약관(필수)'}
                                                value={check2}
                                                onChange={(e) => setCheck2(true)}
                                    />

                                    <Form.Check style={{marginBottom: '5px'}}
                                                type={type}
                                                id={'개인정보'}
                                                label={'개인정보수집 및 이용동의(필수)'}
                                                value={check3}
                                                onChange={(e) => setCheck3(true)}
                                    />
                                    <Form.Check style={{marginBottom: '5px'}}
                                                type={type}
                                                id={'마케팅'}
                                                label={'개인정보 마케팅 활용 동의(선택)'}
                                                value={check4}
                                                onChange={(e) => setCheck4(true)}
                                    />

                                    <Form.Check style={{marginBottom: '5px'}}
                                                type={type}
                                                id={'이벤트'}
                                                label={'이벤트, 쿠폰, 특가 알림 메일 및 SMS 등 수신(선택)'}
                                                value={check5}
                                                onChange={(e) => setCheck5(true)}
                                    />


                                </div>
                            ))}</div>

                        <Button type="submit" disabled={submitDisable}>
                            회원가입하기
                        </Button>

                        <div style={{display: 'flex', justifyContent: 'center'}}>이미 아이디가 있으신가요?
                            <Link to={'/login'}
                                  style={{color: 'black', marginLeft: '30px', marginBottom: '70px'}}>로그인</Link>
                        </div>
                    </Form>
                </Col>
                <Col/>
            </Row>

            <Row/>
        </Container>
    );
};

export default Signup;