import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, Card, Col, Container, Row, Form, Spinner, Alert} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {BackButton, ViewContainer} from "../components";
import useProfile from "../hooks/useProfile";

const Profile = () => {
    const navigate = useNavigate();

    const [profileInfo, setProfileInfo] = useState({});
    const [check4, setCheck4] = useState(false);
    const [check5, setCheck5] = useState(false);

    const {isLoading, isSuccess, data, error} = useProfile()

    const editConsent = async () => {
        // 약관동의 내용 수정 함수
        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const userInput = {
                agreeOfMarketing: check4,
                etc: check5,
            };
            const url = "http://localhost:7070/api/consent";
            const {data, status} = await axios.put(url, userInput, config);
            if (status === 200) {
                alert("약관 업데이트 동의 완료");
                return;
            }
        } catch (e) {
            console.log("약관동의수정 오류", e);
        }
    };

    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            navigate("/login");
        }
        // getProfileInfo();

        if (data?.consent) {
            setCheck4(data?.consent?.agreeOfMarketing);
            setCheck5(data?.consent?.etc);
        }

        setProfileInfo(data || { profile: null }); // data 가 있으면 setProfileInfo,  data 가 undefined 면 그냥 null 로
    }, [data]);

    return (
        <>
            {isLoading && (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            )}
            {error && (
                <Alert variant={"danger"}>
                    {error}
                </Alert>
            )}
            {isSuccess && data && (
                <ViewContainer cStyle={"mt-3"} btnStyle={{marginLeft: "3rem"}}>
                    <Row className={"mt-3"}>
                        <Col/>
                        <Col style={{width: "30rem"}}>
                            <Card
                                style={{
                                    width: "35rem",
                                    padding: "1rem",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    border: "2px solid #b3b3b3"
                                }}
                                className="mx-auto mb-4"
                            >
                                <Card.Body>
                                    <Row>
                                        <Col>
                                            <Card style={{width: "20rem"}} className="mx-auto">
                                                <Card.Img variant="top" src={data?.profileImg}/>
                                            </Card>

                                            <Card.Text
                                                style={{
                                                    fontSize: "1.2rem",
                                                    lineHeight: "2rem",
                                                    marginTop: "2rem",
                                                }}
                                            >
                                                <div>유저네임 : {data?.userName}</div>
                                                <div>닉네임 : {data?.nickName}</div>
                                                <div>이메일 : {data?.email}</div>
                                                <div>전화번호 : {data?.phone}</div>
                                            </Card.Text>
                                            <Card.Body
                                                style={{
                                                    padding: "0",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <Button
                                                    onClick={() => {
                                                        navigate("/privacy");
                                                    }}
                                                    style={{
                                                        width: "12rem",
                                                        height: "3rem",
                                                        marginRight: "1rem",
                                                    }}
                                                    // className="mx-auto"
                                                >
                                                    개인정보
                                                    {profileInfo.profile == null  ? ' 생성하기' : ' 업데이트'}
                                                    {/*{Object.keys(profileInfo)?.length == 0 ? ' 생성' : ' 업데이트'}*/}
                                                    {console.log('profileinfos', profileInfo.profile)}
                                                </Button>

                                                <Button
                                                    style={{
                                                        background: "red",
                                                        border: "none",
                                                        width: "7rem",
                                                    }}
                                                >
                                                    회원탈퇴
                                                </Button>
                                            </Card.Body>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>

                            <Card
                                style={{
                                    width: "35rem",
                                    lineHeight: "2rem",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    marginBottom: "3rem",
                                    border: "2px solid #b3b3b3"
                                }}
                                // className="mx-auto"
                            >
                                <Card.Body
                                    style={{
                                        paddingBottom: "0",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                    }}
                                >
                                    {["checkbox"].map((type) => (
                                        <div key={`default-${type}`} className="mb-3">
                                            <Form.Check
                                                type={type}
                                                id={"나이약관"}
                                                label={"14세 이상입니다 (필수)"}
                                                checked={true}
                                            />

                                            <Form.Check
                                                type={type}
                                                id={"이용약관"}
                                                label={"이용약관 (필수)"}
                                                checked={true}
                                            />

                                            <Form.Check
                                                type={type}
                                                id={"개인정보"}
                                                label={"개인정보수집 및 이용동의 (필수)"}
                                                checked={true}
                                            />

                                            <Form.Check // prettier-ignore
                                                id={"마케팅"}
                                                label={"개인정보 마케팅 활용 동의 (선택)"}
                                                checked={check4}
                                                onChange={(e) => setCheck4(e.target.checked)}
                                            />

                                            <Form.Check
                                                id={"이벤트"}
                                                label={"이벤트, 특가 알림 및 SMS 등 수신 (선택)"}
                                                checked={check5}
                                                onChange={(e) => setCheck5(e.target.checked)}
                                            />
                                        </div>
                                    ))}
                                </Card.Body>
                                <Button
                                    style={{width: "17rem", height: "3rem"}}
                                    className={" mb-4"}
                                    onClick={editConsent}
                                >
                                    약관동의 수정
                                </Button>
                            </Card>
                        </Col>
                        <Col/>
                    </Row>
                </ViewContainer>
            )}
        </>
    );
};

export default Profile;
