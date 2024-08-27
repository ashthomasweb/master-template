import {
    /* Firebase */
    /* Components */
    SVGIcon,
    /* Context */
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
} from '../../app-index'

/* Trace vars */
const run = false
const file = 'NEW'
const msg = (copy, fileName = file) => m(copy, fileName)
/* END Trace vars */

export default function LoadingSpinner() {
    return (
        <div className='standard-loading-spinner' >
            <SVGIcon src={'spinner'} />
            Loading ...
        </div>
    )
}