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
            setArray
        }
    } = useContext(MainContext)

    const [newCategoryInputDisplay, setNewCategoryInputDisplay] = useState(true)
    const [updatedOptionId, setUpdatedOptionId] = useState('0')
    const [updateModeActive, setUpdateModeActive] = useState(false)

    const selectMenuRef = useRef(null)

    const categoryTitleRef = useRef(null)
    const categorySubtitleRef = useRef(null)
    const [title, setTitle] = useState('')
    const [subtitle, setSubtitle] = useState('')


    const setTitleAndSubtitle = (title, subtitle) => {
        setTitle(title)
        setSubtitle(subtitle)
    }

    const clearInputForNewEntry = () => {
        setNewCategoryInputDisplay(true)
        setTitleAndSubtitle('', '')
    }

    const enableUpdateMode = () => {
        setUpdateModeActive(true)
        setUpdatedOptionId(Array.from(selectMenuRef.current.options)[selectMenuRef.current.selectedIndex].dataset.id)
    }

    const cancelUpdateMode = () => {
        setUpdateModeActive(false)
        setUpdatedOptionId('0')
    }

    const handleControlledInputs = () => {
        setTitleAndSubtitle(categoryTitleRef.current.value, categorySubtitleRef.current.value)
    }

    const handleSelectMenuChange = ({ target }) => {
        cancelUpdateMode()
        if (target.value === 'Add New') {
            clearInputForNewEntry()
        } else {
            setNewCategoryInputDisplay(false)
            const selectedCategory = currentSet.categories.filter(entry => entry.title === target.value)[0]
            CategoryService.setCurrentCategory(selectedCategory)
            setTitleAndSubtitle(selectedCategory.title, selectedCategory.subtitle)
        }
    }

    const saveNewCategory = async () => {
        setUpdatedOptionId('0')
        const forceIdAsString = true
        const id = DataService.generateNewId(15, forceIdAsString)
        const categoryEntries = []
        const newCategory = new Category(id, categoryTitleRef.current.value, categorySubtitleRef.current.value, categoryEntries)
        await CategoryService.saveNewCategory(newCategory, currentSet)
        clearInputForNewEntry()
    }
    
    const updateCategoryFields = async () => {
        cancelUpdateMode()
        await CategoryService.updateSingleCategory(currentSet, currentCategory, title, subtitle) // TODO!
        CategoryService.setCurrentCategory({ ...currentSet, title, subtitle }) // TODO!
    }

    const deleteCategory = async () => {
        cancelUpdateMode()
        clearInputForNewEntry()
        await CategoryService.markAsDeleted(currentSet, currentCategory) // TODO!
        CategoryService.setCurrentCategory(null)
    }

    const cancelUpdate = () => {
        cancelUpdateMode()
        setTitleAndSubtitle(currentCategory.title, currentCategory.subtitle)
    }

    return (
        <div className='modal-container'>
            <div className={`menu-modal category-manager ${props.isOpen ? 'isOpen' : ''}`}>
                <div className='modal-header'><span>Category Manager</span><span>{currentSet ? currentSet.title : 'None Selected'}:{currentCategory ? currentCategory.title : 'None selected'}</span></div>
                <div className='content'>

                    <select ref={selectMenuRef} onInput={handleSelectMenuChange}>
                        <option data-id='0' value='Add New'>Add New</option>
                        {currentSet?.categories?.filter(entry => entry.deletedAt === undefined).map(entry => <option key={entry.id} value={entry.title}>{entry.title}</option>)}
                    </select>
                    <div className='input-display-container'>
                        <label>
                            Title:
                            <input ref={categoryTitleRef} type='text' placeholder='Enter your new Category title' onInput={handleControlledInputs} value={title} readOnly={!updateModeActive && !newCategoryInputDisplay} />
                        </label>
                        <label>
                            Subtitle:
                            <input ref={categorySubtitleRef} type='text' placeholder='Enter your subtitle' onInput={handleControlledInputs} value={subtitle} readOnly={!updateModeActive && !newCategoryInputDisplay} />
                        </label>
                        {newCategoryInputDisplay
                            ?
                            <button type='button' onClick={saveNewCategory}>Save</button>
                            : null
                        }
                        {
                            updateModeActive
                                ?
                                <>
                                    <button type='button' onClick={updateCategoryFields}>Save New Values</button>
                                    <button type='button' onClick={cancelUpdate}>Cancel</button>
                                </>
                                : null
                        }
                        {
                            !updateModeActive && !newCategoryInputDisplay
                                ?
                                <>
                                    <button type='button' onClick={enableUpdateMode}>Update</button>
                                    <button type='button' onClick={deleteCategory}>Delete</button>
                                </>
                                : null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}