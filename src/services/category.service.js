import CRUDInterface from "../interfaces/crud-interface"
import DataPaths from "../config/data-paths"
import { FirebaseUpdateOptions } from "../config/firebase-types"

class CategoryService {
    mainDispatch = null
    userObj = null

    setLocalDispatch(dispatch) {
        this.mainDispatch = dispatch
    }

    setUserObj(userObj) {
        this.userObj = userObj
    }

    async saveNewCategory(category, currentSet, userObj) {
        const basePath = DataPaths.base.users
        const pathExtension = [userObj.uid, DataPaths.extension.set, currentSet.id]
        const newData = { categories: [...currentSet.categories, {...category}] }
        const options = new FirebaseUpdateOptions(basePath, pathExtension, newData)
        await CRUDInterface.updateRecord(options, userObj)
        const payload = {
            currentCategory: category
        }
        this.mainDispatch({ payload })
    }

    setCurrentCategory(category) {
        const payload = {
            currentCategory: category
        }
        this.mainDispatch({ payload })
    }

}

export default new CategoryService()
