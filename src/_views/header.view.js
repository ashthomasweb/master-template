import { useContext, useState } from 'react'
import { MainContext } from '../context/MainContext'
import SettingsMenu from '../_components/settings-menu.component'
import SetManager from '../_components/set-manager.component'
import CategoryMenu from '../_components/category-manager.component'
import QuizMenu from '../_components/quiz-menu.component'
import EntryMenu from '../_components/entry-manager.component'
import TagManager from '../_components/tag-manager.component'

export default function HeaderView() {
    const {
        mainState: {
            userName,
            userObj
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

    const close = () => {
        let newHeaderModalDisplay = {}
        for (const key in headerModalDisplay) {
            newHeaderModalDisplay[key] = false
        }
        setHeaderModalDisplay(newHeaderModalDisplay)
    }

    return (
        <div className='header-view'>
            <button type='button' data-menutype='set' onClick={toggleModal}>Set Menu</button>
            <button type='button' data-menutype='category' onClick={toggleModal}>Category Menu</button>
            <button type='button' data-menutype='entry' onClick={toggleModal}>Entry Manager</button>
            <button type='button' data-menutype='quiz' onClick={toggleModal}>Quiz Menu</button>
            <button type='button' data-menutype='settings' onClick={toggleModal}>Settings Menu</button>
            <button type='button' data-menutype='tag' onClick={toggleModal}>Tag Manager</button>
            <SetManager isOpen={headerModalDisplay.set} />
            <CategoryMenu isOpen={headerModalDisplay.category} />
            <EntryMenu isOpen={headerModalDisplay.entry} />
            <QuizMenu isOpen={headerModalDisplay.quiz} close={close} />
            <TagManager isOpen={headerModalDisplay.tag} />
            <SettingsMenu isOpen={headerModalDisplay.settings} />
        </div>
    )
}