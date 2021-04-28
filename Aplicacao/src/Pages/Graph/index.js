import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Form, Row, Col, Button, FormCheck } from 'react-bootstrap';
import { FiSearch } from 'react-icons/fi'
import { Chart } from 'react-google-charts'
import { getpropsDevice } from '../../store/functions'

const nomeVars = { '': '',
    'temp': 'Temperatura',
    'hum': 'Umidade',
    'velocidade': 'Velocidade',
    'bateria': 'Tensão da bateria'}
const textoVars = { '': '',
    'temp': 'Temperatura [°C]',
    'hum': 'Umidade [%]',
    'velocidade': 'Velocidade [km/h]',
    'bateria': 'Tensão da bateria [V]'}

export default function Graph() {
    const selectedDevice = useSelector((state) => state.devicesState.selectedDevice);
    const dadosDevice = useSelector((state) => state.devicesState.dadosDevice);
    const propsDevice = getpropsDevice(dadosDevice);
    const varsDevice = Object.keys(nomeVars).filter((prop) => {
        return propsDevice.includes(prop)
    })
    //alert( JSON.stringify( varsDevice) )

    function getVariable(){
        const lVar = (varsDevice.length > 0) ? (selectedVar === '' ? varsDevice : varsDevice.filter((va) => va === selectedVar)) : []
        return (lVar.length > 0) ? lVar[0] : ''
    }    
    const [selectedVar, setSelectedVar] = useState("");
    const variable = getVariable()

    function getDataGraph() {
        var dadosGrafico = dadosDevice.map((dev) => ([ new Date(dev['ts']*1000), dev[variable] ]) )
        dadosGrafico.unshift(['t', nomeVars[variable]])
        return dadosGrafico
    }
    const [graph, setGraph] = useState(getDataGraph())
    const [dayCheck, setDayCheck] = useState(false);
    const [grafFixo, setGrafFixo] = useState(true);


    useEffect(() => {
        const dadosGrafico = getDataGraph()
        setGraph(dadosGrafico)
  }, [selectedVar])

    useEffect(() => {
        const instervalId = grafFixo ? 0 : setInterval(() => setGraph(getDataGraph()), 5000)

        return () => {
            //executa apenas quando o componente é destruido
            clearInterval(instervalId);
        }
    }, [graph])

    function drawDropdownVar() {
        return (
            <Form.Control style={{ width: '16%', marginLeft: '2%' }} value={selectedVar} onChange={(e) => setSelectedVar(e.target.value)} as="select">
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
            <p>{/*JSON.stringify( graph )*/}</p>
            {
                <Col style={{marginBottom:'2%'}}>
                    {drawDropdownVar()}
                </Col>
            }{
                dayCheck === false ?
                    <Col lg="3"  style={{marginLeft:'2%'}}>
                        <Form.Control type="week" />
                        <FormCheck value={dayCheck} onChange={(e) => setDayCheck(e.target.checked)} label="Dia específico" style={{ marginLeft: '2%' }} />
                        <FormCheck defaultChecked value={grafFixo} onChange={(e) => setGrafFixo(e.target.checked)} label="Manter gráfico estático" style={{ marginLeft: '2%' }} />
                    </Col>
                    :
                        <Col lg="3" style={{marginLeft:'2%'}}>
                            <Form.Control type="date" />
                            <FormCheck defaultChecked value={dayCheck} onChange={(e) => setDayCheck(e.target.checked)} label="Dia específico" style={{ marginLeft: '2%' }} />
                        </Col>
            }

            <Chart
                width={'100%'}
                height={'470px'}
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
                    hAxis: {
                        title: 'Tempo'
                    },
                    vAxis: {
                        title: textoVars[variable]
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