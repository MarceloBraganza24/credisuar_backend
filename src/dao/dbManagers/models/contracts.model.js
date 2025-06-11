import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const contractsCollection = 'contracts';

const contractsSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    dni: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    contract_file: { type: String, required: true },     // Ruta al archivo PDF
    image_dni: { type: String, required: true }, // Ruta a la imagen del DNI
    createdAt: { type: Date, default: Date.now }
});

contractsSchema.plugin(mongoosePaginate);

export const contractsModel = mongoose.model(contractsCollection, contractsSchema);
