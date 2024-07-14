import DataPaths from "../config/data-paths"
import { FirebaseReadOptions } from "../config/firebase-types"
import CRUDInterface from "../interfaces/crud-interface"

class QuizService {
    mainDispatch = null
    userObj = null

    setLocalDispatch(dispatch) {
        this.mainDispatch = dispatch
    }

    setUserObj(userObj) {
        this.userObj = userObj
    }

    async getQuizzableEntries(set, category) {
        const basePath = DataPaths.base.users
        const pathExtension = [this.userObj.uid, DataPaths.extension.entry]
        const isCollection = true
        const options = new FirebaseReadOptions(basePath, pathExtension, isCollection)
        const result = await CRUDInterface.readRecord(options)
        const filteredEntries = result.filter(entry => entry.setId === set.id && entry.categoryId === category.id && !Object.keys(entry).includes('deletedAt'))
        const payload = {
            quizzableEntries: filteredEntries,
            currentQuizEntries: filteredEntries
        }
        this.mainDispatch({ payload })
    }

    nextQuizEntry(currentEntry, currentQuizEntries, quizzableEntries) {
        const remainingLength = currentQuizEntries.length - 1
        if (remainingLength === 0) {
            const payload = {
                currentQuizEntries: quizzableEntries,
                currentEntry: {},
                isCardFrontDisplayed: true
            }
            this.mainDispatch({ payload })
            window.alert('You went through all entries!')
        } else {

            const randomIndex = Math.floor(Math.random() * remainingLength)
            const remainingEntries = currentQuizEntries.filter(entry => entry.id !== currentEntry.id)
            const payload = {
                currentQuizEntries: remainingEntries,
                currentEntry: remainingEntries[randomIndex],
                isCardFrontDisplayed: true
            }
            this.mainDispatch({ payload })
        }
    }

    startQuiz(currentQuizEntries) {
        const remainingLength = currentQuizEntries.length
        const randomIndex = Math.floor(Math.random() * remainingLength)
        const payload = {
            currentEntry: currentQuizEntries[randomIndex]
        }
        this.mainDispatch({ payload })
    }

}

export default new QuizService()
