import config from '../config/config.js';

export let Users;
export let Contracts;

const persistence = config.persistence;

switch(persistence) {
    case 'MONGO':
        console.log('Working with MongoDB persistence');
        const mongoose = await import('mongoose');
        await mongoose.connect(config.mongoUrl);
        const { default: UsersMongo } = await import('./dbManagers/users.manager.js');
        const { default: ContractsMongo } = await import('./dbManagers/contracts.manager.js');
        Users = UsersMongo;
        Contracts = ContractsMongo;
        break;
    case 'FILE':
        /* const { default: UsersFile } = await import('./fileManagers/users.manager.js');
        Users = UsersFile; */
        break;
}