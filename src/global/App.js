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
    debug, t, s
} from '../app-index'

const trace = false
const file = '%cApp'

export default function App() {
    t(trace) && console.log(`${file} - Init`, s)

    return (
        <MainProvider>
            <AppContainer />
        </MainProvider>
    )
}
