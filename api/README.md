## Aplicativo de Gestão de Contatos - Backend

Este projeto é uma API RESTful desenvolvida com o NestJS e integrada ao MongoDB para gerenciamento de contatos de usuários. A API inclui rotas protegidas por autenticação JWT e permite a inserção, listagem, atualização e exclusão de contatos com informações básicas como nome, telefone e email.

### Funcionalidades Principais

- _Autenticação JWT_:
  Rota de login para autenticar usuários.

- _Gerenciamento de Contatos (CRUD):_
  Inserção de novos contatos.
  Listagem de todos os contatos cadastrados.
  Atualização de contatos existentes.
  Deleção de contatos

### Stack

- NestJS
- MongoDB
- Mongoose

### Como Rodar o Projeto

- _Pré-requisitos_
  Node.js instalado (versão 14 ou superior).
  MongoDB rodando localmente ou acessível através de uma conexão remota.
  NestJS CLI para facilitar a execução dos comandos (instalação opcional, mas recomendada).

- _Passos para Instalar e Rodar_

1. Clone o repositório
2. Crie o arquivo `.env` baseado no `.env.example` (o valor da connection-string lhe será enviada diretamente no email)
3. Instale as dependências:
   No diretório do projeto, execute:
   `cd api`
   `npm install`

4. Configuração do MongoDB:
   Certifique-se de que o MongoDB está rodando localmente ou ajuste a URL de conexão na variável de ambiente.

5. Inicie o servidor:

Para iniciar o servidor NestJS, execute:
`npm run start`

A API estará disponível em: http://localhost:3000

### Rotas da API

1. Autenticação

- _POST /auth/login_: Rota para realizar login e obter o token JWT. Use o seguinte payload para autenticar:

```
{
"username": "usuario",
"password": "senha123"
}
```

Exemplo de resposta em caso de sucesso:

```
{
"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI..."
}
```

2. Contatos (protegidas por JWT)
   Para acessar as rotas abaixo, você deve incluir o token JWT no header Authorization como Bearer <token>.

- _GET /contatos_: Retorna a lista de todos os contatos cadastrados.
- _POST /contatos_: Adiciona um novo contato. Exemplo de payload:

```
{
"nome": "João",
"sobrenome": "Silva",
"telefone": "123456789",
"dataNascimento": "1990-01-01",
"endereco": "Rua ABC, 123",
"email": "joao.silva@example.com"
}
```

- _PUT /contatos/:id_: Atualiza um contato existente com base no ID informado. Exemplo de payload:

```
{
"nome": "João",
"telefone": "987654321"
}
```

- _DELETE /contatos/:id_: Deleta um contato existente com base no ID informado.
