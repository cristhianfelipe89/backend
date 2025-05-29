import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  boton: String,
  hora: Date
});

export default mongoose.model('Event', EventSchema);

