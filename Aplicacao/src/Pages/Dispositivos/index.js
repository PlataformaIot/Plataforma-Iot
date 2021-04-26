import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, CardDeck, ListGroup, Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux'
import ReactIcon from '../../assets/logo.svg';
import { MdModeEdit } from 'react-icons/md';
import { BsFillTrashFill } from 'react-icons/bs';
import './styles.css';




export default function Dispositivos() {

    const selectedDevice = useSelector((state) => state.devicesState.selectedDevice);
    const devices = useSelector((state) => state.devicesState.devices);

    const [filter, setFilter] = useState('');
    const [filterDevice, setFilterDevice] = useState([]);

    /* function searchDevice(){
        devices.forEach((user) =>{
           if(user.device.toUpperCase().includes(filter.toUpperCase()) || user.device.toUpperCase() === filter.toUpperCase()){
                

                let list={
                    key: user.device,
                    device: user.device
                }

                let array = filterDevice;
                array.push(list)
                setFilterDevice(array)
                console.log(array)
            }
        })
    } */

    return (
        <Container fluid>
            <h1 style={{ textAlign: 'center' }}>Dispositivos Cadastrados</h1>
            {/* <div>
                <Form.Control value={filter} onChange={(e) => setFilter(e.target.value)} type="text" placeholder="Buscar" />
                <Button onClick={searchDevice}>Buscar</Button>
            </div> */}
            {
            devices.length && (devices.length > 0) ? devices.map((dev) => (
                <Row key={dev.device}>
                    <Col>
                        <Card style={{ marginBottom: '2%' }}>
                            <Card.Header>Device {dev.device}</Card.Header>
                            <Card.Body className="cardDirection" >
                                <Card.Img src={ReactIcon} className="cardImg" style={{ width: '18rem' }} />
                                <ListGroup className="tableStyle">
                                    <ListGroup.Item>Dispositivo: {dev.device}</ListGroup.Item>
                                    <ListGroup.Item>Tipo: {dev.type}</ListGroup.Item>

                                </ListGroup>
                            </Card.Body>
                            <div className="btnFooter">
                                <Button variant="success"><MdModeEdit size={20} /></Button>
                                <Button variant="danger"><BsFillTrashFill size={20} /></Button>
                            </div>
                        </Card>
                    </Col>
                </Row>
            )) :
                <h1>Lista Vazia</h1>
            }
        </Container>
    )
}