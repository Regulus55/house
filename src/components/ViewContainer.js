import React from 'react';
import {BackButton} from "./index";
import {Container} from "react-bootstrap";

const ViewContainer = ({children, cStyle='mt-5', sStyle, btnStyle}) => {
    //     viewContainer 란걸 만들고 괄호 안에 {children, cStyle, sStyle} 등을 넣는다,
    //     cStyle='mt-5' 라고 되어있으면 기본값이 mt-5 가 된다.
    //     return 안에 className={cStyle} 이런식으로 해둬야함. 그래야 적용됨.

    return (
        <Container className={cStyle} style={sStyle}>
            <BackButton btnStyle={btnStyle}/>
            {children}
             {/* ^^^ return 안에 {children} 을 넣어서 props 가 전달되게한다*/}
        </Container>
    );
};

export default ViewContainer;