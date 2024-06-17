import FirebaseCreateService from '../services/firebase/firebase-create.service'
import FirebaseReadService from '../services/firebase/firebase-read.service'
import FirebaseUpdateService from '../services/firebase/firebase-update.service'
import FirebaseDeleteService from '../services/firebase/firebase-delete.service'

class CRUDInterface {
    async createRecord(options, userObj) {
        await FirebaseCreateService.createRecord(options, userObj)
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
