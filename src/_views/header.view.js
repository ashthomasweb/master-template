import { Suspense, useContext, useState } from 'react'
import { MainContext } from '../__context/MainContext'
import {
    /* Firebase */
    /* Components */
    SettingsMenu,
    /* Views */
       /* Custom Hooks */
       logComponentInit,
    /* Service Classes */
    /* Utility Functions */
    /* Assets */
    /* Icons */
    /* Configs */
    /* DeveloperTools */
    DebugService,
    debug,
    trace,
    msg
} from '../app-index'

/* Trace vars */
const t = false
const file = 'HeaderView'
const m = (copy, fileName = file) => msg(copy, fileName)
/* END Trace vars */

export default function HeaderView() {
    debug && logComponentInit(file)
    // trace(t) && c(...m('Render'))
    
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
        trace(t) && c(...m('togalModal'))
        
        const newHeaderDisplayConditions = { ...headerModalDisplay }
        const selectedMenu = target.dataset.menutype
        const currentMenuState = headerModalDisplay[selectedMenu]
        for (const key in headerModalDisplay) {
            newHeaderDisplayConditions[key] = false
        }
        newHeaderDisplayConditions[selectedMenu] = !currentMenuState
        c(newHeaderDisplayConditions)
        setHeaderModalDisplay(newHeaderDisplayConditions)
    }
    
    const closeAll = () => {
        trace(t) && c(...m('closeAll'))
        
        let newHeaderModalDisplay = {}
        for (const key in headerModalDisplay) {
            newHeaderModalDisplay[key] = false
        }
        setHeaderModalDisplay(newHeaderModalDisplay)
    }
    
    const testValidation = () => {    
        trace(t) && c(...m('testValidation'))
                
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