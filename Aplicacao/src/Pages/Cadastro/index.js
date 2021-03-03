import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Jumbotron, Form, Modal, Badge, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { MdRemoveCircleOutline } from 'react-icons/md';
import { VscSymbolOperator } from 'react-icons/vsc';
import './styles.css';

export default function Cadastro() {

    const [form, setForm] = useState({ cards: [] });
    const [cadastro, setCadastro] = useState();
    const [operations, setOperations] = useState([{
        id: 1, name: "Soma", value: "sum"
    },
    {
        id: 2, name: "Divisão", value: "div"
    },
    {
        id: 3, name: "Multiplicação", value: "mux"
    },
    {
        id: 4, name: "Máscara", value: "mask"
    },])

    const addNewCamp = () => {
        let newForm = { ...form }
        let newCard = {
            variavel: '',
            bitInicial: '',
            bitFinal: '',
            operationsSelects: []
        }
        newForm.cards.push(newCard);
        setForm(newForm)
    }

    const addNewOperation = (index) => {
        let newForm = { ...form }
        let newOperationSelect = {
            operacao: []
        }
        newForm.cards[index].operationsSelects.push(newOperationSelect);
        setForm(newForm)
    }

    const onFormUpdate = (e, index) => {
        let newForm = { ...form }
        newForm.cards[index][e.target.value] = e.target.value;
        setForm(newForm)
    }

    function onOperationSelectUpdate(e, cardIndex, selectIndex) {
        let newForm = { ...form };
        newForm.cards[cardIndex].operationsSelects[selectIndex].operacao = e.target.value;
        setForm(newForm);
    }

    function operationRemove(cardIndex, selectIndex) {
        let newForm = { ...form };
        newForm.cards[cardIndex].operationsSelects.splice(selectIndex, 1);
        setForm(newForm);
    }



    const removeOperacao = (cardIndex, selectIndex) => {
        //setForm([...newCard.filter((_, index) => index !== position)])
        let newForm = { ...form };
        newForm.cards.splice(cardIndex, 1)
        setForm(newForm);

    }



    function handleCadastro(e, index) {
        console.log(form)
        let newCadastro = form




        setCadastro(newCadastro)
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
                                    <Form.Control style={{ marginBottom: '10px' }} maxLength={10} />
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
                                form.cards.map((card, index) => (
                                    <Card body key={index}>
                                        {`Campo ${index + 1}`}

                                        <Form.Row>

                                            <Form.Control name="variavel" onChange={(e) => onFormUpdate(e, index)} placeholder={`Variavel ${index + 1}`} />
                                            <Form.Control name="bitInicial" onChange={(e) => onFormUpdate(e, index)} placeholder={`BitInicial ${index + 1}`} />
                                            <Form.Control name="bitFinal" onChange={(e) => onFormUpdate(e, index)} placeholder={`BitFinal ${index + 1}`} />

                                            {form.cards[index].operationsSelects &&
                                                form.cards[index].operationsSelects.length > 0 &&
                                                form.cards[index].operationsSelects.map((operationSelect, i) => (

                                                    <Form.Row key={i} >
                                                        <Form.Control value={form.cards[index].operationsSelects[i].operacao} onChange={(e) => onOperationSelectUpdate(e, index, i)} as="select">
                                                            {operations.map((operation) => (
                                                                <option key={operation.id} value={operation.value}>{operation.name}</option>
                                                            ))}
                                                        </Form.Control>
                                                        <Badge onClick={() => operationRemove(index, i)} variant="danger" style={{ cursor: 'pointer' }} ><MdRemoveCircleOutline size={20} /></Badge>
                                                    </Form.Row>
                                                ))
                                            }

                                            <Button onClick={() => addNewOperation(index)} variant="success"><VscSymbolOperator size={25} /></Button>
                                            <Button onClick={() => removeOperacao(index)} variant="danger"><MdRemoveCircleOutline size={25} /></Button>
                                        </Form.Row>

                                    </Card>
                                ))

                            }







                            <Form.Row>
                                <Button style={{ marginBottom: '10px' }} variant="success" onClick={() => addNewCamp()}>Adicionar variável</Button>
                            </Form.Row>



                            <Button onClick={handleCadastro} variant="success">Enviar</Button>
                        </Form>
                    </Jumbotron>
                </Col>
            </Row>
        </Container>
    )
}