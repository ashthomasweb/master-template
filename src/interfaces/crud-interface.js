import {
    /* Firebase */
    FirebaseCreateService,
    FirebaseReadService,
    FirebaseUpdateService,
    FirebaseDeleteService,
    /* Components */
    /* Context */
    /* Views */
    /* Custom Hooks */
    logComponentInit,
    /* Service Classes */
    /* Utility Functions */
    /* Assets */
    /* Icons */
    /* Configs */
    /* Types */
    /* Interfaces */
    /* DeveloperTools */
    debug,
    logInit,
    trace,
    m
} from '../app-index'

/* Trace vars */
const t = false
const file = ''
const msg = (copy, fileName = file) => m(copy, fileName)
/* END Trace vars */


class CRUDInterface {
    async createRecord(options) {
        await FirebaseCreateService.createRecord(options)
    }

    async readRecord(options) {
        return await FirebaseReadService.readRecord(options)
    }

    async updateRecord(options) {
        await FirebaseUpdateService.updateRecord(options)
    }

    async deleteRecord(options) {
        await FirebaseDeleteService.deleteRecord(options)
    }
}

export default new CRUDInterface()
