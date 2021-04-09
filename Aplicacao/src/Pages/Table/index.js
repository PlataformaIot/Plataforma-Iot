import React, { useEffect } from 'react';
import { Container, Table, Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useSelector } from 'react-redux';



export default function Tabela() {
    const selectedDevice = useSelector((state) => state.devicesState.selectedDevice);
    const devices = useSelector((state) => state.devicesState.devices);

    useEffect(() => {}, [selectedDevice])

    return (
        <Container fluid>
            <Link to="/indicator">
                <Button variant="light"><IoMdArrowRoundBack size={30} /></Button>
            </Link>

            <Row lg={true} style={{ marginTop: '2%' }}>

                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Device</th>
                                <th>Data</th>
                                <th>Counter</th>
                                <th>Latitude</th>
                                <th>Longetude</th>
                                <th>Bateria</th>
                            </tr>
                        </thead>
                        {
                            devices.map((dev) => (
                                <tbody>
                                    <tr>
                                        <td>{dev.id}</td>
                                        <td>{dev.devices}</td>
                                        <td>{dev.data}</td>
                                        <td>0</td>
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