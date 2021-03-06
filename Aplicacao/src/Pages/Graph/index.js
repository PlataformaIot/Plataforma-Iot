import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts'
import { Container, Form, Row, Col, Button, FormCheck } from 'react-bootstrap';
import { FiSearch } from 'react-icons/fi'





export default function Graph() {


    const [dayCheck, setDayCheck] = useState(false);
    const [graph, setGraph] = useState([
        ['x', 'Umidade', 'Temperatura', 'Bateria'],
        [0, 10, 0, 20],
        [10, 41, 0, 50],
        [50, 0, 1, 2],

    ])



    useEffect(() => {
        function dadosAleterados() {
            const dadosGrafico = graph.map((linha) => {
                if (Number.isInteger(linha[1])) {
                    linha[1] = Math.floor(Math.random() * 101)

                }
                return linha
            })
            setGraph(dadosGrafico)
        }
        const instervalId = setInterval(() => dadosAleterados(), 5000)

        return () => {
            //executa apenas quando o componente é destruido
            clearInterval(instervalId);
        }
    }, [graph])




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
                            <FormCheck value={dayCheck} onChange={(e) => setDayCheck(e.target.checked)} label="Dia específico" style={{ marginLeft: '2%' }} />
                        </Form.Group>
                    </Col>
                    :
                    <div>
                        <Col lg="12">
                            <Form.Group as={Row} style={{ display: 'flex', alignItems: 'center', marginLeft: '1px' }}>
                                <Form.Control style={{ width: 200 }} as="select">
                                    <option>semanas</option>
                                    <option>2</option>
                                    <option>3</option>
                                </Form.Control>
                                <FormCheck defaultChecked value={dayCheck} onChange={(e) => setDayCheck(e.target.checked)} label="Dia específico" style={{ marginLeft: '2%' }} />
                            </Form.Group>
                        </Col>

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
                        </Col>
                    </div>
            }

            <Chart
                width={'100%'}
                height={'470px'}
                chartType="LineChart"
                loader={<div>Carregando</div>}

                data={graph}
                options={{
                    animation: {
                        duration: 1000,
                        easing: 'out',
                        startup: true
                    },
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