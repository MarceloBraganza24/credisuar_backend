import Router from "./router.js";
import { accessRolesEnum, passportStrategiesEnum } from "../config/enums.js";
import { getAll, getById,getAllByPage, save, update, eliminate } from '../controllers/contracts.controller.js'
import uploader from "../utils/upload.js";
import { contractsModel } from '../dao/dbManagers/models/contracts.model.js'

export default class ContractsRouter extends Router {
    init() {
        /* this.get('/contracts/fix-deleted', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, async (req, res) => {
            try {
                const result = await contractsModel.updateMany(
                    { deleted: { $exists: false } },  // Solo actualiza si no existe
                    { $set: { deleted: false } }
                );

                res.status(200).json({
                    status: 'success',
                    message: 'Campo "deleted: false" agregado correctamente.',
                    modifiedCount: result.modifiedCount
                });
            } catch (error) {
                console.error('Error al actualizar tickets:', error.message);
                res.status(500).json({
                    status: 'error',
                    message: 'Error al actualizar los documentos.',
                    error: error.message
                });
            }
        }); */
        this.get('/', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, getAll);
        this.get('/byPage', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, getAllByPage);
        this.get('/:cid', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, getById);
        this.post('/', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, uploader.fields([
                { name: 'contract_file', maxCount: 1 },
                { name: 'image_dni', maxCount: 1 }
            ]),
            save
        );
        this.put('/:cid', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, uploader.fields([
                { name: 'contract_file', maxCount: 1 },
                { name: 'image_dni', maxCount: 1 }
            ]),
            update
        );
        this.delete('/:cid', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, eliminate);
    }
}