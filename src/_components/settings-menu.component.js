import { useContext } from 'react'
import { MainContext } from '../__context/MainContext'
import FirebaseAuthService from '../_services/firebase/firebase-auth.service'
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
const file = 'SettingsMenu'
const m = (copy, fileName = file) => msg(copy, fileName)
/* END Trace vars */

export default function SettingsMenu(props) {
    debug && logComponentInit(file)

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