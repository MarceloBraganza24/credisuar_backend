import * as contractsService from '../services/contracts.service.js';
import fs from 'fs';
import path from 'path';
import { __mainDirname } from '../utils/utils.js'; // ajustá la ruta

const getAll = async (req, res) => {
    try {
        const { page = 1 } = req.query;            
        const contracts = await contractsService.getAll(page);
        res.sendSuccess(contracts);
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
} 

const getById = async (req, res) => {
    try {
        const { cid } = req.params;            
        const contract = await contractsService.getById(cid);
        res.sendSuccess(contract);
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
} 

const save = async (req, res) => {
    try {
        const {
            first_name,
            last_name,
            dni,
            phoneNumber
        } = req.body;

        const contract_file = req.files['contract_file']?.[0];
        const image_dni = req.files['image_dni']?.[0];

        if (!contract_file || !image_dni) {
            return res.status(400).json({ error: 'Faltan archivos requeridos.' });
        }

        const newContract = {
            first_name,
            last_name,
            dni,
            phoneNumber,
            contract_file: contract_file?.path.replace(/\\/g, '/'),
            image_dni: image_dni?.path.replace(/\\/g, '/')
        };
        //console.log(newContract)
        const contract = await contractsService.save(newContract);
        res.sendSuccessNewResourse(contract);
        //await newContract.save();

        //res.status(201).json({ message: 'Contrato creado exitosamente', contract: newContract });

    } catch (error) {
        console.error('Error al guardar el contrato:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const update = async (req, res) => {
    try {
        const contractId = req.params.cid;

        const {
            first_name,
            last_name,
            dni,
            phoneNumber
        } = req.body;

        const existingContract = await contractsService.getById(contractId);

        if (!existingContract) {
            return res.status(404).json({ error: 'Contrato no encontrado.' });
        }

        // Verificamos si vienen archivos nuevos
        const newContractFile = req.files['contract_file']?.[0];
        const newDniImage = req.files['dni_image']?.[0];

        let contract_file = existingContract.contract_file;
        let image_dni = existingContract.image_dni;

        // Si hay nuevo archivo de contrato
        if (newContractFile) {
            // Eliminamos el archivo anterior si existe
            const oldContractPath = path.join(__mainDirname, contract_file);
            if (fs.existsSync(oldContractPath)) {
                fs.unlinkSync(oldContractPath);
            }
            contract_file = newContractFile.path.replace(/\\/g, '/');
        }

        // Si hay nueva imagen de DNI
        if (newDniImage) {
            const oldDniImagePath = path.join(__mainDirname, image_dni);
            if (fs.existsSync(oldDniImagePath)) {
                fs.unlinkSync(oldDniImagePath);
            }
            image_dni = newDniImage.path.replace(/\\/g, '/');
        }

        const updatedData = {
            first_name,
            last_name,
            dni,
            phoneNumber,
            contract_file,
            image_dni
        };

        const updatedContract = await contractsService.update(contractId, updatedData);

        res.status(200).json({
            message: 'Contrato actualizado con éxito.',
            contract: updatedContract
        });

    } catch (error) {
        console.error('Error al actualizar el contrato:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const eliminate = async (req, res) => {
    try {
        const { cid } = req.params;
        const contract = await contractsService.getById(cid);
        if(req.user.role === 'premium') {
            if(contract.owner === req.user.email) {
                await contractsService.eliminate(cid);
                res.send({ data: `El contrato con ID ${cid} se eliminó correctamente` });
            } else {
                res.send({ data: 'Este usuario no tiene permitido eliminar contratos' });
            }
        } else if(req.user.role === 'admin') {
            await contractsService.eliminate(pid);
            res.send({ data: `El contrato con ID ${cid} se eliminó correctamente` });
        }
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

export {
    getAll,
    getById,
    save,
    update,
    eliminate
}