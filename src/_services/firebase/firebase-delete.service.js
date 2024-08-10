import {
    doc,
    updateDoc,
    deleteDoc,
    deleteField,
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
const file = 'FirebaseDeleteService'
const msg = (copy, fileName = file) => m(copy, fileName)
/* END Trace vars */

class FirebaseDeleteService {
    mainDispatch = null
    app = FirebaseInitialization.app
    db = FirebaseInitialization.db

    setLocalDispatch(dispatch) {
        this.mainDispatch = dispatch
    }

    // Handler for individual 'delete' option conditions ...
    async deleteRecord(options) {
        options.markForDelete && await this.markForDelete(options)
        options.documentDelete && await this.documentDelete(options)
        options.deleteField && await this.deleteRecordField(options)
    }

    // Assign a 'deletedAt' field to the record, to be handled upon retrieval ...
    async markForDelete(options) {
        const deleteTimestamp = { deletedAt: new Date() }
        const docRef = doc(this.db, options.basePath, options.pathExtension)
        try {
            await updateDoc(docRef, deleteTimestamp)
            console.log(`Document successfully marked as deleted with options: `, options)
        } catch (error) {
            console.log(`Failure updating document with 'deletedAt' timestamp with 'options': `, options)
            console.error(error)
        }
    }

    // Delete the document passed in the options base and extension paths ...
    async documentDelete(options) {
        try {
            await deleteDoc(doc(this.db, options.basePath, options.pathExtension))
            console.log(`Document successfully deleted with options: `, options)
        } catch (error) {
            console.log(`Deleting document failed with 'options': `, options)
            console.error(error)
        }
    }

    // Delete an individual field in a document ...
    // NOTE/ATTN/TODO: If the passed field is not present, custom handling is required to notify UI. No error will be produced from current implementation.
    async deleteRecordField(options) {
        const docRef = doc(this.db, options.basePath, options.pathExtension)
        const fieldObject = {}
        fieldObject[options.fieldToDelete] = deleteField()
        try {
            await updateDoc(docRef, { ...fieldObject })
            console.log(`Document field successfully deleted with options: `, options)
        } catch (error) {
            console.log(`Failed to delete field in record with 'options': `, options)
            console.error(error)
        }
    }
}

export default new FirebaseDeleteService()
