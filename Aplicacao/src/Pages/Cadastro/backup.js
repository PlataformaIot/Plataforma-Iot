import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Jumbotron, Form, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';
import './styles.css';

export default function Cadastro() {
    const [cadastro, setCadastro] = useState([]);//cadastro para nova variavel
    const [ordem, setOrdem] = useState([])// selecionar a ordem que vai ser dada Big ou Little
    const [variavel, setVariavel] = useState('');//Armazena a variavel
    const [campos, setCampos] = useState([])//Gera o novo campo
    const [calculo, setCalculo] = useState([]);//combo para calculo, cria novo campo

    //função cria novo campo
    function handleCampo(e) {
        e.preventDefault()
        if (variavel !== '' && ordem !== '') {

            let newCadastro = cadastro
            newCadastro.push({
                variavel: variavel,
                ordem: ordem
            })
            setCampos([...campos, ''])
            setCadastro(newCadastro)
        }
    }

    function handleCadastro(e) {

    }

    //função cria novo campo para calculo
    function handleCalculo(e) {
        e.preventDefault()
        setCalculo([...calculo, ''])
    }

    //função remove uma variavel botão '-' warning
    function handleRemove(index) {
        setCampos(cadastro.splice(index, 1))
    }






    return (
        <Container fluid>
            <Link to="/">
                <Button variant="light" style={{ marginBottom: '2%' }}><IoMdArrowRoundBack size={30} /></Button>
            </Link>
            <Row lg="12">

                <Col>
                    <h3 style={{ textAlign: 'center' }}>Dados do Dispositivo</h3>
                    <Jumbotron>

                        <Form onSubmit={handleCadastro}>
                            <Form.Row>
                                <Col lg="1">
                                    <Form.Label>Tamanho</Form.Label>
                                    <Form.Control style={{ marginBottom: '10px' }} value={variavel} onChange={(e) => setVariavel(e.target.value)} maxLength={10} />
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col lg="2">
                                    <Form.Label>Ordem dos Bits</Form.Label>
                                        <Form.Control style={{ marginBottom: '10px' }} as="select" custom>
                                            <option value='1'>Big</option>
                                            <option value="2">Little</option>
                                        </Form.Control>
                                </Col>
                            </Form.Row>
                            <Form.Label>Variáveis</Form.Label>
                            <Form.Row>
                                <Col lg="3">
                                    <Form.Control style={{ marginBottom: '10px' }} placeholder="Variavel" value={variavel} onChange={(e) => setVariavel(e.target.value)} maxLength={10} />
                                </Col>
                                <Col lg="1">
                                    <Form.Control style={{ marginBottom: '10px' }} placeholder="BitIni" />
                                </Col>
                                <Col lg="1">
                                    <Form.Control style={{ marginBottom: '10px' }} placeholder="BitFinal" />
                                </Col>
                                <Button style={{ marginBottom: '10px' }} variant="success" onClick={handleCampo}>Adicionar variável</Button>
                            </Form.Row>

                            <Form.Row>
                                <Col lg="12">
                                    {cadastro.map((campo, index) => (
                                        <Form.Row>
                                            <Col key={index} lg="3" >
                                                <Form.Control value={campo.variavel} placeholder="Digite a variavel" disabled />
                                            </Col>
                                            <Col lg="1">

                                                <Form.Control placeholder="BitIni" disabled/>
                                            </Col>
                                                
                                            <Col lg="1">
                                                <Form.Control placeholder="BitFinal" disabled/>
                                            </Col>
                                            
                                            <Col>
                                                <Button style={{ marginBottom: '10px' }} onClick={handleCalculo} variant="success">Operação</Button>
                                                <Button style={{ marginBottom: '10px', marginLeft: '7px' }} onClick={() => (handleRemove(index))} variant="warning">Remover variável</Button>
                                            </Col>
                                        </Form.Row>
                                    ))}
                                </Col>
                            </Form.Row>
                            <Button variant="success">Enviar</Button>
                        </Form>
                    </Jumbotron>
                </Col>
            </Row>
        </Container>
    )
}