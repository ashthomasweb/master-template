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
const run = true
const file = 'App'
const msg = (copy, fileName = file) => m(copy, fileName)
/* END Trace vars */

export default function App() {
    debug && logComponentInit(file)
    debug && DebugService.validateInitialState('MainContext', initialMainState) && c('Initial State Validated')

    return (
        <MainProvider>
            <AppView />
        </MainProvider>
    )
}

