import React from 'react';
import {Switch, Route} from 'react-router-dom';


import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import Tabela from './Pages/Table';
import CadastroVariaveis from './Pages/CadastroVariaveis';
import CadastroEvery from './Pages/CadastroEvery';
import Dispositivo from './Pages/Dispositivos';

export default function Router(){
    return(
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/dashboard" component={Dashboard}/>
            <Route path="/tabela" component={Tabela}/>
            <Route path="/cadastro/cadastrar-variaveis" component={CadastroVariaveis}/>
            <Route path="/cadastro" component={CadastroEvery}/>
            <Route path="/dispositivos-cadastrados" component={Dispositivo}/>
        </Switch>
    );
}