const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'homecare-super-secret-key-2024-change-in-prod';
const JWT_EXPIRY = '30d';

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname))); // Serve static files (HTML, CSS, JS)

// LowDB setup
const adapter = new JSONFile('db.json');
const db = new Low(adapter);

async function initDb() {
  await db.read();
  db.data ||= { users: [] };
  await db.write();
}

initDb();

// Helper: Validate CPF (simple)
function validateCPF(cpf) {
  cpf = cpf.replace(/\D/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  let sum = 0, weight = 10;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf[i]) * weight--;
  }
  let digit = (sum * 10) % 11;
  if (digit === 10 || digit === 11) digit = 0;
  if (digit !== parseInt(cpf[9])) return false;
  sum = 0, weight = 11;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf[i]) * weight--;
  }
  digit = (sum * 10) % 11;
  if (digit === 10 || digit === 11) digit = 0;
  return digit === parseInt(cpf[10]);
}

// POST /api/register - Register new user
app.post('/api/register', async (req, res) => {
  try {
    const { nome, dataNascimento, cpf, endereco, email, senha } = req.body;

    // Basic validation
    if (!nome || !cpf || !email || !senha) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando' });
    }

    // Age check (>18)
    const hoje = new Date();
    const nasc = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nasc.getFullYear();
    const m = hoje.getMonth() - nasc.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;
    if (idade < 18) {
      return res.status(400).json({ error: 'Maior de 18 anos necessário' });
    }

    if (!validateCPF(cpf)) {
      return res.status(400).json({ error: 'CPF inválido' });
    }

    await db.read();
    // Check if user exists
    if (db.data.users.find(u => u.cpf === cpf || u.email === email)) {
      return res.status(400).json({ error: 'Usuário já existe' });
    }

    // Hash senha simple (prod: bcrypt)
    const hashedSenha = senha; // TODO: Implement bcrypt

    const user = {
      id: Date.now().toString(),
      nome,
      dataNascimento,
      cpf,
      endereco,
      email,
      senha: hashedSenha,
      createdAt: new Date().toISOString()
    };

    db.data.users.push(user);
    await db.write();

    // Generate JWT
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRY });

    res.json({ success: true, message: 'Usuário registrado', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

// POST /api/verify - Login/Verify credentials
app.post('/api/verify', async (req, res) => {
  try {
    const { cpf, email, senha } = req.body;
    await db.read();
    const user = db.data.users.find(u => (u.cpf === cpf || u.email === email) && u.senha === senha);
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
    res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

// GET /api/auth/check - Verify JWT
app.get('/api/auth/check', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] || req.query.token;
    if (!token) {
      return res.status(401).json({ authorized: false });
    }
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ authorized: false });
      }
      res.json({ authorized: true, user: decoded });
    });
  } catch (err) {
    res.status(401).json({ authorized: false });
  }
});

app.listen(PORT, () => {
  console.log(`HomeCare server running at http://localhost:${PORT}`);
  console.log(`Auth APIs: POST /api/register, POST /api/verify, GET /api/auth/check`);
});
