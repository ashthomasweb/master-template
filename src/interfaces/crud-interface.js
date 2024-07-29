import FirebaseCreateService from '../_services/firebase/firebase-create.service'
import FirebaseReadService from '../_services/firebase/firebase-read.service'
import FirebaseUpdateService from '../_services/firebase/firebase-update.service'
import FirebaseDeleteService from '../_services/firebase/firebase-delete.service'

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
