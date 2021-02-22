# Cliente de mensagens MQTT
Este cliente é a parte da API responsável receber da Everynet todas as mensagens enviadas pelos dispositivos cadastrados na aplicação, registrar todas os dados no banco e repassar para o Kafka as mensagens com todos os dados já parametrizados com a programação feita pelo usuário que registrou o dispositivo.

## Requerimentos
A máquina que for rodar esta aplicação precisa ter Python 3.x instalado, bem como as bibliotecas listadas abaixo:
* paho-mqtt
* pymongo
* kafka-python

Todas as bibliotecas podem ser instaladas atravéz do PiP pelo cmd.
* pip3 install 'nomedabiblioteca' (tudo em caixa baixa)

É necessário ter o MongoDB com a versão compatível com o Python em uso e estar rodando a instância do banco de dados 'testeProjeto' na mesma máquina na porta 27017.

Também é necessário estar com a porta 1883 liberada, com o IP da máquina cadastrado no broker da everynet e com o script conector kafka rodando.

Por fim, basta navegar o terminal até a pasta onde o 'go.py' está e execute o script cliente MQTT com a seguinte linha de comando:
* python3 go.py

## Parâmetros de configuração para processamento das variáveis de cada dispositivo

O front-end deverá gerar um código JSON de configuração para cada dispositivo com a seguinte estrutura exemplificada:


    json_object = {
        "name": "gps_dragino",
        "variables": {
            "var": [ "lat", "long", "bateria"]
        },
        "bytes":{
            "lat": [0, 3],
            "long": [4, 7],
            "bateria": [8, 9]
        },
        "if":{
            "var":  [ "lat", "long", "bateria"],
            "comp" : ["and", "and","none"], #and, or, gt, lt, gt=, lt=
            "args" : [2147483648, 2147483648,0],
            "do" : ["sum", "sum","none"],
            "arg_do" : [-4294967296, -4294967296,0],
            "else": ["sum", "sum","none"],
            "arg_else" : [0, 0,0]
        },
        "operations":{
            "lat": ["div"],
            "long": ["div"],
            "bateria": ["mask","div"]
        },
        "args":{
            "lat": [1000000.0],
            "long": [1000000.0],
            "bateria":[65535, 1000.0]
        },
        "size": 11,
        "order": "big"
    }


a existência da chave "if" é o opicional. Esse campo específico no exemplo realiza o seguinte processamento nas variáveis:


    if( lat & 0x80000000 ):
        lat = lat + (-0x100000000)
    else:
        lat = lat + 0

    if( long & 0x80000000 ):
        long = long + (-0x100000000)
    else:
        long = long + 0

    if(1):
        bateria = bateria


Na chave "var" são dispostas todas as variáveis que receberão o processamento condicionado. Todas as listas de valores deverão ter o mesmo tamanho, pois as operações/valores para a respectiva variável deverão ficar na mesma posição da lista em cada chave de "if". Caso não haja um condição ou operação para uma variável, deve-se atribuir o valor "none" no lugar da mesma em cada lista.