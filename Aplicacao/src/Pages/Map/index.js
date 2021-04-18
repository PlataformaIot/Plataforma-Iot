import React, { useState, useEffect } from 'react';
import { Form, Col, Row, Button, FormCheck } from 'react-bootstrap';
import { FiSearch } from 'react-icons/fi';
import './styles.css';

export default function Mapa() {
    const [days, setDays] = useState([]);
    const [moth, setMoth] = useState([]);
    const [yaear, setYear] = useState([]);
    const [dayCheck, setDayCheck] = useState(false);

    useEffect(() => {
        daysWeek()
        console.log(days)
    }, [])

    function daysWeek(day) {
        for (var day = 0; day < 30; day++) {
            setDays(day)
        }
    }

    return (
        <div>
            <Row>
            {
                dayCheck === false ? 
                    <Col lg="12">
                        <Form.Group as={Row} style={{ display: 'flex', alignItems: 'center', marginLeft: '17px' }}>
                            <Form.Control style={{ width: 200 }} as="select">
                                <option>semanas</option>
                                <option>2</option>
                                <option>3</option>
                            </Form.Control>
                            <FormCheck  value={dayCheck} onChange={(e) => setDayCheck(e.target.checked)} label="Dia específico" style={{ marginLeft: '2%' }} />
                        </Form.Group>
                    </Col>
                 :
                    
    
                        <Col style={{ flexDirection: 'row', display: 'flex', marginBottom: '2%', marginLeft:'17px' }}>
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
                            <Button style={{ marginLeft: 30, alignItems: 'center', display: 'flex', }} variant="success"><FiSearch size={20} />Buscar</Button>
                            <FormCheck defaultChecked  value={dayCheck} onChange={(e) => setDayCheck(e.target.checked)} label="Dia específico" style={{ marginLeft: '2%', top:8, display:"flex", flexDirection:'row' }} />
                        </Col>
                    
            }
            </Row>
            <div className="mapStyle">
                <iframe src={`http://161.97.133.47:5000/day`} width="1150" height="450" frameBorder="0" />
            </div>
        </div>

    )

}
