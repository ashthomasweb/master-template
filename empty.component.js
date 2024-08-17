import { useContext } from 'react'
import {
    /* Firebase */
    /* Components */
    /* Context */
    MainContext,
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
    debug,
    logInit,
    trace,
    m
} from '../app-index'

/* Trace vars */
const run = false
const file = 'NEW'
const msg = (copy, fileName = file) => m(copy, fileName)
/* END Trace vars */

export default function NEW() {
    const {
        mainState: {
        }
    } = useContext(MainContext)

    return (
        <div>
        </div>
    )
}