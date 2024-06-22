import DataPaths from "../config/data-paths"
import { FirebaseCreateOptions, FirebaseReadOptions } from "../config/firebase-types"
import CRUDInterface from "../interfaces/crud-interface"

class EntryService {
    mainDispatch = null

    setLocalDispatch(dispatch) {
        this.mainDispatch = dispatch
    }

    async saveNewEntry(newEntry, userObj) {
        const options = new FirebaseCreateOptions({...newEntry}, DataPaths.base.users, [userObj.uid, DataPaths.extension.entry, newEntry.id].join('/'), false, false)
        CRUDInterface.createRecord(options, userObj)
    }

    async getSelectedEntries(set, category, userObj) {
        const options = new FirebaseReadOptions(DataPaths.base.users, true, [userObj.uid, DataPaths.extension.entry].join('/'))
        const result = await CRUDInterface.readRecord(options)
        const payload = {
            requestedEntries: result.filter(entry => entry.setId === set.id && entry.categoryId === category.id)
        }
        this.mainDispatch({ payload })
    }

}

export default new EntryService()
