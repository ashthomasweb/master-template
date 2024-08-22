import { useContext, useRef, useState, useReducer, useEffect } from 'react'
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

    const pathRef = useRef(null)
    const [transform, setTransform] = useState('')

    useEffect(() => {
        if (pathRef.current) {

            const bbox = pathRef.current.getBBox()

            const svgWidth = 512
            const svgHeight = 512

            const xCenter = (svgWidth - bbox.width) / 2 - bbox.x
            const yCenter = (svgHeight - bbox.height) / 2 - bbox.y

            setTransform(`translate(${xCenter}, ${yCenter})`)
        }
    })

    return (
        <div className='svg-icon-container'>
            <svg className='standard-svg-icon' xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 512 512`} ><path transform={transform} ref={pathRef} fill={fill} d={src} /></svg>
        </div>
    )
}