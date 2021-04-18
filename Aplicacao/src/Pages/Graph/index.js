import React, { useState } from 'react';
import { Chart } from 'react-google-charts'
import { Container, Form, Row, Col, Button, FormCheck } from 'react-bootstrap';
import { FiSearch } from 'react-icons/fi'

export default function Graph() {

    const [dayCheck, setDayCheck] = useState(false);
    




    return (
        <Container fluid>

            {
                dayCheck === false ? 
                    <Col lg="12">
                        <Form.Group as={Row} style={{ display: 'flex', alignItems: 'center', marginLeft: '1px' }}>
                            <Form.Control style={{ width: 200 }} as="select">
                                <option>semanas</option>
                                <option>2</option>
                                <option>3</option>
                            </Form.Control>
                            <FormCheck  value={dayCheck} onChange={(e) => setDayCheck(e.target.checked)} label="Dia específico" style={{ marginLeft: '2%' }} />
                        </Form.Group>
                    </Col>
                 :
                    
    
                        <Col style={{ flexDirection: 'row', display: 'flex', marginBottom: '2%' }}>
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
           
            <Chart
                width={'100%'}
                height={'470px'}
                chartType="LineChart"
                loader={<div>Carregando</div>}
                data={
                    [
                        ['x', 'Umidade', 'Temperatura', 'Bateria'],
                        [0, 0, 0, 100],
                        [1, 10, 8, 90],
                        [2, 23, 30, 90],
                        [3, 17, 40, 89],
                        [4, 18, 50, 80],
                        [5, 9, 30, 75],
                        [6, 11, 5, 60],
                        [7, 27, 10, 58],
                        [8, 33, 12, 50],
                        [9, 40, 22, 48],
                        [10, 32, 40, 40],
                        [11, 35, 9, 30],
                        [11, 50, 30, 90],
                    ]
                }
                options={{
                    hAxis: {
                        title: 'Tempo'
                    },
                    vAxis: {
                        title: 'Temperatura e Umidade'
                    },
                    series: {
                        2: { curveType: 'function' },

                    },
                }}
                rootProps={{ 'data-testid': '1' }}
            />


        </Container>
    )
}