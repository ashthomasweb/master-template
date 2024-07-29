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

/* Service Classes */

/* Initial Assets */

/* Config Assets */

/* Icons */

/* DeveloperTools */
import DebugService from "./_services/debug.service"
const t = DebugService.t
const s = DebugService.s()
const debug = DebugService.debug

/********************* EXPORTS *********************/

/* Firebase */

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

/* Service Classes */

/* Initial Assets */

/* Config Assets */

/* Icons */

/* DeveloperTools */
export {t, s, debug, DebugService}
















