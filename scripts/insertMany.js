import mongoose from 'mongoose';
import { contractsModel } from '../src/dao/dbManagers/models/contracts.model.js'

const firstNames = ['Marcelo', 'Lucía', 'Carlos', 'Ana', 'Luis', 'Martina', 'Diego', 'Paula', 'Jorge', 'Camila'];
const lastNames = ['Braganza', 'Pérez', 'López', 'Gómez', 'Fernández', 'Martínez', 'Díaz', 'Romero', 'Sosa', 'Alvarez'];

const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generatePhone = (index) => `2926${Math.floor(400000 + Math.random() * 100000)}`;
const generateDNI = (base) => String(base + Math.floor(Math.random() * 1000));

const main = async () => {
    try {
        await mongoose.connect('mongodb+srv://marcelobraganza:e1F2rVXZTe29Djol@clusterlito.1upqpvq.mongodb.net/credisuar?retryWrites=true&w=majority');

        const now = Date.now();
        const data = Array.from({ length: 60 }).map((_, index) => {
            const firstName = getRandomItem(firstNames);
            const lastName = getRandomItem(lastNames);

            return {
                first_name: firstName,
                last_name: lastName,
                dni: generateDNI(30000000 + index * 10),
                phoneNumber: generatePhone(index),
                contract_file: `uploads/contract-${now + index}.pdf`,
                image_dni: `uploads/dni-${now + index}.jpg`,
                createdAt: new Date(Date.now() - index * 10000000).toISOString(), // Fechas distintas
            };
        });

        await contractsModel.insertMany(data);
        console.log('Carga masiva con datos únicos completada');
        await mongoose.disconnect();
    } catch (err) {
        console.error('Error en la carga masiva:', err);
        process.exit(1);
    }
};

main();
