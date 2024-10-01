import React, {useEffect, useState} from "react";
import {Alert, Button, Col, Container, Dropdown, Form, Row, Spinner} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {useForm} from "react-hook-form";
import useCreateUser from "../hooks/useCreateUser";
import useSendEmail from "../hooks/useSendEmail";
import useCheckEmail from "../hooks/useCheckEmail";
import {LoadingBar} from "../components";

const Signup = () => {
    const {register, handleSubmit, setValue, watch, formState: {errors}} = useForm({
        defaultValues: {
            userName: '',
            nickName: '',
            email: '',
            phone: '',
            password: '',
            passwordcheck: '',
            consent: {
                overTwenty: false,
                agreeOfTerm: false,
                agreeOfPersonalInfo: false,
                agreeOfMarketing: false,
                etc: false
            }
        }
    });

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

    const {
        mutateAsync: sendEmailMutate,
        status: sendEmailStatus,
        data: sendEmailData,
        error: sendEmailError,
        isSuccess: sendEmailIsSuccess
    } = useSendEmail()
    const {
        mutateAsync: checkEmailMutate,
        status: checkEmailStatus,
        isLoading: checkEmailLoading,
        data: checkEmailData,
        error: checkEmailError
    } = useCheckEmail()
    const {
        mutateAsync: createUserMutate,
        status: createUserStatus,
        isLoading: createUserLoading,
        isSuccess,
        data: createUserData,
        error: createUserError
    } = useCreateUser()


    console.log('status======', sendEmailStatus)
    // 이 항목들은 스웨거 api 의 리퀘스트 바디에있는 항목들을 참고해서 만듦

    const sendEmailHandler = async (values) => {
        // console.log('=======', values);
        const {email} = values
        // console.log('=+++++++++++++', email)
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

    const createUserHandler = async (values) => {
        // e.preventDefault()
        console.log('회원가입의 밸류', values)
        if (!values.email || !values.password || !values.phone) {
            alert('빈칸을 채워주세요')
        } else if (!values.consent.overTwenty || !values.consent.agreeOfTerm || !values.consent.agreeOfPersonalInfo) {
            alert('필수항목에 동의해주세요')
        } else if (values.password !== values.passwordcheck) {
            alert('비밀번호가 일치하지 않아요')
        } else {
            await createUserMutate({
                userName: values.userName,
                nickName: values.nickName,
                email: values.email,
                phone: values.phone,
                password: values.password,
                consent
            });
            alert('회원가입완료')
        }
    }

    const agreements = [
        {id: 1, label: "14세 이상입니다(필수)", key: "overTwenty"},
        {id: 2, label: "이용약관(필수)", key: "agreeOfTerm"},
        {id: 3, label: "개인정보수집 및 이용동의(필수)", key: "agreeOfPersonalInfo"},
        {id: 4, label: "개인정보 마케팅 활용 동의(선택)", key: "agreeOfMarketing"},
        {id: 5, label: "이벤트, 특가 알림 및 SMS 등 수신(선택)", key: "etc"}
    ];

    const watchConsent = watch('consent');
    const selectAllChecked = Object.values(watchConsent).every(value => value);

    const [checkItems, setCheckItems] = useState([]);
    const [consent, setConsent] = useState({
        overTwenty: false,
        agreeOfTerm: false,
        agreeOfPersonalInfo: false,
        agreeOfMarketing: false,
        etc: false
    });

    const handleSingleCheck = (checked, id, key) => {
        setValue(`consent.${key}`, checked)
        if (checked) {
            setCheckItems(prev => [...prev, id]);
            setConsent(prev => ({
                ...prev,
                [key]: true
            }));
        } else {
            setCheckItems(checkItems.filter((el) => el !== id));
            setConsent(prev => ({
                ...prev,
                [key]: false
            }));
        }
    };

    const handleAllCheck = (checked) => {
        agreements.forEach((item) => {
            setValue(`consent.${item.key}`, checked); // react-hook-form 상태를 직접 업데이트
        });
        if (checked) {
            const idArray = agreements.map((el) => el.id);
            setCheckItems(idArray);
            const newConsent = agreements.reduce((acc, cur) => {
                acc[cur.key] = true;
                return acc;
            }, {});
            setConsent(newConsent);
        } else {
            setCheckItems([]);
            setConsent({
                overTwenty: false,
                agreeOfTerm: false,
                agreeOfPersonalInfo: false,
                agreeOfMarketing: false,
                etc: false
            });
        }
    };


    if (sendEmailStatus === 'pending') {
        return <LoadingBar/>
    }

    return (

        <Container>
            <>
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
                            <div style={{border: "1px solid #c3cacd", padding: "10px"}}>
                                <Form.Check
                                    type="checkbox"
                                    id="select-all"
                                    label="전체 선택"
                                    onChange={(e) => handleAllCheck(e.target.checked)}
                                    checked={checkItems.length === agreements.length}
                                    className="mb-3"
                                />
                                <div style={{borderTop: "1px solid #c3cacd", marginBottom: '15px'}}/>
                                {agreements.map((item) => (
                                    <Form.Check
                                        key={item.id}
                                        type="checkbox"
                                        id={`agreement-${item.id}`}
                                        label={item.label}
                                        {...register(`consent.${item.key}`)}
                                        onChange={(e) => handleSingleCheck(e.target.checked, item.id, item.key)}
                                        checked={checkItems.includes(item.id)}
                                        className="mb-2"
                                    />
                                ))}
                            </div>
                            <Button type="submit" disabled={submitEnable} className={'mt-3'}>
                                회원가입하기
                            </Button>

                            {/*submitEnable*/}

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
            </>
            {/*) : null}*/}
        </Container>

    );
};

export default Signup;