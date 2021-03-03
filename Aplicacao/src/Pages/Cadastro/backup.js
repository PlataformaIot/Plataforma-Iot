import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Jumbotron, Form, Modal, Badge, Card } from 'react-bootstrap';
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

    const [bodyCard, setBodyCard] = useState([]);







    const [cadastro, setCadastro] = useState([]);//cadastro para nova variavel
    const [ordem, setOrdem] = useState([])// selecionar a ordem que vai ser dada Big ou Little
    const [variavel, setVariavel] = useState([]);//Armazena a variavel
    const [campos, setCampos] = useState([])//Gera o novo campo
    const [calculo, setCalculo] = useState([]);//combo para calculo, cria novo campo

    let operation = ['sum', 'div', 'mux', 'mask']

    //função cria novo campo
    function handleCampo(e) {
        e.preventDefault()
        setBodyCard([...bodyCard, ''])

        /* setVariavel([...variavel, ''])
        setBitInicial([...bitInicial,''])
        setBitFinal([...bitFinal, ''])
        setOperacao([...operacao,'']) */
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

    const handleCard = (e, index) => {
        bodyCard[index] = e.target.value;
        setBodyCard([...bodyCard])
        setBodyCard([...bodyCard, ''])

    }

    const removeCard = (position, index) => {
        setBodyCard([...bodyCard.filter((_, index) => index !== position)])
        /* setVariavel([...variavel.filter((_, index) => index !== position)])
        setBitInicial([...bitInicial.filter((_, index) => index !== position)])
        setBitFinal([...bitFinal.filter((_, index) => index !== position)])
        setOperacao([...operacao.filter((_, index) => index !== position)]) */

    }



    //armazena os dados de operação
    const handleOperacao = (e, index) => {
        operacao[index] = e.target.value
        setOperacao([...operacao])

    }

    //cria o novo campo para operação
    const newCampoOperacao = (e, index) => {
        e.preventDefault()
        setOperacao([...operacao, ''])


    }


    const removeOperacao = (position, index) => {
        setOperacao([...operacao.filter((_, index) => index !== position)])
        setBodyCard([...bodyCard.filter((_, index) => index !== position)])
        operation.splice(index, 1)
    }



    function handleCadastro(e, index) {
        console.log(cadastro)
        let newCadastro = cadastro
        newCadastro.push({
            bitInicial: bitInicial,
            bitFinal: bitFinal,
            variavel: variavel,
            operacao: operacao
        })



        setCadastro(newCadastro)
    }

    //função cria novo campo para calculo
    function handleCalculo(e) {
        e.preventDefault()
        setCalculo([...calculo, ''])
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




                            {
                                bodyCard.map((card, index) => (
                                    <Card body key={index}>
                                        {`Campo ${index + 1}`}

                                        <Form.Row>
                                            <Form.Control value={card.variavel} onChange={(e) => handleVariavel(e, index)} placeholder={`Variavel ${index + 1}`} />
                                            <Form.Control value={card.bitInicial} onChange={(e) => handleBitInicial(e, index)} placeholder={`BitInicial ${index + 1}`} />
                                            <Form.Control value={card.bitFinal} onChange={(e) => handleBitFinal(e, index)} placeholder={`BitFinal ${index + 1}`} />


                                            {operacao.map((op, index) => (
                                                <Form.Row>

                                                    <Form.Control key={index} onChange={(e) => handleOperacao(e, index)} as="select">
                                                        {operation.map((op, index) => (
                                                            <option key={index}>{op}</option>
                                                        ))}
                                                    </Form.Control>
                                                    <Badge variant="danger" style={{ cursor: 'pointer' }} onClick={() => removeOperacao(index)}><MdRemoveCircleOutline size={20} /></Badge>

                                                </Form.Row>
                                            ))}



                                            <Button onClick={newCampoOperacao} variant="success"><VscSymbolOperator size={25} /></Button>
                                            <Button onClick={() => removeCard(index)} variant="danger"><MdRemoveCircleOutline size={25} /></Button>
                                        </Form.Row>

                                    </Card>
                                ))

                            }







                            <Form.Row>
                                <Button style={{ marginBottom: '10px' }} variant="success" onClick={handleCard}>Adicionar variável</Button>
                            </Form.Row>



                            <Button onClick={handleCadastro} variant="success">Enviar</Button>
                        </Form>
                    </Jumbotron>
                </Col>
            </Row>
        </Container>
    )
}