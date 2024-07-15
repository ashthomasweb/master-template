import { useContext } from 'react'
import { MainContext } from '../context/MainContext'
import SetService from '../services/set.service'
import CategoryService from '../services/category.service'
import QuizService from '../services/quiz.service'

export default function QuizMenu(props) {
    const {
        mainState: {
            currentSet,
            currentCategory,
            setArray
        }
    } = useContext(MainContext)

    const handleSetMenuChange = ({ target }) => {
        const selectedSet = setArray.filter(entry => entry.title === target.value)[0]
        SetService.setActiveSet(selectedSet)
    }

    const handleCategoryMenuChange = ({ target }) => {
        const selectedCategory = currentSet.categories.filter(entry => entry.title === target.value)[0]
        CategoryService.setCurrentCategory(selectedCategory)
    }

    const gatherForQuiz = async () => {
        await QuizService.getQuizzableEntries(currentSet, currentCategory)
        props.close()
    }

    return (
        <div className='modal-container'>
            <div className={`menu-modal quiz-manager ${props.isOpen ? 'isOpen' : ''}`}>
                <div className='modal-header'>
                    Quiz Menu
                    <span>{currentSet !== 'Select A Set' ? currentSet.title : 'None Selected'} : {currentCategory !== 'Select A Category' ? currentCategory?.title : 'None selected'}</span>
                </div>
                <div className='content'>
                    <select onInput={handleSetMenuChange}>
                        <option data-id='0' value='Select Set'>Select Set</option>
                        {setArray.map(entry => <option key={entry.id} data-id={entry.id} value={entry.title}>{entry.title}</option>)}
                    </select>
                    <select onInput={handleCategoryMenuChange}>
                        <option data-id='0' value='Add New'>Optional: Select Category</option>
                        {currentSet?.categories?.filter(entry => entry.deletedAt === undefined).map(entry => <option key={entry.id} value={entry.title}>{entry.title}</option>)}
                    </select>
                    <button type='button' onClick={gatherForQuiz}>Gather For Quiz</button>
                </div>
            </div>
        </div>
    )
}