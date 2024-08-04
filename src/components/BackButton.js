import React from "react";
import { Col, Row } from "react-bootstrap";
import { FaBackspace } from "react-icons/fa";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const BackButton = ({ btnStyle = { marginLeft: "2rem" } }) => {
  const navigate = useNavigate();

  return (
    <Row>
      <Col />
      <Col xs={6}>
        <Backbtn onClick={() => navigate(-1)} style={btnStyle} />
      </Col>
      <Col />
    </Row>
  );
};

const Backbtn = styled(FaBackspace)`
  background-color: white;
  cursor: pointer;
  transition: background-color 0.1s ease, transform 0.1s ease;
  font-size: 3rem;
  margin-right: 1rem;

  &:active {
    transform: scale(0.9);
  }
`;

export default BackButton;
