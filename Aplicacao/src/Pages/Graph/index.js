import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Form, Row, Col, Button, FormCheck } from 'react-bootstrap';
import { FiSearch } from 'react-icons/fi'
import { Chart } from 'react-google-charts'
import { getpropsDevice } from '../../store/functions'

const variaveis = {
    'temp': 'Temperatura',
    'hum': 'Humidade',
    'velocidade': 'Velocidade',
    'bateria': 'Tensão da bateria',
    '': ''
}

export default function Graph() {
    const selectedDevice = useSelector((state) => state.devicesState.selectedDevice);
    const dadosDevice = useSelector((state) => state.devicesState.dadosDevice);
    const propsDevice = getpropsDevice(dadosDevice);

    const [selectedVar, setSelectedVar] = useState("");
    const [dayCheck, setDayCheck] = useState(false);

    const varsDevice = Object.keys(variaveis).filter((prop) => {
        return propsDevice.includes(prop)
    })
    //alert( JSON.stringify( varsDevice) )

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

    function drawDropdownVar() {
        return (
            <Form.Control style={{ width: '16%', marginLeft: '2%' }} value={selectedVar} onChange={(e) => setSelectedVar(e.target.value)} as="select">
                {(varsDevice.length > 0) ? varsDevice.map((prop) => (
                    <option key={variaveis[prop]} value={prop}>{variaveis[prop]}</option>
                )) : (
                    <option>Nenhuma variável</option>
                )}
            </Form.Control>
        )
    }


    return (varsDevice.length > 2) ? (
        <Container fluid>
            {
                <Col style={{marginBottom:'2%'}}>
                    {drawDropdownVar()}
                </Col>
            }{
                dayCheck === false ?
                    <Col lg="3"  style={{marginLeft:'2%'}}>
                        <Form.Control type="week" />
                        <FormCheck value={dayCheck} onChange={(e) => setDayCheck(e.target.checked)} label="Dia específico" style={{ marginLeft: '2%' }} />

                    </Col>
                    :
                    <div>
                        <Col lg="3" style={{marginLeft:'2%'}}>
                            <Form.Control type="date" />
                            <FormCheck defaultChecked value={dayCheck} onChange={(e) => setDayCheck(e.target.checked)} label="Dia específico" style={{ marginLeft: '2%' }} />

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
    ) : ""
}