import React, { useEffect } from 'react'
import { Container, Jumbotron, Card, Col, Row, Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup'
import Logo from '../../assets/logo.svg'
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useSelector } from 'react-redux'//necessario para usar o useSelector do redux
import './styles.css';
import { getDevice, getDate } from '../../store/functions'


export default function Indicator() {
    const selectedDevice = useSelector((state) => state.devicesState.selectedDevice);//chama um dispositivo especifico do Redux
    const devices = useSelector((state) => state.devicesState.devices)
    const dadosDevice = useSelector((state) => state.devicesState.dadosDevice);
    const device = getDevice(devices, selectedDevice);

    useEffect(() => {
        console.log(dadosDevice.filter((device) => device.device === selectedDevice)[0] ?
            dadosDevice.filter((device) => device.device === selectedDevice)[0].type : "UNDEFINED");
    }, [selectedDevice])//fica observando caso tenha alguma alteração

    function verificaLista(lista, prop) {
        const selDevice = (lista.length > 0) ? (selectedDevice === '' ? lista[0].device : lista.filter((dev) => dev.device === selectedDevice)) : []
        return (selDevice.length > 0) & selDevice[0][prop] ? selDevice[0][prop] : 0.0
    }
    
    function getpropsDevice(){
        //selectedDevice === '' ? (dadosDevice.length > 0 ? dadosDevice[0].ts : "") : dadosDevice.filter((device) => device.device === selectedDevice)[0].ts)
        return (dadosDevice.length > 0) ? Object.keys(dadosDevice[0]) : []
    }

    function drawInfoTable() {
        return (
            dadosDevice.filter((dado) => dado.device === selectedDevice)[0] ?
            dadosDevice.filter((dado) => dado.device === selectedDevice)[0].type === "temp" ?
                    <ListGroup>
                        <ListGroup.Item>Dispositivo: {selectedDevice === '' ? (devices.length > 0 ? devices[0].device : "") : devices.filter((device) => device.device === selectedDevice)[0].device} </ListGroup.Item>
                        <ListGroup.Item>Data do ultimo envio: {getDate( selectedDevice === '' ? (dadosDevice.length > 0 ? dadosDevice[0].ts : "") : dadosDevice.filter((device) => device.device === selectedDevice)[0].ts)} </ListGroup.Item>
                        <ListGroup.Item>Tipo do dispositivo: {selectedDevice === '' ? (dadosDevice.length > 0 ? dadosDevice[0].type : "") : dadosDevice.filter((device) => device.device === selectedDevice)[0].type} </ListGroup.Item>
                        {/* <ListGroup.Item>Bateria: {selectedDevice === '' ? (dadosDevice.length > 0 ? dadosDevice[0].bateria : "") : dadosDevice.filter((device) => device.device === selectedDevice)[0].bateria} </ListGroup.Item> */}
                    </ListGroup>
                    :
                    <ListGroup>
                        <ListGroup.Item>Dispositivo: {selectedDevice === '' ? (devices.length > 0 ? devices[0].device : "") : devices.filter((device) => device.device === selectedDevice)[0].device} </ListGroup.Item>
                        <ListGroup.Item>Data do ultimo envio: {getDate( selectedDevice === '' ? (dadosDevice.length > 0 ? dadosDevice[0].ts : "") : dadosDevice.filter((device) => device.device === selectedDevice)[0].ts)} </ListGroup.Item>
                        <ListGroup.Item>Latitude: {selectedDevice === '' ? (dadosDevice.length > 0 ? dadosDevice[0].lat : "") : dadosDevice.filter((device) => device.device === selectedDevice)[0].lat} </ListGroup.Item>
                        <ListGroup.Item>Longitude: {selectedDevice === '' ? (dadosDevice.length > 0 ? dadosDevice[0].long : "") : dadosDevice.filter((device) => device.device === selectedDevice)[0].long}</ListGroup.Item>
                        <ListGroup.Item>Tipo do dispositivo: {selectedDevice === '' ? (dadosDevice.length > 0 ? dadosDevice[0].type : "") : dadosDevice.filter((device) => device.device === selectedDevice)[0].type} </ListGroup.Item>
                        {/* <ListGroup.Item>Bateria: {selectedDevice === '' ? (dadosDevice.length > 0 ? dadosDevice[0].bateria : "") : dadosDevice.filter((device) => device.device === selectedDevice)[0].bateria} </ListGroup.Item> */}
                    </ListGroup>
            : ""
        )
}

    return (
        <Container fluid>
            <Link to="/" >
                <Button variant="light" style={{ marginBottom: '2%' }}><IoMdArrowRoundBack size={30} /></Button>
            </Link>

            <Jumbotron>

                <h4 className="titleInfo">Informações do dispositivo: {device}</h4>
                <Row className="Info">
                    <Col>
                        <Card>
                                <Card.Img src={Logo}/>
                        </Card>
                    </Col>
                    <Col>
                        {

                            selectedDevice === "" ? (
                                dadosDevice.length > 0 ? (
                                    drawInfoTable()
                                )
                                    : ""
                            ) : (
                                drawInfoTable()
                            )

                        }

                        <Link to="/tabela">
                            <Button variant="warning" style={{ marginTop: '2%' }}>Historico</Button>
                        </Link>
                    </Col>
                </Row>


            </Jumbotron>
        </Container>
    )
}