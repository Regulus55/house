import React, {useEffect, useState} from "react";
import {Alert, Button, Col, Container, Dropdown, Form, Row, Spinner} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {useForm} from "react-hook-form";
import useCreateUser from "../hooks/useCreateUser";
import useSendEmail from "../hooks/useSendEmail";
import useCheckEmail from "../hooks/useCheckEmail";

const Signup = () => {
    const {
        register, watch, handleSubmit, formState: {errors}
    } = useForm();

    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordcheck, setPasswordcheck] = useState("");
    const [code, setCode] = useState("");
    // ^^이메일 보낸거 인증하는거
    const [phonenumber, setPhonenumber] = useState("");
    // const [check1, setCheck1] = useState(false);
    // const [check2, setCheck2] = useState(false);
    // const [check3, setCheck3] = useState(false);
    // const [check4, setCheck4] = useState(false);
    // const [check5, setCheck5] = useState(false);
    const [emailDisable, setEmailDisable] = useState(false);
    const [emailCheckEnable, setEmailCheckEnable] = useState(false);
    const [submitEnable, setSubmitEnable] = useState(true);

    const {mutateAsync: sendEmailMutate, data: sendEmailData, error: sendEmailError} = useSendEmail()
    const {mutateAsync: checkEmailMutate, data: checkEmailData, error: checkEmailError} = useCheckEmail()
    const {
        isLoading,
        mutateAsync: createUserMutate,
        isSuccess,
        data: createUserData,
        error: createUserError
    } = useCreateUser()

    // 이 항목들은 스웨거 api 의 리퀘스트 바디에있는 항목들을 참고해서 만듦

    // const sendEmailHandler = async (e) => {
    //     // ^^이메일 보내는 핸들러,  url이랑 userInput (email) 보낸다,   if 맞으면 메일 확인하라고 알람 보낸다
    //     try {
    //         const url = "http://localhost:7070/api/auth/email/send";
    //         const userInput = {
    //             email: email,
    //         };
    //         const { data, status } = await axios.post(url, userInput);
    //         if (status === 201) {
    //             alert("please check your email");
    //             setEmailCheckEnable(true);
    //         }
    //     } catch (err) {
    //         console.log("---", err);
    //     }
    // };


    const sendEmailHandler = async (values) => {
        console.log('=======', values);
        const {email} = values
        console.log('=+++++++++++++', email)
        await sendEmailMutate({email})
        setEmailCheckEnable(true)
    }

    const checkEmailHandler = async (values) => {
        // console.log('===체크이메일 밸류',values)
        // ^^ 이메일, 코드 , 닉넴, 패스워드등 다 들어있음
        const {email, code} = values
        // console.log('=-=-=-=-=-=',email, code)
        // ^^ 이메일이랑 코드만 딱 보여줌
        await checkEmailMutate({email, code})
        setEmailCheckEnable(false)
        setSubmitEnable(false)
    }

    const createUserHandler = async (e) => {
        // e.preventDefault()
        console.log('회원가입의 밸류', e)
        if (!e.email || !e.password || !e.phone) {
            alert('빈칸을 채워주세요')
        } else if (!e.consent.overTwenty && !e.agreeOfTerm && !e.agreeOfPersonalInfo) {
            alert('필수항목 동의해주세요')
        } else if (e.password !== e.passwordcheck) {
            alert('비번이 일치하지 않아요')
        } else {
            await createUserMutate({
                userName: e.userName,
                nickName: e.nickName,
                email: e.email,
                phone: e.phone,
                password: e.password,
                consent: {
                    overTwenty: e.consent.check1,
                    agreeOfTerm: e.consent.check2,
                    agreeOfPersonalInfo: e.consent.check3,
                    agreeOfMarketing: e.consent.check4,
                    etc: e.consent.check5
                }
            });
            alert('회원가입완료')
        }
    }

    // const {isLoading, mutateAsync, data, error} = useCreateUser()
    // console.log('data======', data)
    //
    // const submitHandler = async (values) => {
    //     console.log('======', values)
    //     await mutateAsync(values)
    // }
    // 위에꺼 센드핸들러는 다음에

    // const checkEmailHandler = async (e) => {
    //     try {
    //         const userInput = {
    //             email: email,
    //             code: code,
    //         };
    //         // ^^api 에서 요구하는게 email 이랑 code 니까  userInput 에 이메일이랑 코드를 넣는다
    //         const url = "http://localhost:7070/api/auth/email/check";
    //         const { data, status } = await axios.post(url, userInput);
    //         if (status === 201) {
    //             alert("code ok");
    //             setEmailCheckEnable(false);
    //             setSubmitEnable(false);
    //         }
    //         // ^^if 정상이면 setEmailEnable 을 false 로 작동시켜 화면에서 안보이게 한다
    //     } catch (err) {
    //         console.log("---", err);
    //     }
    // };
    //
    // const submitHandler = async (e) => {
    //     e.preventDefault();
    //     try {
    //         if (password !== passwordcheck) {
    //             alert("please ckeck password and confirm your password");
    //             return;
    //             // 패스워드 체크했을때 일치않으면 alert 으로 알리고 return 으로 빠져나온다
    //         }
    //         if (!(check1 === true && check2 === true && check3 === true)) {
    //             alert("필수항목을 체크해주세요");
    //         }
    //         if (email) {
    //             setEmailDisable(true);
    //         }
    //         const userInput = {
    //             userName: username,
    //             nickName: nickname,
    //             email: email,
    //             password: password,
    //             phone: phonenumber,
    //             consent: {
    //                 overTwenty: check1,
    //                 agreeOfTerm: check2,
    //                 agreeOfPersonalInfo: check3,
    //                 agreeOfMarketing: check4,
    //                 etc: check5,
    //             },
    //             // ^ 스웨거api 의 폼 항목대로 userInput 을 만들었다
    //         };
    //         const url = "http://localhost:7070/api/auth/signup";
    //         const { data, status } = await axios.post(url, userInput);
    //         // ^axios.post 로 url 과 userInput 을 보낸다, 그리고 밑에 if 항목으로 검사한다
    //         if (status === 201) {
    //             alert("회원가입 완료");
    //             navigate("/login");
    //             // if 회원가입 성공시 (201) navigate 이용해서 로그인 페이지로 넘어감
    //         }
    //     } catch (err) {
    //         console.log("---", err);
    //     }
    // };

    const overTwenty = watch('consent.overTwenty', false);
    const agreeOfTerm = watch('consent.agreeOfTerm', false);
    const agreeOfPersonalInfo = watch('consent.agreeOfPersonalInfo', false);
    const agreeOfMarketing = watch('consent.agreeOfMarketing', false);
    const etc = watch('consent.etc', false);

    // useEffect(() => {
    //     if (!(check1 === true && check2 === true && check3 === true)) {
    //         setSubmitEnable(true);
    //     } else setSubmitEnable(false);
    // });

    return (
        <>
            {isLoading && (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            )}
            {/*{error && (*/}
            {/*    <Alert variant={'danger'}>*/}
            {/*        {error}*/}
            {/*    </Alert>*/}
            {/*)}*/}

            <Container>
                <Row className={"mt-5"}>
                    <Col/>
                    <Col xs={6}>
                        <Form onSubmit={handleSubmit(createUserHandler)}>
                            <Form.Group className="mb-3">
                                <Form.Label>이메일</Form.Label>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        fontSize: "1rem",
                                    }}
                                >
                                    <Form.Control
                                        type="email"
                                        placeholder="이메일을 입력하세요"
                                        // value={email}
                                        // onChange={(e) => {
                                        //     setEmail(e.target.value);
                                        {...register('email', {required: true})}

                                    />
                                    {/*<span style={{color: 'grey', margin: 'auto'}}>@</span><DropEmail/>*/}
                                </div>
                                <Button
                                    className={"mt-3"}
                                    disabled={emailDisable}
                                    onClick={handleSubmit(sendEmailHandler)}
                                >
                                    이메일 인증하기
                                </Button>
                            </Form.Group>

                            {emailCheckEnable ? (
                                <Form.Group className="mb-3">
                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        <Form.Control
                                            type="text"
                                            placeholder="인증코드를 입력하세요"
                                            // value={code}
                                            // onChange={(e) => {
                                            //     setCode(e.target.value);
                                            // }}
                                            {...register('code')}
                                        />
                                        {/*<span style={{color: 'grey', margin: 'auto'}}>@</span><DropEmail/>*/}
                                    </div>
                                    <Button
                                        className={"mt-3"}
                                        disabled={emailDisable}
                                        onClick={handleSubmit(checkEmailHandler)}
                                    >
                                        코드 인증하기
                                    </Button>
                                </Form.Group>
                            ) : null}

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>비밀번호</Form.Label>
                                <div style={{color: "grey", fontSize: "0.75rem"}}>
                                    영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.
                                </div>
                                <Form.Control
                                    type="password"
                                    placeholder="비밀번호를 입력하세요"
                                    // value={password}
                                    // onChange={(e) => setPassword(e.target.value)}
                                    {...register('password')}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>비밀번호확인</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="동일한 비밀번호를 한번 더 입력하세요"
                                    // value={passwordcheck}
                                    // onChange={(e) => setPasswordcheck(e.target.value)}
                                    {...register('passwordcheck')}

                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicUsername">
                                <Form.Label>유저이름</Form.Label>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <Form.Control
                                        type="text"
                                        placeholder="유저이름을 입력하세요"
                                        // value={username}
                                        // onChange={(e) => {
                                        //     setUsername(e.target.value);
                                        // }}
                                        {...register('userName')}
                                    />
                                    {/*<span style={{color: 'grey', margin: 'auto'}}>@</span><DropEmail/>*/}
                                </div>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>닉네임</Form.Label>
                                <div style={{color: "grey", fontSize: "0.75rem"}}>
                                    다른 유저와 겹치지 않도록 입력해주세요. (2~20자).
                                </div>
                                <Form.Control
                                    type="text"
                                    placeholder="별명을 입력하세요 (2~20글자)"
                                    // value={nickname}
                                    // onChange={(e) => setNickname(e.target.value)}
                                    {...register('nickName')}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>전화번호</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="전화번호를 입력하세요"
                                    // value={phonenumber}
                                    // onChange={(e) => setPhonenumber(e.target.value)}
                                    {...register('phone')}
                                />
                            </Form.Group>

                            <Form.Label>약관동의</Form.Label>
                            <div
                                style={{
                                    border: "1px solid #c3cacd",
                                    padding: "0 15px",
                                    marginBottom: "30px",
                                }}
                            >
                                {["checkbox"].map((type) => (
                                    <div key={`default-${type}`} className="mb-3">
                                        {/*<Form.Check style={{marginTop:'20px',marginBottom: '5px',fontSize:'0.75rem'}}*/}
                                        {/*            id={'전체'}*/}
                                        {/*            label={'전체동의'}*/}
                                        {/*            onChange={(e)=>checkAll}*/}
                                        {/*/>*/}

                                        <Form.Check
                                            style={{
                                                marginTop: "20px",
                                                marginBottom: "5px",
                                                fontSize: "0.75rem",
                                            }}
                                            type={type}
                                            id={"나이약관"}
                                            label={"14세 이상입니다(필수)"}
                                            // value={check1}
                                            // onChange={(e) => setCheck1(true)}
                                            {...register('consent.overTwenty')}
                                        />

                                        <Form.Check
                                            style={{marginBottom: "5px", fontSize: "0.75rem"}}
                                            type={type}
                                            id={"이용약관"}
                                            label={"이용약관(필수)"}
                                            // value={check2}
                                            // onChange={(e) => setCheck2(true)}
                                            {...register('consent.agreeOfTerm')}
                                        />

                                        <Form.Check
                                            style={{marginBottom: "5px", fontSize: "0.75rem"}}
                                            type={type}
                                            id={"개인정보"}
                                            label={"개인정보수집 및 이용동의(필수)"}
                                            // value={check3}
                                            // onChange={(e) => setCheck3(true)}
                                            {...register('consent.agreeOfPersonalInfo')}
                                        />

                                        <Form.Check
                                            style={{marginBottom: "5px", fontSize: "0.75rem"}}
                                            type={type}
                                            id={"마케팅"}
                                            label={"개인정보 마케팅 활용 동의(선택)"}
                                            // value={check4}
                                            // onChange={(e) => setCheck4(true)}
                                            {...register('consent.agreeOfMarketing')}
                                        />

                                        <Form.Check
                                            style={{marginBottom: "1px", fontSize: "0.75rem"}}
                                            type={type}
                                            id={"이벤트"}
                                            label={"이벤트, 특가 알림 및 SMS 등 수신(선택)"}
                                            // value={check5}
                                            // onChange={(e) => setCheck5(true)}
                                            {...register('consent.etc')}
                                        />
                                    </div>
                                ))}
                            </div>

                            <Button type="submit" disabled={submitEnable}>
                                회원가입하기
                            </Button>

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    marginTop: "30px",
                                    marginBottom: "50px",
                                    fontSize: "0.9rem",
                                }}
                            >
              <span>
                이미 아이디가 있으신가요?
                <Link
                    to={"/login"}
                    style={{
                        color: "black",
                        marginLeft: "30px",
                        marginBottom: "70px",
                    }}
                >
                  로그인
                </Link>
              </span>{" "}
                            </div>
                        </Form>
                    </Col>
                    <Col/>
                </Row>

                <Row/>
            </Container>
        </>
    );
};

export default Signup;