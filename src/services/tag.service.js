import CRUDInterface from "../interfaces/crud-interface"
import { FirebaseCreateOptions, FirebaseReadOptions, FirebaseUpdateOptions, FirebaseDeleteOptions } from "../config/firebase-types"
import { Tag } from "../config/data-types"
import DataPaths from "../config/data-paths"

class TagService {
    mainDispatch = null
    userObj = null

    setLocalDispatch(dispatch) {
        this.mainDispatch = dispatch
    }

    setUserObj(userObj) {
        this.userObj = userObj
    }

    async createNewTag(newTag) {
        const basePath = DataPaths.base.users
        const pathExtension = [this.userObj.uid, DataPaths.extension.tags, newTag.id]
        const autoGenId = false
        const merge = false
        const options = new FirebaseCreateOptions(basePath, pathExtension, {...newTag}, autoGenId, merge)
        await CRUDInterface.createRecord(options)
        this.retrieveAllTags()
    }

    async retrieveAllTags() {
        const isCollection = true
        const options = new FirebaseReadOptions(DataPaths.base.users, [this.userObj.uid, DataPaths.extension.tags], isCollection)
        const result = await CRUDInterface.readRecord(options)
        const payload = {
            tagArray: result.filter(entry => !Object.keys(entry).includes('deletedAt'))
        }
        this.mainDispatch({ payload })
    }

    async updateTag(updatedTag) {
        const basePath = DataPaths.base.users
        const pathExtension = [this.userObj.uid, DataPaths.extension.tags, updatedTag.id]
        const options = new FirebaseUpdateOptions(basePath, pathExtension, {...updatedTag})
        await CRUDInterface.updateRecord(options)
        this.retrieveAllTags()
    }

    async deleteTag(currentTag) {
        const basePath = DataPaths.base.users
        const pathExtension = [this.userObj.uid, DataPaths.extension.tags, currentTag.id]
        const markForDelete = true
        const deleteField = false
        const documentDelete = false
        const fieldToDelete = null
        const options = new FirebaseDeleteOptions(basePath, pathExtension, markForDelete, deleteField, documentDelete, fieldToDelete)
        await CRUDInterface.deleteRecord(options)
        this.retrieveAllTags()
    }
}

export default new TagService()
