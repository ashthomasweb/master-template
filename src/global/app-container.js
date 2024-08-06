import { useContext } from 'react'
import { MainContext } from '../__context/MainContext'
import {
    /* Firebase */
    /* Components */
    UserAuth,
    /* Views */
    HeaderView,
    ContentView,
    /* Service Classes */
    /* Initial Assets */
    /* Config Assets */
    /* Icons */
    /* DeveloperTools */
    DebugService,
    debug, t, s
} from '../app-index'

export default function AppContainer() {
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