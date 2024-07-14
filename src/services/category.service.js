import CRUDInterface from "../interfaces/crud-interface"
import DataPaths from "../config/data-paths"
import { FirebaseUpdateOptions } from "../config/firebase-types"
import SetService from "./set.service"

class CategoryService {
    mainDispatch = null
    userObj = null

    setLocalDispatch(dispatch) {
        this.mainDispatch = dispatch
    }

    setUserObj(userObj) {
        this.userObj = userObj
    }

    async saveNewCategory(category, currentSet) {
        const basePath = DataPaths.base.users
        const pathExtension = [this.userObj.uid, DataPaths.extension.set, currentSet.id]
        const newData = { categories: [...currentSet.categories, {...category}] }
        const options = new FirebaseUpdateOptions(basePath, pathExtension, newData)
        await CRUDInterface.updateRecord(options, this.userObj)
        const updatedSetArray = await SetService.retrieveAllSets()
        SetService.setActiveSet(updatedSetArray.filter(entry => entry.id === currentSet.id)[0])
    }

    setCurrentCategory(category) {
        const payload = {
            currentCategory: category
        }
        this.mainDispatch({ payload })
    }

    async updateSingleCategory(currentSet, currentCategory, title, subtitle) { // ATTN: Could be refactored to be passed directly to Set Service
        currentCategory.title = title
        currentCategory.subtitle = subtitle
        await SetService.updateSetCategories(currentSet)
    }

    async markAsDeleted(currentSet, currentCategory) {
        currentCategory.deletedAt = new Date()
        await SetService.updateSetCategories(currentSet)
        this.setCurrentCategory(null)
    }

}

export default new CategoryService()
