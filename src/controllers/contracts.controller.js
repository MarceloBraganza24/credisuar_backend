import * as contractsService from '../services/contracts.service.js';
import fs from 'fs';
import path from 'path';

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
        const { cid } = req.params;
        const contractToReplace = req.body;
        if(!contractToReplace.title || !contractToReplace.stock || !contractToReplace.description || !contractToReplace.price || !contractToReplace.thumbnail || !contractToReplace.category || !contractToReplace.code ||!contractToReplace.owner) {
            return res.status(400).send({ status: 'error', message: 'Incomplete values' });
        }
        if(req.user.role === 'premium') {
            if(contractToReplace.owner === req.user.email) {
                await contractsService.update(cid, contractToReplace);
                res.send({ data: `El producto con ID ${cid} se modificó correctamente` });
            } else {
                res.send({ data: 'Este usuario no tiene permitido modificar productos' });
            }
        } else if(req.user.role === 'admin') {
            await contractsService.update(cid, contractToReplace);
            res.send({ data: `El producto con ID ${cid} se modificó correctamente` });
        }
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

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