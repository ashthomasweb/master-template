import MainProvider from "../__context/MainContext"

import {
    /* Firebase */
    /* Components */
    AppContainer,
    /* Views */
    /* Custom Hooks */
    logComponentInit,
    /* Service Classes */
    /* Utility Functions */
    /* Assets */
    /* Icons */
    /* Configs */
    /* DeveloperTools */
    DebugService, debug, trace, msg
} from '../app-index'

/* Trace vars */
const t = true
const file = 'App'
const m = (copy, fileName = file) => msg(copy, fileName)
/* END Trace vars */

export default function App() {
    debug && logComponentInit(file)
    debug && DebugService.validateInitialState() && console.log('Initial State Validated')
    
    return (
        <MainProvider>
            <AppContainer />
        </MainProvider>
    )
}

