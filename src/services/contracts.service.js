import ContractsRepository from '../repositories/contracts.repository.js';
import { Contracts } from '../dao/factory.js';

const contractsDao = new Contracts();
const contractsRepository = new ContractsRepository(contractsDao);

const getById = async(cid) => {
    const contract = await contractsRepository.getById(cid);
    return contract;
}
const getAllByPage = async(query, { page, limit }) => {
    const contracts = await contractsRepository.getAllByPage(query, { page, limit });
    return contracts;
}
const getAll = async(page) => {
    const contracts = await contractsRepository.getAll(page);
    return contracts;
}
const save = async(contract) => {
    const contractSaved = await contractsRepository.save(contract);
    return contractSaved;
}
const update = async(cid, contractToReplace) => {
    const contractUpdated = await contractsRepository.update(cid, contractToReplace);
    return contractUpdated;
}
const eliminate = async(cid) => {
    const contractEliminated = await contractsRepository.eliminate(cid);
    return contractEliminated;
}

export {
    getById,
    getAll,
    getAllByPage,
    save,
    update,
    eliminate
}