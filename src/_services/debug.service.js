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
    debug,
    trace,
    m
} from '../app-index'

/* Trace vars */
const run = false
const file = 'DebugService'
const msg = (copy, fileName = file) => m(copy, fileName)
/* END Trace vars */

class DebugService {
    mainDispatch = null

    constructor() {
        /* Boolean switches controlling trace and debug behavior */
        this.debug = false // Turn on Init/Rerenders, initial state validation, and custom defined functions ...
        this.logRerenders = false
        this.forceTrace = false // Run all traces in all files ...

        /* Binding for trace functions */
        this.m = this.m.bind(this)
        this.trace = this.trace.bind(this)

        /* Console function re-assignments */
        this.c = console.log
        this.d = console.dir

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
    }

    setLocalDispatch(dispatch) {
        this.mainDispatch = dispatch
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

    testValidator() {
        const testArray = [1, 2, 3, 4, [20, { key: '23' }]]
        const payload = {
            testArray: testArray,
        }
        this.mainDispatch({ payload })
    }

    assignGlobals() {
        window.log = window.console.log
        window.dir = window.console.dir
    }
}

export default new DebugService()
