import { useContext } from 'react'
import { MainContext } from '../context/MainContext'
import HeaderView from '../_views/header.view'
import ContentView from '../_views/content.view'
import UserAuth from './user-auth.component'

export default function Main() {
    const {
        mainState: {
            userObj
        }
    } = useContext(MainContext)

    return (
        <div className='app-container'>
            {
                userObj === null
                    ? <UserAuth />
                    : null
            }
            {
                userObj !== null
                    ? <>
                        <HeaderView />
                        <ContentView />
                    </>
                    : null
            }
        </div>
    )
}