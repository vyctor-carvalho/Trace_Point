Aqui está uma versão melhorada e organizada do seu `README.md`, com instruções claras de instalação, uso e estrutura do projeto:

---

# 🌎 Angel Visitor - Backend

API RESTful para cadastro e organização de visitas durante a COP-30 em Belém. Permite o registro de **usuários** (admin, visitor, organizer), **eventos**, **lugares visitados** e **agendamentos**.

---

## 📦 Requisitos

* Node.js 18+
* PostgreSQL
* Yarn ou NPM
* TypeORM + TS

---

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/vyctor-carvalho/Trace_Point.git
cd Trace_Point
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o ambiente

Crie um arquivo `.env` na raiz baseado no `.env.copy`:

```bash
cp .env.copy .env
```

Edite com suas credenciais do .env

```ini
# Configurações do servidor
SYSTEM_API_PORT=sua_porta_pra_api

# Dados do banco
DB_USER=seu_usuario
DB_PORT=sua_porta
DB_PASSWORD=sua_sneha
DB_NAME=nome_do_banco

# JWT
JWT_SECRET=sua_chave_secreta
REFRESH_SECRET=sua_chave
JWT_EXPIRES_IN=3600
REFRSH_TOKEN_EXPIRES_IN=604800
```

### 4. Rode as migrations

```bash
npm run migration:run
```

### 5. Inicie o servidor

Em modo desenvolvimento:

```bash
npm run dev
```

---

## Criação de usuários

### Criar admin (somente via banco)

```sql
INSERT INTO "user" (
  id, name, profile_pick, role, email, password
) VALUES (
  '9dfce170-5094-436f-9413-f5afc769a75e',
  'Admin User',
  'https://example.com/avatar.png',
  'admin',
  'admin@example.com',
  '$2b$10$yG9D2ihkLL6hTh5KCw/l5.BqAqJ3i49GIvksxCBStGSMEJtTHS2ey'
);
```

Senha original: `admin123`

### Criar visitor `/user/register`

```json
{
  "name": "João da Silva",
  "userLogin": {
    "email": "joao.silva@example.com",
    "password": "senhaSegura123"
  },
  "profilePick": "https://example.com/images/joao.jpg",
  "role": "visitor"
}
```

### Criar organizer `/user/register`

```json
{
  "name": "Fernanda Rocha",
  "userLogin": {
    "email": "fernanda.rocha@example.com",
    "password": "organizadora@2025"
  },
  "profilePick": "https://example.com/images/fernanda.jpg",
  "role": "organizer"
}
```

---

## Autenticação

### Login `/auth/login`

```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

### Refresh Token `/auth/refresh`

```json
{
  "refreshToken": "Seu refresh token"
}
```

---

## Endpoints principais

### Criar um `place` `/place`

```json
{
  "name": "Mercado Ver-o-Peso",
  "type": "market",
  "address": {
    "postalColde": "66010-000",
    "street": "Boulevard Castilhos França",
    "numberHouse": 500,
    "complement": "Pavilhão Central"
  }
}
```

### Criar um `event` `/event`

```json
{
  "title": "Passeio Cultural pelo Centro Histórico",
  "eventDate": "2025-07-15T14:00:00.000Z",
  "description": "Uma visita guiada aos principais pontos históricos de Belém incluindo o Ver o Peso, Igreja Matriz e Forte do Presépio.",
  "place": "6bd90f69-5ae4-47c5-a113-cab3fe9ec066"
}
```

### Fazer `booking` `/user/booking`

```json
{
  "eventId": "38e62fae-a7f7-4677-add5-900b77c36db3",
  "userId": "fa1858b8-5fe4-4821-9500-00ff77e80985"
}
```

### Marcar como `visited` `/visited`

```json
{
  "userId": "fa1858b8-5fe4-4821-9500-00ff77e80985",
  "placeId": "6bd90f69-5ae4-47c5-a113-cab3fe9ec066",
  "visitDate": "2025-05-24T10:30:00.000Z"
}
```

---

## Estrutura do Projeto

```
📁 raiz/
│
├── .env                 # Variáveis de ambiente reais
├── .env.copy            # Modelo para replicar o .env
├── .gitignore
├── package.json         # Dependências e scripts
├── package-lock.json
├── tsconfig.json        # Configuração do TypeScript
├── README.md
├── index.ts             # Ponto de entrada (pode ser movido para src/)
├── sever.ts             # (Verificar se é um erro de digitação para server.ts)
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
    │   ├── AddressDTO.ts
    │   ├── BookingDTO.ts
    │   ├── EventDTO.ts
    │   ├── LoginInfoDTO.ts
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
    │   ├── 1747755304546-Generated.ts
    │   └── 1747865261580-Generated.ts
    │
    ├── models/
    │   ├── enum/
    │   │   ├── PlaceType.ts
    │   │   └── UserRole.ts
    │   ├── wrappers/
    │   │   ├── Event.ts
    │   │   ├── Place.ts
    │   │   ├── User.ts
    │   │   └── VisitedPlaces.ts
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
    │   ├── ValidateRequestBody.ts
    │   └── index.ts
    │
    ├── db_config/
    │   └── AppDataSource.ts
    │
    └── @types/
```
