import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Card, Col, Container, Row, Form, Dropdown, Spinner, Alert} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {ViewContainer} from "../components";
import usePrivacy from "../hooks/usePrivacy";
import {useForm} from "react-hook-form";

const Privacy = () => {
    const navigate = useNavigate();

    const [profileInfo, setProfileInfo] = useState({})

    const {isLoading, isSuccess, data, error} = usePrivacy()

    const {register, handleSubmit, getValues, setValue, formState: {errors}} = useForm({
        defaultValues: {
            country: '',                     // 국가
            bornArea: '',                    // 태어난 곳
            addressOfHome: '',               // 집 주소
            activityArea: '',                // 활동 지역
            age: '',                          // 나이
            birth: '',                        // 생년월일
            birthDate: {                     // 생년월일(객체로 관리)
                year: new Date().getFullYear(),
                month: new Date().getMonth() + 1,
                day: new Date().getDate()
            },
            gender: '',                       // 성별
            height: '',                       // 키
            bodyType: '',                     // 체형
            drinking: '',                     // 음주
            smoking: '',                      // 흡연
            bloodType: '',                   // 혈액형
            mbtiType: '',                    // MBTI
            selfIntroduce: ''                // 자기소개
        }

    });


    const createPrivacy = async (values) => {
        try {
            const formattedMonth = String(values.birthDate.month).padStart(2, '0');
            const formattedDay = String(values.birthDate.day).padStart(2, '0');
            const formattedBirth = `${values.birthDate.year}-${formattedMonth}-${formattedDay}`

            const userInput = {
                country: values.country,
                bornArea: values.bornArea,
                addressOfHome: values.addressOfHome,
                activityArea: values.activityArea,
                birth: formattedBirth,
                age: new Date().getFullYear() - values.birthDate.year,
                gender: values.gender,
                height: values.height,
                bodyType: values.bodyType,
                drinking: values.drinking,
                smoking: values.smoking,
                bloodType: values.bloodType,
                mbtiType: values.mbtiType,
                selfIntroduce: values.selfIntroduce,
            }

            console.log('userinputsun', userInput)

            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
            const url = 'http://localhost:7070/api/profile'
            const {data, status} = await axios.post(url, userInput, config)
            if (status === 201) {
                alert('개인정보 생성 완료')
                // navigate('/profile')
            }
        } catch (err) {
            console.log('submit에러', err)
        }
    }


    const editPrivacy = async (values) => {
        try {
            const formattedMonth = String(values.birthDate.month).padStart(2, '0');
            const formattedDay = String(values.birthDate.day).padStart(2, '0');
            const formattedBirth = `${values.birthDate.year}-${formattedMonth}-${formattedDay}`

            const userInput = {
                country: values.country,
                bornArea: values.bornArea,
                addressOfHome: values.addressOfHome,
                activityArea: values.activityArea,
                birth: formattedBirth,
                age: new Date().getFullYear() - values.birthDate.year,
                gender: values.gender,
                height: values.height,
                bodyType: values.bodyType,
                drinking: values.drinking,
                smoking: values.smoking,
                bloodType: values.bloodType,
                mbtiType: values.mbtiType,
                selfIntroduce: values.selfIntroduce,
            }

            console.log('userinputsun', userInput)

            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
            const url = 'http://localhost:7070/api/profile'
            const {data, status} = await axios.put(url, userInput, config)
            if (status === 200) {
                alert('개인정보 수정 완료')
                // navigate('/profile')
            }
        } catch (e) {
            console.log('edit프라이버시 에러', e)
        }
    }

    useEffect(() => {
        if (data) {
            const formedBirth = new Date(data?.birth);  // birth 찍으면 1996-05-05~ 잘 나옴. 이걸 new Date 형태로 만듦
            const formedYear = formedBirth.getFullYear(); // new Date로 만든거에서 year만 뽑음
            const formedMonth = formedBirth.getMonth() + 1;
            const formedDay = formedBirth.getDate();

            setValue('country', data.country || '');
            setValue('bornArea', data.bornArea || '');
            setValue('addressOfHome', data.addressOfHome || '');
            setValue('activityArea', data.activityArea || '');
            setValue('age', data.age || '');
            setValue('birth', data.birth || '');
            setValue('birthDate.year', formedYear || new Date().getFullYear());
            setValue('birthDate.month', formedMonth || new Date().getMonth() + 1);
            setValue('birthDate.day', formedDay || new Date().getDate());
            setValue('gender', data.gender || '');
            setValue('height', data.height || '');
            setValue('bodyType', data.bodyType || '');
            setValue('drinking', data.drinking || '');
            setValue('smoking', data.smoking === true || data.smoking === false ? data.smoking : '');
            setValue('bloodType', data.bloodType || '');
            setValue('mbtiType', data.mbtiType || '');
            setValue('selfIntroduce', data.selfIntroduce || '');

            setProfileInfo(data)
        }
        console.log('data', data)
        console.log('profileInfo',profileInfo)
        console.log('datalength', Object.keys(profileInfo))
        console.log('profileInfo',profileInfo)
        const currentValues = getValues();
        console.log('currentValues', currentValues)

    }, [data, setValue]);

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
            {isSuccess && (
                <ViewContainer>
                    <Row>
                        <Col/>
                        <Col className={'mt-5'}>
                            <Card style={{width: '30rem', border: '1px solid #ccc'}}>
                                <Card.Body>
                                    <Card.Title className={'mb-3'}>*개인정보 생성*</Card.Title>
                                    <Card.Text style={{lineHeight: '2rem'}}>
                                        <Form onSubmit={profileInfo !== null ?  handleSubmit(editPrivacy) :  handleSubmit(createPrivacy)  }>
                                            <Form.Group className="mb-3">
                                                <Form.Label>국적</Form.Label>
                                                <Form.Select
                                                    {...register('country', {required: '국적을 선택하세요'})}
                                                >
                                                    <option value={''} disabled>국적을 선택하세요</option>
                                                    <option value="Afghanistan">Afghanistan</option>
                                                    <option value="Åland Islands">Åland Islands</option>
                                                    <option value="Albania">Albania</option>
                                                    <option value="Algeria">Algeria</option>
                                                    <option value="American Samoa">American Samoa</option>
                                                    <option value="Andorra">Andorra</option>
                                                    <option value="Angola">Angola</option>
                                                    <option value="Anguilla">Anguilla</option>
                                                    <option value="Antarctica">Antarctica</option>
                                                    <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                                                    <option value="Argentina">Argentina</option>
                                                    <option value="Armenia">Armenia</option>
                                                    <option value="Aruba">Aruba</option>
                                                    <option value="Australia">Australia</option>
                                                    <option value="Austria">Austria</option>
                                                    <option value="Azerbaijan">Azerbaijan</option>
                                                    <option value="Bahamas">Bahamas</option>
                                                    <option value="Bahrain">Bahrain</option>
                                                    <option value="Bangladesh">Bangladesh</option>
                                                    <option value="Barbados">Barbados</option>
                                                    <option value="Belarus">Belarus</option>
                                                    <option value="Belgium">Belgium</option>
                                                    <option value="Belize">Belize</option>
                                                    <option value="Benin">Benin</option>
                                                    <option value="Bermuda">Bermuda</option>
                                                    <option value="Bhutan">Bhutan</option>
                                                    <option value="Bolivia (Plurinational State of)">Bolivia
                                                        (Plurinational
                                                        State of)
                                                    </option>
                                                    <option value="Bonaire, Sint Eustatius and Saba">Bonaire, Sint
                                                        Eustatius
                                                        and
                                                        Saba
                                                    </option>
                                                    <option value="Bosnia and Herzegovina">Bosnia and Herzegovina
                                                    </option>
                                                    <option value="Botswana">Botswana</option>
                                                    <option value="Bouvet Island">Bouvet Island</option>
                                                    <option value="Brazil">Brazil</option>
                                                    <option value="British Indian Ocean Territory">British Indian Ocean
                                                        Territory
                                                    </option>
                                                    <option value="Brunei Darussalam">Brunei Darussalam</option>
                                                    <option value="Bulgaria">Bulgaria</option>
                                                    <option value="Burkina Faso">Burkina Faso</option>
                                                    <option value="Burundi">Burundi</option>
                                                    <option value="Cabo Verde">Cabo Verde</option>
                                                    <option value="Cambodia">Cambodia</option>
                                                    <option value="Cameroon">Cameroon</option>
                                                    <option value="Canada">Canada</option>
                                                    <option value="Cayman Islands">Cayman Islands</option>
                                                    <option value="Central African Republic">Central African Republic
                                                    </option>
                                                    <option value="Chad">Chad</option>
                                                    <option value="Chile">Chile</option>
                                                    <option value="China">China</option>
                                                    <option value="Christmas Island">Christmas Island</option>
                                                    <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands
                                                    </option>
                                                    <option value="Colombia">Colombia</option>
                                                    <option value="Comoros">Comoros</option>
                                                    <option value="Congo">Congo</option>
                                                    <option value="Congo, Democratic Republic of the">Congo, Democratic
                                                        Republic
                                                        of the
                                                    </option>
                                                    <option value="Cook Islands">Cook Islands</option>
                                                    <option value="Costa Rica">Costa Rica</option>
                                                    <option value="Côte d'Ivoire">Côte d'Ivoire</option>
                                                    <option value="Croatia">Croatia</option>
                                                    <option value="Cuba">Cuba</option>
                                                    <option value="Curaçao">Curaçao</option>
                                                    <option value="Cyprus">Cyprus</option>
                                                    <option value="Czechia">Czechia</option>
                                                    <option value="Denmark">Denmark</option>
                                                    <option value="Djibouti">Djibouti</option>
                                                    <option value="Dominica">Dominica</option>
                                                    <option value="Dominican Republic">Dominican Republic</option>
                                                    <option value="Ecuador">Ecuador</option>
                                                    <option value="Egypt">Egypt</option>
                                                    <option value="El Salvador">El Salvador</option>
                                                    <option value="Equatorial Guinea">Equatorial Guinea</option>
                                                    <option value="Eritrea">Eritrea</option>
                                                    <option value="Estonia">Estonia</option>
                                                    <option value="Eswatini">Eswatini</option>
                                                    <option value="Ethiopia">Ethiopia</option>
                                                    <option value="Falkland Islands (Malvinas)">Falkland Islands
                                                        (Malvinas)
                                                    </option>
                                                    <option value="Faroe Islands">Faroe Islands</option>
                                                    <option value="Fiji">Fiji</option>
                                                    <option value="Finland">Finland</option>
                                                    <option value="France">France</option>
                                                    <option value="French Guiana">French Guiana</option>
                                                    <option value="French Polynesia">French Polynesia</option>
                                                    <option value="French Southern Territories">French Southern
                                                        Territories
                                                    </option>
                                                    <option value="Gabon">Gabon</option>
                                                    <option value="Gambia">Gambia</option>
                                                    <option value="Georgia">Georgia</option>
                                                    <option value="Germany">Germany</option>
                                                    <option value="Ghana">Ghana</option>
                                                    <option value="Gibraltar">Gibraltar</option>
                                                    <option value="Greece">Greece</option>
                                                    <option value="Greenland">Greenland</option>
                                                    <option value="Grenada">Grenada</option>
                                                    <option value="Guadeloupe">Guadeloupe</option>
                                                    <option value="Guam">Guam</option>
                                                    <option value="Guatemala">Guatemala</option>
                                                    <option value="Guernsey">Guernsey</option>
                                                    <option value="Guinea">Guinea</option>
                                                    <option value="Guinea-Bissau">Guinea-Bissau</option>
                                                    <option value="Guyana">Guyana</option>
                                                    <option value="Haiti">Haiti</option>
                                                    <option value="Heard Island and McDonald Islands">Heard Island and
                                                        McDonald
                                                        Islands
                                                    </option>
                                                    <option value="Holy See">Holy See</option>
                                                    <option value="Honduras">Honduras</option>
                                                    <option value="Hong Kong">Hong Kong</option>
                                                    <option value="Hungary">Hungary</option>
                                                    <option value="Iceland">Iceland</option>
                                                    <option value="India">India</option>
                                                    <option value="Indonesia">Indonesia</option>
                                                    <option value="Iran (Islamic Republic of)">Iran (Islamic Republic
                                                        of)
                                                    </option>
                                                    <option value="Iraq">Iraq</option>
                                                    <option value="Ireland">Ireland</option>
                                                    <option value="Isle of Man">Isle of Man</option>
                                                    <option value="Israel">Israel</option>
                                                    <option value="Italy">Italy</option>
                                                    <option value="Jamaica">Jamaica</option>
                                                    <option value="Japan">Japan</option>
                                                    <option value="Jersey">Jersey</option>
                                                    <option value="Jordan">Jordan</option>
                                                    <option value="Kazakhstan">Kazakhstan</option>
                                                    <option value="Kenya">Kenya</option>
                                                    <option value="Kiribati">Kiribati</option>
                                                    <option value="Korea (Democratic People's Republic of)">Korea
                                                        (Democratic
                                                        People's Republic of)
                                                    </option>
                                                    <option value="Korea, Republic of">Korea, Republic of</option>
                                                    <option value="Kuwait">Kuwait</option>
                                                    <option value="Kyrgyzstan">Kyrgyzstan</option>
                                                    <option value="Lao People's Democratic Republic">Lao People's
                                                        Democratic
                                                        Republic
                                                    </option>
                                                    <option value="Latvia">Latvia</option>
                                                    <option value="Lebanon">Lebanon</option>
                                                    <option value="Lesotho">Lesotho</option>
                                                    <option value="Liberia">Liberia</option>
                                                    <option value="Libya">Libya</option>
                                                    <option value="Liechtenstein">Liechtenstein</option>
                                                    <option value="Lithuania">Lithuania</option>
                                                    <option value="Luxembourg">Luxembourg</option>
                                                    <option value="Macao">Macao</option>
                                                    <option value="Madagascar">Madagascar</option>
                                                    <option value="Malawi">Malawi</option>
                                                    <option value="Malaysia">Malaysia</option>
                                                    <option value="Maldives">Maldives</option>
                                                    <option value="Mali">Mali</option>
                                                    <option value="Malta">Malta</option>
                                                    <option value="Marshall Islands">Marshall Islands</option>
                                                    <option value="Martinique">Martinique</option>
                                                    <option value="Mauritania">Mauritania</option>
                                                    <option value="Mauritius">Mauritius</option>
                                                    <option value="Mayotte">Mayotte</option>
                                                    <option value="Mexico">Mexico</option>
                                                    <option value="Micronesia (Federated States of)">Micronesia
                                                        (Federated
                                                        States of)
                                                    </option>
                                                    <option value="Moldova, Republic of">Moldova, Republic of</option>
                                                    <option value="Monaco">Monaco</option>
                                                    <option value="Mongolia">Mongolia</option>
                                                    <option value="Montenegro">Montenegro</option>
                                                    <option value="Montserrat">Montserrat</option>
                                                    <option value="Morocco">Morocco</option>
                                                    <option value="Mozambique">Mozambique</option>
                                                    <option value="Myanmar">Myanmar</option>
                                                    <option value="Namibia">Namibia</option>
                                                    <option value="Nauru">Nauru</option>
                                                    <option value="Nepal">Nepal</option>
                                                    <option value="Netherlands, Kingdom of the">Netherlands, Kingdom of
                                                        the
                                                    </option>
                                                    <option value="New Caledonia">New Caledonia</option>
                                                    <option value="New Zealand">New Zealand</option>
                                                    <option value="Nicaragua">Nicaragua</option>
                                                    <option value="Niger">Niger</option>
                                                    <option value="Nigeria">Nigeria</option>
                                                    <option value="Niue">Niue</option>
                                                    <option value="Norfolk Island">Norfolk Island</option>
                                                    <option value="North Macedonia">North Macedonia</option>
                                                    <option value="Northern Mariana Islands">Northern Mariana Islands
                                                    </option>
                                                    <option value="Norway">Norway</option>
                                                    <option value="Oman">Oman</option>
                                                    <option value="Pakistan">Pakistan</option>
                                                    <option value="Palau">Palau</option>
                                                    <option value="Palestine, State of[b]">Palestine, State of[b]
                                                    </option>
                                                    <option value="Panama">Panama</option>
                                                    <option value="Papua New Guinea">Papua New Guinea</option>
                                                    <option value="Paraguay">Paraguay</option>
                                                    <option value="Peru">Peru</option>
                                                    <option value="Philippines">Philippines</option>
                                                    <option value="Pitcairn">Pitcairn</option>
                                                    <option value="Poland">Poland</option>
                                                    <option value="Portugal">Portugal</option>
                                                    <option value="Puerto Rico">Puerto Rico</option>
                                                    <option value="Qatar">Qatar</option>
                                                    <option value="Réunion">Réunion</option>
                                                    <option value="Romania">Romania</option>
                                                    <option value="Russian Federation">Russian Federation</option>
                                                    <option value="Rwanda">Rwanda</option>
                                                    <option value="Saint Barthélemy">Saint Barthélemy</option>
                                                    <option value="Saint Helena, Ascension and Tristan da Cunha">Saint
                                                        Helena,
                                                        Ascension and Tristan da Cunha
                                                    </option>
                                                    <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                                                    <option value="Saint Lucia">Saint Lucia</option>
                                                    <option value="Saint Martin (French part)">Saint Martin (French
                                                        part)
                                                    </option>
                                                    <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon
                                                    </option>
                                                    <option value="Saint Vincent and the Grenadines">Saint Vincent and
                                                        the
                                                        Grenadines
                                                    </option>
                                                    <option value="Samoa">Samoa</option>
                                                    <option value="San Marino">San Marino</option>
                                                    <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                                                    <option value="Saudi Arabia">Saudi Arabia</option>
                                                    <option value="Senegal">Senegal</option>
                                                    <option value="Serbia">Serbia</option>
                                                    <option value="Seychelles">Seychelles</option>
                                                    <option value="Sierra Leone">Sierra Leone</option>
                                                    <option value="Singapore">Singapore</option>
                                                    <option value="Sint Maarten (Dutch part)">Sint Maarten (Dutch part)
                                                    </option>
                                                    <option value="Slovakia">Slovakia</option>
                                                    <option value="Slovenia">Slovenia</option>
                                                    <option value="Solomon Islands">Solomon Islands</option>
                                                    <option value="Somalia">Somalia</option>
                                                    <option value="South Africa">South Africa</option>
                                                    <option value="South Georgia and the South Sandwich Islands">South
                                                        Georgia
                                                        and the South Sandwich Islands
                                                    </option>
                                                    <option value="South Sudan">South Sudan</option>
                                                    <option value="Spain">Spain</option>
                                                    <option value="Sri Lanka">Sri Lanka</option>
                                                    <option value="Sudan">Sudan</option>
                                                    <option value="Suriname">Suriname</option>
                                                    <option value="Svalbard and Jan Mayen[e]">Svalbard and Jan Mayen[e]
                                                    </option>
                                                    <option value="Sweden">Sweden</option>
                                                    <option value="Switzerland">Switzerland</option>
                                                    <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                                                    <option value="Taiwan, Province of China">Taiwan, Province of China
                                                    </option>
                                                    <option value="Tajikistan">Tajikistan</option>
                                                    <option value="Tanzania, United Republic of">Tanzania, United
                                                        Republic
                                                        of
                                                    </option>
                                                    <option value="Thailand">Thailand</option>
                                                    <option value="Timor-Leste">Timor-Leste</option>
                                                    <option value="Togo">Togo</option>
                                                    <option value="Tokelau">Tokelau</option>
                                                    <option value="Tonga">Tonga</option>
                                                    <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                                                    <option value="Tunisia">Tunisia</option>
                                                    <option value="Türkiye">Türkiye</option>
                                                    <option value="Turkmenistan">Turkmenistan</option>
                                                    <option value="Turks and Caicos Islands">Turks and Caicos Islands
                                                    </option>
                                                    <option value="Tuvalu">Tuvalu</option>
                                                    <option value="Uganda">Uganda</option>
                                                    <option value="Ukraine">Ukraine</option>
                                                    <option value="United Arab Emirates">United Arab Emirates</option>
                                                    <option
                                                        value="United Kingdom of Great Britain and Northern Ireland">United
                                                        Kingdom of Great Britain and Northern Ireland
                                                    </option>
                                                    <option value="United States of America">United States of America
                                                    </option>
                                                    <option value="United States Minor Outlying Islands">United States
                                                        Minor
                                                        Outlying Islands
                                                    </option>
                                                    <option value="Uruguay">Uruguay</option>
                                                    <option value="Uzbekistan">Uzbekistan</option>
                                                    <option value="Vanuatu">Vanuatu</option>
                                                    <option value="Venezuela (Bolivarian Republic of)">Venezuela
                                                        (Bolivarian
                                                        Republic of)
                                                    </option>
                                                    <option value="Viet Nam">Viet Nam</option>
                                                    <option value="Virgin Islands (British)">Virgin Islands (British)
                                                    </option>
                                                    <option value="Virgin Islands (U.S.)">Virgin Islands (U.S.)</option>
                                                    <option value="Wallis and Futuna">Wallis and Futuna</option>
                                                    <option value="Western Sahara">Western Sahara</option>
                                                    <option value="Yemen">Yemen</option>
                                                    <option value="Zambia">Zambia</option>
                                                    <option value="Zimbabwe">Zimbabwe</option>
                                                </Form.Select>
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>태어난 곳</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="태어난 곳을 입력하세요"
                                                    {...register('bornArea', {required: '태어난 곳을 입력하세요'})}
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>현재 주소</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="주소를 입력하세요"
                                                    {...register('addressOfHome', {required: '주소를 입력하세요'})}
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>활동 지역</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="활동지역을 입력하세요"
                                                    {...register('activityArea', {required: '활동지역을 입력하세요'})}
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>출생정보</Form.Label>
                                                <Row>
                                                    <Col>
                                                        <Form.Select
                                                            {...register('birthDate.year', {required: '연도를 선택하세요'})}
                                                        >
                                                            <option>년도</option>
                                                            {[...Array(100).keys()].map(i => (
                                                                <option key={i} value={new Date().getFullYear() - i}>
                                                                    {new Date().getFullYear() - i}
                                                                </option>
                                                            ))}
                                                        </Form.Select>
                                                    </Col>
                                                    년
                                                    <Col>
                                                        <Form.Select
                                                            {...register('birthDate.month', {required: '월을 선택하세요'})}
                                                        >
                                                            <option>월</option>
                                                            {[...Array(12).keys()].map(i => (
                                                                <option key={i + 1} value={i + 1}>
                                                                    {i + 1}
                                                                </option>
                                                            ))}
                                                        </Form.Select>
                                                    </Col>
                                                    월
                                                    <Col>
                                                        <Form.Select
                                                            {...register('birthDate.day', {required: '일을 선택하세요'})}
                                                        >
                                                            <option>일</option>
                                                            {[...Array(31).keys()].map(i => (
                                                                <option key={i + 1} value={i + 1}>
                                                                    {i + 1}
                                                                </option>
                                                            ))}
                                                        </Form.Select>
                                                    </Col>일
                                                </Row>
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>성별</Form.Label>
                                                <Form.Select
                                                    {...register('gender', {required: '성별을 선택하세요'})}
                                                >
                                                    <option value={''} disabled>
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
                                                    placeholder="키를 입력하세요"
                                                    {...register('height', {required: '키를 입력하세요'})}
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>체형</Form.Label>
                                                <Form.Select
                                                    {...register('bodyType', {required: '체형을 선택하세요'})}
                                                >
                                                    <option value={''} disabled>
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
                                                <Form.Select
                                                    {...register('drinking', {required: '음주정도를 선택하세요'})}
                                                >
                                                    <option value={''} disabled>
                                                        음주정도를 선택하세요
                                                    </option>
                                                    <option value={'1'}>아예 안마심</option>
                                                    <option value={'2'}>가끔 한두잔</option>
                                                    <option value={'3'}>주에 한번</option>
                                                    <option value={'4'}>주에 두번 이상</option>
                                                </Form.Select>
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>흡연</Form.Label>
                                                <Form.Select
                                                    {...register('smoking', {required: '흡연 여부를 선택하세요'})}
                                                >
                                                    <option value={''} disabled>
                                                        흡연여부를 선택하세요
                                                    </option>
                                                    <option value={true}>흡연자</option>
                                                    <option value={false}>비흡연자</option>
                                                </Form.Select>
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>혈액형</Form.Label>
                                                <Form.Select
                                                    {...register('bloodType', {required: '혈액형을 선택하세요'})}
                                                >
                                                    <option value={''} disabled>
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
                                                    placeholder="MBTI 를 입력하세요"
                                                    {...register('mbtiType', {required: 'MBTI를 입력하세요'})}
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>자기소개 한마디</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    placeholder="자기소개를 입력하세요"
                                                    {...register('selfIntroduce', {required: '자기소개를 입력하세요'})}
                                                />
                                            </Form.Group>
                                            <Button
                                                className={'mt-3 mb-5'}
                                                style={{width: '100%', height: '3rem'}}
                                                type='submit'
                                            >개인정보
                                                {Object.keys(profileInfo).length === 0 ? ' 생성하기' : ' 업데이트'}
                                                {console.log('ob',Object.keys(profileInfo))}
                                            </Button>
                                        </Form>
                                    </Card.Text>
                                </Card.Body>
                            </Card>


                        </Col>
                        <Col/>
                    </Row>
                    <Row/>
                </ViewContainer>
            )}
        </>
    )
};

export default Privacy;