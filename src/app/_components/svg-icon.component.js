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
} from '../../app-index'

/* Trace vars */
const run = false
const file = 'NEW'
const msg = (copy, fileName = file) => m(copy, fileName)
/* END Trace vars */

export default function SVGIcon({ src, fill }) {
    const {
        mainState: {
        }
    } = useContext(MainContext)


    return (
        <svg className='standard-svg-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" ><path fill={fill} d={ src } /></svg>
    )
}