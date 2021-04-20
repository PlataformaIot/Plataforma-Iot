import React, { useState, useEffect } from 'react';
import { Col, Row, Container, CardDeck, Card, Jumbotron, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsClipboardData, BsGraphUp } from 'react-icons/bs'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { SiOpenstreetmap } from 'react-icons/si'
import { RiAddFill } from 'react-icons/ri'
import Graph from '../../Pages/Graph';
import './styles.css';
import Mapa from '../Map';
import Combo from '../../components/SelectDeviceCombo';



import { useSelector, useDispatch } from 'react-redux';


export default function Home() {
    const selectedDevice = useSelector((state) => state.devicesState.selectedDevice);
    const devices = useSelector((state) => state.devicesState.devices);
    const dadosDevice = useSelector((state) => state.devicesState.dadosDevice);
    const dispatch = useDispatch()


    useEffect(() => { }, [selectedDevice, dadosDevice])

    console.log(dadosDevice.filter((device) => device.device === selectedDevice)[0] ?
        dadosDevice.filter((device) => device.device === selectedDevice)[0].type : "UNDEFINED");

    return (


        <Container fluid style={{ margin: '40px 0px', marginBottom: '20%' }}>
            <Row lg={true}>


                <Col style={{ marginBottom: '5%' }}>
                    {/* <p>VARIÁVEL: {JSON.stringify(dadosDevice)}</p> */}

                    {

                        selectedDevice === "" ? (
                            dadosDevice.length > 0 ? (
                                dadosDevice[0].type ?
                                    dadosDevice[0].type === "temp" ?
                                        <div>
                                            <Col lg="12" style={{ marginBottom: '5%' }}>
                                                <h2 style={{ textAlign: 'center', marginBottom: '2%' }}>Gráfico</h2>
                                                <Card>
                                                    <Card.Body>
                                                        <Graph />
                                                    </Card.Body>
                                                </Card>
                                            </Col>

                                            <CardDeck>
                                                <Card bg="success" text='light'>
                                                    <Card.Body>
                                                        <Card.Title>Consumo de Bateria</Card.Title>
                                                        <Card.Text>
                                                            <h1><strong>{selectedDevice === '' ? (dadosDevice.length > 0 ? dadosDevice[0].bateria : "") : dadosDevice.filter((device) => device.device === selectedDevice)[0].bateria}v</strong></h1>
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                                <Card bg="danger" text='light'>
                                                    <Card.Body>
                                                        <Card.Title>Temperatura</Card.Title>
                                                        <Card.Text>
                                                            <h1><strong>{selectedDevice === '' ? (dadosDevice.length > 0 ? dadosDevice[0].temp : "") : dadosDevice.filter((device) => device.device === selectedDevice)[0].temp}%</strong></h1>
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                                <Card bg="light" text='black'>
                                                    <Card.Body>
                                                        <Card.Title>Umidade</Card.Title>
                                                        <Card.Text>
                                                            <h1><strong>{selectedDevice === '' ? (dadosDevice.length > 0 ? dadosDevice[0].hum : "") : dadosDevice.filter((device) => device.device === selectedDevice)[0].hum}%</strong></h1>
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </CardDeck>
                                        </div>
                                        :
                                        <div>
                                            <Row>
                                                <Col lg="12" style={{ textAlign: 'center', marginBottom: '2%' }}>
                                                    <h2 style={{ textAlign: 'center', marginBottom: '2%' }}>Mapa</h2>
                                                    <Card>
                                                        <Card.Body>
                                                            <Mapa />
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                                <Col>
                                                    <CardDeck>
                                                        <Card bg="success" text='light'>
                                                            <Card.Body>
                                                                <Card.Title>Consumo de Bateria</Card.Title>
                                                                <Card.Text>
                                                                    <h1><strong>{selectedDevice === '' ? (dadosDevice.length > 0 ? dadosDevice[0].bateria : "") : dadosDevice.filter((device) => device.device === selectedDevice)[0].bateria}v</strong></h1>
                                                                </Card.Text>
                                                            </Card.Body>
                                                        </Card>
                                                    </CardDeck>
                                                </Col>
                                            </Row>
                                        </div>
                                    : ""
                            )
                                : ""
                        ) : (
                            dadosDevice.filter((device) => device.device === selectedDevice)[0] ?
                                dadosDevice.filter((device) => device.device === selectedDevice)[0].type === "temp" ?
                                    <div>
                                        <Col lg="12" style={{ marginBottom: '5%' }}>
                                            <h2 style={{ textAlign: 'center', marginBottom: '2%' }}>Gráfico</h2>
                                            <Card>
                                                <Card.Body>
                                                    <Graph />
                                                </Card.Body>
                                            </Card>
                                        </Col>

                                        <CardDeck>
                                            <Card bg="success" text='light'>
                                                <Card.Body>
                                                    <Card.Title>Consumo de Bateria</Card.Title>
                                                    <Card.Text>
                                                        <h1><strong>{selectedDevice === '' ? (dadosDevice.length > 0 ? dadosDevice[0].bateria : "") : dadosDevice.filter((device) => device.device === selectedDevice)[0].bateria}v</strong></h1>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                            <Card bg="danger" text='light'>
                                                <Card.Body>
                                                    <Card.Title>Temperatura</Card.Title>
                                                    <Card.Text>
                                                        <h1><strong>{selectedDevice === '' ? (dadosDevice.length > 0 ? dadosDevice[0].temp : "") : dadosDevice.filter((device) => device.device === selectedDevice)[0].temp}%</strong></h1>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                            <Card bg="light" text='black'>
                                                <Card.Body>
                                                    <Card.Title>Umidade</Card.Title>
                                                    <Card.Text>
                                                        <h1><strong>{selectedDevice === '' ? (dadosDevice.length > 0 ? dadosDevice[0].hum : "") : dadosDevice.filter((device) => device.device === selectedDevice)[0].hum}%</strong></h1>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </CardDeck>
                                    </div>
                                    :
                                    <div>
                                        <Row>
                                            <Col lg="12" style={{ textAlign: 'center', marginBottom: '2%' }}>
                                                <h2 style={{ textAlign: 'center', marginBottom: '2%' }}>Mapa</h2>
                                                <Card>
                                                    <Card.Body>
                                                        <Mapa />
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                            <Col>
                                                <CardDeck>
                                                    <Card bg="success" text='light'>
                                                        <Card.Body>
                                                            <Card.Title>Consumo de Bateria</Card.Title>
                                                            <Card.Text>
                                                                <h1><strong>{selectedDevice === '' ? (dadosDevice.length > 0 ? dadosDevice[0].bateria : "") : dadosDevice.filter((device) => device.device === selectedDevice)[0].bateria}v</strong></h1>
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                </CardDeck>
                                            </Col>
                                        </Row>
                                    </div>
                                :
                                ""
                        )

                    }


                </Col>


            </Row>
        </Container >



    )
}