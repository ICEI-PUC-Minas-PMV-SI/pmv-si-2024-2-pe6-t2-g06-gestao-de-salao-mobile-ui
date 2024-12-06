const express = require('express');
const cors = require('cors');
const app = express();
const port = 5001;

// Habilita CORS para todas as origens
app.use(cors({
  origin: 'http://192.168.2.21:8081',  // ou o endereço de seu app frontend
}));

// Rota simples
app.get('/', (req, res) => {
  res.send('Servidor está funcionando!');
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
