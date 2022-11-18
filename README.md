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

| Código do Erro  | Descrição             |
| --------------- | --------------------- |
| 401 Unauthorized| User exist |

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
| --------------- | ---------------------------    |
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

| Código do Erro   | Descrição                      |
| ---------------  | ---------------------------    |
| 400 Bad request  | Authorization is missing       |
| 401 Unauthorized | Invalid token                  |

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
	"id": "097714c7-ab00-40af-995f-cd5752fb9895",
	"username": "gui",
	"password": "$2b$10$O2.khiKPZY51fNOsVr8rjuWh/WXavqLRWVXej3Th9HosaTLj8P4Q6",
	"account": {
		"id": "2ae51909-8565-4075-aa48-0c8e4e04ab74",
		"balance": 200,
		"debited":[],
    "credited" : []
	}
}
}
```

### Possíveis Erros:

| Código do Erro  | Descrição                       |
| --------------- | ------------------------------- |
| 400 Bad request | missing authorization token.    |
| 403 forbidden   | Invalid token.                  |
| 400 Bad request | This pet is already registered. |

---

### 2.2. **Listar todos os pets**

[ Voltar para os Endpoints ](#5-endpoints)

### `/pet`

### Exemplo de Request:

```
GET /pet
Host: https://mais-que-um-pet.herokuapp.com
Authorization: None
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
[
  {
    "id": "a36dadeb-7d9e-4d7a-8fd2-02d39f2d58ef",
    "name": "Viola",
    "is_adoptable": false,
    "is_active": true,
    "gender": "female",
    "age": "5",
    "created_at": "2022-11-07T16:04:00.405Z",
    "updated_at": "2022-11-07T16:13:08.903Z",
    "user_register": "96a10907-638b-42d8-a4eb-22dba8b22813",
    "info_pet": {
      "id": "45769796-fc6f-46d0-8470-b815707c7cbd",
      "pet_image": "",
      "size": "médio porte",
      "color": "Caramelo universal",
      "species": "Vira-Lata",
      "description": "Cadelinha de 7 anos muito tranquila e parceira",
      "vaccine": "todas"
    }
  }
]
```

### Possíveis Erros:

Nenhum, o máximo que pode acontecer é retornar uma lista vazia.

---

### 2.3. **Lista os pets disponíveis para adoção**

[ Voltar para os Endpoints ](#5-endpoints)

### `/pet`

### Exemplo de Request:

```
GET /pet/adoptable
Host: https://mais-que-um-pet.herokuapp.com
Authorization: None
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
[
  {
    "id": "76e1e904-de35-428d-95b4-eb63bf014b24",
    "name": "Viola2",
    "is_adoptable": true,
    "is_active": true,
    "gender": "female",
    "age": "5",
    "created_at": "2022-11-07T19:20:48.930Z",
    "updated_at": "2022-11-07T19:20:48.930Z",
    "user_register": "96a10907-638b-42d8-a4eb-22dba8b22813",
    "info_pet": {
      "id": "20d65cdd-6101-4949-8d4c-c52fadd87fe9",
      "pet_image": "viola2",
      "size": "médio porte",
      "color": "Caramelo universal",
      "species": "Vira-Lata",
      "description": "Cadelinha de 7 anos muito tranquila e parceira",
      "vaccine": "todas"
    }
  }
]
```

### Possíveis Erros:

Nenhum, o máximo que pode acontecer é retornar uma lista vazia.

---

### 2.4. **Adotar um pet**

[ Voltar para os Endpoints ](#5-endpoints)

### `/pet`

### Exemplo de Request:

```
Deve ser passado o id do pet na url da requisição
```

```
PATCH /pet/adopt/:id
Host: https://mais-que-um-pet.herokuapp.com
Authorization: Bearer token
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "email": "emaildodonatario@mail.com"
}
```

### Exemplo de Response:

```
200 Ok
```

```json
{
  "message": "Pet Adopted",
  "user": "adm",
  "pet": {
    "name": "Viola2",
    "is_adoptable": false
  }
}
```

### Possíveis Erros:

| Código do Erro  | Descrição                    |
| --------------- | ---------------------------- |
| 400 Bad request | missing authorization token. |
| 403 forbidden   | Invalid token.               |
| 400 Bad request | Pet not found.               |
| 400 Bad request | Can't adopt this pet.        |
| 400 Bad request | You do not have permission   |
| 400 Bad request | User not found.              |

---

### 2.5. **Atualizar dados do pet**

[ Voltar para os Endpoints ](#5-endpoints)

### `/pet`

```
Pode ser atualizado o name, size, pet_image, description e vaccine, age.
```

### Exemplo de Request:

```
PATCH /pet/:id
Host: https://mais-que-um-pet.herokuapp.com
Authorization: Bearer token
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "name": "Coragem",
  "size": "pequeno_porte",
  "pet_image": "nova_url",
  "description": "nova descrição",
  "vaccine": "valmec",
  "age": "5"
}
```

### Schema de Validação com Yup:

```javascript
  name: yup.string().notRequired(),
  description: yup.string().notRequired(),
  pet_image: yup.string().notRequired(),
  size: yup.string().notRequired(),
  vaccine: yup.string().notRequired(),
  age: yup.string().notRequired()
```

OBS.: Chaves não presentes no schema serão removidas.

### Exemplo de Response:

```
200 Ok
```

```json
{
  "message": "Pet updated",
  "pet_update": {
    "id": "f9814fb6-1afe-467f-a5df-758f199c1c3b",
    "name": "Coragem",
    "is_adoptable": true,
    "is_active": true,
    "gender": "female",
    "age": "5",
    "created_at": "2022-11-08T04:20:13.494Z",
    "updated_at": "2022-11-08T04:22:25.493Z",
    "user_register": "be9c4637-651f-4d1d-aab4-c11258bb741d",
    "info_pet": {
      "id": "6e6adf7a-3d81-48e8-8f3e-9244f473b47e",
      "pet_image": "nova_url",
      "size": "pequeno_porte",
      "color": "Caramelo universal",
      "species": "Vira-Lata",
      "description": "nova descrição",
      "vaccine": "valmec"
    }
  }
}
```

### Possíveis Erros:

| Código do Erro   | Descrição                    |
| ---------------- | ---------------------------- |
| 400 Bad request  | missing authorization token. |
| 403 forbidden    | Invalid token.               |
| 404 not found    | Pet not found.               |
| 401 Unauthorized | Unauthorized.                |
| 404 not found    | infoPets not found           |

---

### 2.6. **SoftDelete do pet**

[ Voltar aos Endpoints ](#5-endpoints)

### `/pet`

### Exemplo de Request:

```

DELETE /pet/:id
Host: https://mais-que-um-pet.herokuapp.com
Authorization: Bearer token
Content-type: application/json

```

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
204 OK
```

```json
{
  "message": "pet Deleted"
}
```

### Possíveis Erros:

| Código do Erro  | Descrição                     |
| --------------- | ----------------------------- |
| 400 Bad request | missing authorization token.. |
| 403 forbidden   | Invalid token.                |
| 404 not found   | Pet not found.                |

---
