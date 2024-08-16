import {
    /* Firebase */
    /* Context */
    /* Components */
    /* Context */
    ContextValidator,
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
} from '../app-index'

/* Trace vars */
const run = false
const file = 'DebugService'
/* END Trace vars */

class DebugService {
    mainDispatch = null

    constructor() {
        /* Boolean switches controlling trace and debug behavior */
        this.debug = true // Turn on Init/Rerenders, initial state validation, and custom defined functions ...
        this.logRerenders = false
        this.forceTrace = false // Run all traces in all files ...
        
        /* Binding for trace functions */
        this.m = this.m.bind(this)
        this.trace = this.trace.bind(this)
        
        /* Trace styles */
        this.styles = [
            'color: green',
            'background: #111',
            'font-size: 14px',
            'border-top: 1px solid cyan',
            'border-left: 1px solid cyan',
            'padding: 0 4px;',
            'font-weight: 900;'
        ].join(';')

        this.initTrace()
    }
    
    setLocalDispatch(dispatch) {
        this.mainDispatch = dispatch
    }
    
    initTrace() {
        this.debug && this.trace(run) && console.log(...this.m('Init', file)) // Must use direct methods as this service is the first to load in the app ...
    }

    trace(fileTrace = true) {
        return this.forceTrace || fileTrace
    }

    m(message, file) {
        return [`\n%c${file} - ${message}`, this.styles]
    }

    validateInitialState(contextName, initialState) {
        return ContextValidator.validate(initialState, initialState, contextName)
    }
    
    assignGlobals() {
        window.log = window.console.log
        window.dir = window.console.dir
    }

    testValidator() {
        const passingTestArray = [1, 2, 3, 4, [20, { key: '23' }]]
        const failTestArray = ['1', 2, new Set(), 4, [20, { key: '23' }], 'test']
        const payload = {
            testArray: passingTestArray,
        }
        this.mainDispatch({ payload })
    }
}

export default new DebugService()
