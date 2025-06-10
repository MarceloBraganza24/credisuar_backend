import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const contractsCollection = 'contracts';

const contractsSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    dni: { type: String, required: true },
    telefono: { type: String, required: true },
    pdfUrl: { type: String, required: true },     // Ruta al archivo PDF
    dniImagenUrl: { type: String, required: true }, // Ruta a la imagen del DNI
    createdAt: { type: Date, default: Date.now }
});

contractsSchema.plugin(mongoosePaginate);

export const contractsModel = mongoose.model(contractsCollection, contractsSchema);
