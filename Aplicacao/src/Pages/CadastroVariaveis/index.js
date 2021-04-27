import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Jumbotron, Form, Modal, Badge, Card } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { MdRemoveCircleOutline } from 'react-icons/md';
import { VscSymbolOperator } from 'react-icons/vsc';
import { useSelector, useDispatch } from 'react-redux';
import { cadastroEvery, dadosDevice } from '../../store/Modulos/Devices/actions';

import './styles.css';
import api from '../../Connections/api';

export default function CadastroVariaveis({ navigation }) {

    const [form, setForm] = useState({ cards: [] });
    const [cadastro, setCadastro] = useState();
    const [args, setArgs] = useState([]);
    const [operations, setOperations] = useState([
        {
            id: 0, name: 'Operação', value: null
        },
        {
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
        },
    ]);
    const [ordemByte, setOrdemBytes] = useState([{ id: 0, name: '', value: '' }, { id: 1, name: 'Little-endian (trás p/ frente)', value: 'little' }, { id: 2, name: 'Big-endian (frente p/ trás)', value: 'big' },])
    const [saveOrdemByte, setSaveOrdemByte] = useState(1);
    const [tamanhoByte, setTamanhoByte] = useState('');
    const [nome, setNome] = useState('');


    const dispatch = useDispatch()



    const addNewCamp = () => {
        let newForm = { ...form }
        let newCard = {
            variavel: "",
            bitInicial: "",
            bitFinal: "",
            saveArgs: [],
            operationsSelects: []
        }
        newForm.cards.push(newCard);
        setForm(newForm)
    }

   

    const addNewOperation = (index) => {
        let newForm = { ...form }
        let newOperationSelect = {
            operacao: [],
            args:[]
        }
        newForm.cards[index].operationsSelects.push(newOperationSelect);
        newForm.cards[index].saveArgs.push(newOperationSelect);
        setForm(newForm)
    }

    const onFormUpdate = (e, index) => {
        let newForm = { ...form }
        newForm.cards[index][e.target.name] = e.target.value;
        setForm(newForm)
    }

    function onOperationSelectUpdate(e, cardIndex, selectIndex) {
        let newForm = { ...form };
        newForm.cards[cardIndex].operationsSelects[selectIndex].operacao = e.target.value;
        setForm(newForm);
    }
    function newArgs(e, cardIndex, selectIndex) {
        let newForm = { ...form };
        newForm.cards[cardIndex].saveArgs[selectIndex].args = e.target.value;
        setForm(newForm);
    }

    function onOrdemByte(e) {
        setOrdemBytes(e.target.value)
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



    console.log(cadastro)

    async function handleCadastro() {
        /*  await form.cards.map((i) => {
              const params = {
                  name: nome,
                  /* variables: i.variavel,
                  bitInicial: i.bitInicial,
                  bitFinal: i.bitFinal,
                  operacao: operations,
                  args: i.args */
        //variavel: form
        /* ordemByte: saveOrdemByte,
        tamanhoByte: tamanhoByte, 
    }

    api.post(`types/`, params)
        .then(res => {
            console.log(res.data)
        })
        .catch((err) => {
            console.log('Erro: ' + err)
        })
}) */

        const params = {
            name: nome,
            tamanhoByte: tamanhoByte,
            ordemByte: saveOrdemByte,
            variavel: form,
        }

        setCadastro(params)


    }






    return (
        <Container fluid>
            <Link to="/cadastro">
                <Button variant="light" style={{ marginBottom: '2%' }}><IoMdArrowRoundBack size={30} /></Button>
            </Link>
            <Row lg="12">

                <Col>
                    <h3 style={{ textAlign: 'center' }}>Cadastro do Tipo</h3>
                    <Form onSubmit={handleCadastro}>
                        <Jumbotron>
                            <Form.Row>
                                <Col lg="3">
                                    <Form.Label>Nome do Tipo</Form.Label>
                                    <Form.Control value={nome} onChange={(e) => setNome(e.target.value)} style={{ marginBottom: '10px' }} maxLength={10} />
                                </Col>
                                <Col lg="2">
                                    <Form.Label>Tamanho do Bytes</Form.Label>
                                    <Form.Control value={tamanhoByte} onChange={(e) => setTamanhoByte(e.target.value)} style={{ marginBottom: '10px' }} maxLength={10} />
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col lg="2">
                                    <Form.Label>Ordem dos bits de dados</Form.Label>
                                    <Form.Control value={saveOrdemByte} onChange={e => setSaveOrdemByte(e.target.value)} style={{ marginBottom: '10px' }} as="select" custom>
                                        {ordemByte.map((byte) => (
                                            <option key={byte.id} value={byte.value}>{byte.name}</option>
                                        ))}
                                    </Form.Control>
                                </Col>
                            </Form.Row>
                            <Form.Label>Variáveis</Form.Label>

                            {form.cards.length > 0 && form.cards.map((card, index) => (
                                <Card body key={index} style={{ marginBottom: '3%', borderRadius: '5px' }}>
                                    {`Campo ${index + 1}`}

                                    <Form.Row>
                                        <Row>
                                            <Col lg="12">
                                                <Form.Control style={{ marginBottom: '1%', width: '40%', marginRight: '1%' }} name="variavel" onChange={(e) => onFormUpdate(e, index)} placeholder={`Variavel ${index + 1}`} />
                                                <Form.Control style={{ marginBottom: '1%', width: '30%', marginRight: '1%' }} name="bitInicial" onChange={(e) => onFormUpdate(e, index)} placeholder={`BitInicial ${index + 1}`} />
                                                <Form.Control style={{ marginBottom: '1%', width: '30%', marginRight: '1%' }} name="bitFinal" onChange={(e) => onFormUpdate(e, index)} placeholder={`BitFinal ${index + 1}`} />

                                                {form.cards[index].operationsSelects &&
                                                    form.cards[index].operationsSelects.length > 0 &&
                                                    form.cards[index].operationsSelects.map((operationSelect, i) => (


                                                        <Form.Row key={i} >
                                                            <Col>
                                                                <Form.Control style={{ marginRight: '1%', width: '100%', marginBottom: '2%' }} value={form.cards[index].operationsSelects[i].operacao} onChange={(e) => onOperationSelectUpdate(e, index, i)} as="select">
                                                                    {operations.map((operation) => (
                                                                        <option key={operation.id} value={operation.value}>{operation.name}</option>
                                                                    ))}
                                                                </Form.Control>
                                                            </Col>


                                                            <Col>
                                                                <Form.Control placeholder="ARGS" name="saveArgs"  onChange={(e) => newArgs(e, index, i)} />
                                                            </Col>
                                                            <Col>
                                                                <Badge style={{ justifyContent: 'center', alignItems: 'center', marginTop: 5 }} onClick={() => operationRemove(index, i)} variant="danger"  ><MdRemoveCircleOutline size={20} /></Badge>
                                                            </Col>

                                                        </Form.Row>



                                                    ))
                                                }
                                            </Col>
                                            <Col>
                                                <Button onClick={() => addNewOperation(index)} variant="success"><VscSymbolOperator size={25} /></Button>
                                                <Button style={{ marginLeft: '2%' }} onClick={() => removeOperacao(index)} variant="danger"><MdRemoveCircleOutline size={25} /></Button>
                                            </Col>
                                        </Row>
                                    </Form.Row>

                                </Card>
                            ))

                            }

                            <Form.Row>
                                <Button style={{ marginBottom: '10px' }} variant="success" onClick={() => addNewCamp()}>Adicionar variável</Button>
                            </Form.Row>



                        </Jumbotron>
                        <Button onClick={handleCadastro} variant="success">Adicionar tipo</Button>
                        <Link to="/cadastro">
                        </Link>

                    </Form>
                </Col>
            </Row>
        </Container>
    )
}