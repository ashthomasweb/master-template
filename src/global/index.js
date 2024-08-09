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
    DebugService
} from '../app-index'

DebugService.assignGlobals()

const container = document.getElementById("app")
const root = createRoot(container)
root.render(<App />)