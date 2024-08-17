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
const file = 'ThemeService'
const msg = (copy, fileName = file) => m(copy, fileName)
/* END Trace vars */


class themeService {
    mainDispatch = null
    
    constructor() {
        logInit && log(...msg('Init'))
        
        this.appViewRef = null 
    }
    
    setLocalDispatch(dispatch) {
        this.mainDispatch = dispatch
    }

    switchTheme(input) {
        const payload = {
            theme: input === 'night' ? 'day' : 'night'
        }
        this.mainDispatch({ payload })
    }
}

export default themeService