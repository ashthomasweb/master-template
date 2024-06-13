import { useContext } from 'react'
import { MainContext } from '../context/MainContext'

export default function CardFront() {
    const {
        mainState: {
        },
        mainDispatch
    } = useContext(MainContext)

    return (
        <div className='card-front'>
            CardFront
        </div>
    )
}