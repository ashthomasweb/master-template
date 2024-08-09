import { useContext } from 'react'
import {
    /* Firebase */
    /* Context */
    MainContext,
    /* Components */
    /* Views */
    /* Custom Hooks */
    logComponentInit,
    /* Service Classes */
    /* Utility Functions */
    /* Assets */
    /* Icons */
    /* Configs */
    /* Types */
    /* Interfaces */
    /* DeveloperTools */
    debug,
    trace,
    m
} from '../app-index'

/* Trace vars */
const run = false
const file = 'ContentView'
const msg = (copy, fileName = file) => m(copy, fileName)
/* END Trace vars */

export default function ContentView(props) {
    debug && logComponentInit(file)

    const {
        mainState: {
            userObj,
            userName
        }
    } = useContext(MainContext)

    return (
        <div className='content-view'>
            <div className='content-header'>
                {
                    userObj !== null
                        ? <div className='user-info'>
                            <h1>Welcome {userName}!</h1>
                            {props.children}
                        </div>
                        : null
                }
            </div>
        </div>
    )
}