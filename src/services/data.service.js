import CRUDInterface from "../interfaces/crud-interface"
import { FirebaseCreateOptions } from "../config/firebase-types"
import DataPaths from "../config/data-paths"

class DataService {
    mainDispatch = null

    setLocalDispatch(dispatch) {
        this.mainDispatch = dispatch
    }

    saveNewSet(set, userObj) {
        console.log(set)

        const options = new FirebaseCreateOptions({...set}, DataPaths.base.users, [userObj.uid, DataPaths.extension.set, set.id].join('/'), false, false)
        CRUDInterface.createRecord(options)

        const payload = {
            currentSet: set.title
        }
        this.mainDispatch({ payload })

    }

    setActiveSet(selectedSet) {
        const payload = {
            currentSet: selectedSet
        }
        this.mainDispatch({ payload })
    }


    saveNewCategory(category, userObj) {
        console.log(category)

        const options = new FirebaseCreateOptions({...category}, DataPaths.base.users, [userObj.uid, DataPaths.extension.category, category.id].join('/'), false, false)
        CRUDInterface.createRecord(options)

        const payload = {
            currentCategory: category.title
        }
        this.mainDispatch({ payload })

    }

    generateNewId(idLength, forceString) {
        let concatString = ''
        for (let i = 0; i < 4; i++) {
            concatString = concatString + String(Math.ceil(Math.random() * 10e18))
        }
        concatString = concatString.replaceAll('0', '')
        let tempId = concatString.split('')
        tempId.forEach((entry, index) => {
            if (entry === tempId[index - 1]) {
                tempId[index] = '0'
            }
        })
        concatString = tempId.join().replaceAll(',', '')
        if (idLength < 18 && !forceString) {
            return Number(concatString.substring(0, idLength))
        } else {
            return concatString.substring(0, idLength)
        }
    }
}

export default new DataService()