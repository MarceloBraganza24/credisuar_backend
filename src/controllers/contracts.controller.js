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
        const parsedData = JSON.parse(req.body.data); // viene como string
        const images = req.files; // multer procesa esto

        console.log(parsedData)
        console.log(' ')
        console.log(images)
        // const updatedConfig = await contractsService.save(newSettings);
        // res.json(updatedConfig);
    } catch (error) {
        console.error('Error actualizando configuración del sitio:', error);
        res.status(500).json({ message: 'Error actualizando configuración del sitio' });
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