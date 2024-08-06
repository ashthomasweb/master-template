import MainProvider from "../__context/MainContext"
import {
    /* Firebase */
    /* Components */
    AppContainer,
    /* Views */
    /* Service Classes */
    /* Initial Assets */
    /* Config Assets */
    /* Icons */
    /* DeveloperTools */
    DebugService,
    debug, t as trace, m as msg
} from '../app-index'

/* Trace vars */
const t = true
const m = (copy) => msg(copy, 'App')

export default function App() {
    trace(t) && c(...m('Init'))
    debug && DebugService.validateInitialState() && console.log('Initial State Validated')
    
    d(DebugService)

    return (
        <MainProvider>
            <AppContainer />
        </MainProvider>
    )
}
