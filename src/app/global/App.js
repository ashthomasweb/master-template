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
    logInit,
    m
} from '../../app-index'

/* Trace vars */
const run = false
const file = 'App'
const msg = (copy, fileName = file) => m(copy, fileName)
/* END Trace vars */

export default function App() {
    logInit && logComponentInit(file)
    debug && DebugService.validateInitialState('MainContext', initialMainState) && log('Initial State Validated')

    return (
        <MainProvider>
            <AppView />
        </MainProvider>
    )
}

