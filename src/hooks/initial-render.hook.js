import { useRef, useEffect } from 'react'
import {
    /* Firebase */
    /* Components */
    /* Views */
    /* Service Classes */
    /* Utility Functions */
    /* Assets */
    /* Icons */
    /* Configs */
    /* DeveloperTools */
    DebugService,
    debug,
    trace,
    msg
} from '../app-index'

/* Trace vars */
const t = false
const file = ''
const m = (copy, fileName = file) => msg(copy, fileName)
/* END Trace vars */

export function useInitialRender(componentName) {
    const isFirstRender = useRef(true)



    if (isFirstRender.current) {
        trace(t) && c(...m('Init', componentName))
        isFirstRender.current = false
    } else {
        DebugService.logReRenders && trace(t) && c(...m('Re-render', componentName))
    }
}
