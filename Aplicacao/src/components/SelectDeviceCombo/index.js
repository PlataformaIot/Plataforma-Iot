import React, { useState, useEffect } from 'react';
import { Form, Card, CardDeck, Row, Col } from 'react-bootstrap';
import api from '../../Connections/api';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './styles.css';
import { selecionarDevice, atualizarDevices, dadosDevice } from '../../store/Modulos/Devices/actions';

import { MdPhotoSizeSelectLarge } from 'react-icons/md';
import { AiOutlineHome } from 'react-icons/ai';
import { BsPlusSquare } from 'react-icons/bs';
import { GiRiotShield } from 'react-icons/gi';
import { BsInfoCircle } from 'react-icons/bs';

export default function Combo() {
    

    const devices = useSelector((state) => state.devicesState.devices)
    const selectedDevice = useSelector((state) => state.devicesState.selectedDevice)
    //const dadosDevice = useSelector((state) =>  state.devicesState.dadosDevice);
    //console.log(selectedDevice)
    const dispatch = useDispatch()

    if(devices[0]) devices[0].nome="Disp 1"

    useEffect(() => {
        handleDevices()
        selectData()
    }, [selectedDevice])

    async function handleDevices() {

        await api.get(`devices`)
            .then((res) => {
                dispatch(atualizarDevices(res.data))
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function equacionarDadosDevices(dadosDevice) {
        return dadosDevice.map((dados) => {
            if (dados.type) {
                return dados;
            }
            else {
                return {
                    ...dados,
                    type: ""
                }
            }
        })
    }

    async function selectData() {
        const id = (devices.length > 0) ? (selectedDevice === '' ? devices[0].device : devices.filter((dev) => dev.device === selectedDevice)[0].device) : ""
        console.log(id)
        await api.get(`data?dev_addr=${id}&limit=100`)
            .then((res) => {
                dispatch(dadosDevice(equacionarDadosDevices(res.data)));
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <div>
            <Row>
                <Col lg="7" style={{justifyContent:'center', alignItems:'center', margin:'auto'}}>
                    <CardDeck className="menuCard">
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <Card>
                                <Card.Body className="cardBody">
                                    <AiOutlineHome className="icons" size={40} />
                                    <Card.Text>Home</Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                        <Link to="/dispositivos-cadastrados" style={{ textDecoration: 'none' }}>
                            <Card>
                                <Card.Body className="cardBody">
                                    <GiRiotShield className="icons" size={40}/>
                                    <Card.Text>Gerenciar Dispositivos</Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                        <Link to="/cadastro" style={{ textDecoration: 'none' }}>
                            <Card>
                                <Card.Body className="cardBody">
                                    <BsPlusSquare className="icons" size={40} />
                                    <Card.Text>Cadastrar Dispositivo</Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                        <Link to="/indicator" style={{ textDecoration: 'none' }}>
                            <Card>
                                <Card.Body className="cardBody">
                                    <BsInfoCircle className="icons" size={40} />
                                    <Card.Text>Informações</Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </CardDeck>
                </Col>

                    <Form.Control style={{ width: '16%', marginLeft: '80%'}} value={selectedDevice} onChange={(e) => dispatch(selecionarDevice(e.target.value))} as="select">
                        {devices.length && (devices.length > 0) ? devices.map((dev) => (
                            <option key={dev.nome ? dev.nome:dev.device} value={dev.device}>{dev.nome ? dev.nome:dev.device}</option>
                        )) :
                            (
                                <option>Nenhum dispositivo</option>
                            )
                        }
                    </Form.Control>

            </Row>



        </div>
    )
}