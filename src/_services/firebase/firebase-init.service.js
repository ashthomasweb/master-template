
import dotenv from 'dotenv'
dotenv.config()
import {
    /* Firebase */
    initializeApp,
    getFirestore,
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
    DebugService,
    debug,
    trace,
    m
} from '../../app-index'

/* Trace vars */
const run = false
const file = 'FirebaseInitialization'
const msg = (copy, fileName = file) => m(copy, fileName) // Must use absolute method call due to order of imports to declarations at runtime ...
/* END Trace vars */

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
}

/* Template for .env 
REACT_APP_API_KEY=...
REACT_APP_AUTH_DOMAIN=...
REACT_APP_PROJECT_ID=...
REACT_APP_STORAGE_BUCKET=...
REACT_APP_MESSAGING_SENDER_ID=...
REACT_APP_APP_ID=...
** END Tempalte */

/* Boolean switch to turn ON or OFF Firebase services */
export const useFirebase = true

class FirebaseInitialization {
    constructor() {
        debug && trace(run) && log(...msg('Init')) // Must use absolute method call due to order of imports to declarations at runtime ...
        
        try {
            this.app = initializeApp(firebaseConfig)
            this.db = getFirestore(this.app)
        } catch (error) {
            console.error(error)
            console.log(`Error initializing Firebase app!`)
        }
    }
}

export default FirebaseInitialization
