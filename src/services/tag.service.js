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
        console.log(newTag)
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
            tagArray: result
        }
        this.mainDispatch({ payload })
    }

    async updateTag() {
        



        await CRUDInterface.updateRecord()
    }

    async deleteTag() {
        



        await CRUDInterface.deleteRecord()
    }
}

export default new TagService()
