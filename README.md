# Documentação da API

## 1. Visão Geral

Visão geral do projeto, um pouco das tecnologias usadas.

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Yup](https://www.npmjs.com/package/yup)

A URL base da aplicação:
https://ng-cash-gui.herokuapp.com

---

## 2. Diagrama ER

Diagrama ER da API definindo bem as relações entre as tabelas do banco de dados.

![DER](/digram.png)

---

## 3. Início Rápido

### 3.1. Instalando Dependências

Clone o projeto em sua máquina e instale as dependências com o comando:

```
yarn
```

### 3.2. Variáveis de Ambiente

Em seguida, crie um arquivo **.env**, copiando o formato do arquivo **.env.example**:

```
cp .env.example .env
```

Configure suas variáveis de ambiente com suas credenciais do Postgres e uma nova database da sua escolha.

### 3.3. Migrations

Execute as migrations com o comando:

```
yarn typeorm migration:run -d src/database/data-source.ts
```

---

## 4. Autenticação

```
Authorization: Bearer token
```

---

## 5. Endpoints

### Índice

- [Users](#1-users)
  - [POST - /register]()
  - [POST - /login]()
  - [GET - /user]()
- [Transactions]()
  - [POST - /transaction]()
  - [GET - /transactions]()

---

### 1 **Criação de Usuário**

### Exemplo de Request:

```
POST /register
Host: https://ng-cash-gui.herokuapp.com
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "username": "admin",
  "password": "Admin1234"
}
```

### Exemplo de Response:

```
201 Created
```

### Possíveis Erros:

| Código do Erro   | Descrição  |
| ---------------- | ---------- |
| 401 Unauthorized | User exist |

---

### 1.1 **Login do usuário**

### Exemplo de Request:

```
POST /login
Host: https://ng-cash-gui.herokuapp.com
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "username": "admin",
  "password": "Admin1234"
}
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "token": "token-de-login"
}
```

### Possíveis Erros:

| Código do Erro  | Descrição                      |
| --------------- | ------------------------------ |
| 400 Bad request | requires username and password |
| 403 forbidden   | Username or password invalid   |

---

### 1.2 **Listar user**

### Exemplo de Request:

```

GET /user
Host: https://ng-cash-gui.herokuapp.com
Authorization: Bearer token
Content-type: application/json

```

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "username": "admin",
  "account": {
    "id": "5ec3f5d2-6f3c-4f58-bb12-0b110dd98b51",
    "balance": 100
  },
  "id": "aca564a3-5f78-4016-afed-afa06504a093"
}
```

### Possíveis Erros:

| Código do Erro   | Descrição                |
| ---------------- | ------------------------ |
| 400 Bad request  | Authorization is missing |
| 401 Unauthorized | Invalid token            |

---

---

### 2 **Criação de um transaction**

### Exemplo de Request:

```
POST /transaction
Host: https://ng-cash-gui.herokuapp.com
Authorization: Bearer token
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "username": "admin2",
  "value": 50
}
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "value": 50,
  "debited": "2ae51909-8565-4075-aa48-0c8e4e04ab74",
  "credited": "5ec3f5d2-6f3c-4f58-bb12-0b110dd98b51",
  "id": "5393331c-c1d9-48ae-8ec7-58f27eb243b7",
  "createdAt": "2022-11-18T23:03:46.860Z"
}
```

### Possíveis Erros:

| Código do Erro   | Descrição                |
| ---------------- | ------------------------ |
| 400 Bad request  | Value is missing         |
| 401 Unauthorized | Authorization is missing |
| 401 Unauthorized | Invalid token            |
| 404 Unauthorized | User not found           |

---

### 2.2. **Listar my transactions**

### Exemplo de Request:

```
GET /transactions
Host: https://ng-cash-gui.herokuapp.com
Authorization: Bearer token
Content-type: application/json
```

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 Ok
```

```json
{
  "id": "5ec3f5d2-6f3c-4f58-bb12-0b110dd98b51",
  "balance": 90,
  "debited": [
    {
      "id": "5393331c-c1d9-48ae-8ec7-58f27eb243b7",
      "value": 50,
      "createdAt": "2022-11-18T23:03:46.860Z"
    }
  ],
  "credited": []
}
```

### Possíveis Erros:

| Código do Erro   | Descrição                |
| ---------------- | ------------------------ |
| 400 Bad request  | Value is missing         |
| 401 Unauthorized | Authorization is missing |

---
