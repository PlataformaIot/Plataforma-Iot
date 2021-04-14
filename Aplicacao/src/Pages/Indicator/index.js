import React, { useEffect } from 'react'
import { Container, Jumbotron, Card, Col, Row, Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup'
import Logo from '../../assets/logo.svg'
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useSelector } from 'react-redux'//necessario para usar o useSelector do redux
import './styles.css';


export default function Indicator() {
    const selectedDevice = useSelector((state) => state.devicesState.selectedDevice);//chama um dispositivo especifico do Redux
    const devices = useSelector((state) => state.devicesState.devices)
    const dadosDevice = useSelector((state) =>  state.devicesState.dadosDevice);

    useEffect(() => {}, [selectedDevice])//fica observando caso tenha alguma alteração

    return (
        <Container fluid>
            <Link to="/" >
                <Button variant="light" style={{ marginBottom: '2%' }}><IoMdArrowRoundBack size={30} /></Button>
            </Link>
            <Jumbotron>

                <h1 className="titleInfo">Informações</h1>
                <Row>

                    <Col lg="3">

                        <Card style={{ marginTop: '6%' }}>
                            <Card.Body>
                                <Card.Img src={Logo} />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>

                        <ListGroup>
                            <ListGroup.Item>Dispositivo: {selectedDevice === '' ? (devices.length > 0 ? devices[0].device : "") : devices.filter((device) => device.device === selectedDevice)[0].device} </ListGroup.Item>
                            <ListGroup.Item>Data do ultimo envio: {selectedDevice === '' ? (dadosDevice.length > 0 ? dadosDevice[0].ts : "") :  dadosDevice.filter((device) => device.device === selectedDevice)[0].ts} </ListGroup.Item>
                            <ListGroup.Item>Latitude: {selectedDevice === '' ? (dadosDevice.length > 0 ? dadosDevice[0].lat : "") : dadosDevice.filter((device) =>  device.device === selectedDevice)[0].lat} </ListGroup.Item>
                            <ListGroup.Item>Longitude: {selectedDevice === '' ? (dadosDevice.length > 0 ? dadosDevice[0].long : "") : dadosDevice.filter((device) => device.device === selectedDevice)[0].long}</ListGroup.Item>
                            <ListGroup.Item>Bateria: {selectedDevice === '' ? (dadosDevice.length > 0 ? dadosDevice[0].bateria : "") : dadosDevice.filter((device) => device.device === selectedDevice)[0].bateria} </ListGroup.Item>
                        </ListGroup>
                        <Link to="/tabela">
                            <Button variant="warning" style={{ marginTop: '2%' }}>Historico</Button>
                        </Link>
                    </Col>
                </Row>


            </Jumbotron>
        </Container>
    )
}