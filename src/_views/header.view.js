import { Suspense, useContext, useState } from 'react'
import {
    /* Firebase */
    /* Context */
    MainContext,
    /* Components */
    SettingsMenu,
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
    trace,
    m
} from '../app-index'

/* Trace vars */
const run = false
const file = 'HeaderView'
const msg = (copy, fileName = file) => m(copy, fileName)
/* END Trace vars */

export default function HeaderView() {
    debug && logComponentInit(file)

    const {
        mainState: {
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
        trace(run) && c(...msg('togalModal'))

        const newHeaderDisplayConditions = { ...headerModalDisplay }
        const selectedMenu = target.dataset.menutype
        const currentMenuState = headerModalDisplay[selectedMenu]
        for (const key in headerModalDisplay) {
            newHeaderDisplayConditions[key] = false
        }
        newHeaderDisplayConditions[selectedMenu] = !currentMenuState
        setHeaderModalDisplay(newHeaderDisplayConditions)
    }

    const closeAll = () => {
        trace(run) && c(...msg('closeAll'))

        let newHeaderModalDisplay = {}
        for (const key in headerModalDisplay) {
            newHeaderModalDisplay[key] = false
        }
        setHeaderModalDisplay(newHeaderModalDisplay)
    }

    const testValidation = () => {
        trace(run) && c(...msg('testValidation'))

        DebugService.testValidator()
    }

    return (
        <div className='header-view' data-style='night'>
            <button type='button' data-menutype='settings' onClick={toggleModal}>Settings Menu</button>
            <button type='button' onClick={testValidation}>Test</button>
            {
                headerModalDisplay.settings
                    ?
                    <Suspense fallback={<div>Loading ...</div>}>
                        <SettingsMenu isOpen={headerModalDisplay.settings} />
                    </Suspense>
                    : null
            }
            Test
        </div>
    )
}