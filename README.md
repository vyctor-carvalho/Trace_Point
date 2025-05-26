# Trace Point - Backend

API RESTful para organização de visitas durante a COP-30 em Belém. Permite o registro de **usuários** (admin, visitor, organizer), **eventos**, **locais visitados** e **agendamentos**.

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
git clone https://github.com/vyctor-carvalho/Trace_Point.git
cd Trace_Point
```

---

## Rodando com Docker

### 2. Copie o arquivo `.env`

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

### 3. Suba os containers

```bash
docker-compose up --build
```

### 4. Acessar o banco de dados via pgAdmin

Abra o **pgAdmin** em: `http://localhost:8080`

Na interface do pgAdmin, adicione uma nova conexão com os seguintes dados:

* **Name**: `tracepoint-db` (ou qualquer nome)
* **Host name/address**: `db`
* **Port**: `5432`
* **Username**: `postgres`
* **Password**: `postgres`

Após conectar, selecione o banco de dados `tracepoint` no painel lateral para visualizar tabelas, dados e executar queries.

## Rodando Manualmente

### 1. Instale as dependências

```bash
npm install
```

### 2. Configure o `.env` com seu PostgreSQL local

```ini
# Configurações do servidor
SYSTEM_API_PORT=sua_porta_pra_api

# Dados do banco
DB_HOST=db
DB_USER=postgres
DB_PORT=sua_porta
DB_PASSWORD=postgres
DB_NAME=nome_do_banco

# JWT
JWT_SECRET=sua_chave_secreta
REFRESH_SECRET=sua_chave
JWT_EXPIRES_IN=3600
REFRSH_TOKEN_EXPIRES_IN=604800
```

### 3. Rode as migrations

```bash
npm run migration:run
```

### 4. Inicie o servidor

```bash
npm run dev
```

---

## Níveis de Acesso

A API utiliza três níveis de acesso para proteger suas rotas:

* **Visitor**: Usuário autenticado com permissões básicas, como visualizar eventos, locais e agendar visitas.
* **Organizer**: Usuário autenticado com permissões de Visitor, além da capacidade de criar e gerenciar eventos e locais que criou.
* **Admin**: Usuário autenticado com acesso total a todas as funcionalidades da API, incluindo gerenciamento de usuários.
* **Público**: Rotas que não exigem autenticação.

As rotas protegidas por JWT exigem um token de acesso válido no cabeçalho `Authorization` (ex: `Bearer seu_token_jwt`).

---

## Criação de Usuários

### Admin (somante via SQL):

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

### Visitor ou Organizer (POST `/user/register`):

Endpoint público para registro de novos usuários.
```json
{
  "name": "Nome do usuário",
  "userLogin": {
    "email": "email@example.com",
    "password": "senha123"
  },
  "profilePick": "https://example.com/foto.jpg",
  "role": "visitor" // ou "organizer"
}
```

---

## Rotas da API

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

### Locais (`/place`)

| Método | Rota             | Proteção JWT | Nível de Acesso        | Descrição                               |
| :----- | :--------------- | :----------- | :--------------------- | :---------------------------------------- |
| `POST` | `/place/`        | Sim          | Organizer, Admin       | Cria um novo local.                       |
| `GET`  | `/place/`        | Sim          | Visitor, Organizer, Admin | Lista todos os locais.                    |
| `GET`  | `/place/:id`     | Sim          | Visitor, Organizer, Admin | Busca um local específico pelo ID.        |
| `PUT`  | `/place/:id`     | Sim          | Organizer, Admin       | Atualiza um local específico pelo ID.   |
| `DELETE`| `/place/:id`    | Sim          | Admin                  | Deleta um local específico pelo ID.     |

### Eventos (`/event`)

| Método | Rota             | Proteção JWT | Nível de Acesso        | Descrição                               |
| :----- | :--------------- | :----------- | :--------------------- | :---------------------------------------- |
| `POST` | `/event/`        | Sim          | Organizer, Admin       | Cria um novo evento.                      |
| `GET`  | `/event/`        | Sim          | Visitor, Organizer, Admin | Lista todos os eventos.                   |
| `GET`  | `/event/:id`     | Sim          | Visitor, Organizer, Admin | Busca um evento específico pelo ID.       |
| `PUT`  | `/event/:id`     | Sim          | Organizer, Admin       | Atualiza um evento específico pelo ID.  |
| `DELETE`| `/event/:id`    | Sim          | Organizer, Admin       | Deleta um evento específico pelo ID.    |

### Visitas Realizadas (`/visited`)

