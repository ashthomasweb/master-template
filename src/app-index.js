/**
* FILENAME:
*   app-index.js
*
* DESCRIPTION:
*   Provides centralized location for all imports to route through.
*
* NOTES:
*   - React Context cannot be routed through this file.
*   - Assets included in static config objects / assets must be imported into the 
*     declaration file directly.
*
* (c) Copyright Ashley Thomas
* Usage Rights: Not for public use or redistribution.
*
*/
// debug && console.log('app-index Init')
console.log('%cTRACE: AppIndex Init', 'color: green; font-weight: 900')
import { lazy as lazyLoad } from 'react'


/* DeveloperTools */
import DebugService from './_services/debug.service'
const trace = DebugService.trace
const m = DebugService.m
const debug = DebugService.debug
DebugService.assignGlobals()

export {
    trace,
    m,
    debug,
    DebugService
}

/********************* INDEXED IMPORTS *********************/

import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'

/* Firebase */
import { setDoc } from 'firebase/firestore'
import {
    getAuth,
    signOut,
    // signInWithRedirect,
    GoogleAuthProvider,
    getRedirectResult,
    setPersistence,
    onAuthStateChanged,
    browserLocalPersistence,
    signInWithPopup,
} from 'firebase/auth'
import { useFirebase } from './_services/firebase/firebase-init.service'
import firebaseInitialization from './_services/firebase/firebase-init.service'
import firebaseAuthService from './_services/firebase/firebase-auth.service'
import firebaseCreateService from './_services/firebase/firebase-create.service'
import firebaseReadService from './_services/firebase/firebase-read.service'
import firebaseUpdateService from './_services/firebase/firebase-update.service'
import firebaseDeleteService from './_services/firebase/firebase-delete.service'
const FirebaseInitialization = new firebaseInitialization()
const FirebaseAuthService = new firebaseAuthService(useFirebase)
const FirebaseCreateService = new firebaseCreateService()
const FirebaseReadService = new firebaseReadService()
const FirebaseUpdateService = new firebaseUpdateService()
const FirebaseDeleteService = new firebaseDeleteService()





export {
    useFirebase,
    initializeApp,
    FirebaseInitialization,
    FirebaseAuthService,
    FirebaseCreateService,
    FirebaseReadService,
    FirebaseUpdateService,
    FirebaseDeleteService,
    getFirestore,
    setDoc,
    getAuth,
    signOut,
    // signInWithRedirect,
    GoogleAuthProvider,
    getRedirectResult,
    setPersistence,
    onAuthStateChanged,
    browserLocalPersistence,
    signInWithPopup,
}


/* Context */
import ContextValidator from './__context/ContextValidator'
import MainProvider from './__context/MainContext'
import {
    MainContext,
    initialMainState
} from './__context/MainContext'

/* Components */
import App from './global/App'
import AppView from './_views/app.view'
import UserAuth from './_components/user-auth.component'
import ThemeToggle from './_components/theme-toggle.component'

const SettingsMenu = lazyLoad(() => {
    return Promise.all([
        import('./_components/settings-menu.component'),
        new Promise(resolve => setTimeout(resolve, 500))
    ]).then(([component]) => component)
}) // Example of lazyLoading a component with delay ... TODO: Refactor?

/* Views */
import HeaderView from './_views/header.view'
import ContentView from './_views/content.view'

/* Custom Hooks */
import { useInitialRender as logComponentInit } from './hooks/initial-render.hook'

/* Service Classes */
import DataService from './_services/data.service'
import DisplayService from './_services/display.service'
import ThemeService from './_services/theme.service'

/* Utility Functions */
import {
    getStrTag,
    isTypeEquivalent,
    isArray,
    isObjLit,
    getLength,
    checkLength,
    lengthEquivalent,
    genNewId,
    genNewAlphaNumId
} from './_utilities/global.utilities'

/* Assets */

/* Icons */

/* Configs */
import DataPaths from './config/data-paths'
import { errorConfigs } from './config/error-configs'

/* Types */
import {
    FirebaseCreateOptions,
    FirebaseReadOptions,
    FirebaseUpdateOptions,
    FirebaseDeleteOptions
} from './types/firebase-types'
import { User } from './types/data-types'

/* Interfaces */
import AuthInterface from './interfaces/auth.interface'
import CRUDInterface from './interfaces/crud-interface'



/********************* EXPORTS *********************/


/* Context */
export {
    MainProvider,
    MainContext,
    initialMainState,
    ContextValidator
}

/* Components */
export {
    App,
    AppView,
    UserAuth,
    SettingsMenu,
    ThemeToggle
}

/* Views */
export {
    HeaderView,
    ContentView
}

/* Custom Hooks */
export {
    logComponentInit
}

/* Service Classes */
export {
    DataService,
    DisplayService,
    ThemeService
}

/* Utility Functions */
export {
    getStrTag,
    isTypeEquivalent,
    isArray,
    isObjLit,
    getLength,
    checkLength,
    lengthEquivalent,
    genNewId,
    genNewAlphaNumId
}

/* Assets */

/* Icons */

/* Configs */
export {
    DataPaths,
    errorConfigs
}

/* Types */
export {
    FirebaseCreateOptions,
    FirebaseReadOptions,
    FirebaseUpdateOptions,
    FirebaseDeleteOptions,
    User
}

/* Interfaces */
export {
    AuthInterface,
    CRUDInterface
}

