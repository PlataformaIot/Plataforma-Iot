import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';//uso ainda não foi definido
import './styles.css';

import api from '../../Connections/api';

import Logo from '../../assets/logo.svg';

import { Dropdown, Form, Button } from 'react-bootstrap';
import { atualizarDevices, selecionarDevice, dadosDevice } from '../../store/Modulos/Devices/actions';


export default function Header() {

   
    const devices = useSelector((state) => state.devicesState.devices)
    const selectedDevice = useSelector((state) => state.devicesState.selectedDevice)
    console.log(selectedDevice)
    const dispatch = useDispatch()

    useEffect(() => {
        handleDevices()
    }, [])

    async function handleDevices() {
        await api.get(`devices`)
        .then((res) =>{
            dispatch(atualizarDevices(res.data))
        })
        .catch((err) =>{
            console.log(err)
        })
    
        await api.get(`data?limit=1000&dev_addr`)
        .then((res) =>{
            dispatch(dadosDevice(res.data))
        })
        .catch((err)=>{
            console.log(err)
        })
        
    }

    


    return (
        <header className="container">
            <Link to="/">
                <img src={Logo} width="100" height="100" />
            </Link>


            
            <Form.Control style={{width:'13%'}} value={selectedDevice} onChange={(e) => dispatch(selecionarDevice(e.target.value))} as="select">
                {devices.length && devices.length > 0 ? devices.map((dev) => (
                    <option key={dev.device} value={dev.device}>{dev.device}</option>
                )) :
                    (
                        <option>Nenhum dispositivo</option>
                    )
                }
            </Form.Control>



        </header>
    )
}