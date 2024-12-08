// const express = require('express');
// const cors = require('cors');
// const app = express();
// const port = 5001;

// // Habilita CORS para todas as origens
// app.use(cors({
//   origin: 'http://192.168.2.21:8081',  // ou o endereço de seu app frontend
// }));

// // Rota simples
// app.get('/', (req, res) => {
//   res.send('Servidor está funcionando!');
// });

// // Iniciar o servidor
// app.listen(port, () => {
//   console.log(`Servidor rodando na porta ${port}`);
// });


const express = require('express');
const twilio = require('twilio');
const cors = require('cors');
const app = express();
app.use(express.json());
const port = 5001;

// const accountSid = 'AC3599b5545907e1b9f39d0623dccc6099';
// const authToken = 'b1f18a70368d5b4f11e2a9a7d1ac8df6';
const client = twilio(accountSid, authToken);

// Habilita CORS para todas as origens
app.use(cors({
  origin: 'http://192.168.2.21:8081',  // ou o endereço de seu app frontend
}));

// Rota simples
app.get('/', (req, res) => {
  res.send('Servidor está funcionando!');
});

app.post('/send-whatsapp', async (req, res) => {
  const { to, message } = req.body;

  try {
    const response = await client.messages.create({
      from: 'whatsapp:+14155238886', // Twilio WhatsApp sandbox number
      to: `whatsapp:${to}`,
      body: message,
    });

    res.status(200).send({ success: true, data: response });
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    res.status(500).send({ success: false, error: error.message });
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

