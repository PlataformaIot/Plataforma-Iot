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
import { cadastroEvery, dadosDevice } from '../../store/Modulos/Devices/actions';




export default function CadastroEvery() {
    const [dispositivoEUI, setDispositivoEUI] = useState('');
    const [aplicacaoEUI, setAplicacaoEUI] = useState('');
    //const [tags, setTags] = useState([]);
    const [netWorkSessionKey, setNetWorkSessionKey] = useState('');
    const [applicationSessionKey, setApplicationiSessionKey] = useState('');
    const [checkActivation, setCheckActivation] = useState(false);
    const [selectType, setSelectType] = useState('');
    const dispatch = useDispatch()

    const cadastroEveryNet = useSelector((state) => state.devicesState.cadastroEvery);
    const selectedDevice = useSelector((state) => state.devicesState.selectedDevice);
    const dadosDevice = useSelector((state) => state.devicesState.dadosDevice);
    const devices = useSelector((state) => state.devicesState.devices);


    console.log(cadastroEveryNet)
    function CadastroEvery() {
        const data = {
            dispositivoEUI: dispositivoEUI,
            aplicacaoEUI: aplicacaoEUI,
            //tags: tags,
            netWorkSessionKey: netWorkSessionKey,
            applicationSessionKey: applicationSessionKey,
            activation: checkActivation
        }

        dispatch(cadastroEvery(data))

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
                                <Form.Control value={dispositivoEUI} onChange={(e) => setDispositivoEUI(e.target.value)} style={{ marginBottom: '2%' }} placeholder="Disposito EUI" />
                                <Form.Control value={aplicacaoEUI} onChange={(e) => setAplicacaoEUI(e.target.value)} style={{ marginBottom: '2%' }} placeholder="Aplicação EUI" />
                                <Form.Check value={checkActivation} onChange={(e) => setCheckActivation(e.target.checked)} type="switch" id="custom-switch" label={checkActivation === true ? "OTAA" : "Activation ABP"}  style={{ marginBottom: '2%' }} />
                            </Form>
                            :

                            <Form>
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
                    <Dropdown>
                        <Dropdown.Toggle
                            id="dropdown-custom-components"
                            style={{
                                width: '50%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom:'2%'

                            }}>
                            {selectedDevice === '' ? (devices.length > 0 ? devices[0].type : "") : devices.filter((dev) => dev.device === selectedDevice)[0].type}
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ width: '50%', marginBottom: '-38%' }}>
                            {
                                devices.map((item) =>(
                                    <Dropdown.Item  eventKey={event => {
                                        if (event.key === "Click") {
                                            setSelectType([...selectType, event.target.value])
                                            event.target.value = "";
                                        }
                                    }}>{item.type}</Dropdown.Item>
                                ))   
                            }
                            <Link to="/cadastro/cadastrar-variaveis" className="nextCad">
                                <Button onClick={CadastroEvery} variant="success"><IoMdAdd size={30} /> Cadastrar Novo Tipo</Button>
                            </Link>
                        </Dropdown.Menu>
                    </Dropdown>

                            <Button  onClick={() =>{}} variant="success">Cadastrar Dispositivo</Button>
                </Col>


            </Row>
        </Container>
    )
}