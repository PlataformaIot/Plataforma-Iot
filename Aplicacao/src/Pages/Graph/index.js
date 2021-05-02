import api from '../../Connections/api';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Form, Row, Col, Button, FormCheck } from 'react-bootstrap';
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
    const devices = useSelector((state) => state.devicesState.devices)
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

    const [dadosGrafico, setDadosGrafico] = useState(dadosDevice)
    const [graph, setGraph] = useState([])
    const [dayCheck, setDayCheck] = useState(false);
    const [grafFixo, setGrafFixo] = useState(true);
    const [timeWindow, setTimeWindow] = useState(1);

    async function downloadData() {
        const id = (devices.length > 0) ? (selectedDevice === '' ? devices[0].device : devices.filter((dev) => dev.device === selectedDevice)[0].device) : ""
        //await api.get(`data?dev_addr=${id}&from_date=30/04/2021&to_date=01/05/2021`)
        await api.get(`data?dev_addr=${id}&limit=1000`)
            .then((res) => {
                setDadosGrafico(((res.data)));
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function getPointsGraph() {
        var pointsGraph = dadosGrafico.map((dev) => ([new Date(dev['ts'] * 1000), dev[var1], dev[var2]]))
        pointsGraph.unshift(['t', textoVars[var1], textoVars[var2] ])
        return pointsGraph
    }

    useEffect(() => {
        downloadData()
    }, [selectedDevice])

    useEffect(() => {
        const pointsGraph = getPointsGraph()
        setGraph(pointsGraph)
    }, [selectedVar1, selectedVar2, dadosGrafico])

    useEffect(() => {

        if(grafFixo){
            const instervalId = grafFixo ? 0 : setInterval(() => setGraph(getPointsGraph()), 5000)
            return () => {
                //executa apenas quando o componente é destruido
                clearInterval(instervalId);
            }
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
    function drawDropdownTime() {
        return (
            <Form.Control style={{ width: '10%', marginLeft: '2%' }} value={timeWindow} onChange={(e) => setTimeWindow(e.target.value)} as="select">
                    <option key={"1 dia"}     value={1}>{"1 dia"}</option>
                    <option key={"2 dias"}    value={2}>{"2 dias"}</option>
                    <option key={"4 dias"}    value={4}>{"4 dias"}</option>
                    <option key={"1 semana"}  value={7}>{"1 semana"}</option>
                    <option key={"2 semanas"} value={14}>{"2 semanas"}</option>
                    <option key={"3 semanas"} value={21}>{"3 semanas"}</option>
            </Form.Control>
        )
    }


    return (
        <Container fluid>
            {/*<p>{JSON.stringify( graph )}</p>*/}
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <Col>
                {
                    <Col lg="12" style={{ display: 'flex' , marginLeft: '10%'}}>
                        {drawDropdownVar1()}
                        {drawDropdownVar2()}
                        {/*drawDropdownTime()*/}
                        {
                    dayCheck === false ?
                        <div>
                        <div style={{ display: 'flex' }}>
                        <Form.Control style={{ width: '30%', marginLeft: '12%' }} type="week" />
                        <FormCheck  defaultChecked value={grafFixo} onChange={(e) => setGrafFixo(e.target.checked)} label="Manter gráfico estático" style={{ marginLeft: '6%' }} />
                        </div>
                        <FormCheck value={dayCheck} onChange={(e) => setDayCheck(e.target.checked)} label="Dia específico" style={{ marginLeft: '6%'}} />
                        </div>
                        :
                        <div>
                        <Form.Control style={{ width: '100%', marginLeft: '22%' }} type="date" />
                        <FormCheck defaultChecked value={dayCheck} onChange={(e) => setDayCheck(e.target.checked)} label="Dia específico" style={{ marginLeft: '15%' }} />
                        </div>
                    }
                    </Col>
                }
                </Col>
            </div>
            {
                (dadosGrafico.length > 0) ? drawGraph() :
                <p>Baixando Dados...</p>
            }
            <p>{/*cli.getChartAreaBoundingBox().width*/}</p>
        </Container>
    )
    
    //const cli = chart.getChartLayoutInterface();
    function drawGraph() {
        return (
            <div>
            <Chart
                width={'100%'}
                height={'500px'}
                chartType="LineChart"
                loader={<div>Carregando...</div>}

                data={graph}
                options={{
                    //legend: 'none',
                    animation: {
                        duration: 1000,
                        easing: 'out',
                        startup: true
                    },
                    series: {
                        0: { curveType: 'function', targetAxisIndex: 0 },
                        1: { curveType: 'function', targetAxisIndex: 1, visibleInLegend:(var2==var1 ? false:true) },
                    },
                    hAxis: { title: 'Tempo',
                        gridlines: {
                            count: "-1",
                            units: {
                                minutes: {format:["HH:mm"]},
                                hours: {format: ["HH:mm \n d/MM","H'h'"]},
                                days: {format: ["dd/MM/yyyy","d/M"]},
                                months: {format: ["MM/yyyy","M/yy"]}
                            }
                        },
                        minorGridlines: {
                            units: {
                                minutes: {format:["HH:mm",":mm"]},
                                hours: {format: ["HH:mm","H'h'"]},
                                days: {format: ["d"]},
                            }
                        }
                    },
                    vAxes: {
                        //0: { title: textoVars[var1] },
                        //1: { title: textoVars[var2] }
                    },
                    colors: [colorVars[var1], colorVars[var2]],
                }}
                rootProps={{ 'data-testid': '1' }}
            />
                </div>
        )
    }

}