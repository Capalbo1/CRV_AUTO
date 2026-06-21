# 🚗 CRV Auto — Sistema de Gestão de Oficina Mecânica

Sistema completo para gestão de oficinas mecânicas. Controle de clientes, veículos, ordens de serviço, estoque e financeiro — tudo em um só lugar.

---

## 📐 Arquitetura do Projeto

```
CRV_AUTO/
├── backend/          # API REST - Node.js + Express
│   ├── config/       # Configurações (DB, env)
│   ├── server.js     # Servidor principal + rotas
│   ├── package.json
│   └── vercel.json   # Config de deploy
│
└── frontend/         # Interface - React + Vite
    ├── src/
    │   ├── App.jsx   # Componente principal
    │   ├── App.css   # Estilos
    │   └── main.jsx  # Entry point
    ├── index.html
    └── vite.config.js
```

---

## 🛠️ Tecnologias Utilizadas

### Backend
| Módulo | Versão | Função |
|--------|--------|--------|
| `Node.js` | 18+ | Runtime JavaScript |
| `Express` | ^4.18.2 | Framework HTTP / Rotas |
| `CORS` | ^2.8.5 | Liberar acesso do frontend |
| `pg` | ^8.11.3 | Cliente PostgreSQL (Supabase) |

### Frontend
| Módulo | Versão | Função |
|--------|--------|--------|
| `React` | 18+ | UI / Componentes |
| `Vite` | 5+ | Bundler / Dev Server |
| `Axios` | latest | Requisições HTTP para a API |

### Infraestrutura
| Serviço | Uso |
|---------|-----|
| **Render** | Deploy do Backend (`crv-auto-backend.onrender.com`) |
| **Netlify / Vercel** | Deploy do Frontend |
| **Supabase / PostgreSQL** | Banco de dados (a conectar) |

---

## 🚀 Como Rodar Localmente

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### 1. Clone o repositório
```bash
git clone https://github.com/Capalbo1/CRV_AUTO.git
cd CRV_AUTO
```

### 2. Subir o Backend
```bash
cd backend
npm install
npm run dev
# Servidor rodando em http://localhost:5000
```

### 3. Subir o Frontend
```bash
cd ../frontend
npm install
npm run dev
# Interface rodando em http://localhost:5173
```

> ⚠️ O frontend detecta automaticamente o ambiente:
> - **Dev** → aponta para `http://localhost:5000`
> - **Produção** → aponta para `https://crv-auto-backend.onrender.com`

---

## 📦 Módulos do Sistema

Abaixo está o checklist completo de módulos planejados. Cada um tem sua própria lista de funcionalidades.

---

### ✅ Módulo 1 — Clientes
> Gerenciar todos os clientes da oficina.

- [x] Cadastrar novo cliente (nome, telefone, email, endereço)
- [x] Listar todos os clientes
- [x] Editar dados do cliente
- [x] Excluir cliente
- [ ] Busca/filtro de clientes por nome ou telefone
- [ ] Histórico de serviços por cliente
- [ ] Conectar com banco de dados (PostgreSQL/Supabase)

**Rotas Backend:**
```
GET    /api/clientes         → Listar todos
GET    /api/clientes/:id     → Buscar por ID
POST   /api/clientes         → Criar novo
PUT    /api/clientes/:id     → Atualizar
DELETE /api/clientes/:id     → Deletar
```

---

### 🔄 Módulo 2 — Veículos
> Cada cliente pode ter um ou mais veículos cadastrados.

- [x] Cadastrar veículo (modelo, marca, ano, placa, cor, cliente)
- [x] Listar veículos
- [ ] Editar dados do veículo
- [ ] Excluir veículo
- [ ] Vincular veículo a cliente (relação 1:N)
- [ ] Busca por placa
- [ ] Histórico de ordens por veículo
- [ ] Conectar com banco de dados

**Rotas Backend:**
```
GET    /api/veiculos          → Listar todos
GET    /api/veiculos/:id      → Buscar por ID
GET    /api/veiculos/cliente/:cliente_id → Veículos de um cliente
POST   /api/veiculos          → Criar novo
PUT    /api/veiculos/:id      → Atualizar
DELETE /api/veiculos/:id      → Deletar
```

---

### 📋 Módulo 3 — Ordens de Serviço
> O coração da oficina. Registra cada atendimento feito.

- [ ] Criar nova ordem de serviço (OS)
- [ ] Vincular OS a cliente + veículo
- [ ] Adicionar serviços realizados (descrição + valor)
- [ ] Adicionar peças utilizadas
- [ ] Status da OS: `Aberta` → `Em andamento` → `Concluída` → `Entregue`
- [ ] Data de entrada e previsão de entrega
- [ ] Observações / diagnóstico
- [ ] Valor total automático (serviços + peças)
- [ ] Imprimir / gerar PDF da OS
- [ ] Listar e filtrar ordens por status, data, cliente

