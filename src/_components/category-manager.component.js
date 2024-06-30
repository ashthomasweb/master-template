import { useContext, useState, useRef } from 'react'
import { MainContext } from '../context/MainContext'
import { Category } from '../config/data-types'
import CategoryService from '../services/category.service'
import DataService from '../services/data.service'
import SetService from '../services/set.service'

export default function CategoryManager(props) {
    const {
        mainState: {
            currentCategory,
            currentSet,
            userObj,
            setArray
        }
    } = useContext(MainContext)

    const [newCategoryInputDisplay, setNewCategoryInputDisplay] = useState(true)
    const categoryTitleRef = useRef(null)
    const categorySubtitleRef = useRef(null)

    const handleCategoryChange = ({ target }) => {
        target.value === 'Add New' ? setNewCategoryInputDisplay(true) : setNewCategoryInputDisplay(false)
        const category = currentSet.categories.filter(entry => entry.title === target.value)[0]
        CategoryService.setCurrentCategory(category)
    }

    const saveNewCategory = async () => {
        const title = categoryTitleRef.current.value
        const subtitle = categorySubtitleRef.current.value
        const forceString = true
        const id = DataService.generateNewId(15, forceString)
        const categoryEntries = []
        const newCategory = new Category(id, title, subtitle, categoryEntries)
        await CategoryService.saveNewCategory(newCategory, currentSet, userObj)
        SetService.retrieveOneSet(currentSet, setArray)
    }

    return (
        <div className='modal-container'>
            <div className={`menu-modal category-manager ${props.isOpen ? 'isOpen' : ''}`}>
                <div className='modal-header'><span>Category Manager</span><span>{currentSet ? currentSet.title : 'None Selected'}:{currentCategory.title ? currentCategory.title : 'None selected'}</span></div>
                <div className='content'>

                    <select onInput={handleCategoryChange}>
                        <option value='Add New'>Add New</option>
                        {currentSet?.categories?.map(entry => <option key={entry.title} value={entry.title}>{entry.title}</option>)}
                    </select>
                    {newCategoryInputDisplay
                        ?
                        <>
                            <input ref={categoryTitleRef} type='text' placeholder='Enter your new Category title' />
                            <input ref={categorySubtitleRef} type='text' placeholder='Enter your subtitle' />
                            <button type='button' onClick={saveNewCategory}>Save</button>
                        </>
                        : null}

                </div>
            </div>
        </div>
    )
}