import React, { useEffect } from 'react';
import { Container, Table, Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useSelector } from 'react-redux';
import Combo from '../../components/SelectDeviceCombo'



export default function Tabela() {
    const selectedDevice = useSelector((state) => state.devicesState.selectedDevice);
    const devices = useSelector((state) => state.devicesState.devices);
    const dadosDevice = useSelector((state) =>  state.devicesState.dadosDevice);

    useEffect(() => {}, [selectedDevice])

    return (
        <Container fluid>
            <Link to="/indicator">
                <Button variant="light"><IoMdArrowRoundBack size={30} /></Button>
            </Link>
            <Combo/>
            <Row lg={true} style={{ marginTop: '2%' }}>

                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Device</th>
                                <th>Data</th>
                                <th>Type</th>
                                <th>Latitude</th>
                                <th>Longetude</th>
                                <th>Bateria</th>
                            </tr>
                        </thead>
                        {
                            dadosDevice.map((dev) => (
                                <tbody>
                                    <tr>
                                        <td>{dev.device}</td>
                                        <td>{dev.device}</td>
                                        <td>{dev.ts}</td>
                                        <td>{dev.type}</td>
                                        <td>{dev.lat}</td>
                                        <td>{dev.long}</td>
                                        <td>{dev.bateria}</td>
                                    </tr>
                                </tbody>
                            ))
                        }
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}