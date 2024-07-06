import FirebaseInitialization from "./firebase-init.service"
import {
    getAuth,
    signOut,
    signInWithRedirect,
    GoogleAuthProvider,
    getRedirectResult, 
    setPersistence,
    onAuthStateChanged, 
    browserLocalPersistence,
    signInWithPopup
} from "firebase/auth"
import { User } from "../../config/data-types"
import { FirebaseCreateOptions } from "../../config/firebase-types"
import CRUDInterface from "../../interfaces/crud-interface"
import DataPaths from "../../config/data-paths"
import SetService from "../set.service"
import CategoryService from "../category.service"
import EntryService from "../entry.service"
import TagService from "../tag.service"

class FirebaseAuthService {
    mainDispatch = null
    auth = null
    app = FirebaseInitialization.app

    constructor() {
        this.auth = getAuth()
        setPersistence(this.auth, browserLocalPersistence).then(async () => {
            this.listenToAuthStateChanges()
        }).catch((error) => {
            console.error("Error setting persistence:", error)
        })
    }

    setLocalDispatch(dispatch) {
        this.mainDispatch = dispatch
    }

    async firebaseSignIn() {
        const provider = new GoogleAuthProvider()
        await signInWithPopup(this.auth, provider)
        // signInWithRedirect(this.auth, provider) // TODO: Implement on prod?
    }

    handleRedirectResult() {
        console.log(this.auth)
        getRedirectResult(this.auth)
            .then((result) => {
                console.log('TRACE: redirectThen', result)
                if (result) {
                    // This gives you a Google Access Token. You can use it to access the Google API
                    const credential = GoogleAuthProvider.credentialFromResult(result)
                    const token = credential.accessToken
                    // The signed-in user info
                    const userObj = result.user
                    // IdP data available using getAdditionalUserInfo(result)
                    // Set user info to Context
                    this.setUserObjToState(userObj)
                    this.setUserObjToServices(userObj)
                    this.setUserToFirestore(userObj) // TODO: Only needs to be set if record doesn't exist!
                }
            }).catch((error) => {
                // Handle Errors here
                const errorCode = error.code
                const errorMessage = error.message
                // The email of the user's account used
                const email = error.customData.email
                // The AuthCredential type that was used
                const credential = GoogleAuthProvider.credentialFromError(error)
                alert(errorMessage, errorCode)
            })
    }

    listenToAuthStateChanges() {
        onAuthStateChanged(this.auth, (userObj) => {
            if (userObj) {
                this.setUserObjToState(userObj)
                this.setUserObjToServices(userObj)
            } else {
                this.setNullUserToState()
            }
        })
    }

    firebaseSignOut() {
        if (this.auth === null) {
            alert('No user currently authorized')
            return
        }
        signOut(this.auth).then(() => {
            this.setNullUserToState()
        }).catch((error) => {
            console.error(error)
            alert(`An error occured during SignOut`)
        })
    }

    // Set user information to Firestore DB ...
    setUserToFirestore(user) {
        const basePath = DataPaths.base.users
        const pathExtension = user.uid
        const newUser = { ...new User(user.displayName, user.email) }
        const autoGenId = false
        const merge = true // TODO: verify if this needs to be a merge ...
        const options = new FirebaseCreateOptions(basePath, pathExtension, newUser, autoGenId, merge)
        CRUDInterface.createRecord(options)
    }

    // Set user object and name to state for further usage and display ...
    setUserObjToState(userObj) {
        const payload = {
            userObj,
            userName: userObj.displayName
        }
        this.mainDispatch({ payload })
    }

    setUserObjToServices(userObj) {
        SetService.setUserObj(userObj)
        CategoryService.setUserObj(userObj)
        EntryService.setUserObj(userObj)
        TagService.setUserObj(userObj)
    }

    // Reset user object and name fields in state to default conditions ...
    setNullUserToState() {
        const payload = {
            userObj: null,
            userName: 'User'
        }
        this.mainDispatch({ payload })
    }
}

export default new FirebaseAuthService()