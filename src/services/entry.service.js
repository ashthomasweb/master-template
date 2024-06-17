import DataPaths from "../config/data-paths"
import { FirebaseCreateOptions } from "../config/firebase-types"
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


}

export default new EntryService()
