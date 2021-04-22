import React, { useState, useEffect } from 'react';
import { Form, Col, Row, Button, FormCheck } from 'react-bootstrap';
import { FiSearch } from 'react-icons/fi';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {useSelector} from 'react-redux';
import './styles.css';

export default function Mapa() {
    const [data, setData] = useState([]);
    const [days, setDays] = useState([]);
    const [month, setMonth] = useState([]);
    const [year, setYear] = useState([]);
    const [idDevice, setIdDevice] = useState([]);

    const devices = useSelector((state) => state.devicesState.devices)
    const selectedDevice = useSelector((state) => state.devicesState.selectedDevice)

    useEffect(() => {
        dia()
        mes()
        ano()
        selectDevice()
    }, [data])

    
    
    
    function dia(){
        let day = data.slice(8,10)
        setDays(day)
    }

    function mes(){
        let month = data.slice(5,7)
        setMonth(month)
    }

    function ano(){
        let years = data.slice(0,4)
        setYear(years)
    }

    function selectDevice(){
        const id = selectedDevice === '' ? (devices.length > 0 ? devices[0].device : "") : devices.filter((dev) => dev.device === selectedDevice)[0].device
        setIdDevice(id)
    }
    
    




    return (
        <div>
            <Row>


                <Form.Control type="date" value={data} onChange={(e) => setData(e.target.value)} style={{ marginBottom: '2%', padding: '0 12px', margin: '10px 12px' }} />





            </Row>
            <div className="mapStyle">
                <iframe src={`http://161.97.133.47:5000/path/${idDevice}/day/${days}/${month}/${year}`} width="1150" height="450" frameBorder="0" />
            </div>
        </div>

    )

}
