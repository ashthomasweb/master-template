import DataPaths from "../config/data-paths"
import { FirebaseCreateOptions, FirebaseReadOptions, FirebaseUpdateOptions } from "../config/firebase-types"
import CRUDInterface from "../interfaces/crud-interface"

class EntryService {
    mainDispatch = null
    userObj = null

    setLocalDispatch(dispatch) {
        this.mainDispatch = dispatch
    }

    setUserObj(userObj) {
        this.userObj = userObj
    }

    async saveNewEntry(entry) {
        const basePath = DataPaths.base.users
        const pathExtension = [this.userObj.uid, DataPaths.extension.entry, entry.id]
        const newEntry = {...entry}
        const autoGenId = false
        const merge = false
        const options = new FirebaseCreateOptions(basePath, pathExtension, newEntry, autoGenId, merge)
        CRUDInterface.createRecord(options)
    }

    async getSelectedEntries(set, category) {
        const basePath = DataPaths.base.users
        const pathExtension = [this.userObj.uid, DataPaths.extension.entry]
        const isCollection = true
        const options = new FirebaseReadOptions(basePath, pathExtension, isCollection)
        const result = await CRUDInterface.readRecord(options)
        const payload = {
            requestedEntries: result.filter(entry => entry.setId === set.id && entry.categoryId === category.id)
        }
        this.mainDispatch({ payload })
    }

    async updateEntry(entry) {
        const basePath = DataPaths.base.users
        const pathExtension = [this.userObj.uid, DataPaths.extension.entry, entry.id]
        const options = new FirebaseUpdateOptions(basePath, pathExtension, {...entry})
        await CRUDInterface.updateRecord(options)
    }

}

export default new EntryService()
