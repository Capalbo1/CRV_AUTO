import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Dados temporários (depois migramos para PostgreSQL)
let clientes = [
  { id: 1, nome: "João Silva", telefone: "(11) 9999-8888", email: "joao@email.com" },
  { id: 2, nome: "Maria Souza", telefone: "(11) 9777-6666", email: "maria@email.com" }
];

let veiculos = [
  { id: 1, cliente_id: 1, modelo: "Gol", ano: 2015, placa: "ABC1234" },
  { id: 2, cliente_id: 2, modelo: "HB20", ano: 2018, placa: "XYZ5678" }
];

// 👇 ROTAS DOS CLIENTES - CRUD COMPLETO 👇

// GET - Listar todos clientes
app.get('/api/clientes', (req, res) => {
  res.json(clientes);
});

// GET - Buscar cliente por ID
app.get('/api/clientes/:id', (req, res) => {
  const cliente = clientes.find(c => c.id === parseInt(req.params.id));
  if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado' });
  res.json(cliente);
});

// POST - Criar novo cliente
app.post('/api/clientes', (req, res) => {
  const { nome, telefone, email } = req.body;
  const novoCliente = {
    id: clientes.length + 1,
    nome,
    telefone,
    email
  };
  clientes.push(novoCliente);
  res.status(201).json(novoCliente);
});

// PUT - Atualizar cliente
app.put('/api/clientes/:id', (req, res) => {
  const clienteIndex = clientes.findIndex(c => c.id === parseInt(req.params.id));
  if (clienteIndex === -1) return res.status(404).json({ error: 'Cliente não encontrado' });

  clientes[clienteIndex] = { ...clientes[clienteIndex], ...req.body };
  res.json(clientes[clienteIndex]);
});

// DELETE - Deletar cliente
app.delete('/api/clientes/:id', (req, res) => {
  const clienteIndex = clientes.findIndex(c => c.id === parseInt(req.params.id));
  if (clienteIndex === -1) return res.status(404).json({ error: 'Cliente não encontrado' });

  clientes.splice(clienteIndex, 1);
  res.status(204).send();
});

// 👇 ROTAS BÁSICAS PARA TESTE 👇
app.get('/api/veiculos', (req, res) => {
  res.json(veiculos);
});

app.get('/', (req, res) => {
  res.json({ message: '🚗 CRV Auto Backend funcionando!', timestamp: new Date() });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚗 Backend CRV Auto rodando na porta ${PORT}`);
  console.log(`📡 Acesse: http://localhost:${PORT}`);
});