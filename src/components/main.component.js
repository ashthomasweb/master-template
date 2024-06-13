import { useContext } from 'react'
import { MainContext } from '../context/MainContext'
import HeaderView from '../views/header.view'
import ContentView from '../views/content.view'

export default function Main() {
    const {
        mainState: {
        }
    } = useContext(MainContext)

    return (
        <div className='app-container'>
            <HeaderView />
            <ContentView />
        </div>
    )
}