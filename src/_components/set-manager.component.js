import { useContext, useEffect, useRef, useState } from 'react'
import { MainContext } from '../context/MainContext'
import { Set } from '../config/data-types'
import SetService from '../services/set.service'
import DataService from '../services/data.service'
import CategoryService from '../services/category.service'

export default function SetManager(props) {
    const {
        mainState: {
            currentSet,
            setArray
        }
    } = useContext(MainContext)

    const [newSetInputDisplay, setNewSetInputDisplay] = useState(true)
    const [updatedOptionId, setUpdatedOptionId] = useState('0')
    const [updateModeActive, setUpdateModeActive] = useState(false)

    const selectMenuRef = useRef(null)

    // Ref and state controls for 'Title' and 'Subtitle'
    const setTitleRef = useRef(null)
    const setSubtitleRef = useRef(null)
    const [title, setTitle] = useState('')
    const [subtitle, setSubtitle] = useState('')

    useEffect(() => {
        SetService.retrieveAllSets()
    }, [])

    // Set Select Menu to current set if updating, or 'Add New' if deleting ...
    useEffect(() => {
        if (updatedOptionId !== '0') {
            Array.from(selectMenuRef.current.options).forEach((entry, index) => {
                entry.dataset.id === updatedOptionId && (selectMenuRef.current.selectedIndex = index)
            })
        }
    }, [setArray])

    const setTitleAndSubtitle = (title, subtitle) => {
        setTitle(title)
        setSubtitle(subtitle)
    }

    const clearInputForNewEntry = () => {
        setNewSetInputDisplay(true)
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
        setTitleAndSubtitle(setTitleRef.current.value, setSubtitleRef.current.value)
    }

    const handleSelectMenuChange = ({ target }) => {
        cancelUpdateMode()
        if (target.value === 'Add New') {
            clearInputForNewEntry()
        } else {
            setNewSetInputDisplay(false)
            const selectedSet = setArray.filter(entry => entry.title === target.value)[0]
            SetService.setActiveSet(selectedSet)
            setTitleAndSubtitle(selectedSet.title, selectedSet.subtitle)
        }
        CategoryService.setCurrentCategory(null)
    }

    const saveNewSet = async () => {
        setUpdatedOptionId('0')
        const forceIdAsString = true
        const id = DataService.generateNewId(15, forceIdAsString)
        const setCategories = []
        const newSet = new Set(id, setTitleRef.current.value, setSubtitleRef.current.value, setCategories)
        await SetService.saveNewSet(newSet)
        clearInputForNewEntry()
    }

    const updateSetFields = async () => {
        cancelUpdateMode()
        await SetService.updateSetFields(currentSet, title, subtitle)
        SetService.setActiveSet({ ...currentSet, title, subtitle })
    }

    const deleteSet = async () => {
        cancelUpdateMode()
        clearInputForNewEntry()
        await SetService.markAsDeleted(currentSet)
        SetService.setActiveSet(null)
    }

    const cancelUpdate = () => {
        cancelUpdateMode()
        setTitleAndSubtitle(currentSet.title, currentSet.subtitle)
    }

    return (
        <div className={`modal-container`}>
            <div className={`menu-modal set-manager ${props.isOpen ? 'isOpen' : ''}`}>
                <div className='modal-header'><span>Set Manager</span><span><strong><em>Current Set:</em></strong> {currentSet ? currentSet.title : 'None selected'}</span></div>
                <div className='content'>
                    <select ref={selectMenuRef} onInput={handleSelectMenuChange}>
                        <option data-id='0' value='Add New'>Add New</option>
                        {setArray.map(entry => <option key={entry.id} data-id={entry.id} value={entry.title}>{entry.title}</option>)}
                    </select>
                    <div className='input-display-container'>
                        <label>
                            Title:
                            <input ref={setTitleRef} type='text' placeholder='Enter your new Set title' onInput={handleControlledInputs} value={title} readOnly={!updateModeActive && !newSetInputDisplay} />
                        </label>
                        <label>
                            Subtitle:
                            <input ref={setSubtitleRef} type='text' placeholder='Enter your subtitle' onInput={handleControlledInputs} value={subtitle} readOnly={!updateModeActive && !newSetInputDisplay} />
                        </label>
                        {
                            newSetInputDisplay
                                ?
                                <button type='button' onClick={saveNewSet}>Save</button>
                                :
                                null
                        }
                        {
                            updateModeActive
                                ?
                                <>
                                    <button type='button' onClick={updateSetFields}>Save New Values</button>
                                    <button type='button' onClick={cancelUpdate}>Cancel</button>
                                </>
                                : null
                        }
                        {
                            !updateModeActive && !newSetInputDisplay
                                ?
                                <>
                                    <button type='button' onClick={enableUpdateMode}>Update</button>
                                    <button type='button' onClick={deleteSet}>Delete</button>
                                </>
                                : null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