| Método | Rota                     | Proteção JWT | Nível de Acesso        | Descrição                                                               |
| :----- | :----------------------- | :----------- | :--------------------- | :---------------------------------------------------------------------- |
| `POST` | `/visited/`              | Sim          | Visitor, Organizer, Admin | Registra uma visita a um local.                                          |
| `GET`  | `/visited/`              | Sim          | Visitor, Organizer, Admin | Lista todos os registros de visitas (admins veem todos, outros os seus). |
| `GET`  | `/visited/user/:userId`  | Sim          | Visitor, Organizer, Admin | Lista visitas por ID de usuário (usuário vê o seu, admin/organizer mais). |
| `GET`  | `/visited/place/:placeId`| Sim          | Visitor, Organizer, Admin | Lista visitas por ID de local.                                           |
| `PUT`  | `/visited/`              | Sim          | Visitor, Organizer, Admin | Atualiza um registro de visita.                                          |
| `DELETE`| `/visited/`             | Sim          | Organizer, Admin       | Deleta um registro de visita (identificado via body: userId, placeId).   |

---

## Exemplos de Requisições (Corpo)

### Criar local (`POST /place`)
*Acesso: Organizer, Admin*
```json
{
  "name": "Estação das Docas",
  "type": "cultural",
  "address": {
    "postalColde": "66010-020",
    "street": "Av. Boulevard Castilhos França",
    "numberHouse": 600,
    "complement": "Armazém 2"
  }
}
```

### Criar evento (`POST /event`)
*Acesso: Organizer, Admin*
```json
{
  "title": "Tour COP-30",
  "eventDate": "2025-07-15T14:00:00.000Z",
  "description": "Tour pelo centro histórico de Belém.",
  "place": "UUID-do-place"
}
```

### Agendar visita (`POST /user/booking`)
*Acesso: Visitor, Organizer, Admin*
```json
{
  "eventId": "UUID-event",
  "userId": "UUID-user"
}
```

### Marcar visita como feita (`POST /visited`)
*Acesso: Visitor, Organizer, Admin*
```json
{
  "userId": "UUID-user",
  "placeId": "UUID-place",
  "visitDate": "2025-05-24T10:30:00.000Z"
}
```

---

## Estrutura do Projeto

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
│
└── src/
    │
    ├── config/
    │   └── EsportEnv.ts
    │
    ├── controllers/
    │   ├── AuthController.ts
    │   ├── EventController.ts
    │   ├── PlaceController.ts
    │   ├── UserController.ts
    │   └── VisitedController.ts
    │
    ├── DTO/
    │   ├── wrappers/
    │   │   ├── AddressDTO.ts
    │   │   └── LoginInfoDTO.ts
    │   ├── BookingDTO.ts
    │   ├── EventDTO.ts
    │   ├── PlaceDTO.ts
    │   ├── UserDTO.ts
    │   └── VisitedDTO.ts
    │
    ├── error/
    │   ├── ErrorsHandler.ts
    │   └── HttpException.ts
    │
    ├── middleware/
    │   ├── ErrorsHandler.ts
    │   ├── JwtRequired.ts
    │   ├── RoleCheck.ts
    │   └── ValidateId.ts
    │
    ├── migrations/
    │   ├── 1747755304546-GeneratedMigration.ts
    │   └── 1747865261580-GeneratedMigration.ts
    │
    ├── models/
    │   ├── enum/
    │   │   ├── PlaceType.ts
    │   │   └── UserRole.ts
    │   ├── wrappers/
    │   │   ├── Address.ts
    │   │   └── LoginInfo.ts
    │   ├── Event.ts
    │   ├── Place.ts
    │   ├── User.ts
    │   └── VisitedPlaces.ts
    │
    ├── repositories/
    │   ├── EventRepository.ts
    │   ├── PlaceRepository.ts
    │   ├── UserRepository.ts
    │   └── VisitedRepository.ts
    │
    ├── routes/
    │   ├── AuthRoutes.ts
    │   ├── EventRoutes.ts
    │   ├── PlaceRoutes.ts
    │   ├── UserRoutes.ts
    │   └── VisitedRoutes.ts
    │
    ├── service/
    │   ├── AuthService.ts
    │   ├── EventService.ts
    │   ├── PlaceService.ts
    │   ├── UserService.ts
    │   └── VisitedService.ts
    │
    ├── utils/
    │   ├── ExistsValidator.ts
    │   ├── TokenManager.ts
    │   └── ValidateRequestBody.ts
    │
    ├── db_config/
    │   └── AppDataSource.ts
    │
    └── @types/
        └── express
            └── index.d.ts
```
