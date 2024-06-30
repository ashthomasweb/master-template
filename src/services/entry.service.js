import DataPaths from "../config/data-paths"
import { FirebaseCreateOptions, FirebaseReadOptions } from "../config/firebase-types"
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

    async saveNewEntry(entry, userObj) {
        const basePath = DataPaths.base.users
        const pathExtension = [userObj.uid, DataPaths.extension.entry, entry.id]
        const newEntry = {...entry}
        const autoGenId = false
        const merge = false
        const options = new FirebaseCreateOptions(basePath, pathExtension, newEntry, autoGenId, merge)
        CRUDInterface.createRecord(options, userObj)
    }

    async getSelectedEntries(set, category, userObj) {
        const basePath = DataPaths.base.users
        const pathExtension = [userObj.uid, DataPaths.extension.entry]
        const isCollection = true
        const options = new FirebaseReadOptions(basePath, pathExtension, isCollection)
        const result = await CRUDInterface.readRecord(options)
        const payload = {
            requestedEntries: result.filter(entry => entry.setId === set.id && entry.categoryId === category.id)
        }
        this.mainDispatch({ payload })
    }

}

export default new EntryService()
