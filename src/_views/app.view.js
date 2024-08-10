import { useContext, useEffect, useRef } from 'react'
import {
    /* Firebase */
    /* Context */
    MainContext,
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
    /* Types */
    /* Interfaces */
    /* DeveloperTools */
    debug,
    trace,
    m
} from '../app-index'
import ThemeService from '../_services/theme.service'

/* Trace vars */
const run = false
const file = 'AppView'
const msg = (copy, fileName = file) => m(copy, fileName)
/* END Trace vars */

export default function AppView() {
    debug && logComponentInit(file)

    const {
        mainState: {
            userObj,
            theme
        }
    } = useContext(MainContext)

    const appViewRef = useRef(null)

    useEffect(() => {
        ThemeService.appViewRef = appViewRef
    })

    return (
        <div className='app-view-container' ref={appViewRef} data-style={theme}>
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