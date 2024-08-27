import {
    /* Firebase */
    FirebaseInitialization,
    setDoc,
    doc,
    collection,
    addDoc,
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
} from '../../../app-index'

/* Trace vars */
const run = false
const file = 'FirebaseCreateService'
const msg = (copy, fileName = file) => m(copy, fileName)
/* END Trace vars */

class firebaseCreateService {
    mainDispatch = null
    app = FirebaseInitialization.app
    db = FirebaseInitialization.db

    constructor() {
        /* Log class initialization */
        logInit && log(...msg('Init'))
    }

    setLocalDispatch(dispatch) {
        this.mainDispatch = dispatch
    }

    // Create a new document, or pass a new field to existing document, as defined in options ...
    async createRecord(options) {
        try {
            if (options.autoGenId) {
                const docRef = await addDoc(collection(this.db, options.basePath), options.data)
                console.log(`Document with options set with new data at ${options.basePath}/${docRef.id}`, options)
            } else {
                await setDoc(doc(this.db, options.basePath, options.pathExtension), options.data, { merge: options.merge }) // ATTN: Does this need to be included with an 'Update' function present??
                console.log(`Document with options set at ${options.basePath}/${options.pathExtension}`, options)
            }
        } catch (error) {
            console.error("Error adding document: ", error, options)
        }
    }
}

export default firebaseCreateService
