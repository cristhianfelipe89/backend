const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const Evento = require('./models/Evento');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error MongoDB:', err));

app.post('/api/events', async (req, res) => {
  const { boton, hora } = req.body;
  try {
    const nuevoEvento = new Evento({ boton, hora: hora || Date.now() });
    await nuevoEvento.save();
    res.status(201).json(nuevoEvento);
  } catch (err) {
    res.status(500).json({ error: 'Error al guardar el evento' });
  }
});

app.get('/api/events', async (req, res) => {
  try {
    const eventos = await Evento.find().sort({ hora: -1 });
    res.json(eventos);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener eventos' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
