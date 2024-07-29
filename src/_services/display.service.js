import {
    /* Firebase */
    /* Components */
    SettingsMenu,
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
const file = '%cDisplayService' 

class DisplayService {
    mainDispatch = null

    setLocalDispatch(dispatch) {
        this.mainDispatch = dispatch
    }

    test() {
        t(trace) && console.log(`${file} - test`, s)
    }
}

export default new DisplayService()
