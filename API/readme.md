# Requerimentos
A máquina que for rodar esta API precisa ter Python 3.x instalado, bem como as bibliotecas listadas abaixo:
* FastAPI
* uvicorn
* pymongo
* pydantic
* py_singleton
* requests

Todas as bibliotecas podem ser instaladas atravéz do PiP pelo cmd.
* pip install 'nome' (tudo em caixa baixa)

Por fim, para rodar o servidor, não é mais necessário montá-lo no uvicorn via linha de comando. O server.py já faz isso internamente e pode ser rodado diretamente pelo explorador de arquivos ou pelo terminal. Para alterar qualquer configuração basta ir no mesmo arquivo e editar a última linha de código, que tem a função 'app.run':
* host: atualmente configurado para localhost. Pode ser alterado para um ip fixo também;
* port: altera a porta de acesso da API. Padrão: 8000;
* reload: permite que a aplicação pegue qualquer alteração que você fizer em tempo real após salvar o código, sem precisar ficar reiniciando toda vez. **Mude para 'False' caso precise usar a rota '/csv'.

**Não salvar alterações feitas a fim de teste diretamente na master branch.** Usar sempre branches separadas para estes fins.
