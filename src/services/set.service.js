import CRUDInterface from "../interfaces/crud-interface"
import DataPaths from "../config/data-paths"
import { FirebaseReadOptions, FirebaseCreateOptions, FirebaseUpdateOptions, FirebaseDeleteOptions } from "../config/firebase-types"
import { useReducer } from "react"

class SetService {
    mainDispatch = null

    setLocalDispatch(dispatch) {
        this.mainDispatch = dispatch
    }

    async saveNewSet(set, userObj) {
        const options = new FirebaseCreateOptions({...set}, DataPaths.base.users, [userObj.uid, DataPaths.extension.set, set.id].join('/'), false, false)
        await CRUDInterface.createRecord(options)
        this.retrieveAllSets(userObj)
    }
    
    setActiveSet(selectedSet) {
        const payload = {
            currentSet: selectedSet
        }
        this.mainDispatch({ payload })
    }

    async retrieveAllSets(userObj) {
        const options = new FirebaseReadOptions(DataPaths.base.users, true, [userObj.uid, DataPaths.extension.set].join('/'))
        const results = await CRUDInterface.readRecord(options)
        const payload = {
            setArray: results.filter(entry => !Object.keys(entry).includes('deletedAt'))
        }
        await this.mainDispatch({ payload })
    }

    async retrieveOneSet(userObj, currentSet, setArray) {
        const options = new FirebaseReadOptions(DataPaths.base.users, false, [userObj.uid, DataPaths.extension.set, currentSet.id].join('/'))
        const result = await CRUDInterface.readRecord(options)
        this.updateStateSetsWithRetrievedSet(result[0], setArray)
    }

    updateStateSetsWithRetrievedSet(set, setArray) {
        const filteredSetArray = setArray.filter(entry => entry.id !== set.id)
        filteredSetArray.push(set)
        const payload = {
            setArray: filteredSetArray
        }
        this.mainDispatch({ payload })
    }

    async updateSingleSet(currentSet, newTitle, newSubtitle, userObj) {
        const options = new FirebaseUpdateOptions(DataPaths.base.users, [userObj.uid, DataPaths.extension.set, currentSet.id].join('/'), {title: newTitle, subtitle: newSubtitle})
        await CRUDInterface.updateRecord(options)
        this.retrieveAllSets(userObj)
    }

    async markAsDeleted(set, userObj) {
        const options = new FirebaseDeleteOptions(DataPaths.base.users, [userObj.uid, DataPaths.extension.set, set.id].join('/'), true, null, null, null)
        CRUDInterface.deleteRecord(options)
        await this.retrieveAllSets(userObj)
    }
}

export default new SetService()
