import { useRef, useState, useEffect } from 'react'
import {
    /* Firebase */
    /* Components */
    /* Context */
    /* Views */
    /* Custom Hooks */
    /* Service Classes */
    /* Utility Functions */
    /* Assets */
    /* Icons */
    iconPaths,
    /* Configs */
    /* Types */
    /* Interfaces */
    /* DeveloperTools */
    debug,
    logInit,
    trace,
    m,
} from '../../app-index'

/* Trace vars */
const run = false
const file = 'NEW'
const msg = (copy, fileName = file) => m(copy, fileName)
/* END Trace vars */

export default function SVGIcon({ src, fill }) {
    const pathRef = useRef(null)
    const [transform, setTransform] = useState('')

    useEffect(() => {
        if (pathRef.current) {
            const boundingBox = pathRef.current.getBBox()
            const svgWidth = 512
            const svgHeight = 512
            const xCenter = (svgWidth - boundingBox.width) / 2 - boundingBox.x
            const yCenter = (svgHeight - boundingBox.height) / 2 - boundingBox.y
            setTransform(`translate(${xCenter}, ${yCenter})`)
        }
    })

    return (
        <div className='svg-icon-container'>
            <svg className='standard-svg-icon' xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 512 512`} ><path transform={transform} ref={pathRef} fill={fill} d={iconPaths[src]} /></svg>
        </div>
    )
}