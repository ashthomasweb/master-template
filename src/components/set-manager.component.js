import { useContext } from 'react'
import { MainContext } from '../context/MainContext'

export default function SetManager(props) {
    const {
        mainState: {
        },
        mainDispatch
    } = useContext(MainContext)

    return (
        <div className={`set-manager `}>
            <div className={`menu-modal ${props.isOpen ? 'isOpen' : ''}`}>
                Set Manager
            </div>
        </div>
    )
}