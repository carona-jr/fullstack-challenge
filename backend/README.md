# API

## Table of Contents

* [Iniciando](#iniciando)
  * [Dotenv](#dotenv)
  * [API](#api)
  * [Testes](#testes)
  * [Docker](#docker)
* [Documentação](#documentação)

## Iniciando

### Dotenv

Na raiz do projeto, adicione um arquivo **.env** para configurar as variáveis de ambiente da API.

```
MONGO_PROTOCOL=
MONGO_USERNAME=
MONGO_PASSWORD=
MONGO_HOST=
MONGO_DB_NAME=
PORT=
```

### API

Para instalar os pacotes do projeto, rode o seguinte comando:

```
yarn install
```

Para rodar a aplicação em modo desenvolvedor, execute o script abaixo:

```
yarn dev
```

### Testes

Os testes foram implementados utilizando o framework Jest no backend. Para executar os testes unitários com o comando abaixo:

```
yarn test
```

### Docker

Requisitos:

```
docker
docker-compose
```

Para criar o container do docker, execute o comando abaixo:

```
docker-compose up --build
```

Caso já tenha criado o container, rode o comando acima sem o parâmetro **--build**

Caso queira parar a execução do container:

```
docker-compose down
```

## Documentação

No projeto está instalado o swagger, que implementa o Open API 3.0 para os **endpoints** da aplicação REST. Para acessar a documentação da API, rode o projeto e acesse a rota abaixo:

```
/docs
```

Por exemplo, caso esteja rodando no **localhost** na porta 5000, entre no endereço http://localhost:5000/docs
