# Plataforma-Iot
Plataforma de desenvolvimento de soluções IoT
******* INSTALANDO E CONFIGURANDO APACHE KAFKA NO SERVIDOR UBUNTU ****************
Introdução

O Apache Kafka é um popular gerenciador e distribuidor de mensagens, projetado para lidar com grandes volumes de dados em tempo real e com eficiência. Um cluster Kafka não é apenas altamente escalável e tolerante a falhas, mas também possui uma taxa de transferência muito maior se comparado a outros gerenciadores de mensagens, como ActiveMQ e RabbitMQ.

Embora geralmente seja usado como um sistema de mensagens de publicação/assinatura, muitas empresas também o usam para agregação de logs, pois oferecem armazenamento persistente para mensagens publicadas.
Pré-Requisitos

Você vai precisar dos seguintes itens para continuar este tutorial:

    Um servidor Ubuntu com um usuário não-root com privilégios sudo
    RAM de 4 GB ou mais
    OpenJDK 8 ou + instalado em seu servidor

Passo 1 - Crie um usuário para o Kafka

O Kafka pode gerenciar solicitações em uma rede, portanto, você deve criar um usuário dedicado para ele. Fazendo isso, você protegerá sua máquina de possíveis danos. Esta etapa consiste em criar um usuário para o kafka, mas você pode criar outro usuário para executar as demais tarefas.

Crie um usuário chamado kafka com o comando useradd:

sudo useradd kafka -m

A tag-m serve para garantir que haverá um diretório home para o usuário.

Escolha uma senha para a conta por meio do seguinte comando:

sudo passwd kafka

Conceda permissão sudo ao usuário com o comando:

sudo adduser kafka sudo

Agora o seu usuário kafka está criado. Você pode usar o comando seguinte para entrar na conta:

su -l kafka

Uma vez que o Kafka tem um usuário específico, podemos seguir com a instalação.
Passo 2 - Baixando e Extraindo os Binários Kafka

Para baixar e extrair binários Kafka em pastas dedicadas no diretório do usuário kafka, comece criando um diretório em /home/kafka named Downloads:

mkdir ~/Downloads

Use curl para baixar os arquivos binários do Kafka:

curl "https://downloads.apache.org/kafka/2.7.0/kafka_2.12-2.7.0.tgz" -o ~/Downloads/kafka.tgz

Depois, crie uma pasta chamada kafka e torne-a o diretório-base para a instalação:

mkdir ~/kafka && cd ~/kafka

Extraia o arquivo que você baixou usando o seguinte comando:

tar -xvzf ~/Downloads/kafka.tgz --strip 1

A flag --strip 1 especificamente garante que o arquivo será extraído em ~/kafka/ e não em outro diretório.
Passo 3 - Configurar o Servidor Kafka

O Kafka naturalmente não permitirá que você delete algum tópico, categoria, feed ou nome de grupo nos quais a mensagem possa ser publicada. Você pode fazer alterações editando o arquivo de configuração.

Os arquivos de configuração estão especificados nas propriedades do servidor. Abra este arquivo com o seu editor:

nano ~/kafka/config/server.properties

E então adicione uma configuração que permita deletar os tópicos Kafka. Cole na linha de baixo:

~/kafka/config/server.properties

delete.topic.enable = true

Em seguida, salve o arquivo para configurar o Kafka.
Passo 4 - Criando Unit Files Systemd e iniciando o servidor kafka

Para realizar ações como iniciar, parar e reiniciar o Kafka de forma consistente com outros serviços Linux, crie uma unidade systemd para o servidor Kafka.

Comece criando uma unidade de arquivo para zookeeper (um serviço usado pelo Kafka para gerenciar as configurações e clusters):

sudo youreditor/etc/systemd/system/zookeeper.service

Depois, coloque a seguinte definição dentro do arquivo:

/etc/systemd/system/zookeeper.service

[Unit]
Requires=network.target remote-fs.target
After=network.target remote-fs.target

[Service]
Type=simple
User=kafka
ExecStart=/home/kafka/kafka/bin/zookeeper-server-start.sh /home/kafka/kafka/config/zookeeper.properties
ExecStop=/home/kafka/kafka/bin/zookeeper-server-stop.sh
Restart=on-abnormal

[Install]
WantedBy=multi-user.target

[Unit] section specifies that Zookeeper needs networking and the filesystem to be ready before it starts. While [Service] section specifies that systemd should use the zookeeper-server-start-sh amd zookeeper-server-stop.sh shell files to start and stop service.

O próximo passo consiste em criar um arquivo systemd para o Kafka:

sudo nano /etc/systemd/system/kafka.service

Insira o seguinte:

/etc/systemd/system/kafka.service

[Unit]
Requires=zookeeper.service
After=zookeeper.service

[Service]
Type=simple
User=kafka
ExecStart=/bin/sh -c '/home/kafka/kafka/bin/kafka-server-start.sh /home/kafka/kafka/config/server.properties > /home/kafka/kafka/kafka.log 2>&1'
ExecStop=/home/kafka/kafka/bin/kafka-server-stop.sh
Restart=on-abnormal

[Install]
WantedBy=multi-user.target

[Unit] section specifies that this file depends on zookeeper.service. This will ensure that zookeeper starts automatically when kafka starts. While [Service] specifies that systemd should use the kafka-server-start-sh and kafka-server-stop-sh shell files to start and stop the service.

Uma vez que as unidades tenham sido definidas, inicie o kafka:

sudo systemctl start kafka

Garanta que o servidor tenha iniciado com o comando:

sudo journalctl -u kafka

O arquivo de saída deve mostrar o kafka started

Para programar a iniciação do Kafka quando o sistema reiniciar, use o comando:

sudo systemctl enable kafka

Passo 5 — Testando a instalação

Vamos publicar uma mensagem para testar o funcionamento do Kafka. Ele precisa de dois itens para publicar mensagens:

Um produtor, que viabiliza a publicação de registros Um consumidor, que vai ler e consumir os dados e registros

Para começar, crie um tópico chamado ibti:

#### DENTRO DA PASTA BIN ######
criando topico
./kafka-topics.sh--create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic ibti

listando os topicos
./kafka-topics --zookeeper 127.0.0.1:2181 --list

remover topico
./kafka-topics.sh --zookeeper 127.0.0.1:2181 --topic first_topic --delete

produzindo menssagem
./kafka-console-producer.sh --broker-list localhost:9092 --topic ibti

Consumindo menssagem
./kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic ibti --from-beginning


Se tudo estiver certo, você verá a mensagem em seu terminal.
Passo 6 — Restringindo o usuário Kafka

Agora que o Kafka está instalado, você pode remover os privilégios do usuário. Antes disso, saia da conta e entre novamente como um usuário não-root sudo qualquer.

Remova o usuário kafka do grupo sudo:

sudo deluser kafka sudo

Bloqueie a senha do usuário kafka com o comando de senha, de forma que ninguém possa acessar este servidor por meio dessa conta:

sudo passwd kafka -l

Agora, apenas usuários root ou sudo podem logar como kafka pelo comando:

sudo su - kafka

Se quiser desbloquear, use a flag -u como feito abaixo:

sudo passwd kafka -u

Conclusão

Se chegou até aqui, você tem um Apache Kafka funcionando em um servidor Ubuntu.
