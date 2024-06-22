import { useContext } from 'react'
import { MainContext } from '../context/MainContext'

export default function QuizMenu(props) {
    const {
        mainState: {
        },
        mainDispatch
    } = useContext(MainContext)

    return (
        <div className='modal-container'>
            <div className={`menu-modal quiz-manager ${props.isOpen ? 'isOpen' : ''}`}>
                <div className='modal-header'>
                    Quiz Menu
                </div>
            </div>
        </div>
    )
}