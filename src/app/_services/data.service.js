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
    logInit,
    trace,
    m
} from '../../app-index'

/* Trace vars */
const run = false
const file = 'DataService'
const msg = (copy, fileName = file) => m(copy, fileName)
/* END Trace vars */

class dataService {
    mainDispatch = null

    constructor() {
        /* Log class initialization */
        logInit && log(...msg('Init'))
    }

    setLocalDispatch(dispatch) {
        this.mainDispatch = dispatch
    }
}

export default dataService