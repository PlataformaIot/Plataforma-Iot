import React from 'react';
import {Switch, Route} from 'react-router-dom';


import Home from './Pages/Home';
import Tabela from './Pages/Table';
import Indicador from './Pages/Indicator';
import Graph from './Pages/Graph';
import Mapa from './Pages/Map';
import CadastroVariaveis from './Pages/CadastroVariaveis';
import CadastroEvery from './Pages/CadastroEvery';

export default function Router(){
    return(
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/tabela" component={Tabela}/>
            <Route path="/indicator" component={Indicador}/>
            <Route path="/map" component={Mapa}/>
            <Route path="/graph" component={Graph}/>
            <Route path="/cadastro/cadastrar-variaveis" component={CadastroVariaveis}/>
            <Route path="/cadastro" component={CadastroEvery}/>
        </Switch>
    );
}