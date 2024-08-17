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
        this.logEvents = true
        this.logInit = true
        this.logRerenders = true
        this.forceTrace = false // Run all traces in all files ...
        this.clearConsoleOnEvent = true
        
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

        this.userEventStyles = [
            'color: black',
            'background: yellow',
            'font-size: 14px',
            'border-top: 1px solid black',
            'border-left: 1px solid black',
            'padding: 0 4px;',
            'font-weight: 900;',
            'margin-left: 20px;'
        ].join(';')

        this.indentStyle = [
            'margin-left: 20px;'
        ].join(';')

        this.initTrace()
    }
    
    setLocalDispatch(dispatch) {
        this.mainDispatch = dispatch
    }
    
    initTrace() {
        this.logInit && console.log(...this.m('Init', file)) // Must use direct methods as this service is the first to load in the app ...
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
    
    logUserEvents() {
        window.addEventListener('click', (e) => {
            this.clearConsoleOnEvent && console.clear()
            setTimeout(() => {
                log(`\n%cUser Click Event`, this.userEventStyles)
                log('%cTarget: ', this.indentStyle, e.target)
                if (e.target.value) {
                    log('%cValue: ', this.indentStyle, e.target.value)
                }
                if (Object.entries(e.target.dataset).length > 0) {
                    log(`%cDataset: `, this.indentStyle, e.target.dataset)
                }
            }, 0)
        })
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
