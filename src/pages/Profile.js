import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Col, Container, Row, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BackButton, ViewContainer } from "../components";

const Profile = () => {
  const navigate = useNavigate();

  const [profileInfo, setProfileInfo] = useState({});
  const [check4, setCheck4] = useState(false);
  const [check5, setCheck5] = useState(false);

  const getProfileInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      // const result = await axios.get('http://localhost:7070/api/auth', config)
      // console.log('profileInfo', result.data.body)
      // setProfileInfo(result.data.body)
      const { data } = await axios.get(
        "http://localhost:7070/api/auth",
        config
      );
      console.log("profileInfo", data.body);
      const { agreeOfMarketing, etc } = data.body.consent;

      setProfileInfo(data.body);
      setCheck4(agreeOfMarketing);
      setCheck5(etc);
    } catch (err) {
      console.log("겟인포 에러", err);
    }
  };

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
      const { data, status } = await axios.put(url, userInput, config);
      if (status === 200) {
        alert("Agree to terms and conditions update complete");
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
    getProfileInfo();
  }, []);

  return (
    <ViewContainer cStyle={"mt-3"} btnStyle={{ marginLeft: "3rem" }}>
      <Row className={"mt-3"}>
        <Col />
        <Col style={{ width: "30rem" }}>
          <Card
            style={{
              width: "35rem",
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            className="mx-auto mb-4"
          >
            <Card.Body>
              <Row>
                <Col>
                  <Card style={{ width: "20rem" }} className="mx-auto">
                    <Card.Img variant="top" src={profileInfo.profileImg} />
                  </Card>

                  <Card.Text
                    style={{
                      fontSize: "1.2rem",
                      lineHeight: "2rem",
                      marginTop: "2rem",
                    }}
                  >
                    <div>유저네임 : {profileInfo.userName}</div>
                    <div>닉네임 : {profileInfo.nickName}</div>
                    <div>이메일 : {profileInfo.email}</div>
                    <div>전화번호 : {profileInfo.phone}</div>
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
                      {profileInfo.profile === null ? " 생성" : " 업데이트"}
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
                    label={"14세 이상입니다"}
                    checked={true}
                  />

                  <Form.Check
                    type={type}
                    id={"이용약관"}
                    label={"이용약관"}
                    checked={true}
                  />

                  <Form.Check
                    type={type}
                    id={"개인정보"}
                    label={"개인정보수집 및 이용동의"}
                    checked={true}
                  />

                  <Form.Check // prettier-ignore
                    id={"마케팅"}
                    label={"개인정보 마케팅 활용 동의"}
                    checked={check4}
                    onChange={(e) => setCheck4(e.target.checked)}
                  />

                  <Form.Check
                    id={"이벤트"}
                    label={"이벤트, 특가 알림 및 SMS 등 수신"}
                    checked={check5}
                    onChange={(e) => setCheck5(e.target.checked)}
                  />
                </div>
              ))}
            </Card.Body>
            <Button
              style={{ width: "17rem", height: "3rem" }}
              className={" mb-4"}
              onClick={editConsent}
            >
              약관동의 수정
            </Button>
          </Card>
        </Col>
        <Col />
      </Row>
    </ViewContainer>
  );
};

export default Profile;
