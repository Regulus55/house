import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Card, Col, Container, Row, Form, Dropdown} from "react-bootstrap";
import {Link} from "react-router-dom";

const CreateProfile = () => {
    const [profileInfo, setProfileInfo] = useState({})
    const [country, setCountry] = useState('')
    const [bornArea, setBornArea] = useState('')
    const [addressOfHome, setAddressOfHome] = useState('')
    const [birth, setBirth] = useState('')
    const [age, setAge] = useState(0)
    const [gender, setGender] = useState('')
    const [height, setHeight] = useState(0)
    const [bodyType, setBodyType] = useState(0)
    const [drinking, setDrinking] = useState('')
    const [bloodType, setBloodType] = useState('')
    const [mbtiType, setMBtiType] = useState('')
    const [selfIntroduce, setSelfIntroduce] = useState('')


    // const getProfileInfo = async () => {
    //     try {
    //         const token = localStorage.getItem('token');
    //         const config = {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             }
    //         }
    //         const result = await axios.get('http://localhost:7070/api/auth', config)
    //         console.log('+++++++++++++++++++++', result.data.body.profile)
    //         setProfileInfo(result.data.body.profile)
    //     } catch (err) {
    //         console.log('--------', err)
    //     }
    // }

    const submitHandler = async (e) => {
        try {
            const userInput = {
                country,
                bornArea,
                addressOfHome,
                birth,
                age,
                gender,
                height,
                bodyType,
                drinking,
                bloodType,
                mbtiType,
                selfIntroduce,
            }
            // const token = localStorage.getItem('token');
            // const config = {
            //     headers: {
            //         Authorization: `Bearer ${token}`,
            //     }
            // }
            // const url = 'http://localhost:7070/api/profile'
            // const {data, status} = await axios.post(url, userInput, config)
            // if (status === 201) {
            //     alert('create ok')
            // }
            console.log('ddddddd', userInput)
        } catch (err) {
            console.log('--------------', err)
        }
    }

    useEffect(() => {
        // getProfileInfo()
    }, [])

    return (
        <Container>
            <Row/>
            <Row>
                <Col/>
                <Col className={'mt-5'}>
                    <Card style={{width: '25rem', border: '1px solid #ccc'}} class>
                        <Card.Body>
                            <Card.Title className={'mb-3'}>*개인정보 생성*</Card.Title>
                            <Card.Text style={{lineHeight: '2rem'}}>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label>국적</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="국적을 선택하세요"
                                            value={country}
                                            onChange={(e) => setCountry(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>태어난 곳</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="태어난 곳을 입력하세요"
                                            value={bornArea}
                                            onChange={(e) => setBornArea(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>현재 주소</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="서울"
                                            value={addressOfHome}
                                            onChange={(e) => setAddressOfHome(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>생일</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="1999-05-05"
                                            value={birth}
                                            onChange={(e) => setBirth(e.target.value)}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>나이</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="26"
                                            value={parseInt(age)}
                                            onChange={(e) => setAge(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>성별</Form.Label>
                                        <Form.Select value={gender} onChange={(e) => setGender(e.target.value)}>
                                            <option>
                                                성별을 선택하세요
                                            </option>
                                            <option value={'1'}>남자</option>
                                            <option value={'2'}>여자</option>
                                            <option value={'3'}>중성</option>
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>키</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="180"
                                            value={height}
                                            onChange={(e) => setHeight(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>체형</Form.Label>
                                        <Form.Select value={bodyType} onChange={(e) => setBodyType(e.target.value)}>
                                            <option>
                                                체형을 선택하세요
                                            </option>
                                            <option value={'0'}>마름</option>
                                            <option value={'1'}>슬림</option>
                                            <option value={'2'}>보통</option>
                                            <option value={'3'}>볼륨</option>
                                            <option value={'4'}>근육</option>
                                            <option value={'5'}>통통</option>
                                        </Form.Select>

                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>음주</Form.Label>
                                        <Form.Select value={drinking} onChange={(e) => setDrinking(e.target.value)}>
                                            <option>
                                                음주정도를 선택하세요
                                            </option>
                                            <option value={'1'}>아예 안마심</option>
                                            <option value={'2'}>가끔 한두잔</option>
                                            <option value={'3'}>주에 한번</option>
                                            <option value={'4'}>주에 두번 이상</option>
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>혈액형</Form.Label>
                                        <Form.Select value={bloodType} onChange={(e) => setBloodType(e.target.value)}>
                                            <option>
                                                혈액형을 선택하세요
                                            </option>
                                            <option value={'1'}>A</option>
                                            <option value={'2'}>B</option>
                                            <option value={'3'}>AB</option>
                                            <option value={'4'}>O</option>
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>MBTI</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="INTP"
                                            value={mbtiType}
                                            onChange={(e) => setMBtiType(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>자기소개 한마디</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="안녕하세요"
                                            value={selfIntroduce}
                                            onChange={(e) => setSelfIntroduce(e.target.value)}
                                        />
                                    </Form.Group>
                                </Form>
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    <Button className={'mt-3'} style={{width: '100%'}} onClick={submitHandler}>개인정보 생성하기</Button>

                </Col>
                <Col/>
            </Row>
            <Row/>
        </Container>
    );
};


export default CreateProfile;