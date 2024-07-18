import { useContext } from 'react'
import { MainContext } from '../context/MainContext'

export default function Stats() {
    const {
        mainState: {
            statCount
        }
    } = useContext(MainContext)

    return (
        <div className='stats'>
            Stats:
            <hr />
            Success: {statCount.success}
            <br />
            Fail: {statCount.fail}
        </div>
    )
}