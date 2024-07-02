import CRUDInterface from "../interfaces/crud-interface"
import DataPaths from "../config/data-paths"
import { FirebaseReadOptions, FirebaseCreateOptions, FirebaseUpdateOptions, FirebaseDeleteOptions } from "../config/firebase-types"

class SetService {
    mainDispatch = null
    userObj = null

    setLocalDispatch(dispatch) {
        this.mainDispatch = dispatch
    }

    setUserObj(userObj) {
        this.userObj = userObj
    }

    async saveNewSet(set) {
        const basePath = DataPaths.base.users
        const pathExtension = [this.userObj.uid, DataPaths.extension.set, set.id]
        const newSet = {...set}
        const autoGenId = false
        const merge = false
        const options = new FirebaseCreateOptions(basePath, pathExtension, newSet, autoGenId, merge)
        await CRUDInterface.createRecord(options)
        this.retrieveAllSets()
    }
    
    async retrieveOneSet(currentSet, setArray) {
        const basePath = DataPaths.base.users
        const isCollection = false
        const pathExtension = [this.userObj.uid, DataPaths.extension.set, currentSet.id]
        const options = new FirebaseReadOptions(basePath, pathExtension, isCollection)
        const result = await CRUDInterface.readRecord(options)
        this.updateStateSetsWithRetrievedSet(result[0], setArray)
    }

    async retrieveAllSets() {
        const basePath = DataPaths.base.users
        const isCollection = true
        const pathExtension = [this.userObj.uid, DataPaths.extension.set]
        const options = new FirebaseReadOptions(basePath, pathExtension, isCollection)
        const results = await CRUDInterface.readRecord(options)
        const payload = {
            setArray: results.filter(entry => !Object.keys(entry).includes('deletedAt'))
        }
        await this.mainDispatch({ payload })
        return payload.setArray
    }

    async updateSetFields(currentSet, newTitle, newSubtitle) {
        const basePath = DataPaths.base.users
        const pathExtension = [this.userObj.uid, DataPaths.extension.set, currentSet.id]
        const newData = {title: newTitle, subtitle: newSubtitle}
        const options = new FirebaseUpdateOptions(basePath, pathExtension, newData)
        await CRUDInterface.updateRecord(options)
        this.retrieveAllSets()
    }

    async updateSetCategories(currentSet) { // ATTN: Could be refactored to be called directly from Category Manager
        const basePath = DataPaths.base.users
        const pathExtension = [this.userObj.uid, DataPaths.extension.set, currentSet.id]
        const newData = {categories: [...currentSet.categories]}
        const options = new FirebaseUpdateOptions(basePath, pathExtension, newData)
        await CRUDInterface.updateRecord(options)
        this.retrieveAllSets()
    }

    async markAsDeleted(set) {
        const basePath = DataPaths.base.users
        const pathExtension = [this.userObj.uid, DataPaths.extension.set, set.id]
        const markForDelete = true
        const deleteField = null
        const documentDelete = null
        const fieldToDelete = null
        const options = new FirebaseDeleteOptions(basePath, pathExtension, markForDelete, deleteField, documentDelete, fieldToDelete)
        await CRUDInterface.deleteRecord(options)
        this.retrieveAllSets()
    }

    setActiveSet(selectedSet) {
        const payload = {
            currentSet: selectedSet
        }
        this.mainDispatch({ payload })
    }

    updateStateSetsWithRetrievedSet(set, setArray) {
        const filteredSetArray = setArray.filter(entry => entry.id !== set.id)
        filteredSetArray.push(set)
        const payload = {
            setArray: filteredSetArray
        }
        this.mainDispatch({ payload })
    }
}

export default new SetService()
