import { useContext } from 'react'
import { MainContext } from '../context/MainContext'

export default function QuizMenu(props) {
    const {
        mainState: {
        },
        mainDispatch
    } = useContext(MainContext)

    return (
        <div className='quiz-menu'>
              <div className={`menu-modal ${props.isOpen ? 'isOpen' : ''}`}>
                Quiz Menu
            </div>
        </div>
    )
}