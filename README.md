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
Instalção de todas as dependências necessárias.

#### yarn typeorm migration:run
Utilizando uma base de dados do postgreSQL com o nome de studying_relations_database, porta 5432 "para o desenvolvimento foi utilizado container Docker" execute o comando acima 
e aguarde para que as migrations criem tabelas e configurações no banco. As configurações de conexão podem ser vistas no arquivo ormconfig.json

#### yarn dev:server
Inicidalização do sistema pelo node na porta 3333.

#### Testes
Neste sistema foram realizados testes pelo insomnia, através das seguintes rotas:
- GET url: http://localhost:3333/orders/:id
- POST url: http://localhost:3333/orders
- POST url: http://localhost:3333/products
- POST url: http://localhost:3333/customers

