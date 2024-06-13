import { useContext } from 'react'
import { MainContext } from '../context/MainContext'
import Card from '../_components/card.component'
import Stats from '../_components/stats.component'

export default function ContentView() {
    const {
        mainState: {
        },
        mainDispatch
    } = useContext(MainContext)

    return (
        <div className='content-view'>
            <Card />
            <Stats />
        </div>
    )
}