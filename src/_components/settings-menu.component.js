import { useContext } from 'react'
import { MainContext } from '../context/MainContext'
import FirebaseAuthService from '../services/firebase/firebase-auth.service'

export default function SettingsMenu(props) {
    const {
        mainState: {
        },
        mainDispatch
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