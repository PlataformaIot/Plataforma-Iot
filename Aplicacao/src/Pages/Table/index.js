import { Container, Table, Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';
import {getDate, GetDadosDevice} from '../../store/functions'


export default function Tabela() {
    const {device,dadosDevice,propsDevice} = GetDadosDevice()


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
                                <th>Device</th>
                                <th>Type</th>
                                <th>Data</th>
                                {propsDevice.includes('temp') ? <th>Temperatura</th>:""}
                                {propsDevice.includes('hum') ? <th>Humidade</th>:""}
                                {propsDevice.includes('lat') ? <th>Latitude</th>:""}
                                {propsDevice.includes('long') ? <th>Longitude</th>:""}
                                {propsDevice.includes('velocidade') ? <th>Velocidade</th>:""}
                                {propsDevice.includes('bateria') ? <th>Bateria</th>:""}
                            </tr>
                        </thead>
                        {
                            //{if(1) Device}
                            dadosDevice.map((dev) => (
                                <tbody>
                                    <tr>
                                        {/* <td>{dev.device}</td> */}
                                        <td>{dev.device}</td>
                                        <td>{dev.type}</td>
                                        <td>{getDate(dev.ts)}</td>
                                        {propsDevice.includes('temp')       ? <td>{parseFloat(dev.temp).toFixed(1)}°C</td>:""}
                                        {propsDevice.includes('hum')        ? <td>{parseFloat(dev.hum).toFixed(1)}%</td>:""}
                                        {propsDevice.includes('lat')        ? <td>{parseFloat(dev.lat).toFixed(3)}°</td>:""}
                                        {propsDevice.includes('long')       ? <td>{parseFloat(dev.long).toFixed(3)}°</td>:""}
                                        {propsDevice.includes('velocidade') ? <td>{dev.velocidade} km/h</td>:""}
                            {propsDevice.includes('bateria')    ? <td>{parseFloat(dev.bateria).toFixed(2)}V</td>:""}
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