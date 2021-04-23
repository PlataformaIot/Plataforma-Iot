import React, { useState, useEffect } from 'react';
import { Col, Row, Container, CardDeck, Card, Jumbotron, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Graph from '../../Pages/Graph';
import './styles.css';
import Mapa from '../Map';
import { GetDadosDevice} from '../../store/functions'


export default function Home() {
    const {device,dadosDevice,propsDevice,selectedDevice} = GetDadosDevice()

    console.log(dadosDevice.filter((device) => device.device === selectedDevice)[0] ?
        dadosDevice.filter((device) => device.device === selectedDevice)[0].type : "UNDEFINED");

    function verificaLista(lista,prop){
         const selDevice = (lista.length > 0) ? (selectedDevice === '' ? lista[0].device : lista.filter((dev) => dev.device === selectedDevice)) : []
         return (selDevice.length > 0) ? selDevice[0][prop] : ""
    }

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
                                            <Jumbotron>
                                                <CardDeck>
                                                    <Card bg="success" text='light'>
                                                        <Card.Body>
                                                            <Card.Title>Tensão da Bateria</Card.Title>
                                                            <Card.Text>
                                                                <h1><strong>{verificaLista(dadosDevice,"bateria")}V</strong></h1>
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    <Card bg="danger" text='light'>
                                                        <Card.Body>
                                                            <Card.Title>Temperatura</Card.Title>
                                                            <Card.Text>
                                                                <h1><strong>{verificaLista(dadosDevice,"temp").toFixed(2)}°C</strong></h1>
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    <Card bg="light" text='black'>
                                                        <Card.Body>
                                                            <Card.Title>Umidade</Card.Title>
                                                            <Card.Text>
                                                                <h1><strong>{verificaLista(dadosDevice,"hum").toFixed(2)}%</strong></h1>
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                </CardDeck>
                                            </Jumbotron>
                                            <Jumbotron>
                                                <Col lg="12" style={{ marginBottom: '5%' }}>
                                                    <h2 style={{ textAlign: 'center', marginBottom: '2%' }}>Gráfico</h2>
                                                    <Card>
                                                        <Card.Body>
                                                            <Graph />
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            </Jumbotron>
                                        </div>
                                        :
                                        <div>
                                                <Jumbotron>
                                                    <Col>
                                                        <CardDeck>
                                                            <Card bg="success" text='light' >
                                                                <Card.Body>
                                                                    <Card.Title>Tensão da Bateria</Card.Title>
                                                                    <Card.Text>
                                                                        <h1><strong>{verificaLista(dadosDevice,"bateria")}V</strong></h1>
                                                                    </Card.Text>
                                                                </Card.Body>
                                                            </Card>
                                                        </CardDeck>
                                                    </Col>
                                                </Jumbotron>
                                                <Jumbotron>
                                                    <Col lg="12" style={{ textAlign: 'center', marginBottom: '2%' }}>
                                                        <h2 style={{ textAlign: 'center', marginBottom: '2%' }}>Mapa</h2>
                                                        <Card>
                                                            <Card.Body>
                                                                <Mapa />
                                                            </Card.Body>
                                                        </Card>
                                                    </Col>
                                                </Jumbotron>
                                        </div>
                                    : ""
                            )
                                : ""
                        ) : (
                            dadosDevice.filter((device) => device.device === selectedDevice)[0] ?
                                dadosDevice.filter((device) => device.device === selectedDevice)[0].type === "temp" ?
                                    <div>
                                        <Jumbotron>
                                            <h2 style={{ textAlign: 'center' }}>Informações do Dispositivo</h2>
                                            <CardDeck style={{ marginBottom: '2%' }}>
                                                <Card bg="success" text='light'>
                                                    <Card.Body>
                                                        <Card.Title>Tensão da Bateria</Card.Title>
                                                        <Card.Text>
                                                            <h1><strong>{verificaLista(dadosDevice,"bateria")}V</strong></h1>
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                                <Card bg="danger" text='light'>
                                                    <Card.Body>
                                                        <Card.Title>Temperatura</Card.Title>
                                                        <Card.Text>
                                                            <h1><strong>{verificaLista(dadosDevice,"temp").toFixed(2)}°C</strong></h1>
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                                <Card bg="light" text='black'>
                                                    <Card.Body>
                                                        <Card.Title>Umidade</Card.Title>
                                                        <Card.Text>
                                                            <h1><strong>{verificaLista(dadosDevice,"hum").toFixed(2)}%</strong></h1>
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </CardDeck>
                                        </Jumbotron>
                                        <Jumbotron>
                                            <Col lg="12" style={{ marginBottom: '5%' }}>
                                                <h2 style={{ textAlign: 'center', marginBottom: '2%' }}>Gráfico</h2>
                                                <Card>
                                                    <Card.Body>
                                                        <Graph />
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        </Jumbotron>
                                    </div>
                                    :
                                    <div>
                                        <Jumbotron>

                                            <Col>
                                                <h2 style={{ textAlign: 'center', marginBottom: '2%'  }}>Informações do Dispositivo</h2>
                                                
                                                <CardDeck style={{ textAlign: 'center', marginBottom: '2%' }}>
                                                <Container >
                                                <Row>
                                                    <Col sm={12} style={{ marginLeft: '290px'}}>  
                                                    <Card bg="success" text='light' >
                                                        <Card.Body>
                                                            <Card.Title>Tensão da Bateria</Card.Title>
                                                            <Card.Text>
                                                                <h1><strong>{verificaLista(dadosDevice,"bateria")}V</strong></h1>
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    </Col>
                                                    </Row>
                                                </Container>
                                                </CardDeck>
                                               
                                            </Col>
                                        </Jumbotron>

                                        <Jumbotron>
                                            <Col style={{ textAlign: 'center', marginBottom: '2%' }}>
                                                <h2 style={{ textAlign: 'center', marginBottom: '2%' }}>Mapa</h2>
                                                <Card>
                                                    <Card.Body>
                                                        <Mapa />
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        </Jumbotron>
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