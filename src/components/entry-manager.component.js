import { useContext } from 'react'
import { MainContext } from '../context/MainContext'

export default function EntryManager() {
    const {
        mainState: {
        },
        mainDispatch
    } = useContext(MainContext)

    return (
        <div className='entry-manager'>
            Entry Manager
        </div>
    )
}