import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Card, Col, Container, Row, Form, Dropdown} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";

const CreatePrivacy = () => {
    const navigate = useNavigate();

    const [profileInfo, setProfileInfo] = useState({})
    const [country, setCountry] = useState('')
    const [bornArea, setBornArea] = useState('')
    const [addressOfHome, setAddressOfHome] = useState('')
    const [activityArea, setActivityArea] = useState('')
    const [age, setAge] = useState('')
    const [birth, setBirth] = useState('')
    const [dayta, setDayta] = useState({
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        day: new Date().getDate()
    })
    const [gender, setGender] = useState('')
    const [height, setHeight] = useState('키를 입력하세요')
    const [bodyType, setBodyType] = useState(6)
    const [drink, setDrink] = useState('')
    const [smoking, setSmoking] = useState('')
    const [bloodType, setBloodType] = useState('')
    const [mbtiType, setMbtiType] = useState('')
    const [selfIntroduce, setSelfIntroduce] = useState('')


    const getProfileInfo = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
            const {data} = await axios.get('http://localhost:7070/api/auth', config)
            // ^^유알엘에 필요한 정보가 담겨있고, config 에 authorization 정보를 담겨있다
            console.log('+++++++++++++++++++++', data.body.profile)
            const {
                country,
                bornArea,
                addressOfHome,
                activityArea,
                age,
                birth,
                gender,
                height,
                bodyType,
                drinking,
                smoking,
                bloodType,
                mbtiType,
                selfIntroduce
            } = data.body.profile


            const formattedMonth = String(birth.month).padStart(2, '0');
            const formattedDay = String(birth.day).padStart(2, '0');
            setBirth(`${birth.year}-${formattedMonth}-${formattedDay}`);
            setDayta({
                year: new Date().getFullYear()
            })



            setCountry(country)
            setBornArea(bornArea)
            setAddressOfHome(addressOfHome)
            setActivityArea(activityArea)
            setAge(age)
            setGender(gender)
            setHeight(height)
            setBodyType(bodyType)
            setDrink(drinking)
            setSmoking(smoking)
            setBloodType(bloodType)
            setMbtiType(mbtiType)
            setSelfIntroduce(selfIntroduce)
        } catch (err) {
            console.log('겟인포에러', err)
        }
    }

    const submitHandler = async (e) => {
        try {
            const userInput = {
                country,
                bornArea,
                addressOfHome,
                activityArea,
                birth,
                age,
                gender,
                height,
                bodyType,
                drink,
                smoking,
                bloodType,
                mbtiType,
                selfIntroduce,
            }
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
            const url = 'http://localhost:7070/api/profile'
            const {data, status} = await axios.post(url, userInput, config)

            /////

            /////

            if (status === 201) {
                alert('create ok')
                navigate('/profile')
            }
            console.log(userInput)
        } catch (err) {
            console.log('--------------', err)
        }
    }

    useEffect(() => {
        const formattedMonth = String(dayta.month).padStart(2, '0');
        const formattedDay = String(dayta.day).padStart(2, '0');
        setBirth(`${dayta.year}-${formattedMonth}-${formattedDay}`);
        getProfileInfo()
    }, []);

    return (
        <Container>
            <Row/>
            <Row>
                <Col/>
                <Col className={'mt-5'}>
                    <Card style={{width: '25rem', border: '1px solid #ccc'}}>
                        <Card.Body>
                            <Card.Title className={'mb-3'}>*개인정보 생성*</Card.Title>
                            <Card.Text style={{lineHeight: '2rem'}}>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label>국적</Form.Label>
                                        <Form.Select
                                            value={country}
                                            onChange={(e) => setCountry(e.target.value)}>
                                            <option>국적을 선택하세요</option>
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
                                            <option value="Bolivia (Plurinational State of)">Bolivia (Plurinational
                                                State of)
                                            </option>
                                            <option value="Bonaire, Sint Eustatius and Saba">Bonaire, Sint Eustatius and
                                                Saba
                                            </option>
                                            <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
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
                                            <option value="Central African Republic">Central African Republic</option>
                                            <option value="Chad">Chad</option>
                                            <option value="Chile">Chile</option>
                                            <option value="China">China</option>
                                            <option value="Christmas Island">Christmas Island</option>
                                            <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                                            <option value="Colombia">Colombia</option>
                                            <option value="Comoros">Comoros</option>
                                            <option value="Congo">Congo</option>
                                            <option value="Congo, Democratic Republic of the">Congo, Democratic Republic
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
                                            <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)
                                            </option>
                                            <option value="Faroe Islands">Faroe Islands</option>
                                            <option value="Fiji">Fiji</option>
                                            <option value="Finland">Finland</option>
                                            <option value="France">France</option>
                                            <option value="French Guiana">French Guiana</option>
                                            <option value="French Polynesia">French Polynesia</option>
                                            <option value="French Southern Territories">French Southern Territories
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
                                            <option value="Heard Island and McDonald Islands">Heard Island and McDonald
                                                Islands
                                            </option>
                                            <option value="Holy See">Holy See</option>
                                            <option value="Honduras">Honduras</option>
                                            <option value="Hong Kong">Hong Kong</option>
                                            <option value="Hungary">Hungary</option>
                                            <option value="Iceland">Iceland</option>
                                            <option value="India">India</option>
                                            <option value="Indonesia">Indonesia</option>
                                            <option value="Iran (Islamic Republic of)">Iran (Islamic Republic of)
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
                                            <option value="Korea (Democratic People's Republic of)">Korea (Democratic
                                                People's Republic of)
                                            </option>
                                            <option value="Korea, Republic of">Korea, Republic of</option>
                                            <option value="Kuwait">Kuwait</option>
                                            <option value="Kyrgyzstan">Kyrgyzstan</option>
                                            <option value="Lao People's Democratic Republic">Lao People's Democratic
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
                                            <option value="Micronesia (Federated States of)">Micronesia (Federated
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
                                            <option value="Netherlands, Kingdom of the">Netherlands, Kingdom of the
                                            </option>
                                            <option value="New Caledonia">New Caledonia</option>
                                            <option value="New Zealand">New Zealand</option>
                                            <option value="Nicaragua">Nicaragua</option>
                                            <option value="Niger">Niger</option>
                                            <option value="Nigeria">Nigeria</option>
                                            <option value="Niue">Niue</option>
                                            <option value="Norfolk Island">Norfolk Island</option>
                                            <option value="North Macedonia">North Macedonia</option>
                                            <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                                            <option value="Norway">Norway</option>
                                            <option value="Oman">Oman</option>
                                            <option value="Pakistan">Pakistan</option>
                                            <option value="Palau">Palau</option>
                                            <option value="Palestine, State of[b]">Palestine, State of[b]</option>
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
                                            <option value="Saint Helena, Ascension and Tristan da Cunha">Saint Helena,
                                                Ascension and Tristan da Cunha
                                            </option>
                                            <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                                            <option value="Saint Lucia">Saint Lucia</option>
                                            <option value="Saint Martin (French part)">Saint Martin (French part)
                                            </option>
                                            <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                                            <option value="Saint Vincent and the Grenadines">Saint Vincent and the
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
                                            <option value="Sint Maarten (Dutch part)">Sint Maarten (Dutch part)</option>
                                            <option value="Slovakia">Slovakia</option>
                                            <option value="Slovenia">Slovenia</option>
                                            <option value="Solomon Islands">Solomon Islands</option>
                                            <option value="Somalia">Somalia</option>
                                            <option value="South Africa">South Africa</option>
                                            <option value="South Georgia and the South Sandwich Islands">South Georgia
                                                and the South Sandwich Islands
                                            </option>
                                            <option value="South Sudan">South Sudan</option>
                                            <option value="Spain">Spain</option>
                                            <option value="Sri Lanka">Sri Lanka</option>
                                            <option value="Sudan">Sudan</option>
                                            <option value="Suriname">Suriname</option>
                                            <option value="Svalbard and Jan Mayen[e]">Svalbard and Jan Mayen[e]</option>
                                            <option value="Sweden">Sweden</option>
                                            <option value="Switzerland">Switzerland</option>
                                            <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                                            <option value="Taiwan, Province of China">Taiwan, Province of China</option>
                                            <option value="Tajikistan">Tajikistan</option>
                                            <option value="Tanzania, United Republic of">Tanzania, United Republic of
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
                                            <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
                                            <option value="Tuvalu">Tuvalu</option>
                                            <option value="Uganda">Uganda</option>
                                            <option value="Ukraine">Ukraine</option>
                                            <option value="United Arab Emirates">United Arab Emirates</option>
                                            <option value="United Kingdom of Great Britain and Northern Ireland">United
                                                Kingdom of Great Britain and Northern Ireland
                                            </option>
                                            <option value="United States of America">United States of America</option>
                                            <option value="United States Minor Outlying Islands">United States Minor
                                                Outlying Islands
                                            </option>
                                            <option value="Uruguay">Uruguay</option>
                                            <option value="Uzbekistan">Uzbekistan</option>
                                            <option value="Vanuatu">Vanuatu</option>
                                            <option value="Venezuela (Bolivarian Republic of)">Venezuela (Bolivarian
                                                Republic of)
                                            </option>
                                            <option value="Viet Nam">Viet Nam</option>
                                            <option value="Virgin Islands (British)">Virgin Islands (British)</option>
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
                                            value={bornArea}
                                            onChange={(e) => setBornArea(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>현재 주소</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="주소를 입력하세요"
                                            value={addressOfHome}
                                            onChange={(e) => setAddressOfHome(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>활동 지역</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="활동지역을 입력하세요"
                                            value={activityArea}
                                            onChange={(e) => setActivityArea(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>나이</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="나이를 입력하세요"
                                            value={age}
                                            onChange={(e) => setAge(Number(e.target.value))}/>
                                    </Form.Group>


                                    <Form.Group className="mb-3">
                                        <Form.Label>출생정보</Form.Label>
                                        <Row>
                                            <Col>
                                                <Form.Select
                                                    value={ dayta.year}
                                                    onChange={(e) => setDayta((prevDayta) => ({
                                                        ...prevDayta,
                                                        year: e.target.value
                                                    }))}
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
                                                <Form.Select value={dayta.month}
                                                             onChange={(e) => setDayta((prevDayta) => ({
                                                                 ...prevDayta,
                                                                 month: e.target.value
                                                             }))}
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
                                                <Form.Select value={dayta.day}
                                                             onChange={(e) => setDayta((prevDayta) => ({
                                                                 ...prevDayta,
                                                                 day: e.target.value
                                                             }))}
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
                                            placeholder="키를 입력하세요"
                                            value={height}
                                            onChange={(e) => setHeight(Number(e.target.value))}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>체형</Form.Label>
                                        <Form.Select value={bodyType}
                                                     onChange={(e) => setBodyType(Number(e.target.value))}>
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
                                        <Form.Select value={drink} onChange={(e) => setDrink(e.target.value)}>
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
                                        <Form.Label>흡연</Form.Label>
                                        <Form.Select value={smoking}
                                                     onChange={(e) => setSmoking(JSON.parse(e.target.value))}>
                                            <option>
                                                흡연여부를 선택하세요
                                            </option>
                                            <option value={true}>흡연자</option>
                                            <option value={false}>비흡연자</option>
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
                                            placeholder="MBTI 를 입력하세요"
                                            value={mbtiType}
                                            onChange={(e) => setMbtiType(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>자기소개 한마디</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="자기소개를 입력하세요"
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


export default CreatePrivacy;