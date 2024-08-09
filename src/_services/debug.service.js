import { initialMainState } from "../__context/MainContext"
import ContextValidator from "../__context/ContextValidator"

const trace = true
const file = '%cDebugService'

class DebugService {
    mainDispatch = null

    constructor() {
        this.debug = true
        this.logReRenders = false
        this.forceTrace = true
        this.msg = this.msg.bind(this)
        this.trace = this.trace.bind(this)
        this.styles = [
            'color: green',
            'background: #111',
            'font-size: 14px',
            'border-top: 1px solid cyan',
            'border-left: 1px solid cyan',
            'padding: 0 4px;',
            'font-weight: 900;',
        ].join(';')
        this.c = console.log
        this.d = console.dir
    }

    setLocalDispatch(dispatch) {
        this.mainDispatch = dispatch
    }

    trace(fileTrace = true) {
        return this.forceTrace || fileTrace
    }

    s() {
        return this.styles
    }

    msg(message, file) {
        return [`\n%c${file} - ${message}`, this.s()]
    }

    validateInitialState() {
        return ContextValidator.validate(initialMainState, initialMainState, 'MainContext')
    }

    testValidator() {

        const passUser = 'Test'
        const failUser = 12

        const failNewKey = 0

        const passTypeArray = [1, 2, 5, 6, new Set()]
        const failType = new Set([1, 2, 3])
        const testArray = [1, 2, 3, 4, [20, { key: '23' }]]
        const passTypeOL = { test: failType }

        const payload = {
            // userName: failUser
            // test: failNewKey
            testArray: testArray,
            // testObjectLit: passTypeOL
        }

        this.mainDispatch({ payload })
    }

    assignGlobals() {
        window.c = window.console.log
        window.dir = window.console.dir
    }



}

export default new DebugService()
