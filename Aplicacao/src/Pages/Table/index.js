import React, { useEffect } from 'react';
import { Container, Table, Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useSelector } from 'react-redux';


function getDate(timeSecs){
    const dateObject = new Date(timeSecs * 1000)
    const humanDateFormat = dateObject.toLocaleString() //20/04/2021 10:30:15

    return humanDateFormat
}

export default function Tabela() {
    const selectedDevice = useSelector((state) => state.devicesState.selectedDevice);
    const devices = useSelector((state) => state.devicesState.devices);
    const dadosDevice = useSelector((state) =>  state.devicesState.dadosDevice);

    useEffect(() => {}, [selectedDevice, dadosDevice])

    const propriedadesDevice = Object.keys(dadosDevice[0])
    /*alert( JSON.stringify( propriedadesDevice ))*/

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
                                {/*<th>{selectedDevice === '' ? (devices.length > 0 ? devices[0].device : "") : devices.filter((dev) => dev.device === selectedDevice)[0].device}</th> */}
                                <th>Device</th>
                                <th>Type</th>
                                <th>Latitude</th>
                                <th>Longitude</th>
                                <th>Bateria</th>
                                <th>Data</th>
                            </tr>
                        </thead>
                        {
                            dadosDevice.map((dev) => (
                                <tbody>
                                    <tr>
                                       
                                        {/* <td>{dev.device}</td> */}
                                        <td>{dev.device}</td>
                                        <td>{dev.type}</td>
                                        <td>{parseFloat(dev.lat).toFixed(3)}</td>
                                        <td>{parseFloat(dev.long).toFixed(3)}</td>
                                        <td>{parseFloat(dev.bateria).toFixed(2)}V</td>
                                        <td>{getDate(dev.ts)}</td>
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