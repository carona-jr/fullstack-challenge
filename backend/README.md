# API

## Table of Contents

* [Iniciando](#iniciando)
  * [Dotenv](#dotenv)
  * [API](#api)
  * [Teste](#teste)
  * [Docker](#docker)

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

### Teste

Execute os testes unitários com o comando abaixo:

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

Para parar o container:

```
docker-compose down
```

