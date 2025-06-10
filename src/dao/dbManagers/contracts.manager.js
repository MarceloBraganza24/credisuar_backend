import { contractsModel } from './models/contracts.model.js'

export default class Contracts {
    constructor() {
        console.log('Working with contracts DB');
    }
    getById = async (cid) => {
        const contract = await contractsModel.findById(cid);
        return contract; 
    }
    getAll = async (page) => {
        const contracts = await contractsModel.paginate({}, {limit: 5, page, lean: true});
        return contracts; 
    }
    save = async (contract) => {
        const contractSaved = await contractsModel.create(contract);
        return contractSaved;
    }
    update = async (cid, contractToReplace) => {
        const contractUpdated = await contractsModel.updateOne({ _id: cid }, contractToReplace);
        return contractUpdated;
    }
    eliminate = async (cid) => {
        const contractEliminated = await contractsModel.deleteOne({ _id: cid });
        return contractEliminated;
    }
}