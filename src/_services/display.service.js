import {
    /* Firebase */
    /* Components */
    /* Context */
    /* Views */
    /* Custom Hooks */
    /* Service Classes */
    /* Utility Functions */
    /* Assets */
    /* Icons */
    /* Configs */
    /* Types */
    /* Interfaces */
    /* DeveloperTools */
    debug,
    trace,
    m
} from '../app-index'

/* Trace vars */
const run = false
const file = 'DisplayService'
const msg = (copy, fileName = file) => m(copy, fileName)
/* END Trace vars */

class DisplayService {
    mainDispatch = null

    constructor() {
        console.log('%cTRACE: DisplayService Init', 'color: green; font-weight: 900')
    }

    setLocalDispatch(dispatch) {
        this.mainDispatch = dispatch
    }

}

export default new DisplayService()
