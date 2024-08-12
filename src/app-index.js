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

import { lazy as lazyLoad } from "react"

/********************* INDEXED IMPORTS *********************/

/* Firebase */
import { initializeFirebase } from './_services/firebase/firebase-init.service'
import FirebaseInitialization from "./_services/firebase/firebase-init.service"
import FirebaseAuthService from "./_services/firebase/firebase-auth.service"
import FirebaseCreateService from "./_services/firebase/firebase-create.service"
import FirebaseReadService from "./_services/firebase/firebase-read.service"
import FirebaseUpdateService from "./_services/firebase/firebase-update.service"
import FirebaseDeleteService from "./_services/firebase/firebase-delete.service"
import { setDoc } from "firebase/firestore"

/* Context */
import ContextValidator from "./__context/ContextValidator"
import MainProvider from './__context/MainContext'
import {
    MainContext,
    initialMainState
} from "./__context/MainContext"

/* Components */
import App from "./global/App"
import AppView from "./_views/app.view"
import UserAuth from "./_components/user-auth.component"
const SettingsMenu = lazyLoad(() => {
    return Promise.all([
        import("./_components/settings-menu.component"),
        new Promise(resolve => setTimeout(resolve, 500))
    ]).then(([component]) => component)
}) // Example of lazyLoading a component with delay ...
import ThemeToggle from "./_components/theme-toggle.component"

/* Views */
import HeaderView from "./_views/header.view"
import ContentView from "./_views/content.view"

/* Custom Hooks */
import { useInitialRender as logComponentInit } from "./hooks/initial-render.hook"

/* Service Classes */
import DataService from "./_services/data.service"
import DisplayService from "./_services/display.service"
import DebugService from "./_services/debug.service"
import ThemeService from "./_services/theme.service"

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
import DataPaths from "./config/data-paths"


/* Types */
import {
    FirebaseCreateOptions,
    FirebaseReadOptions,
    FirebaseUpdateOptions,
    FirebaseDeleteOptions
} from "./types/firebase-types"
import { User } from "./types/data-types"

/* Interfaces */
import AuthInterface from "./interfaces/auth.interface"
import CRUDInterface from "./interfaces/crud-interface"

/* DeveloperTools */
const trace = DebugService.trace
const m = DebugService.m
const debug = DebugService.debug

/********************* EXPORTS *********************/

/* Firebase */
export {
    initializeFirebase,
    FirebaseInitialization,
    FirebaseAuthService,
    FirebaseCreateService,
    FirebaseReadService,
    FirebaseUpdateService,
    FirebaseDeleteService,
    setDoc
}

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
    DebugService,
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
    DataPaths
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

/* DeveloperTools */
export {
    trace,
    m,
    debug,
}