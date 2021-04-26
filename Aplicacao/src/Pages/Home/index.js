import React, { useState, useEffect } from 'react';
import { Col, Row, Container, CardDeck, Card, Jumbotron, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import './styles.css';
import { getDevice, getpropsDevice } from '../../store/functions'
import Graph from '../../Pages/Graph';
import Mapa from '../Map';
import Info from '../Indicator';


const maiorVbat = 3.7, menorVbat = 2.5;

export default function Home() {
    const selectedDevice = useSelector((state) => state.devicesState.selectedDevice);
    const devices = useSelector((state) => state.devicesState.devices);
    const dadosDevice = useSelector((state) => state.devicesState.dadosDevice);
    const device = getDevice(devices, selectedDevice);
    const propsDevice = getpropsDevice(dadosDevice);
    useEffect(() => { }, [selectedDevice, dadosDevice])

    console.log(device.type ? device.type : "UNDEFINED");


    function verificaLista(lista, prop) {
        const selDevice = (lista.length > 0) ? (selectedDevice === '' ? lista[0].device : lista.filter((dev) => dev.device === selectedDevice)) : []
        return (selDevice.length > 0) & selDevice[0][prop] ? selDevice[0][prop] : 0.0
    }


    return (
        <Container fluid style={{ margin: '40px 0px', marginBottom: '20%' }}>
            <Row lg={true}>
                <Col lg="12">
                    <Info />
                </Col>
                <Col style={{ marginBottom: '5%' }}>
                    {
                        (dadosDevice.length > 0) ?
                            (
                                dadosDevice.filter((device) => device.device === selectedDevice)[0] ?
                                    drawInfoPanel() : ""
                            ) : ""
                    }
                </Col>
            </Row>
        </Container >
    )


    function drawInfoPanel() {
        var cargaBateria = verificaLista(dadosDevice, "bateria") - menorVbat;
        var cargaBateria = 100 * cargaBateria / (maiorVbat - menorVbat);
        if (cargaBateria > 100) cargaBateria = 100;

        return (
            <div>
                <Jumbotron>
                    <h2 style={{ textAlign: 'center' }}>Informações do Dispositivo</h2>
                    <CardDeck style={{ marginBottom: '2%' }}>
                        {propsDevice.includes('bateria') ? (
                            <Card bg="success" text='light'>
                                <Card.Body>
                                    <Card.Title>Carga da Bateria</Card.Title>
                                    <Card.Text>
                                        <h1><strong>{cargaBateria.toFixed(0)}%</strong></h1>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        ) : ""}
                        {propsDevice.includes('temp') ? (
                            <Card bg="danger" text='light'>
                                <Card.Body>
                                    <Card.Title>Temperatura</Card.Title>
                                    <Card.Text>
                                        <h1><strong>{verificaLista(dadosDevice, "temp").toFixed(2)}°C</strong></h1>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        ) : ""}
                        {propsDevice.includes('hum') ? (
                            <Card bg="light" text='black'>
                                <Card.Body>
                                    <Card.Title>Umidade</Card.Title>
                                    <Card.Text>
                                        <h1><strong>{verificaLista(dadosDevice, "hum").toFixed(2)}%</strong></h1>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        ) : ""}
                        {propsDevice.includes('velocidade') ? (
                            <Card bg="warning" text='black'>
                                <Card.Body>
                                    <Card.Title>Umidade</Card.Title>
                                    <Card.Text>
                                        <h1><strong>{verificaLista(dadosDevice, "velocidade")}km/h</strong></h1>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        ) : ""}                </CardDeck>
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

                { (propsDevice.includes('lat') || propsDevice.includes('long')) ? (
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
                ) : ""}

            </div>
        )
    }
}