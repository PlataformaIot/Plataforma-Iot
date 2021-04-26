import React, { useEffect } from 'react';
import { Container, Row, Col, Card, CardDeck, ListGroup, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux'
import ReactIcon from '../../assets/logo.svg';
import {MdModeEdit} from 'react-icons/md';
import {BsFillTrashFill} from 'react-icons/bs';
import './styles.css';




export default function Dispositivos() {

    const selectedDevice = useSelector((state) => state.devicesState.selectedDevice);
    const devices = useSelector((state) => state.devicesState.devices);
    
    return (
        <Container fluid>
            <h1 style={{ textAlign: 'center' }}>Dispositivos Cadastrados</h1>
            <Row>
                <Col>
                    <Card >
                        <Card.Header>Device 1</Card.Header>
                        <Card.Body className="cardDirection" >
                            <Card.Img src={ReactIcon} className="cardImg" style={{ width: '18rem' }} />
                            <ListGroup className="tableStyle">
                                <ListGroup.Item>Dispositivo:</ListGroup.Item>
                                <ListGroup.Item>Dispositivo:</ListGroup.Item>
                                <ListGroup.Item>Dispositivo:</ListGroup.Item>
                                <ListGroup.Item>Dispositivo:</ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                            <div className="btnFooter">
                                <Button variant="success"><MdModeEdit size={20}/></Button>
                                <Button variant="danger"><BsFillTrashFill size={20}/></Button>
                            </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}