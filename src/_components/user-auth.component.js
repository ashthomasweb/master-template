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
    AuthInterface,
    /* DeveloperTools */
    debug,
    logInit,
    trace,
    m
} from '../app-index'

/* Trace vars */
const run = false
const file = 'UserAuth'
const msg = (copy, fileName = file) => m(copy, fileName)
/* END Trace vars */

export default function UserAuth() {
    logInit && logComponentInit(file)

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