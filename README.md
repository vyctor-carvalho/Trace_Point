# Trace Point - Backend

API RESTful para organização de visitas durante a COP-30 em Belém. Permite o registro de **usuários** (admin, visitor, organizer), **eventos**, **locais visitados** e **agendamentos**.

---

## Documentação Interativa

Para uma visualização mais detalhada da documentação, incluindo guias de instalação, referência completa da API, estrutura do projeto e mais, acesse nosso site de documentação:

** [Acesse a Documentação Completa Aqui](https://vyctor-carvalho.github.io/Trace_Point/)**

---

## Tecnologias

* Node.js 18
* TypeScript
* PostgreSQL
* TypeORM
* Docker + Docker Compose
* pgAdmin (interface de banco)

---

## Requisitos

Para rodar com Docker:

* Docker
* Docker Compose

Para rodar manualmente:

* Node.js 18+
* PostgreSQL
* NPM

---

## Instalação

### 1. Clone o repositório

```bash
git clone [https://github.com/vyctor-carvalho/Trace_Point.git](https://github.com/vyctor-carvalho/Trace_Point.git)
cd Trace_Point
```

-----

## Rodando com Docker

### 2\. Copie o arquivo `.env`

```bash
cp .env.copy .env
```

Edite as variáveis conforme necessário. Para uso com Docker, mantenha:

```ini
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=tracepoint
```

### 3\. Suba os containers

```bash
docker-compose up --build
```

### 4\. Acessar o banco de dados via pgAdmin

Abra o **pgAdmin** em: `http://localhost:8080`

Na interface do pgAdmin, adicione uma nova conexão com os seguintes dados:

  * **Name**: `tracepoint-db` (ou qualquer nome)
  * **Host name/address**: `db`
  * **Port**: `5432`
  * **Username**: `postgres`
  * **Password**: `postgres`

Após conectar, selecione o banco de dados `tracepoint` no painel lateral para visualizar tabelas, dados e executar queries.

## Rodando Manualmente

### 1\. Instale as dependências

```bash
npm install
```

### 2\. Configure o `.env` com seu PostgreSQL local

```ini
# Configurações do servidor
SYSTEM_API_PORT=sua_porta_pra_api

# Dados do banco
DB_HOST=db # Para rodar manualmente, substitua por 'localhost' ou o host do seu DB
DB_USER=postgres
DB_PORT=sua_porta # ex: 5432
DB_PASSWORD=postgres
DB_NAME=nome_do_banco # ex: tracepoint

# JWT
JWT_SECRET=sua_chave_secreta
REFRESH_SECRET=sua_chave
JWT_EXPIRES_IN=3600
REFRSH_TOKEN_EXPIRES_IN=604800
```

### 3\. Rode as migrations

```bash
npm run migration:run
```

### 4\. Inicie o servidor

```bash
npm run dev
```

-----

## Níveis de Acesso

A API utiliza três níveis de acesso para proteger suas rotas:

  * **Visitor**: Usuário autenticado com permissões básicas, como visualizar eventos, locais e agendar visitas.
  * **Organizer**: Usuário autenticado com permissões de Visitor, além da capacidade de criar e gerenciar eventos e locais que criou.
  * **Admin**: Usuário autenticado com acesso total a todas as funcionalidades da API, incluindo gerenciamento de usuários.
  * **Público**: Rotas que não exigem autenticação.

As rotas protegidas por JWT exigem um token de acesso válido no cabeçalho `Authorization` (ex: `Bearer seu_token_jwt`).
Para mais detalhes sobre os níveis de acesso e como funcionam, consulte nossa [documentação completa](https://vyctor-carvalho.github.io/Trace_Point/autenticacao_usuarios.html).

-----

## Criação de Usuários

### Admin (somente via SQL):

```sql
INSERT INTO "user" (
  id, name, profile_pick, role, email, password
) VALUES (
  '9dfce170-5094-436f-9413-f5afc769a75e',
  'Admin User',
  '[https://example.com/avatar.png](https://example.com/avatar.png)',
  'admin',
  'admin@example.com',
  '$2b$10$yG9D2ihkLL6hTh5KCw/l5.BqAqJ3i49GIvksxCBStGSMEJtTHS2ey' -- Senha: admin123
);
```

*(Observação: O link Markdown na URL da imagem no seu SQL original foi removido para a URL direta, pois SQL não interpreta Markdown.)*

### Visitor ou Organizer (POST `/user/register`):

Endpoint público para registro de novos usuários.

```json
{
  "name": "Nome do usuário",
  "userLogin": {
    "email": "email@example.com",
    "password": "senha123"
  },
  "profilePick": "[https://example.com/foto.jpg](https://example.com/foto.jpg)",
  "role": "visitor" // ou "organizer"
}
```

Para mais detalhes sobre criação de usuários, consulte nossa [documentação completa](https://vyctor-carvalho.github.io/Trace_Point/autenticacao_usuarios.html%23criacao-usuarios).

-----

## Rotas da API

Para uma descrição detalhada de todos os endpoints, incluindo exemplos de requisição e resposta, por favor, visite a seção de **[Referência da API na nossa documentação completa](https://vyctor-carvalho.github.io/Trace_Point/api_referencia.html)**.

Abaixo, um resumo rápido:

### Autenticação (`/auth`)

| Método | Rota             | Proteção JWT | Nível de Acesso | Descrição                     |
| :----- | :--------------- | :----------- | :-------------- | :------------------------------ |
| `POST` | `/auth/login`    | Não          | Público         | Realiza o login do usuário.     |
| `POST` | `/auth/refresh`  | Não          | Público         | Atualiza o token de acesso.   |

### Usuários (`/user`)

| Método | Rota                | Proteção JWT | Nível de Acesso        | Descrição                                                                |
| :----- | :------------------ | :----------- | :--------------------- | :----------------------------------------------------------------------- |
| `POST` | `/user/register`    | Não          | Público                | Registra um novo usuário (visitor ou organizer).                          |
| `POST` | `/user/booking`     | Sim          | Visitor, Organizer, Admin | Agenda uma visita a um evento para um usuário.                             |
| `GET`  | `/user/`            | Sim          | Admin                  | Lista todos os usuários.                                                 |
| `GET`  | `/user/:id`         | Sim          | Admin                  | Busca um usuário específico pelo ID.                                      |
| `PUT`  | `/user/:id`         | Sim          | Visitor, Organizer, Admin | Atualiza dados de um usuário (usuário atualiza o próprio, admin qualquer). |
| `DELETE`| `/user/:id`        | Sim          | Admin                  | Deleta um usuário específico pelo ID.                                     |

*(As tabelas de Locais, Eventos e Visitas Realizadas foram omitidas aqui para brevidade, mas estão disponíveis na documentação completa linkada acima).*

-----

## Exemplos de Requisições (Corpo)

Veja exemplos detalhados na [documentação completa](https://vyctor-carvalho.github.io/Trace_Point/api_referencia.html%23exemplos-requisicoes).

-----

## Estrutura do Projeto

A estrutura detalhada do projeto pode ser encontrada na [documentação completa](https://vyctor-carvalho.github.io/Trace_Point/estrutura_projeto.html).

```
📁 raiz/
│
├── .env               # Variáveis reais
├── .env.copy          # Modelo para configuração
├── .dockerignore      # Ignora arquivos do Docker
├── docker-compose.yml # Arquitetura dos containers
├── Dockerfile         # Imagem do app
├── package.json
├── tsconfig.json
├── README.md
├── index.ts
├── server.ts
└── src/
    ├── config/
    ├── controllers/
    ├── DTO/
    ├── error/
    ├── middleware/
    ├── migrations/
    ├── models/
    ├── routes/
    ├── service/
    ├── utils/
    ├── db_config/
    └── @types/
```