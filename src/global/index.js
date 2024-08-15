import { createRoot } from "react-dom/client"
// import App from '../global/App'
import {
    /* Firebase */
    /* Context */
    /* Components */
    App,
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
    DebugService,
    debug,
    trace,
    m
} from '../app-index'

/* Trace vars */
const run = false
const file = 'index.js'
const msg = (copy, fileName = file) => m(copy, fileName)
/* END Trace vars */

debug && trace(run) && log(...msg('Init'))


const container = document.getElementById("app")
const root = createRoot(container)
root.render(<App />)