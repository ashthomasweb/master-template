import { useContext } from 'react'
import { MainContext } from '../context/MainContext'

export default function SettingsMenu(props) {
    const {
        mainState: {
        },
        mainDispatch
    } = useContext(MainContext)

    return (
        <div className='modal-container'>
            <div className={`menu-modal settings-menu ${props.isOpen ? 'isOpen' : ''}`}>
                <div className='modal-header'>
                    User Settings
                </div>
            </div>
        </div>
    )
}