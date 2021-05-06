import React, { useState, useEffect } from 'react';
import { Form, Card, CardDeck, Row, Col } from 'react-bootstrap';
import api from '../../Connections/api';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './styles.css';
import { selecionarDevice, atualizarDevices, dadosDevice, dadosType } from '../../store/Modulos/Devices/actions';

//import { MdPhotoSizeSelectLarge } from 'react-icons/md';
import { AiOutlineHome } from 'react-icons/ai';
import { BsPlusSquare } from 'react-icons/bs';
import { GiRiotShield } from 'react-icons/gi';
//import { BsInfoCircle } from 'react-icons/bs';

export default function Combo() {
    

    const devices = useSelector((state) => state.devicesState.devices)
    const selectedDevice = useSelector((state) => state.devicesState.selectedDevice)
    //const dadosTypes = useSelector((state) =>  state.devicesState.dadosType)
    //const dadosDevice = useSelector((state) =>  state.devicesState.dadosDevice);
    //console.log(selectedDevice)
    const dispatch = useDispatch()

    function drawDeviceCombo() {
        return (
            <div style={{ width: '16%', marginLeft: '80%'}}>
                <div style={{ marginLeft: '6%'}}>{(devices.length > 0) ? "Dispositivo Selecionado:" : <p> </p>}</div>
                <Form.Control as="select" value={selectedDevice} onChange={(e) => dispatch(selecionarDevice(e.target.value))}>
                    {(devices.length > 0) ? devices.map((dev) => (
                        <option key={dev.name ? dev.name:dev.device} value={dev.device}>{dev.name ? dev.name:dev.device}</option>
                    )) :
                        (
                            <option>Nenhum dispositivo</option>
                        )
                    }
                </Form.Control>
            </div>
        )
    }
    useEffect(() => {
        selectDeviveTypes()
        handleDevices()
        selectData()//  <--- BUG!
    }, [selectedDevice])
/*BUG:  A selectData manda baixar dados, espera para receber-los e no final sobreescreve os antigos.
         Qd o device é mudado antes de receber os dados do anterior, ele recebe os dados e muda p/
         o device anterior, causando a oscilação
*/
    async function handleDevices() {
        await api.get(`devices`)
            .then((res) => {
                dispatch(atualizarDevices(res.data))
            })
            .catch((err) => {
                console.log(err)
            })
            
    }

    async function selectDeviveTypes(){
        await api.get(`types`)
        .then((res) => {
            dispatch(dadosType(res.data))
        })
        .catch((err) =>{
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
        await api.get(`data?dev_addr=${id}&limit=10`)
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
                    </CardDeck>
                </Col>
                {drawDeviceCombo()}
            </Row>



        </div>
    )
}