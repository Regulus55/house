import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const message = [
    { text: 'Sending.' },
    { text: 'Sending..' },
    { text: 'Sending...' },
];

const LoadingBar = () => {
    const [currentMessage, setCurrentMessage] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentMessage(prevMessage => (prevMessage + 1) % message.length);
        }, 300);
        return () => clearInterval(intervalId)
    }, []);

    return (
        <Container>
            <Row>
                <Col />
                <Col>
                    <img
                        src={"https://static.vecteezy.com/system/resources/previews/002/205/854/non_2x/email-icon-free-vector.jpg"}
                        style={{ width: '20rem', height: '20rem' }}
                        alt="Loading"
                    />
                    <div style={{ display: 'flex', justifyContent: 'center', fontSize: '5rem' }}>
                        {message[currentMessage].text}
                    </div>
                </Col>
                <Col />
            </Row>
        </Container>
    );
};

export default LoadingBar;
