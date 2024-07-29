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
root.render(<App />)