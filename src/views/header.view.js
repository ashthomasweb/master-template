import { useContext, useState } from 'react'
import { MainContext } from '../context/MainContext'
import SettingsMenu from '../components/settings-menu.component'
import SetManager from '../components/set-manager.component'
import CategoryMenu from '../components/category-manager.component'
import QuizMenu from '../components/quiz-menu.component'

export default function HeaderView() {
    const {
        mainState: {
        },
        mainDispatch
    } = useContext(MainContext)

    const [headerModalDisplay, setHeaderModalDisplay] = useState({
        set: false,
        category: false,
        quiz: false,
        settings: false
    })

    const toggleModal = ({target}) => {
        const newHeaderDisplayConditions = {...headerModalDisplay}
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
            <button type='button' data-menutype='set' onClick={toggleModal}>Set Manager</button>
            <button type='button' data-menutype='category' onClick={toggleModal}>Category Menu</button>
            <button type='button' data-menutype='quiz' onClick={toggleModal}>Quiz Menu</button>
            <button type='button' data-menutype='settings' onClick={toggleModal}>Settings Menu</button>
            <SetManager isOpen={headerModalDisplay.set} />
            <CategoryMenu isOpen={headerModalDisplay.category} />
            <QuizMenu isOpen={headerModalDisplay.quiz} />
            <SettingsMenu isOpen={headerModalDisplay.settings} />
        </div>
    )
}