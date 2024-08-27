import { Suspense, useContext, useState } from 'react'
import {
    /* Firebase */
    /* Context */
    MainContext,
    /* Components */
    SettingsMenu,
    LoadingSpinner,
    /* Context */
    MainContext,
    /* Views */
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
    DebugService,
    debug,
    logInit,
    trace,
    m,
    ThemeToggle,
    // moonIcon,
    SVGIcon,
    // settingsIcon,
} from '../../app-index'

/* Trace vars */
const run = false
const file = 'HeaderView'
const msg = (copy, fileName = file) => m(copy, fileName)
/* END Trace vars */

export default function HeaderView() {
    logInit && logComponentInit(file)

    const {
        mainState: {
            theme
        }
    } = useContext(MainContext)

    const [headerModalDisplay, setHeaderModalDisplay] = useState({
        set: false,
        category: false,
        entry: false,
        quiz: false,
        settings: false,
        tag: false
    })

    const toggleModal = ({ target }) => {
        trace(run) && log(...msg('toggleModal'))

        const newHeaderDisplayConditions = { ...headerModalDisplay }
        const selectedMenu = target.dataset.menutype
        const currentMenuState = headerModalDisplay[selectedMenu]
        for (const key in headerModalDisplay) {
            newHeaderDisplayConditions[key] = false
        }
        newHeaderDisplayConditions[selectedMenu] = !currentMenuState
        setHeaderModalDisplay(newHeaderDisplayConditions)
    }

    return (
        <div className='header-view'>
            <button type='button' data-menutype='settings' onClick={toggleModal}>
                <span>Settings</span>
                <span>
                    <SVGIcon src={'settings'} />
                </span>
            </button>
            <ThemeToggle />

            {
                headerModalDisplay.settings
                    ?
                    <Suspense fallback={<LoadingSpinner />} >
                        <SettingsMenu isOpen={headerModalDisplay.settings} />
                    </Suspense>
                    : null
            }
        </div>
    )
}