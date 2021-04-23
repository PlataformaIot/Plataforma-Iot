import React from 'react';
import { Container, Row, Col, Card, CardDeck, Table } from 'react-bootstrap';
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
                            <Card.Img src={ReactIcon} className="cardImg" />
                                <Table striped bordered hover className="tableStyle">
                                    <tbody>
                                        <tr>
                                            <td>Nome:</td>
                                        </tr>
                                        <tr>
                                            <td>Nome: dasdasd</td>
                                        </tr>
                                    </tbody>
                                </Table>
                      
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}