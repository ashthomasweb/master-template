import { createRoot } from "react-dom/client"

import {
    /* Firebase */
    /* Components */
    App,
    /* Views */
    /* Service Classes */
    /* Utility Functions */
    /* Assets */
    /* Icons */
    /* Configs */
    /* DeveloperTools */
    DebugService
} from '../app-index'

DebugService.assignGlobals()

const container = document.getElementById("app")
const root = createRoot(container)
root.render(<App />)