**Rotas Backend:**
```
GET    /api/ordens             → Listar todas
GET    /api/ordens/:id         → Buscar por ID
GET    /api/ordens/cliente/:id → Ordens de um cliente
POST   /api/ordens             → Criar nova
PUT    /api/ordens/:id         → Atualizar / mudar status
DELETE /api/ordens/:id         → Cancelar
```

---

### 📦 Módulo 4 — Estoque de Peças
> Controle do estoque de peças e materiais da oficina.

- [ ] Cadastrar peça/produto (nome, código, preço de custo, preço de venda)
- [ ] Quantidade em estoque
- [ ] Alerta de estoque mínimo
- [ ] Entrada de peças (compra)
- [ ] Saída de peças (uso na OS)
- [ ] Histórico de movimentações
- [ ] Relatório de estoque

**Rotas Backend:**
```
GET    /api/estoque            → Listar peças
POST   /api/estoque            → Cadastrar peça
PUT    /api/estoque/:id        → Atualizar peça/quantidade
DELETE /api/estoque/:id        → Remover peça
POST   /api/estoque/entrada    → Registrar entrada
POST   /api/estoque/saida      → Registrar saída (vinculada à OS)
```

---

### 💰 Módulo 5 — Financeiro
> Controle de caixa, pagamentos e receitas.

- [ ] Registro de pagamentos por OS
- [ ] Formas de pagamento: dinheiro, cartão, PIX, parcelado
- [ ] Controle de OS pagas / pendentes
- [ ] Resumo financeiro por período (dia, semana, mês)
- [ ] Total de receitas
- [ ] Despesas/saídas (opcional)
- [ ] Relatório financeiro simples

---

### 📊 Módulo 6 — Dashboard
> Visão geral do negócio em tempo real.

- [ ] Total de clientes cadastrados
- [ ] Ordens de serviço abertas hoje
- [ ] Receita do mês
- [ ] Últimas OS adicionadas
- [ ] Veículos aguardando atendimento
- [ ] Gráfico de OS por status

---

### 🔐 Módulo 7 — Autenticação (Futuro)
> Controle de acesso para múltiplos usuários.

- [ ] Login com usuário e senha
- [ ] JWT para proteção das rotas
- [ ] Perfis: Administrador / Mecânico / Recepcionista
- [ ] Histórico de ações por usuário

---

## 🗄️ Banco de Dados — Estrutura Planejada

```sql
-- Tabelas principais
clientes       (id, nome, telefone, email, endereco, data_cadastro)
veiculos       (id, cliente_id, modelo, marca, ano, placa, cor)
ordens         (id, cliente_id, veiculo_id, status, descricao, valor_total, data_entrada, data_entrega)
itens_ordem    (id, ordem_id, tipo [servico/peca], descricao, quantidade, valor_unitario)
estoque        (id, nome, codigo, quantidade, preco_custo, preco_venda, estoque_minimo)
pagamentos     (id, ordem_id, forma_pagamento, valor, data_pagamento)
```

---

## 📡 Endpoints da API — Visão Geral

| Método | Rota | Módulo | Status |
|--------|------|--------|--------|
| GET | `/api/clientes` | Clientes | ✅ Feito |
| POST | `/api/clientes` | Clientes | ✅ Feito |
| PUT | `/api/clientes/:id` | Clientes | ✅ Feito |
| DELETE | `/api/clientes/:id` | Clientes | ✅ Feito |
| GET | `/api/veiculos` | Veículos | ✅ Feito |
| POST | `/api/veiculos` | Veículos | 🔄 Básico |
| GET | `/api/ordens` | Ordens de Serviço | ⏳ Pendente |
| POST | `/api/ordens` | Ordens de Serviço | ⏳ Pendente |
| GET | `/api/estoque` | Estoque | ⏳ Pendente |
| GET | `/api/financeiro` | Financeiro | ⏳ Pendente |
| GET | `/api/dashboard` | Dashboard | ⏳ Pendente |

---

## 🗓️ Ordem de Desenvolvimento Sugerida

```
[FASE 1 - Base] ✅
  → Módulo 1: Clientes (CRUD completo)
  → Módulo 2: Veículos (CRUD completo)

[FASE 2 - Núcleo] 🔄 Em andamento
  → Conectar ao banco de dados (Supabase/PostgreSQL)
  → Módulo 3: Ordens de Serviço

[FASE 3 - Operação]
  → Módulo 4: Estoque de Peças
  → Módulo 5: Financeiro

[FASE 4 - Gestão]
  → Módulo 6: Dashboard com gráficos
  → Módulo 7: Autenticação e Perfis
```

---

## 📌 Variáveis de Ambiente

Crie um arquivo `.env` dentro de `backend/`:

```env
PORT=5000
DATABASE_URL=postgresql://usuario:senha@host:5432/crvauto
```

> ⚠️ Nunca suba o `.env` para o GitHub! Adicione ao `.gitignore`.

---

## 👨‍💻 Desenvolvedor

**Gustavo Capalbo dos Santos** — Tatuí, SP, Brasil  
GitHub: [@Capalbo1](https://github.com/Capalbo1)
