import { useContext } from 'react'
import { MainContext } from '../__context/MainContext'
import {
    /* Firebase */
    /* Components */
    UserAuth,
    /* Views */
    HeaderView,
    ContentView,
    /* Custom Hooks */
    logComponentInit,
    /* Service Classes */
    /* Utility Functions */
    /* Assets */
    /* Icons */
    /* Configs */
    /* DeveloperTools */
    DebugService, debug, trace, msg
} from '../app-index'
import useInitialRender from '../hooks/initial-render.hook'

/* Trace vars */
const t = false
const file = 'AppContainer'
const m = (copy, fileName = file) => msg(copy, fileName)
/* END Trace vars */

export default function AppContainer() {
    debug && logComponentInit(file)
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
                        <ContentView >
                            This is the primary pane!
                        </ContentView>
                    </>
                    : null
            }
        </div>
    )
}