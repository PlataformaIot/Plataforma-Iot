import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Form, Row, Col, Button, FormCheck } from 'react-bootstrap';
import { FiSearch } from 'react-icons/fi'
import { Chart } from 'react-google-charts'
import { getpropsDevice } from '../../store/functions'

const nomeVars = {
    '': '',
    'temp': 'Temperatura',
    'hum': 'Umidade',
    'velocidade': 'Velocidade',
    'bateria': 'Tensão da bateria'
}
const textoVars = {
    '': '',
    'temp': 'Temperatura [°C]',
    'hum': 'Umidade [%]',
    'velocidade': 'Velocidade [km/h]',
    'bateria': 'Tensão da bateria [V]'
}
const colorVars = {
    '': 'gray',
    'temp': 'red',
    'hum': 'gray',
    'velocidade': 'gold',
    'bateria': 'green'
}

export default function Graph() {
    const selectedDevice = useSelector((state) => state.devicesState.selectedDevice);
    const dadosDevice = useSelector((state) => state.devicesState.dadosDevice);
    const propsDevice = getpropsDevice(dadosDevice);
    const varsDevice = Object.keys(nomeVars).filter((prop) => {
        return propsDevice.includes(prop)
    })
    //alert( JSON.stringify( varsDevice) )

    function getVar1() {
        const lVar = (varsDevice.length > 0) ? (selectedVar1 === '' ? varsDevice : varsDevice.filter((va) => va === selectedVar1)) : []
        return (lVar.length > 0) ? lVar[0] : ''
    }
    function getVar2() {
        const lVar = (varsDevice.length > 0) ? (selectedVar2 === '' ? varsDevice : varsDevice.filter((va) => va === selectedVar2)) : []
        return (lVar.length > 0) ? lVar[0] : ''
    }
    const [selectedVar1, setSelectedVar1] = useState(varsDevice[0]);
    const [selectedVar2, setSelectedVar2] = useState(varsDevice[1]);
    const var1 = getVar1()
    const var2 = getVar2()

    function getDataGraph() {
        var dadosGrafico = dadosDevice.map((dev) => ([new Date(dev['ts'] * 1000), dev[var1], dev[var2]]))
        dadosGrafico.unshift(['t', nomeVars[var1], nomeVars[var2]])
        return dadosGrafico
    }
    const [graph, setGraph] = useState(getDataGraph())
    const [dayCheck, setDayCheck] = useState(false);
    const [grafFixo, setGrafFixo] = useState(true);


    useEffect(() => {
        const dadosGrafico = getDataGraph()
        setGraph(dadosGrafico)
    }, [selectedVar1, selectedVar2])

    useEffect(() => {
        const instervalId = grafFixo ? 0 : setInterval(() => setGraph(getDataGraph()), 5000)

        return () => {
            //executa apenas quando o componente é destruido
            clearInterval(instervalId);
        }
    }, [graph])

    function drawDropdownVar1() {
        return (
            <Form.Control style={{ width: '16%', marginLeft: '2%' }} value={selectedVar1} onChange={(e) => setSelectedVar1(e.target.value)} as="select">
                {(varsDevice.length > 0) ? varsDevice.map((prop) => (
                    <option key={nomeVars[prop]} value={prop}>{nomeVars[prop]}</option>
                )) : (
                    <option>Nenhuma variável</option>
                )}
            </Form.Control>
        )
    }
    function drawDropdownVar2() {
        return (
            <Form.Control style={{ width: '16%', marginLeft: '2%' }} value={selectedVar2} onChange={(e) => setSelectedVar2(e.target.value)} as="select">
                {(varsDevice.length > 0) ? varsDevice.map((prop) => (
                    <option key={nomeVars[prop]} value={prop}>{nomeVars[prop]}</option>
                )) : (
                    <option>Nenhuma variável</option>
                )}
            </Form.Control>
        )
    }


    return (
        <Container fluid>
            {/*<p>{JSON.stringify( graph )}</p>*/}
            <div style={{ display: 'flex', justifyContent: 'center', width: '200%' }}>
                <Col>

                    {
                        <div>
                            <Col style={{ display: 'flex' }}>
                                {drawDropdownVar1()}

                                {drawDropdownVar2()}
                            </Col>
                        </div>
                    }
                </Col>
                <Col>
                    {
                        dayCheck === false ?
                            <Row>
                                <Col lg="3" style={{ display: 'flex', marginLeft: '-63%' }}>
                                    <Form.Control  type="week" />
                                <Col lg="3" style={{ display: 'flex', marginLeft: '-2%' }}>
                                    <FormCheck value={dayCheck} onChange={(e) => setDayCheck(e.target.checked)} label="Dia específico" style={{ marginLeft: '6%', justifyContent:'center' }} />
                                </Col>
                                <Col lg="3" style={{ display: 'flex', marginLeft: '-2%' }}>
                                    <FormCheck defaultChecked value={grafFixo} onChange={(e) => setGrafFixo(e.target.checked)} label="Manter gráfico estático" style={{ marginLeft: '82%' }} />
                                    </Col>
                                </Col>
                            </Row>

                            :
                            <Row>
                                <Col lg="3" style={{ display: 'flex', marginLeft: '-63%' }}>
                                    <Form.Control type="date" />
                                <Col lg="3" style={{ display: 'flex', marginLeft: '-2%' }}>
                                    <FormCheck defaultChecked value={dayCheck} onChange={(e) => setDayCheck(e.target.checked)} label="Dia específico" style={{ marginLeft: '6%' }} />
                                </Col>
                                <Col lg="3" style={{ display: 'flex', marginLeft: '-2%' }}>
                                    </Col>
                                </Col>
                            </Row>
                    }
                </Col>
            </div>

            <Chart
                width={'100%'}
                height={'500px'}
                chartType="LineChart"
                loader={<div>Carregando...</div>}

                data={graph}
                options={{
                    legend: 'none',
                    animation: {
                        duration: 1000,
                        easing: 'out',
                        startup: true
                    },
                    series: {
                        0: { curveType: 'function', targetAxisIndex: 0 },
                        1: { curveType: 'function', targetAxisIndex: 1 },
                    },
                    hAxis: { title: 'Tempo' },
                    vAxes: {
                        0: { title: textoVars[var1] },
                        1: { title: textoVars[var2] }
                    },
                    colors: [colorVars[var1], colorVars[var2]],
                }}
                rootProps={{ 'data-testid': '1' }}
            />

        </Container>
    )
}