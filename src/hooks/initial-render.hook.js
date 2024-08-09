import { useRef } from 'react'
import {
    /* Firebase */
    /* Context */
    /* Components */
    /* Views */
    /* Service Classes */
    /* Utility Functions */
    /* Assets */
    /* Icons */
    /* Configs */
    /* Types */
    /* Interfaces */
    /* DeveloperTools */
    DebugService,
    trace,
    m
} from '../app-index'

/* Trace vars */
const run = false
const file = ''
const msg = (copy, fileName = file) => m(copy, fileName)
/* END Trace vars */

export function useInitialRender(componentName) {
    const isFirstRender = useRef(true)

    if (isFirstRender.current) {
        trace(run) && c(...msg('Init', componentName))
        isFirstRender.current = false
    } else {
        DebugService.logRerenders && trace(run) && c(...msg('Re-render', componentName))
    }
}
