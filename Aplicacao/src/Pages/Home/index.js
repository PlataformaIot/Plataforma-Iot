import React, { useState, useEffect } from 'react';
import { Col, Row, Container, CardDeck, Card, Jumbotron } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsClipboardData, BsGraphUp } from 'react-icons/bs'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { SiOpenstreetmap } from 'react-icons/si'
import { RiAddFill } from 'react-icons/ri'
import Graph from '../../Pages/Graph';
import './styles.css';
import api from '../../Connections/api';

import { useSelector } from 'react-redux';

export default function Home() {
    const selectedDevice = useSelector((state) => state.devicesState.selectedDevice)
    const devices = useSelector((state) => state.devicesState.devices)
    const [navigation, setNavigation] = useState([
        { id: '1', title: 'Adicionar dispositivo', info: 'Cadastrar novo didpositivo', icon: <RiAddFill size={40} />, nav: '/cadastro' },
        { id: '2', title: 'Indicador', info: 'Informações do Dispositivo', icon: <AiOutlineInfoCircle size={50} />, nav: '/indicator' },
        { id: '3', title: 'Localização', info: 'Localização do dispositivo', icon: <SiOpenstreetmap size={50} />, nav: '/map' },
    ]);




    useEffect(() => {

    }, [selectedDevice])


    return (


        <Container fluid>
            <Row lg={true}>
                <Col lg='3' >
                    <Jumbotron>
                        <CardDeck style={{ textAlign: 'center' }}>
                            {navigation.map(dados => (
                                <Link to={dados.nav} style={{ textDecoration: 'none' }}>
                                    <Card style={{ marginBottom: '5%' }}>
                                        <Card.Body>
                                            <Card.Title>{dados.title}</Card.Title>
                                            {dados.icon}
                                            <Card.Text>
                                                {dados.info}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            ))}
                        </CardDeck>
                    </Jumbotron>

                </Col>
                <Col>

                    <div className="info">
                        <CardDeck>
                            <Card bg="danger" text='light'>
                                <Card.Body>
                                    <Card.Title>Temperatura</Card.Title>
                                    <Card.Text>
                                        <h1><strong>{selectedDevice === '' ? (devices.length > 0 ? devices[0].temperatura : "") : devices.filter((device) => device.device === selectedDevice)[0].temperatura}ºC</strong></h1>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card bg="light">
                                <Card.Body>
                                    <Card.Title>Umidade</Card.Title>
                                    <Card.Text>
                                        <h1><strong>{selectedDevice === '' ? (devices.length > 0 ? devices[0].umidade : "") : devices.filter((device) => device.device === selectedDevice)[0].umidade}%</strong></h1>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card bg="success" text='light'>
                                <Card.Body>
                                    <Card.Title>Bateria</Card.Title>
                                    <Card.Text>
                                        <h1><strong>{selectedDevice === '' ? (devices.length > 0 ? devices[0].bateria : "") : devices.filter((device) => device.device === selectedDevice)[0].bateria}%</strong></h1>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </CardDeck>
                        <br></br>
                        <Card>
                            <Card.Body>
                                <Card.Title>Gráfico</Card.Title>
                                <Graph />
                            </Card.Body>
                        </Card>


                    </div>
                </Col>
            </Row>
        </Container >



    )
}