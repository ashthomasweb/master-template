import { useContext, useEffect } from 'react'
import {
    /* Firebase */
    FirebaseAuthService,
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
    logInit,
    trace,
    m
} from '../../app-index'

/* Trace vars */
const run = false
const file = 'SettingsMenu'
const msg = (copy, fileName = file) => m(copy, fileName)
/* END Trace vars */

export default function SettingsMenu(props) {
    logInit && logComponentInit(file)

    const {
        mainState: {
        }
    } = useContext(MainContext)

    const handleSignOut = () => {
        FirebaseAuthService.firebaseSignOut()
    }

    return (
        <div className='modal-container'>
            <div className={`menu-modal settings-menu ${props.isOpen ? 'isOpen' : ''}`}>
                <div className='modal-header'>
                    User Settings
                    <button type='button' onClick={handleSignOut}>Sign Out</button>
                </div>
            </div>
        </div>
    )
}