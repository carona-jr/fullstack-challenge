# React App

## Table of Contents

* [Iniciando](#iniciando)
  * [Requisitos](#requisitos) 
  * [Dotenv](#dotenv)
  * [Aplicação](#aplicação)
  * [Docker](#docker)

## Iniciando

### Requisitos

Os seguintes frameworks e tecnologias são necessárias para rodar esta API:

- NodeJS
- Yarn
- Docker
- Docker Compose

### Dotenv

Na raiz do projeto, adicione um arquivo **.env** para configurar as variáveis de ambiente da API.

```
REACT_APP_BASE_URL=
```

### Aplicação

Para instalar os pacotes do projeto, rode o seguinte comando:

```
yarn install
```

Para rodar a aplicação em modo desenvolvedor, execute o script abaixo:

```
yarn start
```

### Docker

Para criar o container do docker, execute o comando abaixo:

```
docker-compose up --build
```

Caso já tenha criado o container, rode o comando acima sem o parâmetro **--build**

Caso queira parar a execução do container:

```
docker-compose down
```
