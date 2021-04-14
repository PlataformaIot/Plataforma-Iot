import React from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
import {FiSearch} from 'react-icons/fi';
import './styles.css';

export default function Mapa() {
    return (
        <div>
            <Row>
                <Col style={{ flexDirection: 'row', display: 'flex', marginLeft: '5%', marginBottom: '2%' }}>
                    <Form.Control style={{ width: 200 }} as="select">
                        <option>dia</option>
                        <option>2</option>
                        <option>3</option>
                    </Form.Control>

                    <Form.Control style={{ width: 200, marginLeft: '2%' }} as="select">
                        <option>mês</option>
                        <option>2</option>
                        <option>3</option>
                    </Form.Control>
                    <Form.Control style={{ width: 200, marginLeft: '2%' }} as="select">
                        <option>ano</option>
                        <option>2</option>
                        <option>3</option>
                    </Form.Control>
                    <Button style={{marginLeft:30,alignItems:'center', display:'flex',}} variant="success"><FiSearch size={20}/>Buscar</Button>
                </Col>
            </Row>
                <div className="mapStyle">
                    <iframe src={`http://161.97.133.47:5000/day`} width="1150" height="450" />
                </div>
        </div>

    )

}
