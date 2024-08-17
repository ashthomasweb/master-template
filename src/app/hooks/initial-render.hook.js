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
    debug,
    logInit,
    trace,
    m
} from '../../app-index'

/* Trace vars */
const run = true
const file = 'useInitialRender'
const msg = (copy, fileName = file) => m(copy, fileName)
/* END Trace vars */

export function useInitialRender(componentName) {
    const isFirstRender = useRef(true)
    // console.log(componentName)
    if (isFirstRender.current) {
        if (DebugService.clearConsoleOnEvent) {
            setTimeout(() => {
                logInit && log(...msg('Init', componentName))
                isFirstRender.current = false
            }, 0)
        } else {
            logInit && log(...msg('Init', componentName))
                isFirstRender.current = false
        }
    } else {
        if (DebugService.clearConsoleOnEvent) {
            setTimeout(() => {
                DebugService.logRerenders && trace(run) && log(...msg('Re-render', componentName))
            }, 0)
        } else {
            DebugService.logRerenders && trace(run) && log(...msg('Re-render', componentName))
        }
    }
}
