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

/* Trace vars */
const run = false
const file = 'app-index'
DebugService.debug && DebugService.trace(run) && console.log(...DebugService.m('Init', file))
/* END Trace vars */

/* DeveloperTools */
import { lazy as lazyLoad } from 'react'
import DebugService from './_services/debug.service'
const trace = DebugService.trace
const m = DebugService.m
const debug = DebugService.debug
const logInit = DebugService.logInit
DebugService.assignGlobals()
DebugService.logEvents && DebugService.logUserEvents()

export {
    trace,
    m,
    debug,
    logInit,
    DebugService
}


/* Firebase */
import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'
import { 
    setDoc,
    doc,
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    deleteField,
    getDocs,
    getDoc,
} from 'firebase/firestore'
import {
    getAuth,
    signOut,
    GoogleAuthProvider,
    getRedirectResult,
    setPersistence,
    onAuthStateChanged,
    browserLocalPersistence,
    signInWithPopup,
} from 'firebase/auth'
import { useFirebase } from './_services/firebase/firebase-init.service'
import firebaseInitialization from './_services/firebase/firebase-init.service'
const FirebaseInitialization = new firebaseInitialization()
import firebaseAuthService from './_services/firebase/firebase-auth.service'
const FirebaseAuthService = new firebaseAuthService(useFirebase)
import firebaseCreateService from './_services/firebase/firebase-create.service'
const FirebaseCreateService = new firebaseCreateService()
import firebaseReadService from './_services/firebase/firebase-read.service'
const FirebaseReadService = new firebaseReadService()
import firebaseUpdateService from './_services/firebase/firebase-update.service'
const FirebaseUpdateService = new firebaseUpdateService()
import firebaseDeleteService from './_services/firebase/firebase-delete.service'
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
    GoogleAuthProvider,
    getRedirectResult,
    setPersistence,
    onAuthStateChanged,
    browserLocalPersistence,
    signInWithPopup,
    doc,
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    deleteField,
    getDocs,
    getDoc
}


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

export {
    App,
    AppView,
    UserAuth,
    SettingsMenu,
    ThemeToggle
}


/* Views */
import HeaderView from './_views/header.view'
import ContentView from './_views/content.view'

export {
    HeaderView,
    ContentView
}


/* Custom Hooks */
import { useInitialRender as logComponentInit } from './hooks/initial-render.hook'

export {
    logComponentInit
}


/* Service Classes */
import dataService from './_services/data.service'
import displayService from './_services/display.service'
import themeService from './_services/theme.service'
const ThemeService = new themeService()
const DataService = new dataService()
const DisplayService = new displayService()

export {
    DataService,
    DisplayService,
    ThemeService
}


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
import DataPaths from './config/data-paths'
import { errorConfigs } from './config/error-configs'

export {
    DataPaths,
    errorConfigs
}


/* Types */
import {
    FirebaseCreateOptions,
    FirebaseReadOptions,
    FirebaseUpdateOptions,
    FirebaseDeleteOptions
} from './types/firebase-types'
import { User } from './types/data-types'

export {
    FirebaseCreateOptions,
    FirebaseReadOptions,
    FirebaseUpdateOptions,
    FirebaseDeleteOptions,
    User
}


/* Interfaces */
import AuthInterface from './interfaces/auth.interface'
import CRUDInterface from './interfaces/crud-interface'

export {
    AuthInterface,
    CRUDInterface
}


/* Context */
import ContextValidator from './__context/ContextValidator'
import MainProvider from './__context/MainContext'
import {
    MainContext,
    initialMainState
} from './__context/MainContext'

export {
    MainProvider,
    MainContext,
    initialMainState,
    ContextValidator
}
