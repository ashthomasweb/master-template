import { useContext } from 'react'
import { MainContext } from '../context/MainContext'

export default function Stats() {
    const {
        mainState: {
        },
        mainDispatch
    } = useContext(MainContext)

    return (
        <div className='stats'>
            Stats
        </div>
    )
}