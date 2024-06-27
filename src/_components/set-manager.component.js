import { useContext, useEffect, useReducer, useRef, useState } from 'react'
import { MainContext } from '../context/MainContext'
import { Set } from '../config/data-types'
import SetService from '../services/set.service'
import DataService from '../services/data.service'

export default function SetManager(props) {
    const {
        mainState: {
            currentSet,
            setArray,
            userObj
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

    // Gather all sets on component mount ...
    useEffect(() => {
        SetService.retrieveAllSets(userObj)
    }, [])

    // Set Select Menu to current set if updating, or 'Add New' if deleting ...
    useEffect(() => {
        function findOption() {
            const optionArray = Array.from(selectMenuRef.current.options)
            optionArray.forEach((entry, index) => {
                entry.dataset.id === updatedOptionId && (selectMenuRef.current.selectedIndex = index)
            })
        }
        updatedOptionId !== null && findOption()
    }, [setArray])

    // Helper function for 'Title' and 'Subtitle' inputs ...
    const setTitleAndSubtitle = (title, subtitle) => {
        setTitle(title)
        setSubtitle(subtitle)
    }

    const handleSelectChange = ({ target }) => {
        setUpdatedOptionId('0')
        if (target.value === 'Add New') {
            setUpdateModeActive(false)
            setNewSetInputDisplay(true)
            clearInputFields()
        } else {
            setNewSetInputDisplay(false)
            const selectedSet = setArray.filter(entry => entry.title === target.value)[0]
            SetService.setActiveSet(selectedSet)
            setTitleAndSubtitle(selectedSet.title, selectedSet.subtitle)
        }
    }

    // Create new set in DB ...
    const saveNewSet = async () => {
        setUpdatedOptionId('0')
        const title = setTitleRef.current.value
        const subtitle = setSubtitleRef.current.value
        const forceString = true
        const id = DataService.generateNewId(15, forceString)
        const setCategories = []
        const newSet = new Set(id, title, subtitle, setCategories)
        await SetService.saveNewSet(newSet, userObj)
        clearInputFields()
    }

    const clearInputFields = () => {
        setTitleAndSubtitle('', '')
    }

    const handleControlledInputs = () => {
        setTitleAndSubtitle(setTitleRef.current.value, setSubtitleRef.current.value)
    }

    // Updates current set with new values and then cancels 'update mode' ...
    const updateSetFields = async () => {
        await SetService.updateSingleSet(currentSet, title, subtitle, userObj)
        setUpdatedOptionId('0')
        setUpdateModeActive(false)
        SetService.setActiveSet({ ...currentSet, title, subtitle })
        setUpdatedOptionId(Array.from(selectMenuRef.current.options)[selectMenuRef.current.selectedIndex].dataset.id)
    }

    // Activates 'update mode' ...
    const allowUpdate = () => {
        setUpdateModeActive(true)
    }

    // Mark current set as deleted ...
    const deleteSet = async () => {
        setUpdatedOptionId('0')
        setUpdateModeActive(false)
        setNewSetInputDisplay(true)
        await SetService.markAsDeleted(currentSet, userObj)
        clearInputFields()
        SetService.setActiveSet(null)
    }

    // Cancel 'update mode' and reset to existing input values ...
    const cancelUpdate = () => {
        setUpdateModeActive(false)
        setTitleAndSubtitle(currentSet.title, currentSet.subtitle)
        setUpdatedOptionId('0')
    }

    return (
        <div className={`modal-container`}>
            <div className={`menu-modal set-manager ${props.isOpen ? 'isOpen' : ''}`}>
                <div className='modal-header'><span>Set Manager</span><span><strong><em>Current Set:</em></strong> {currentSet ? currentSet.title : 'None selected'}</span></div>
                <div className='content'>
                    <select ref={selectMenuRef} onInput={handleSelectChange}>
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
                            <input ref={setSubtitleRef} type='text' placeholder='Enter your subtitle' onChange={handleControlledInputs} value={subtitle} readOnly={!updateModeActive && !newSetInputDisplay} />
                        </label>
                        {
                            newSetInputDisplay
                                ?
                                <button type='button' onClick={saveNewSet}>Save</button>
                                :
                                null
                        }
                        {
                            !updateModeActive && !newSetInputDisplay
                                ?
                                <>
                                    <button type='button' onClick={allowUpdate}>Update</button>
                                    <button type='button' onClick={deleteSet}>Delete</button>
                                </>
                                : null
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
                    </div>
                </div>
            </div>
        </div>
    )
}