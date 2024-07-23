import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Card, Col, Container, Row, Form} from "react-bootstrap";
import {CiBookmark} from "react-icons/ci";
import {CiHeart} from "react-icons/ci";
import {RiCoupon3Line} from "react-icons/ri";
import {Link, useNavigate} from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate()

    const [profileInfo, setProfileInfo] = useState({})
    const [check4, setCheck4] = useState(false)
    const [check5, setCheck5] = useState(false)

    const getProfileInfo = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
            // const result = await axios.get('http://localhost:7070/api/auth', config)
            // console.log('profileInfo', result.data.body)
            // setProfileInfo(result.data.body)
            const {data} = await axios.get('http://localhost:7070/api/auth', config)
            console.log('profileInfo', data.body)
            const  { agreeOfMarketing, etc } = data.body.consent

            setProfileInfo(data.body)
            setCheck4(agreeOfMarketing)
            setCheck5(etc)

        } catch (err) {
            console.log('겟인포 에러', err)
        }
    }

    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            navigate('/login')
        }
        getProfileInfo()
    }, [])

    return (
        <Container>
            <Row>
                <Col></Col>
            </Row>
            <Row className={'mt-5'}>
                <Col xs={1}></Col>
                <Col xs={3}>
                    <Card style={{width: '15rem', display: 'flex', alignContent: 'center'}}>
                        <Card.Img variant="top"
                                  src={profileInfo.profileImg}/>
                        <Card.Body>
                            <Card.Title style={{fontWeight: 'bold'}}>{profileInfo.nickName}</Card.Title>
                            <Row style={{borderTop: '1px solid #ccc', fontSize: '0.75rem', paddingTop: '10px'}}>
                                <Col>
                                    <Row style={{fontSize: '1.5rem'}}><CiBookmark/></Row>
                                    <Row>스크랩북</Row>
                                </Col>
                                <Col>
                                    <Row style={{fontSize: '1.5rem'}}><CiHeart/></Row>
                                    <Row>좋아요</Row>
                                </Col>
                                <Col>
                                    <Row style={{fontSize: '1.5rem'}}><RiCoupon3Line/></Row>
                                    <Row>내쿠폰</Row>
                                </Col>
                            </Row>

                        </Card.Body>
                    </Card>

                    <Link to={'/privacy'}>
                        <Button style={{
                            width: '15rem',
                            marginTop: '1rem'
                        }}>개인정보
                            {profileInfo.profile === null ? ' 생성' : ' 업데이트'}
                        </Button>
                    </Link>
                </Col>

                <Col xs={6} style={{marginLeft: '10vw'}}>
                    <Row>
                        <Card style={{width: '25rem'}}>
                            <Card.Img variant="top"/>
                            <Card.Body>
                                <Card.Title>* 프로필 *</Card.Title>
                                <Card.Text style={{fontSize: '0.9rem', lineHeight: '2rem'}}>
                                    <div>유저네임 : {profileInfo.userName}</div>
                                    <div>닉네임 : {profileInfo.nickName}</div>
                                    <div>이메일 : {profileInfo.email}</div>
                                    <div>전화번호 : {profileInfo.phone}</div>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Row>

                    <Row className={'mt-3'}>
                        <Card style={{width: '25rem', lineHeight: '2rem'}}>
                            <Card.Img variant="top"/>
                            <Card.Body>

                                <Card.Title>* 개인정보 동의이력 *</Card.Title>
                                {['checkbox'].map((type) => (
                                    <div key={`default-${type}`} className="mb-3">
                                        <Form.Check // prettier-ignore
                                            id={'개인정보'}
                                            label={'개인정보 마케팅 활용 동의'}
                                            checked={check4}
                                            onChange={(e) => setCheck4(e.target.checked)}
                                        />

                                        <Form.Check
                                            id={'이벤트'}
                                            label={'이벤트, 특가 알림 및 SMS 등 수신'}
                                            checked={check5}
                                            onChange={(e) => setCheck5(e.target.checked)}
                                        />
                                    </div>
                                ))}
                            </Card.Body>
                        </Card>

                        <Button variant="primary" className={'mt-3'}>프로필 수정</Button>

                    </Row>
                </Col>

                <Col xs={1}></Col>
            </Row>
            <Row>
                <Col></Col>
            </Row>
        </Container>
    )
        ;
};

export default Profile;