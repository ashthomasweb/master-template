import { createRoot } from "react-dom/client"

import {
    /* Firebase */
    /* Components */
    App,
    /* Views */
    /* Service Classes */
    /* Initial Assets */
    /* Config Assets */
    /* Icons */
} from '../app-index'

const container = document.getElementById("app")
const root = createRoot(container)
window.c = window.console.log
window.d = window.console.dir
root.render(<App />)