## Aplicativo de Gestão de Contatos - Backend

Este projeto é uma aplicação frontend desenvolvida em React Native para gerenciar contatos. A aplicação se conecta a uma API backend construída com Node.js e NestJS, permitindo que os usuários autentiquem-se e gerenciem seus contatos.
_Atenção_: como o backend está rodando em um servidor gratuito e limitado, a primeira requisição pode demorar um pouco mais pelo start-up da aplicação, mas as requisições seguintes já ocorrerão normalmente.

### Stack

- React Native
- TypeScript
- Axios
- React Navigation

### Como Rodar o Projeto

- _Pré-requisitos_
  Certifique-se de que você tem os seguintes itens instalados em sua máquina:

1. Node.js
2. React Native CLI
3. Android Studio
4. Dispositivo Android (opcional)

- _Passos para Instalar e Rodar_

1. Clone o repositório
2. Instale as dependências:
   No diretório do projeto, execute:
   `cd ContactsApp`
   `npm install`
3. Inicie o aplicativo:
   `npx react-native run-android`

### Como Usar

- _Login_: Ao abrir o aplicativo, você verá uma tela de login. Digite seu nome de usuário e senha para autenticar-se. O token de acesso será armazenado para chamadas futuras à API.

- _Gerenciar Contatos_: Após o login, você pode listar, adicionar, editar ou remover contatos. Os campos de adição de contato incluem: Nome, Sobrenome, Telefone, Data de Nascimento, Endereço, Email
