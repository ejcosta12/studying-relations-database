<h3 align="center">
  Relacionamentos com banco de dados no Node.js
</h3>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/ejcosta12/studying-relations-database?style=flat-square">
  <img alt="javaScript" src="https://img.shields.io/github/languages/top/ejcosta12/studying-relations-database">
  <img alt="Size" src="https://img.shields.io/github/repo-size/ejcosta12/studying-relations-database">
</p>

## Sobre
API desenvolvida para cadastro de produtos, clientes e criação de pedidos. Para a criação de um novo pedido é necessário receber o id do cliente,
bem como o id de cada produto e quantidade respectiva, será avaliado a quantidade disponível em estoque e caso não exista será retornado erro, existindo
a ordem de pedido será criada e a quantidade em estoque atualizada, sendo possível receber as informações de cada pedido, clientes e produtos em rota com o número
de identificação do pedido.

### Tecnologias

- NodeJs
- Express
- TSyringe
- TypeORM
- PostgreSQL

### Scripts CLI

#### yarn
Instalação de todas as dependências necessárias.

#### yarn typeorm migration:run
Utilizando uma base de dados do postgreSQL com o nome de studying_relations_database, porta 5432 "para o desenvolvimento foi utilizado container Docker" execute o comando acima
e aguarde para que as migrations criem tabelas e configurações no banco. As configurações de conexão, como usuário e senha, podem ser vistas no arquivo ormconfig.json.

#### yarn dev:server
Inicialização do sistema pelo node, porta 3333.

#### Testes
Foram realizados testes pelo software insomnia, através das seguintes rotas:

- GET http://localhost:3333/orders/:id

- POST http://localhost:3333/products

Exemplo body(JSON):
```js
{
	"name":"Batata",
	"price":2.4,
	"quantity":50
}
```

- POST http://localhost:3333/customers

Exemplo body(JSON):
```js
{
	"name": "Eduardo",
	"email": "eduardo_costa0206@hotmail.com"
}
```

- POST http://localhost:3333/orders

Exemplo body(JSON):
```js
{
	"customer_id": "3a77918b-0892-4050-bf5b-e4f397a6fa8f",
	"products": [
		{
			"id": "084d6548-8742-4fb6-92bd-222cdddaf589",
			"quantity": 3
		},
		{
			"id": "063602f1-f042-4a82-9304-c0f0c7e69452",
			"quantity": 3
		}
	]
}
```
