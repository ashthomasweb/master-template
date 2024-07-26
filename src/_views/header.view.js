import { useContext, useState } from 'react'
import { MainContext } from '../context/MainContext'
import SettingsMenu from '../_components/settings-menu.component'
import dataService from '../services/data.service'

export default function HeaderView() {
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
        let newHeaderModalDisplay = {}
        for (const key in headerModalDisplay) {
            newHeaderModalDisplay[key] = false
        }
        setHeaderModalDisplay(newHeaderModalDisplay)
    }

    return (
        <div className='header-view'>
            <button type='button' data-menutype='settings' onClick={toggleModal}>Settings Menu</button>
            <SettingsMenu isOpen={headerModalDisplay.settings} />
        </div>
    )
}