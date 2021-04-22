import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';


export function GetDadosDevice(){
    const selectedDevice = useSelector((state) => state.devicesState.selectedDevice);
    const devices = useSelector((state) => state.devicesState.devices);
    const dadosDevice = useSelector((state) =>  state.devicesState.dadosDevice);

    useEffect(() => {}, [selectedDevice, dadosDevice])

    const device = selectedDevice === '' ? (devices.length > 0 ? devices[0].device : "") : devices.filter((dev) => dev.device === selectedDevice)[0].device
    const propsDevice = Object.keys(dadosDevice[0])
    //alert( JSON.stringify( propsDevice ))

    return {device: selectedDevice === '' ? (devices.length > 0 ? devices[0].device : "") : devices.filter((dev) => dev.device === selectedDevice)[0].device,
        dadosDevice: dadosDevice,
        propsDevice: Object.keys(dadosDevice[0])}
}

export function getDate(unixTimestamp){
    const dateObject = new Date(unixTimestamp * 1000)
    const humanDateFormat = dateObject.toLocaleString() //20/04/2021 10:30:15

    return humanDateFormat
}