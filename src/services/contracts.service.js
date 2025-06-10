import ContractsRepository from '../repositories/contracts.repository.js';
import { Contracts } from '../dao/factory.js';

const contractsDao = new Contracts();
const contractsRepository = new ContractsRepository(contractsDao);

const getById = async(cid) => {
    const contracts = await contractsRepository.getById(cid);
    return contracts;
}

const getAll = async(page) => {
    const contracts = await contractsRepository.getAll(page);
    return contracts;
}
const save = async(contracts) => {
    const contractSaved = await contractsRepository.save(contracts);
    return contractSaved;
}
const update = async(cid, contractsToReplace) => {
    const contractUpdated = await contractsRepository.update(cid, contractsToReplace);
    return contractUpdated;
}
const eliminate = async(cid) => {
    const contractEliminated = await contractsRepository.eliminate(cid);
    return contractEliminated;
}

export {
    getById,
    getAll,
    save,
    update,
    eliminate
}