import { useContext } from 'react'
import { MainContext } from '../context/MainContext'

export default function CategoryManager(props) {
    const {
        mainState: {
        },
        mainDispatch
    } = useContext(MainContext)

    return (
        <div className='category-manager'>
              <div className={`menu-modal ${props.isOpen ? 'isOpen' : ''}`}>
                Category Manager
            </div>
        </div>
    )
}