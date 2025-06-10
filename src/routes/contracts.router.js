import Router from "./router.js";
import { accessRolesEnum, passportStrategiesEnum } from "../config/enums.js";
import { getAll, getById, save, update, eliminate } from '../controllers/contracts.controller.js'
import uploader from "../utils/upload.js";

export default class ContractsRouter extends Router {
    init() {
        this.get('/', [accessRolesEnum.ADMIN, accessRolesEnum.PREMIUM,accessRolesEnum.PUBLIC], passportStrategiesEnum.JWT, getAll);
        this.get('/:cid', [accessRolesEnum.ADMIN, accessRolesEnum.PREMIUM,accessRolesEnum.PUBLIC], passportStrategiesEnum.JWT, getById);
        //this.post('/', [accessRolesEnum.ADMIN, accessRolesEnum.PREMIUM,accessRolesEnum.PUBLIC], passportStrategiesEnum.JWT, save);
        this.post('/', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, uploader.fields([
                { name: 'contract_file', maxCount: 1 },
                { name: 'image_dni', maxCount: 1 }
            ]),
            save
        );
        this.put('/:cid', [accessRolesEnum.ADMIN, accessRolesEnum.PREMIUM,accessRolesEnum.PUBLIC], passportStrategiesEnum.JWT, update);
        this.delete('/:cid', [accessRolesEnum.ADMIN, accessRolesEnum.PREMIUM,accessRolesEnum.PUBLIC], passportStrategiesEnum.JWT, eliminate);
    }
}