import { useContext } from 'react'
import { MainContext } from '../__context/MainContext'

export default function ContentView() {
    const {
        mainState: {
            userObj,
            userName
        }
    } = useContext(MainContext)

    return (
        <div className='content-view'>
            <div className='content-header'>
                {
                    userObj !== null
                        ? <div className='user-info'>
                            <h1>Welcome<br />{userName}!</h1>
                        </div>
                        : null
                }
            </div>
        </div>
    )
}