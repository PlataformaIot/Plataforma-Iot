import React from 'react';
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
    FormControl
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsFillTrashFill, BsPencil } from 'react-icons/bs'
import { FaPlusCircle } from 'react-icons/fa'
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io';




export default function CadastroEvery() {
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
                    <Form.Control style={{ marginBottom: '2%' }} placeholder="Disposito EUI" />
                    <Form.Control style={{ marginBottom: '2%' }} placeholder="Aplicação EUI" />
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Tags"
                        />
                        <InputGroup.Append>
                            <Button variant="outline-secondary">+</Button>
                        </InputGroup.Append>
                    </InputGroup>


                    <h4>Segurança</h4>
                    <Form.Control style={{ marginBottom: '2%' }} placeholder="Network session key" />
                    <Form.Control style={{ marginBottom: '2%' }} placeholder="Application session key" />



                    <Link to="/cadastro/cadastrar-variaveis" className="nextCad">
                        <Button variant="light">Cadastrar Variaveis<IoMdArrowRoundForward size={30} /></Button>
                    </Link>
                </Col>

            </Row>
        </Container>
    )
}