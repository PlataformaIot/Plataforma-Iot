import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Jumbotron, Form, Modal, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { MdRemoveCircleOutline } from 'react-icons/md';
import { VscSymbolOperator } from 'react-icons/vsc';
import './styles.css';

export default function Cadastro() {

    const [bitInicial, setBitInicial] = useState([]);//bit inicial
    const [bitFinal, setBitFinal] = useState([]);//bit final
    const [operacao, setOperacao] = useState([]);//operação
    const [byte, setByte] = useState('');//quantidade de bytes




    const [variavelSelecionado, setVariavelSelecionado] = useState([])
    const [modalOpen, setModalOpen] = useState(false);//abre modal

    const [cadastro, setCadastro] = useState([]);//cadastro para nova variavel
    const [ordem, setOrdem] = useState([])// selecionar a ordem que vai ser dada Big ou Little
    const [variavel, setVariavel] = useState([]);//Armazena a variavel
    const [campos, setCampos] = useState([])//Gera o novo campo
    const [calculo, setCalculo] = useState([]);//combo para calculo, cria novo campo

    //função cria novo campo
    function handleCampo(e) {
        e.preventDefault()
        setVariavel([...variavel, ''])
        setBitInicial([...bitInicial, ''])
        setBitFinal([...bitFinal, ''])
        //setVariavelSelecionado([...variavelSelecionado, ''])
        setOperacao([...operacao, ''])

    }


    const handleVariavel = (e, index) => {
        variavel[index] = e.target.value
        setVariavel([...variavel])
    }

    const handleBitInicial = (e, index) => {
        bitInicial[index] = e.target.value
        setBitInicial([...bitInicial])
    }

    const handleBitFinal = (e, index) => {
        bitFinal[index] = e.target.value
        setBitFinal([...bitFinal])
    }

    const openModal = (variaveis) => {
        setModalOpen(true)
        setCampos(variaveis)


    }

    const closeModal = () => {
        setModalOpen(false)
    }

    //armazena os dados de operação
    const handleOperacao = (e, index) => {
        operacao[index] = e.target.value
        setOperacao([...operacao])
    }

    //cria o novo campo para operação
    const newCampoOperacao = (e) => {
        e.preventDefault()
        setOperacao([...operacao, ''])
    }

    const removeCampoOperacao = (position) => {
        setOperacao([...operacao.filter((_, index) => index !== position)])
    }

    function handleCadastro(e, index) {
        console.log(cadastro)
        let newCadastro = cadastro
        newCadastro.push({
            bitInicial: bitInicial,
            bitFinal: bitFinal,
            variavel: variavel,
        })



        setCadastro(newCadastro)
    }

    //função cria novo campo para calculo
    function handleCalculo(e) {
        e.preventDefault()
        setCalculo([...calculo, ''])
    }

    //função remove uma variavel botão '-' warning
    const handleRemove = (position) => {
        setVariavel([...variavel.filter((_, index) => index !== position)])
        setBitInicial([...bitInicial.filter((_, index) => index !== position)])
        setBitFinal([...bitFinal.filter((_, index) => index !== position)])
        //setVariavelSelecionado([...variavelSelecionado.filter((_, index) => index !== position)])
        setOperacao([...operacao.filter((_, index) => index !== position)])

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
                                    <Form.Control style={{ marginBottom: '10px' }} value={byte} onChange={(e) => setByte(e.target.value)} maxLength={10} />
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
                                <Button style={{ marginBottom: '10px' }} variant="success" onClick={handleCampo}>Adicionar variável</Button>
                            </Form.Row>


                            <Form.Row>
                                <Col lg="3">
                                    {variavel.map((variaveis, index) => (
                                        <Form.Row key={index}>
                                            {/* <Col lg="1">
                                                    <Badge onClick={() => { openModal(variaveis) }} style={{ marginLeft: '-90%', marginTop: '50%', cursor: 'pointer' }} variant="danger"><MdRemoveCircleOutline size={18} /></Badge>
                                                </Col> */}
                                            <Form.Control style={{ marginBottom: '10px', marginRight: '6px' }} value={variaveis} onChange={(e) => handleVariavel(e, index)} placeholder={`Variavel ${index + 1}`} />
                                        </Form.Row>
                                    ))}
                                </Col>

                                <Col lg="2">
                                    {bitInicial.map((bitI, index) => (
                                        <Form.Row key={index}>
                                            <Form.Control style={{ marginBottom: '10px', width: '50%' }} value={bitI} onChange={(e) => handleBitInicial(e, index)} placeholder={`BitInicial ${index + 1}`} />
                                        </Form.Row>
                                    ))}
                                </Col>


                                <Col lg="2">
                                    {operacao.map((op, index) => (
                                        <Form.Row key={index} style={{alignItems:'center', flexDirection:'row'}}>
                                            <Form.Control style={{width:'35%', marginBottom:'10px', marginLeft:'10px', flexDirection:'column'}} as="select">
                                                <option value={op} onChange={(e) => handleOperacao(e, index)}>{index}</option>
                                            </Form.Control>
                                            <Badge style={{marginTop:'-8px', marginLeft:'5px'}} variant="danger" onClick={() => handleRemove(index)}><MdRemoveCircleOutline size={20} /></Badge>
                                        </Form.Row>

                                    ))}
                                </Col>

                                <Col lg="4">
                                    {bitFinal.map((bitF, index) => (
                                        <Form.Row key={index}>
                                            <Form.Control style={{ marginBottom: '10px', width: '24%', marginLeft: '-73%' }} value={bitF} onChange={(e) => handleBitFinal(e, index)} placeholder={`BitFinal ${index + 1}`} />
                                            <div className="botoes">
                                                <Button style={{ marginLeft: '-30px' }} onClick={newCampoOperacao} variant="success"><VscSymbolOperator size={25} /></Button>
                                                <Button style={{ marginLeft: '10px' }} onClick={() => handleRemove(index)} variant="danger"><MdRemoveCircleOutline size={25} /></Button>
                                            </div>
                                        </Form.Row>
                                    ))}
                                </Col>







                                {variavelSelecionado.map((va, index) => (
                                    <Modal key={index} show={modalOpen} onHide={closeModal}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Operação</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            {index}
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="success">Salvar</Button>
                                        </Modal.Footer>
                                    </Modal>
                                ))}


                            </Form.Row>
                            <Button onClick={handleCadastro} variant="success">Enviar</Button>
                        </Form>
                    </Jumbotron>
                </Col>
            </Row>
        </Container>
    )
}