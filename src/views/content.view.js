import { useContext } from 'react'
import { MainContext } from '../context/MainContext'

export default function ContentView() {
    const {
        mainState: {
        },
        mainDispatch
    } = useContext(MainContext)

    return (
        <div className='content-view'>
            Content View
            
        </div>
    )
}