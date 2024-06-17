import CRUDInterface from "../interfaces/crud-interface"
import DataPaths from "../config/data-paths"
import { FirebaseUpdateOptions } from "../config/firebase-types"

class CategoryService {
    mainDispatch = null

    setLocalDispatch(dispatch) {
        this.mainDispatch = dispatch
    }

    async saveNewCategory(category, currentSet, userObj) {
        const newData = {
            categories: [...currentSet.categories, {...category}]
        }
        const options = new FirebaseUpdateOptions(DataPaths.base.users, [userObj.uid, DataPaths.extension.set, currentSet.id].join('/'), newData)
        try {
            await CRUDInterface.updateRecord(options, userObj)
        } catch (error) {
            console.error(error)            
        }
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
