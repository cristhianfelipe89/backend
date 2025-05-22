const mongoose = require('mongoose');

const EventoSchema = new mongoose.Schema({
  boton: String,
  hora: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Evento', EventoSchema);
