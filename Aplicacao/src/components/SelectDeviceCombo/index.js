import React,{useState, useEffect} from 'react';
import {Form} from 'react-bootstrap';
import api from '../../Connections/api';
import {useDispatch, useSelector} from 'react-redux';

import {selecionarDevice, atualizarDevices} from '../../store/Modulos/Devices/actions';

export default function Combo(){
    const selectedDevice = useSelector((state) => state.devicesState.selectedDevice);
    const devices = useSelector((state) => state.devicesState.devices);
    const dadosDevice = useSelector((state) => state.devicesState.dadosDevice);
    const dispatch = useDispatch()


    useEffect(() =>{ handleDevices()},[])

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
    return(
        <div style={{marginBottom:'2%' }}>
            <Form.Control style={{ width: '16%', marginLeft:'84%' }} value={selectedDevice} onChange={(e) => dispatch(selecionarDevice(e.target.value))} as="select">
                    {devices.length && devices.length > 0 ? devices.map((dev) => (
                        <option key={dev.device} value={dev.device}>{dev.device}</option>
                    )) :
                        (
                            <option>Nenhum dispositivo</option>
                        )
                    }
                </Form.Control> 
        </div>
    )
}