import CRUDInterface from "../interfaces/crud-interface"
import { FirebaseCreateOptions, FirebaseReadOptions, FirebaseUpdateOptions, FirebaseDeleteOptions } from "../config/firebase-types"
import { Tag } from "../config/data-types"

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



        await CRUDInterface.createRecord()
    }

    async retrieveAllTags() {
        



        await CRUDInterface.readRecord()
    }

    async updateTag() {
        



        await CRUDInterface.updateRecord()
    }

    async deleteTag() {
        



        await CRUDInterface.deleteRecord()
    }
}

export default new TagService()
