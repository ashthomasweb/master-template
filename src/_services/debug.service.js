class DebugService {
    constructor() {
        this.debug = false
        this.forceTrace = false
        this.t = this.t.bind(this)
        this.styles = [
            'color: green',
            'background: #111',
            'font-size: 14px',
            'border-top: 1px solid lightblue',
          ].join(';')
    }
    
    t(trace = true) {
        return this.forceTrace || trace
    }

    s() {
        return this.styles
    }

}

export default new DebugService()
