import { useContext } from 'react'
import { MainContext } from '../context/MainContext'

export default function TagManager() {
    const {
        mainState: {
        },
        mainDispatch
    } = useContext(MainContext)

    return (
        <div className='tag-manager'>
            TagManager
        </div>
    )
}