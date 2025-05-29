import express from 'express';
import Event from '../models/Evento.js';

const router = express.Router();

// Obtener todos los eventos
router.get('/', async (req, res) => {
  try {
    const eventos = await Event.find().sort({ hora: -1 });
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener eventos' });
  }
});

// Guardar un nuevo evento
router.post('/', async (req, res) => {
  const { boton, hora } = req.body;
  if (!boton || !hora) {
    return res.status(400).json({ mensaje: 'Datos incompletos' });
  }
  try {
    const nuevoEvento = new Event({ boton, hora });
    await nuevoEvento.save();
    res.status(201).json(nuevoEvento);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al guardar evento' });
  }
});

export default router;
