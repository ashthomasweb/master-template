import AuthInterface from '../interfaces/auth.interface'
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
const file = 'UserAuth'
const m = (copy, fileName = file) => msg(copy, fileName)
/* END Trace vars */

export default function UserAuth() {
    debug && logComponentInit(file)

    
    const {
        mainState: {
            userObj
        }
    } = useContext(MainContext)

    const userLogin = () => {
        AuthInterface.userLogin()
    }

    const userLogout = () => {
        AuthInterface.userLogout()
    }

    return (
        <div className="entry-auth-modal" >
            <h2>User Authentication</h2>
            <button type='button' onClick={userLogin}>Login</button>
            {
                userObj !== null
                    ? <>
                        <hr />
                        <button type='button' onClick={userLogout}>Logout</button>
                    </>
                    : null
            }
        </div>
    )
}