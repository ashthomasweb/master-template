import { useContext } from 'react'
import { MainContext } from '../context/MainContext'

export default function CardBack() {
    const {
        mainState: {
        },
        mainDispatch
    } = useContext(MainContext)

    return (
        <div className='card-back'>
            CardBack
        </div>
    )
}