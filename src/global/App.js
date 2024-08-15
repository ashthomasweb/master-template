import {
    /* Firebase */
    /* Context */
    MainProvider,
    initialMainState,
    /* Components */
    AppView,
    /* Views */
    /* Custom Hooks */
    logComponentInit,
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
    m
} from '../app-index'

/* Trace vars */
const run = false
const file = 'App'
const msg = (copy, fileName = file) => m(copy, fileName)
/* END Trace vars */

export default function App() {
    debug && logComponentInit(file)

    return (
        <MainProvider>
            <AppView />
        </MainProvider>
    )
}

