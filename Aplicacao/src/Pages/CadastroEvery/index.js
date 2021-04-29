import React, { useState } from 'react';
import './styles.css';
import {
    Accordion,
    Form,
    Col,
    Button,
    Row,
    Container,
    Card,
    Badge,
    InputGroup,
    FormControl,
    Dropdown
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsFillTrashFill, BsPencil } from 'react-icons/bs'
import { FaPlusCircle } from 'react-icons/fa'
import { IoMdArrowRoundBack, IoMdArrowRoundForward, IoMdAdd } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux'
import api from '../../Connections/api';





export default function CadastroEvery() {
    const [nameDevice, setNameDevice] = useState('');
    const [dispositivoEUI, setDispositivoEUI] = useState('');
    const [aplicacaoEUI, setAplicacaoEUI] = useState('');
    //const [tags, setTags] = useState([]);
    const [netWorkSessionKey, setNetWorkSessionKey] = useState('');
    const [applicationSessionKey, setApplicationiSessionKey] = useState('');
    const [checkActivation, setCheckActivation] = useState(false);
    const [selectType, setSelectType] = useState('');
    const [deviceAddr, setDeviceAddr] = useState('');
    const [cadasto, setCadastro] = useState()
    const dispatch = useDispatch()

    //const cadastroEveryNet = useSelector((state) => state.devicesState.cadastroEvery);
    const selectedDevice = useSelector((state) => state.devicesState.selectedDevice);
    const dadosTypes = useSelector((state) => state.devicesState.dadosType);
    //const devices = useSelector((state) => state.devicesState.devices);


    console.log(cadasto)
    console.log(checkActivation)
    async function Cadastro() {
        const data = {
            name: nameDevice,
            dev_addr: deviceAddr,
            dev_eui: dispositivoEUI,
            app_eui: aplicacaoEUI,
            //tags: tags,
            nwkskey: netWorkSessionKey,
            appskey: applicationSessionKey,
            activation: checkActivation === false ? 'ABP' : 'OTAA',
            type: selectType

        }

        await api.post('devices/', data)
        .then((res) => {
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
        //setCadastro(data)

    }

    console.log(selectType)




    return (
        <Container style={{ margin: '20px 0px', marginBottom: '20%' }} fluid>
            <div>
                <Link to="/">
                    <Button variant="light" style={{ marginBottom: '2%' }}><IoMdArrowRoundBack size={30} /></Button>
                </Link>
            </div>

            <Row>
                <Col lg="6" >



                    <h4>Cadastro dispositivo</h4>
                    {
                        checkActivation === false
                            ?
                            <Form>
                                <Form.Control value={nameDevice} onChange={(e) => setNameDevice(e.target.value)} style={{ marginBottom: '2%' }} placeholder="Nome do Dispositivo" />
                                <Form.Control value={deviceAddr} onChange={(e) => setDeviceAddr(e.target.value)} style={{ marginBottom: '2%' }} placeholder="Device Address" />
                                <Form.Control value={dispositivoEUI} onChange={(e) => setDispositivoEUI(e.target.value)} style={{ marginBottom: '2%' }} placeholder="Disposito EUI" />
                                <Form.Control value={aplicacaoEUI} onChange={(e) => setAplicacaoEUI(e.target.value)} style={{ marginBottom: '2%' }} placeholder="Aplicação EUI" />
                                <Form.Check value={checkActivation} onChange={(e) => setCheckActivation(e.target.checked)} type="switch" id="custom-switch" label={checkActivation === true ? "OTAA" : "Activation ABP"} style={{ marginBottom: '2%' }} />
                            </Form>
                            :

                            <Form>
                                <Form.Control value={nameDevice} onChange={(e) => setNameDevice(e.target.value)} style={{ marginBottom: '2%' }} placeholder="Nome do Dispositivo" />
                                <Form.Control value={dispositivoEUI} onChange={(e) => setDispositivoEUI(e.target.value)} style={{ marginBottom: '2%' }} placeholder="Disposito EUI" />
                                <Form.Control value={aplicacaoEUI} onChange={(e) => setAplicacaoEUI(e.target.value)} style={{ marginBottom: '2%' }} placeholder="Aplicação EUI" />
                                <Form.Check value={checkActivation} onChange={(e) => setCheckActivation(e.target.checked)} type="switch" id="custom-switch" label={checkActivation === true ? "Activation OTAA" : "Activation ABP"} style={{ marginBottom: '2%' }} />
                                <Form.Control value={netWorkSessionKey} onChange={(e) => setNetWorkSessionKey(e.target.value)} style={{ marginBottom: '2%' }} placeholder="Network session key" />
                                <Form.Control value={applicationSessionKey} onChange={(e) => setApplicationiSessionKey(e.target.value)} style={{ marginBottom: '2%' }} placeholder="Application session key" />
                            </Form>
                    }


                    {/* <Form.Control
                            className="TagForm"
                            type="text"
                            placeholder="Tags"
                            onKeyPress={event => {
                                if (event.key === "Enter") {
                                    setTags([...tags, event.target.value])
                                    event.target.value = "";
                                }
                            }}
                        /> */}

                    {/* <ul className="TagList">
                            {tags.map((tag, index) => (
                                <li key={index} className="Tag">
                                    {tag}
                                    <BsFillTrashFill
                                        size={20}
                                        onClick={() => { setTags([...tags.filter(device => device !== tag)]) }}
                                    />
                                </li>
                            ))}
                        </ul> */}

                    <Form.Label>Tipo do Dispositivo (Utilizado para definir tipos de dados a receber):</Form.Label>
                    <div style={{display:'flex', alignItems:'center'}}>
                       
                            <Form style={{margin:'1px 1px', padding:'8px 2px', width:'100%'}}>
                                <Form.Group controlId="exampleForm.SelectCustom">
                                    <Form.Label>Tipo</Form.Label>
                                    <Form.Control as="select" custom onChange={(e) => setSelectType(e.target.value)}>
                                        {
                                     dadosTypes.length && (dadosTypes.length > 0) ? dadosTypes.map((item) => (
                                                <option key={item} value={item}>{item}</option>
                                            )) :
                                            <option>Nenhum type cadastrado</option>
                                        }

                                    </Form.Control>
                                </Form.Group>
                            </Form>
                            <Link to="/cadastro/cadastrar-variaveis" style={{ textDecoration: 'none', marginTop:'2%' }}>
                                <Button variant="success"><IoMdAdd size={28} /></Button>
                            </Link>
                        
                       

                        
                    </div>


                    <Button onClick={Cadastro} variant="success">Cadastrar Dispositivo</Button>
                </Col>


            </Row>
        </Container>
    )
}