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
    logInit,
    trace,
    m
} from '../../app-index'
import ThemeService from '../_services/theme.service'

/* Trace vars */
const run = false
const file = 'AppView'
const msg = (copy, fileName = file) => m(copy, fileName)
/* END Trace vars */

export default function AppView() {
    logInit && logComponentInit(file)

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
                            <h1>HEADER TAG TESTING HERE</h1>
                            <h2>A more subtle subheader</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                                voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            <code>{`monospace.font.in.<code>.block`}</code>
                        </ContentView>
                    </>
                    : null
            }
        </div>
    )
}
