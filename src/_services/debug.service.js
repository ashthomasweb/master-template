import { initialMainState } from "../__context/MainContext"
import ContextValidator from "../__context/ContextValidator"

const trace = true
const file = '%cDebugService'

class DebugService {
    mainDispatch = null

    constructor() {
        this.debug = false
        this.forceTrace = false
        this.m = this.m.bind(this)
        this.styles = [
            'color: green',
            'background: #111',
            'font-size: 14px',
            'border-top: 1px solid lightblue',
        ].join(';')
        this.c = console.log
        this.d = console.dir
    }

    setLocalDispatch(dispatch) {
        this.mainDispatch = dispatch
    }

    t(trace = true) {
        return DebugService.forceTrace || trace
    }

    s() {
        return this.styles
    }

    m(message, file) {
        return [`%c${file} - ${message}`, this.s()]
    }

    validateInitialState() {
        this.t(trace) && console.log(`${file} - init validate`, this.s())
        return ContextValidator.validate(initialMainState, initialMainState, 'MainContext')
    }

    testValidator() {
        this.t(trace) && console.log(`${file} - testValidator`, this.s())

        const passUser = 'Test'
        const failUser = 12

        const failNewKey = 0

        const passTypeArray = [1, 2, 5, 6, new Set()]
        const failType = new Set([1, 2, 3])
        const testArray = [1, 2, 3, 4, [20, {key: '23'}]]
        const passTypeOL = { test: failType }

        const payload = {
            // userName: failUser
            // test: failNewKey
            testArray: testArray,
            // testObjectLit: passTypeOL
        }

        this.mainDispatch({ payload })
    }

    

}

export default new DebugService()