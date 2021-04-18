import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import api from '../../Connections/api';
import { useDispatch, useSelector } from 'react-redux';

import { selecionarDevice, atualizarDevices, dadosDevice } from '../../store/Modulos/Devices/actions';
import { MdPhotoSizeSelectLarge } from 'react-icons/md';

export default function Combo() {
   

    const devices = useSelector((state) => state.devicesState.devices)
    const selectedDevice = useSelector((state) => state.devicesState.selectedDevice)
    //const dadosDevice = useSelector((state) =>  state.devicesState.dadosDevice);
    console.log(selectedDevice)
    const dispatch = useDispatch()
    

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

    async function selectData(){
        const id = selectedDevice === '' ? (devices.length > 0 ? devices[0].device : "") : devices.filter((dev) => dev.device === selectedDevice)[0].device
        console.log(id)
        await api.get(`data?dev_addr=${id}&limit=100`)
        .then((res) => {
            dispatch(dadosDevice(res.data))
            
        })
        .catch((err) => {
            console.log(err)
        })
    }
    return (
        <div style={{ marginBottom: '2%' }}>
            <Form.Control style={{ width: '16%', marginLeft: '83%' }} value={selectedDevice} onChange={(e) => dispatch(selecionarDevice(e.target.value))} as="select">
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