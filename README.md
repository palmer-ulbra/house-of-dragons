# house of dragons

API REST em Node.js + Express com autenticação JWT e persistência no Supabase.

## Endpoints

### POST `/api/token`

Recebe um email cadastrado e retorna um JWT válido por 1 hora.

#### curl

```bash
curl -X POST https://house-of-dragons-pi.vercel.app/api/token \
  -H "Content-Type: application/json" \
  -d '{"email": "karina@rede.ulbra.br"}'
```

#### fetch

```js
const response = await fetch("https://house-of-dragons-pi.vercel.app/api/token", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: "karina@rede.ulbra.br" }),
});

const { token } = await response.json();
console.log(token);
```

**Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### POST `/api/plan`

Registra um plano para um email. Requer Bearer token no header.

**Campos:**
| Campo | Tipo | Valores aceitos |
|---------|--------|---------------------------------|
| `email` | string | qualquer email válido |
| `plan` | string | `BASIC`, `STANDARD`, `PLATINUM` |

#### curl

```bash
curl -X POST https://house-of-dragons-pi.vercel.app/api/plan \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{"email": "teste@exemplo.com", "plan": "PLATINUM"}'
```

#### fetch

```js
const response = await fetch("https://house-of-dragons-pi.vercel.app/api/plan", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({ email: "teste@exemplo.com", plan: "PLATINUM" }),
});

const data = await response.json();
console.log(data);
```

**Response:**

```json
{
  "message": "Plan registered successfully",
  "id": 1
}
```

---

### Exemplo completo com fetch (token + plano)

```js
const BASE_URL = "https://house-of-dragons-pi.vercel.app";

// 1. pegar o token
const tokenRes = await fetch(`${BASE_URL}/api/token`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: "karina@rede.ulbra.br" }),
});
const { token } = await tokenRes.json();

// 2. registrar o plano
const planRes = await fetch(`${BASE_URL}/api/plan`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({ email: "teste@exemplo.com", plan: "PLATINUM" }),
});
const data = await planRes.json();
console.log(data); // { message: 'Plan registered successfully', id: 1 }
```

## Variáveis de ambiente

Crie um `.env` baseado no `.env.example`:

```env
PORT=3000
JWT_SECRET=seu_secret_aqui
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_KEY=sua_chave_aqui
```

## Rodando localmente

```bash
npm install
npm run dev
```
