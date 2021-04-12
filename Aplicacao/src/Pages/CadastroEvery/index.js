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
import { cadastroEvery } from '../../store/Modulos/Devices/actions';




export default function CadastroEvery() {
    const [dispositivoEUI, setDispositivoEUI] = useState('');
    const [aplicacaoEUI, setAplicacaoEUI] = useState('');
    const [tags, setTags] = useState([]);
    const [netWorkSessionKey, setNetWorkSessionKey] = useState('');
    const [applicationSessionKey, setApplicationiSessionKey] = useState('');
    const [cadEvery, setCadEvery] = useState([]);
    const dispatch = useDispatch()

    const cadastroEveryNet = useSelector((state) => state.devicesState.cadastroEvery);
    const selectedDevice = useSelector((state) => state.devicesState.selectedDevice);


    console.log(cadastroEveryNet)
    function CadastroEvery() {
        const data = {
            dispositivoEUI: dispositivoEUI,
            aplicacaoEUI: aplicacaoEUI,
            tags: tags,
            netWorkSessionKey: netWorkSessionKey,
            applicationSessionKey: applicationSessionKey
        }

        dispatch(cadastroEvery(data))

    }


    return (
        <Container fluid>
            <div>
                <Link to="/">
                    <Button variant="light" style={{ marginBottom: '2%' }}><IoMdArrowRoundBack size={30} /></Button>
                </Link>
            </div>

            <Row>
                <Col lg="6">



                    <h4>Gerenciamento de Dispositivo</h4>
                    <Form.Control value={dispositivoEUI} onChange={(e) => setDispositivoEUI(e.target.value)} style={{ marginBottom: '2%' }} placeholder="Disposito EUI" />
                    <Form.Control value={aplicacaoEUI} onChange={(e) => setAplicacaoEUI(e.target.value)} style={{ marginBottom: '2%' }} placeholder="Aplicação EUI" />

                    <Form.Control
                        className="TagForm"
                        type="text"
                        placeholder="Tags"
                        onKeyPress={event => {
                            if (event.key === "Enter") {
                                setTags([...tags, event.target.value])
                                event.target.value = "";
                            }
                        }}
                    />

                    <ul className="TagList">
                        {tags.map((tag, index) => (
                            <li key={index} className="Tag">
                                {tag}
                                <BsFillTrashFill
                                    size={20}
                                    onClick={() => { setTags([...tags.filter(device => device !== tag)]) }}
                                />
                            </li>
                        ))}
                    </ul>



                    <h4>Segurança</h4>
                    <Form.Control value={netWorkSessionKey} onChange={(e) => setNetWorkSessionKey(e.target.value)} style={{ marginBottom: '2%' }} placeholder="Network session key" />
                    <Form.Control value={applicationSessionKey} onChange={(e) => setApplicationiSessionKey(e.target.value)} style={{ marginBottom: '2%' }} placeholder="Application session key" />


                    <Dropdown style={{ marginBottom: 30 }}>
                        <Dropdown.Toggle
                            id="dropdown-custom-components"
                            style={{
                                width: '50%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                            Tipo
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ width: '50%' }}>
                            <Dropdown.Item eventKey="1">Tipo 1</Dropdown.Item>
                            <Dropdown.Item>Tipo 2</Dropdown.Item>
                            <Dropdown.Item>Tipo 3</Dropdown.Item>
                            <Link to="/cadastro/cadastrar-variaveis" className="nextCad">
                                <Button onClick={CadastroEvery} variant="success"><IoMdAdd size={30} /> Cadastrar Tipo</Button>
                            </Link>

                        </Dropdown.Menu>
                    </Dropdown>

                </Col>

            </Row>
        </Container>
    )
}