import React from 'react';
import { Form, Col, Row } from 'react-bootstrap';
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
                </Col>
            </Row>
                <div className="mapStyle">
                    <iframe src="http://161.97.133.47:5000/day" width="800" height="400" />
                </div>
        </div>

    )

}
