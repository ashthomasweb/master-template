import { Suspense, useContext, useState } from 'react'
import { MainContext } from '../__context/MainContext'
import {
    /* Firebase */
    /* Components */
    SettingsMenu,
    /* Views */
    /* Service Classes */
    /* Initial Assets */
    /* Config Assets */
    /* Icons */
    /* DeveloperTools */
    DebugService,
    debug, t, s
} from '../app-index'
import displayService from '../_services/display.service'

const trace = false
const file = '%cHeaderView' 

export default function HeaderView() {
    t(trace) && console.log(`${file} - Init`, s)

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
        t(trace) && console.log(`${file} - toggleModal`, s)
        
        const newHeaderDisplayConditions = { ...headerModalDisplay }
        const selectedMenu = target.dataset.menutype
        const currentMenuState = headerModalDisplay[selectedMenu]
        for (const key in headerModalDisplay) {
            newHeaderDisplayConditions[key] = false
        }
        newHeaderDisplayConditions[selectedMenu] = !currentMenuState
        setHeaderModalDisplay(newHeaderDisplayConditions)
        displayService.test()
    }

    const closeAll = () => {
        t(trace) && console.log(`${file} - closeAll`, s)
        
        let newHeaderModalDisplay = {}
        for (const key in headerModalDisplay) {
            newHeaderModalDisplay[key] = false
        }
        setHeaderModalDisplay(newHeaderModalDisplay)
    }

    return (
        <div className='header-view'>
            <button type='button' data-menutype='settings' onClick={toggleModal}>Settings Menu</button>
            {
                headerModalDisplay.settings
                    ?
                    <Suspense fallback={<div>Loading ...</div>}>
                        <SettingsMenu isOpen={headerModalDisplay.settings} />
                    </Suspense>
                    : null
            }
        </div>
    )
}