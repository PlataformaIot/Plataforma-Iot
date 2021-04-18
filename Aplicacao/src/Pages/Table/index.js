import React, { useEffect } from 'react';
import { Container, Table, Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useSelector } from 'react-redux';




export default function Tabela() {
    const selectedDevice = useSelector((state) => state.devicesState.selectedDevice);
    const devices = useSelector((state) => state.devicesState.devices);
    const dadosDevice = useSelector((state) =>  state.devicesState.dadosDevice);

    useEffect(() => {}, [selectedDevice, dadosDevice])

    return (
        <Container fluid>
            <Link to="/indicator">
                <Button variant="light"><IoMdArrowRoundBack size={30} /></Button>
            </Link>
     
            <Row lg={true} style={{ marginTop: '2%' }}>

                <Col lg="12">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>{selectedDevice === '' ? (devices.length > 0 ? devices[0].device : "") : devices.filter((dev) => dev.device === selectedDevice)[0].device}</th>
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