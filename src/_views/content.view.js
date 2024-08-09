import { useContext } from 'react'
import { MainContext } from '../__context/MainContext'
import {
    /* Firebase */
    /* Components */
    /* Views */
           /* Custom Hooks */
           logComponentInit,
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
const file = 'ContentView'
const m = (copy, fileName = file) => msg(copy, fileName)
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