import {
    /* Firebase */
    FirebaseInitialization,
    doc,
    collection,
    getDocs,
    getDoc,
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
    logInit,
    trace,
    m
} from '../../app-index'

/* Trace vars */
const run = false
const file = 'FirebaseReadService'
const msg = (copy, fileName = file) => m(copy, fileName)
/* END Trace vars */

class firebaseReadService {
    mainDispatch = null
    app = FirebaseInitialization.app
    db = FirebaseInitialization.db

    constructor() {
        logInit && log(...msg('Init'))
    }

    setLocalDispatch(dispatch) {
        this.mainDispatch = dispatch
    }

    // Retrieve either a collection or individual document as defined in options, and set to Context ...
    async readRecord(options) {
        const results = []
        try {
            if (options.isCollection) {
                const collectionRef = collection(this.db, options.basePath, options.pathExtension)
                const collectionsSnapshot = await getDocs(collectionRef)
                collectionsSnapshot.forEach(doc => (results.push(doc.data())))
                results.length === 0 ? console.log('not a collection') : console.log(`Record successfully retrieved from Firestore with options: `, options)
                return results
            } else {
                const docRef = doc(this.db, options.basePath, options.pathExtension)
                const docSnap = await getDoc(docRef)
                if (docSnap.exists()) {
                    results.push(docSnap.data())
                    console.log(`Record successfully retrieved from Firestore with options: `, options)
                    return results
                } else {
                    throw new Error(`No such record found!`)
                }
            }
        } catch (error) {
            console.log(`An error occurred during 'Read' operations with options: `, options)
            console.error(error)
        }
    }
}

export default firebaseReadService
