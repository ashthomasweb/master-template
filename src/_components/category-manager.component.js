import { useContext, useState, useRef, useEffect } from 'react'
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
    const [updateModeActive, setUpdateModeActive] = useState(false)
    const [selectedSetValue, setSelectedSetValue] = useState('Select A Set')

    const selectMenuRef = useRef(null)
    const setMenuRef = useRef(null)
    const categoryTitleRef = useRef(null)
    const categorySubtitleRef = useRef(null)
    const [title, setTitle] = useState('')
    const [subtitle, setSubtitle] = useState('')

    // Set Select Menu to current set if updating, or 'Add New' if deleting ...
    useEffect(() => {
        if (currentCategory === null) {
            Array.from(selectMenuRef.current.options).forEach((entry, index) => {
                entry.dataset.id === '0' && (selectMenuRef.current.selectedIndex = index)
            })
        }
    }, [currentCategory])

    useEffect(() => {
        Array.from(setMenuRef.current.options).forEach((entry, index) => {
            entry.dataset.id === currentSet?.id || currentSet === null && setSelectedSetValue(entry.title)
        })
    }, [currentSet])

    useEffect(() => {
        setTitleAndSubtitle('', '')
    }, [currentSet])

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
    }

    const cancelUpdateMode = () => {
        setUpdateModeActive(false)
    }

    const handleControlledInputs = () => {
        setTitleAndSubtitle(categoryTitleRef.current.value, categorySubtitleRef.current.value)
    }

    const handleCategoryMenuChange = ({ target }) => {
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
        const forceIdAsString = true
        const id = DataService.generateNewId(15, forceIdAsString)
        const categoryEntries = []
        const newCategory = new Category(id, categoryTitleRef.current.value, categorySubtitleRef.current.value, categoryEntries)
        await CategoryService.saveNewCategory(newCategory, currentSet)
        clearInputForNewEntry()
    }

    const updateCategoryFields = async () => {
        cancelUpdateMode()
        await CategoryService.updateSingleCategory(currentSet, currentCategory, title, subtitle)
        CategoryService.setCurrentCategory({ ...currentCategory, title, subtitle })
    }

    const deleteCategory = async () => {
        cancelUpdateMode()
        clearInputForNewEntry()
        await CategoryService.markAsDeleted(currentSet, currentCategory)
        CategoryService.setCurrentCategory(null)
    }

    const cancelUpdate = () => {
        cancelUpdateMode()
        console.log(currentCategory)
        currentCategory !== 'Select A Category' || currentCategory !== null && setTitleAndSubtitle(currentCategory.title, currentCategory.subtitle)
    }

    const handleSetMenuChange = ({ target }) => {
        cancelUpdate()
        if (target.value === 'Select A Set') {
            console.log('test')
            CategoryService.setCurrentCategory(null)
            SetService.setActiveSet(null)
        } else if (target.value !== 'Select A Set') {
            const selectedSet = setArray.filter(entry => entry.title === target.value)[0]
            SetService.setActiveSet(selectedSet)
            setSelectedSetValue(selectedSet.title)
        }
        // CategoryService.setCurrentCategory(null)
    }

    return (
        <div className='modal-container'>
            <div className={`menu-modal category-manager ${props.isOpen ? 'isOpen' : ''}`}>
                <div className='modal-header'><span>Category Manager</span><span>{currentSet ? currentSet.title : 'None Selected'}:{currentCategory ? currentCategory.title : 'None selected'}</span></div>
                <div className='content'>
                    <label>Set: </label>
                    <select ref={setMenuRef} onChange={handleSetMenuChange} defaultValue={selectedSetValue}>
                        <option data-id='0' value='Select A Set'>Select A Set</option>
                        {setArray.map(entry => <option key={entry.id} data-id={entry.id} value={entry.title}>{entry.title}</option>)}
                    </select>
                    <label>Category: </label>
                    <select ref={selectMenuRef} onChange={handleCategoryMenuChange} defaultValue={title}>
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