import React, { useState, useEffect } from 'react';
import { Col, Row, Container, CardDeck, Card, Jumbotron } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsClipboardData, BsGraphUp } from 'react-icons/bs'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import {SiOpenstreetmap} from 'react-icons/si'
import {RiAddFill} from 'react-icons/ri'
import Graph from '../../Pages/Graph';
import './styles.css';
import api from '../../Connections/api';

export default function Home() {
    const [navigation, setNavigation] = useState([
        { id: '1', title: 'Adicionar dispositivo', info: 'Cadastrar novo didpositivo', icon: <RiAddFill size={40} />, nav: '/cadastro' },
        { id: '2', title: 'Indicador', info: 'Informações do Dispositivo', icon: <AiOutlineInfoCircle size={50} />, nav: '/indicator' },
        { id: '3', title: 'Localização', info: 'Localização do dispositivo', icon: <SiOpenstreetmap size={50} />, nav: '/map' },
    ]);
    const [selectDevices, setSelectDevice] = useState(
        {id:'1', device: 'Device 1', ts: '12', counter: '0', lat: '123', long: '12', bateria: '40'},
        {id:'2', device: 'Device 2', ts: '13', counter: '1', lat: '125', long: '2', bateria: '50'},
        {id:'3', device: 'Device 3', ts: '14', counter: '2', lat: '124', long: '1', bateria: '10'},
        )

    useEffect(() => {
        handleSelectDados()

    }, [])

    async function handleSelectDados(e){
        let dev = await api.get(`gps`)
    }

    //Linha para teste Redux

    function dataDevices(){
        
    }

    //Fim da linda de teste para Redux

    return (


        <Container fluid>
            <Row lg={true}>
                <Col lg='3' >
                    <Jumbotron>
                        <CardDeck style={{ textAlign: 'center' }}>
                            {navigation.map(dados => (
                                <Link to={dados.nav} style={{ textDecoration: 'none' }}>
                                    <Card style={{ marginBottom: '5%' }}>
                                        <Card.Body>
                                            <Card.Title>{dados.title}</Card.Title>
                                            {dados.icon}
                                            <Card.Text>
                                                {dados.info}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            ))}
                        </CardDeck>
                    </Jumbotron>

                </Col>
                <Col>
                    <div className="info">
                        <CardDeck>
                            <Card bg="danger" text='light'>
                                <Card.Body>
                                    <Card.Title>Temperatura</Card.Title>
                                    <Card.Text>
                                    <h1><strong>43ºC</strong></h1>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card bg="light">
                                <Card.Body>
                                    <Card.Title>Humidade</Card.Title>
                                    <Card.Text>
                                    <h1><strong>30%</strong></h1>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card bg="success" text='light'>
                                <Card.Body>
                                    <Card.Title>Bateria</Card.Title>
                                    <Card.Text>
                                    <h1><strong>90%</strong></h1>
                                    </Card.Text>

                                </Card.Body>
                            </Card>
                        </CardDeck>
                        <br></br>
                        <Card>
                            <Card.Body>
                                <Card.Title>Gráfico</Card.Title>
                                <Graph/>
                            </Card.Body>
                        </Card>


                    </div>
                </Col>
            </Row>
        </Container >



    )
}