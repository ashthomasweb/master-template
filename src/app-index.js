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

import React from "react"

/********************* IMPORTS *********************/

/* Firebase */
import {
    initializeFirebase
} from './_services/firebase/firebase-init.service'

/* Components */
import App from "./global/App"
import AppContainer from "./global/app-container"
import UserAuth from "./_components/user-auth.component"
const SettingsMenu = React.lazy(() => {
    // console.log('lazy!')    
    return import("./_components/settings-menu.component")
})

/* Views */
import HeaderView from "./_views/header.view"
import ContentView from "./_views/content.view"

/* Custom Hooks */
import {useInitialRender as logComponentInit} from "./hooks/initial-render.hook"

/* Service Classes */

/* Utility Functions */
import {
    getStrTag,
    isArray,
    isObjLit,
    getLength,
    checkLength,
    genNewId,
    genNewAlphaNumId
} from './_utilities/global.utilities'

/* Assets */

/* Icons */

/* Configs */

/* DeveloperTools */
import DebugService from "./_services/debug.service"
const trace = DebugService.trace
const msg = DebugService.msg
const debug = DebugService.debug

/********************* EXPORTS *********************/

/* Firebase */
export {
    initializeFirebase
}

/* Components */
export {
    App,
    AppContainer,
    UserAuth,
    SettingsMenu
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

/* Utility Functions */
export {
    getStrTag,
    isArray,
    isObjLit,
    getLength,
    checkLength,
    genNewId,
    genNewAlphaNumId
}

/* Assets */

/* Icons */

/* Configs */

/* DeveloperTools */
export {
    trace,
    msg,
    debug,
    DebugService
}