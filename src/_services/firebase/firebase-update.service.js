import {
    doc,
    updateDoc,
} from 'firebase/firestore'
import {
    /* Firebase */
    FirebaseInitialization,
    /* Components */
    /* Context */
    /* Views */
    /* Custom Hooks */
    /* Service Classes */
    /* Utility Functions */
    /* Assets */
    /* Icons */
    /* Configs */
    /* Types */
    /* Interfaces */
    /* DeveloperTools */
    debug,
    trace,
    m
} from '../../app-index'

/* Trace vars */
const run = false
const file = 'FirebaseUpdateService'
const msg = (copy, fileName = file) => m(copy, fileName)
/* END Trace vars */

class firebaseUpdateService {
    mainDispatch = null
    app = FirebaseInitialization.app
    db = FirebaseInitialization.db

    constructor() {
        debug && trace(run) && log(...msg('Init'))
        
        // console.log('%cTRACE: FBUpdate Init', 'color: green; font-weight: 900')
    }

    setLocalDispatch(dispatch) {
        this.mainDispatch = dispatch
    }

    // Update individual document with new data fields as passed in options ...
    async updateRecord(options) {
        try {
            const docRef = doc(this.db, options.basePath, options.pathExtension)
            await updateDoc(docRef, options.newData)
            console.log(`Record successfully updated from Firestore with options: `, options)
        } catch (error) {
            console.log(`An error occurred during 'Update' operations with options: `, options)
            console.error(error)
        }
    }
}

export default firebaseUpdateService
