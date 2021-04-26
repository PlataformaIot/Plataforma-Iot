import React from 'react';
import { Container, Row, Col, Card, CardDeck, Table, ListGroup } from 'react-bootstrap';
import ReactIcon from '../../assets/logo.svg';
import './styles.css';


export default function Dispositivos() {
    return (
        <Container fluid>
            <h1 style={{ textAlign: 'center' }}>Dispositivos Cadastrados</h1>
            <Row>
                <Col>
                    <Card >
                        <Card.Header>Device 1</Card.Header>
                        <Card.Body className="cardDirection" >
                            <Card.Img src={ReactIcon} className="cardImg" style={{width:'18rem'}} />
                                <ListGroup className="tableStyle">
                                    <ListGroup.Item>Dispositivo:</ListGroup.Item>
                                    <ListGroup.Item>Dispositivo:</ListGroup.Item>
                                    <ListGroup.Item>Dispositivo:</ListGroup.Item>
                                    <ListGroup.Item>Dispositivo:</ListGroup.Item>
                                </ListGroup>
                      
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}