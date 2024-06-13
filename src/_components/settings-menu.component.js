import { useContext } from 'react'
import { MainContext } from '../context/MainContext'

export default function SettingsMenu(props) {
    const {
        mainState: {
        },
        mainDispatch
    } = useContext(MainContext)

    return (
        <div className='settings-menu'>
            <div className={`menu-modal ${props.isOpen ? 'isOpen' : ''}`}>
                User Settings
            </div>
        </div>
    )
}