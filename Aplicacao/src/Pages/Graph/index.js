import React from 'react';
import { Chart, Row, Col } from 'react-google-charts'
import { Container } from 'react-bootstrap';

export default function Graph() {
    return (
        <Container fluid>
            <Chart
                width={'100%'}
                height={'470px'}
                chartType="LineChart"
                loader={<div>Carregando</div>}
                data={
                    [
                        ['x', 'Umidade', 'Temperatura', 'Bateria'],
                        [0, 0, 0, 100],
                        [1, 10, 8, 90],
                        [2, 23, 30, 90],
                        [3, 17, 40, 89],
                        [4, 18, 50, 80],
                        [5, 9, 30, 75],
                        [6, 11, 5, 60],
                        [7, 27, 10, 58],
                        [8, 33, 12, 50],
                        [9, 40, 22, 48],
                        [10, 32, 40, 40],
                        [11, 35, 9, 30],
                        [11, 50, 30, 90],
                    ]
                }
                options={{
                    hAxis: {
                        title: 'Tempo'
                    },
                    vAxis: {
                        title: 'Temperatura e Umidade'
                    },
                    series:{
                        2:{curveType: 'function'}
                    },
                }}
                rootProps={{ 'data-testid': '1' }}
            />


        </Container>
    )
}