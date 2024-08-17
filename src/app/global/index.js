import { createRoot } from "react-dom/client"
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
    logInit,
    trace,
    m
} from '../../app-index'

/* Trace vars */
const run = false
const file = 'index.js'
const msg = (copy, fileName = file) => m(copy, fileName)
/* END Trace vars */

logInit && log(...msg('Init'))

const container = document.getElementById("app")
const root = createRoot(container)
root.render(<App />)