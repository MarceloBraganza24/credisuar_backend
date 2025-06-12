export default class ContractsRepository {
    constructor(dao) {
        this.dao = dao;
    }
    getById = async(cid) => {
        const contract = await this.dao.getById(cid);
        return contract;
    }
    getAll = async(page) => {
        const contracts = await this.dao.getAll(page);
        return contracts;
    }
    getAllByPage = async(query, { page, limit }) => {
        const contracts = await this.dao.getAllByPage(query, { page, limit });
        return contracts;
    }
    save = async(contract) => {
        const contractSaved = await this.dao.save(contract);
        return contractSaved;
    }
    update = async(cid, contractToReplace) => {
        const contractUpdated = await this.dao.update(cid, contractToReplace);
        return contractUpdated;
    }
    eliminate = async(cid) => {
        const contractEliminated = await this.dao.eliminate(cid);
        return contractEliminated;
    }
}