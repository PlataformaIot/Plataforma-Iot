import React, { useState, useEffect } from 'react';
import { Form, Col, Row, Button, FormCheck } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import './styles.css';
import {getDate } from '../../store/functions'


export default function Mapa() {
    const devices = useSelector((state) => state.devicesState.devices)
    const selectedDevice = useSelector((state) => state.devicesState.selectedDevice)
    const dadosDevice = useSelector((state) => state.devicesState.dadosDevice);

    function verificaLista(lista, prop) {
        const selDevice = (lista.length > 0) ? (selectedDevice === '' ? lista[0].device : lista.filter((dev) => dev.device === selectedDevice)) : []
        return (selDevice.length > 0) ? selDevice[0][prop] ? selDevice[0][prop] : 0.0 : []
    }

    const lastDate = new Date( verificaLista(dadosDevice, "ts") * 1000 )
    //alert(getDate(lastDate/1000))
    
    const [days, setDays] = useState([ lastDate.getDate() ]);
    const [month, setMonth] = useState([ lastDate.getMonth()+1 ]);
    const [year, setYear] = useState([ lastDate.getFullYear() ]);
    const [data, setData] = useState([ year+'-'+(month<10 ? ('0'+month):month )+'-'+days ]);
    const [idDevice, setIdDevice] = useState([]);
    
    useEffect(() => {
        const lastDate = new Date( verificaLista(dadosDevice, "ts") * 1000 )
        setDays(lastDate.getDate())
        setMonth(lastDate.getMonth()+1)
        setYear(lastDate.getFullYear())
        setData(year+'-'+(month<10 ? ('0'+month):month )+'-'+days)

        selectDevice()

    }, [dadosDevice])

    useEffect(() => {
        dia()
        mes()
        ano()
        selectDevice()
    }, [data])

    function dia() {
        let day = data.slice(8, 10)
        setDays(day)
        console.log(day)
    }

    function mes() {
        let month = data.slice(5, 7)
        setMonth(month)
    }

    function ano() {
        let years = data.slice(0, 4)
        setYear(years)
    }

    function selectDevice() {
        const id = devices.length > 0 ? (selectedDevice === '' ? (devices.length > 0 ? devices[0].device : "") : devices.filter((dev) => dev.device === selectedDevice)[0].device) : ""
        setIdDevice(id)
    }






    return (
        <div>
            <Row>
                <Col lg="2">
                    <Form.Control type="date" value={data} onChange={(e) => setData(e.target.value)} style={{ marginBottom: '2%', padding: '0 12px', margin: '10px 12px' }} />
                </Col>

            </Row>
            <div className="mapStyle">
                <p>{`http://161.97.133.47:5000/path/${idDevice}/day/${days}/${month}/${year}/`}</p>
                <iframe src={`http://161.97.133.47:5000/path/${idDevice}/day/${days}/${month}/${year}`} width="1150" height="450" frameBorder="0" />
            </div>
        </div>

    )

}
