import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';//uso ainda não foi definido
import './styles.css';

import api from '../../Connections/api';
import SideBar from '../SideBar';

import LogoIBTI from '../../assets/Logo-IBTI.png';


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
            .then((res) => {
                dispatch(atualizarDevices(res.data))
            })
            .catch((err) => {
                console.log(err)
            })



        await api.get(`data?div_addr&limit=100`)
            .then((res) => {
                dispatch(dadosDevice(res.data))

            })
            .catch((err) => {
                console.log(err)
            })

    }






    return (
        <div className="style">
            <header className="container">
                <Link to="/">
                    <img className="logo" src={LogoIBTI} width="100" height="100" />
                </Link>
                <SideBar/>


                {/* <Form.Control style={{ width: '13%' }} value={selectedDevice} onChange={(e) => dispatch(selecionarDevice(e.target.value))} as="select">
                    {devices.length && devices.length > 0 ? devices.map((dev) => (
                        <option key={dev.device} value={dev.device}>{dev.device}</option>
                    )) :
                        (
                            <option>Nenhum dispositivo</option>
                        )
                    }
                </Form.Control> */}
                



            </header>
        </div>
    )
}