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
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsFillTrashFill, BsPencil } from 'react-icons/bs'
import { FaPlusCircle } from 'react-icons/fa'
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io';




export default function CadastroEvery() {
    const [dispositivoEUI, setDispositivoEUI] = useState('');
    const [aplicacaoEUI, setAplicacaoEUI] = useState('');
    const [tags, setTags] = useState([]);
    const [netWorkSessionKey, setNetWorkSessionKey] = useState('');
    const [applicationSessionKey, setApplicationiSessionKey] = useState('');
    const [cadastroEvery, setCadastroEvery] = useState('');
    

    console.log(cadastroEvery)
    function CadastroEvery(){
        const data ={
            dispositivoEUI: dispositivoEUI,
            aplicacaoEUI: aplicacaoEUI,
            tags: tags,
            netWorkSessionKey: netWorkSessionKey,
            applicationSessionKey: applicationSessionKey
        }

        setCadastroEvery(data)
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
                                    onClick={() => { setTags([...tags.filter(device => device !== tag)])}}
                                    />
                                </li>
                            ))}
                        </ul>
                   


                    <h4>Segurança</h4>
                    <Form.Control value={netWorkSessionKey} onChange={(e) => setNetWorkSessionKey(e.target.value)} style={{ marginBottom: '2%' }} placeholder="Network session key" />
                    <Form.Control value={applicationSessionKey} onChange={(e) => setApplicationiSessionKey(e.target.value)} style={{ marginBottom: '2%' }} placeholder="Application session key" />



                    <Link to="/cadastro/cadastrar-variaveis" className="nextCad">
                        <Button onClick={CadastroEvery} variant="light">Cadastrar Variaveis<IoMdArrowRoundForward size={30} /></Button>
                    </Link>
                </Col>

            </Row>
        </Container>
    )
}