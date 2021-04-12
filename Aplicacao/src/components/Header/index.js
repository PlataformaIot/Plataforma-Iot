import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';//uso ainda não foi definido
import './styles.css';

import api from '../../Connections/api';

import Logo from '../../assets/logo.svg';

import { Dropdown, Form, Button } from 'react-bootstrap';
import { atualizarDevices, selecionarDevice } from '../../store/Modulos/Devices/actions';


export default function Header() {

    const [device, setDevice] = useState([]);
    const [selectDevice, setSelectDevice] = useState([])
    const [mapSelect, setMapSelect] = useState([]);
    const devices = useSelector((state) => state.devicesState.devices)
    const selectedDevice = useSelector((state) => state.devicesState.selectedDevice)
    console.log(selectedDevice)
    const dispatch = useDispatch()

    useEffect(() => {
        handleDevices()
    }, [])

    async function handleDevices() {
        /* let devi = await (await api.get('devices')).data.map((item, index) => {
            return {
                ...item,
                key: index,
            }
        }) */
        const dev = await api.get('devices')
        //const response = await api.get(`data?limit=4&dev_addr=${dev}`)
        dispatch(atualizarDevices(dev.data))

    }

    


    return (
        <header className="container">
            <Link to="/">
                <img src={Logo} width="100" height="100" />
            </Link>


            
            <Form.Control style={{width:'13%'}} value={selectedDevice} onChange={(e) => dispatch(selecionarDevice(e.target.value))} as="select">
                {devices.length && devices.length > 0 ? devices.map((dev) => (
                    <option key={dev.id} value={dev.device}>{dev.device}</option>
                )) :
                    (
                        <div>Nenhum dispositivo</div>
                    )
                }
            </Form.Control>



        </header>
    )
}