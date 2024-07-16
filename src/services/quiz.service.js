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

        const filteredEntries = category === 'Select A Category'
            ? result.filter(entry => entry.setId === set.id && entry.categoryId === category.id && !Object.keys(entry).includes('deletedAt'))
            : result.filter(entry => entry.setId === set.id && !Object.keys(entry).includes('deletedAt'))
        const payload = {
            quizzableEntries: filteredEntries,
            currentQuizEntries: filteredEntries
        }
        this.mainDispatch({ payload })
    }

    nextQuizEntry(currentEntry, currentQuizEntries, quizzableEntries, statCount, result) {
        const newStatCount = {
            success: result === 'success' ? statCount.success + 1 : statCount.success,
            fail: result === 'fail' ? statCount.fail + 1 : statCount.fail
        }
        const remainingLength = currentQuizEntries.length - 1
        if (remainingLength === 0) {
            const payload = {
                currentQuizEntries: quizzableEntries,
                currentEntry: {},
                isCardFrontDisplayed: true,
                statCount: {
                    success: 0,
                    fail: 0
                }
            }
            this.mainDispatch({ payload })
            window.alert(`You went through all entries!\n\nYour Results:\nSuccess: ${newStatCount.success}\nFail: ${newStatCount.fail}`)
        } else {
            const randomIndex = Math.floor(Math.random() * remainingLength)
            const remainingEntries = currentQuizEntries.filter(entry => entry.id !== currentEntry.id)
            const payload = {
                currentQuizEntries: remainingEntries,
                currentEntry: remainingEntries[randomIndex],
                isCardFrontDisplayed: true,
                statCount: newStatCount
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

    resetQuiz(quizzableEntries) {
        const payload = {
            currentQuizEntries: quizzableEntries,
            currentEntry: {}
        }
        this.mainDispatch({ payload })
    }
}

export default new QuizService()
