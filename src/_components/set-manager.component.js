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
    const [updatedOptionId, setUpdatedOptionId] = useState(null)

    const selectMenuRef = useRef(null)
    const existingSetTitleRef = useRef(null)
    const existingSetSubtitleRef = useRef(null)
    const [existingSetTitle, setExistingSetTitle] = useState('')
    const [existingSetSubtitle, setExistingSetSubtitle] = useState('')
    const [updateActive, setUpdateActive] = useState(false)

    useEffect(() => {
        SetService.retrieveAllSets(userObj)
    }, [])

    useEffect(() => {
        console.log('ue setArray')
        console.log(updatedOptionId)
        function findOption() {
            console.dir(selectMenuRef.current.options)
            const optionArray = Array.from(selectMenuRef.current.options)
            console.log(optionArray.filter(entry => entry.dataset?.id === updatedOptionId))
            optionArray.forEach((entry, index) => {
                if (entry.dataset.id === updatedOptionId) {
                    console.log(entry, index)
                    selectMenuRef.current.selectedIndex = index
                }
                // console.log(entry.value, entry.dataset.id)
                // if (entry.dataset.id === updatedOptionId) {
                //     selectMenuRef.current.value = entry
                // }
            })
            // console.log(Array.from(selectMenuRef.current.options.findOption(entry => entry.dataset?.id === updatedOptionId)))
        }
        updatedOptionId !== null && findOption()
    }, [setArray])

    const handleSetChange = ({ target }) => {
        if (target.value === 'Add New') {
            setUpdateActive(false)
            setNewSetInputDisplay(true)
            clearInputFields()
        } else {
            setNewSetInputDisplay(false)
            const selectedSet = setArray.filter(entry => entry.title === target.value)[0]
            SetService.setActiveSet(selectedSet)
            setExistingSetTitle(selectedSet.title)
            setExistingSetSubtitle(selectedSet.subtitle)
        }
    }

    const saveNewSet = () => {
        const title = existingSetTitleRef.current.value
        const subtitle = existingSetSubtitleRef.current.value
        const forceString = true
        const id = DataService.generateNewId(15, forceString)
        const setCategories = []
        const newSet = new Set(id, title, subtitle, setCategories)
        SetService.saveNewSet(newSet, userObj)
        clearInputFields()
    }

    const clearInputFields = () => {
        setExistingSetTitle('')
        setExistingSetSubtitle('')
    }

    const handleControlledInputs = () => {
        setExistingSetTitle(existingSetTitleRef.current.value)
        setExistingSetSubtitle(existingSetSubtitleRef.current.value)
    }

    // Updates current set with new values and then cancels 'update mode' ...
    const updateSetFields = async () => {
        const newTitle = existingSetTitle
        const newSubtitle = existingSetSubtitle
        await SetService.updateSingleSet(currentSet, newTitle, newSubtitle, userObj)
        setUpdateActive(false)
        SetService.setActiveSet({...currentSet, title: newTitle, subtitle: newSubtitle})
        setUpdatedOptionId(Array.from(selectMenuRef.current.options)[selectMenuRef.current.selectedIndex].dataset.id)
    }

    // Activates 'update mode' ...
    const allowUpdate = () => {
        setUpdateActive(true)
    }

    // Mark current set as deleted ...
    const deleteSet = () => {
        setUpdateActive(false)
        setNewSetInputDisplay(true)
        SetService.markAsDeleted(currentSet, userObj)
        clearInputFields()
        SetService.setActiveSet(null)
    }

    // Cancel 'update mode' and reset to existing input values ...
    const cancelUpdate = () => {
        setUpdateActive(false)
        setExistingSetTitle(currentSet.title)
        setExistingSetSubtitle(currentSet.subtitle)
    }

    return (
        <div className={`modal-container`}>
            <div className={`menu-modal set-manager ${props.isOpen ? 'isOpen' : ''}`}>
                <div className='modal-header'><span>Set Manager</span><span><strong><em>Current Set:</em></strong> {currentSet ? currentSet.title : 'None selected'}</span></div>
                <div className='content'>
                    <select ref={selectMenuRef} onInput={handleSetChange}>
                        <option value='Add New'>Add New</option>
                        {setArray.map(entry => <option key={entry.title} data-id={entry.id} value={entry.title}>{entry.title}</option>)}
                    </select>
                    <div className='input-display-container'>
                        <label>
                            Title:
                            <input ref={existingSetTitleRef} type='text' placeholder='Enter your new Set title' onInput={handleControlledInputs} value={existingSetTitle} readOnly={!updateActive && !newSetInputDisplay} />
                        </label>
                        <label>
                            Subtitle:
                            <input ref={existingSetSubtitleRef} type='text' placeholder='Enter your subtitle' onChange={handleControlledInputs} value={existingSetSubtitle} readOnly={!updateActive && !newSetInputDisplay}/>
                        </label>
                        {
                            newSetInputDisplay
                                ?
                                <button type='button' onClick={saveNewSet}>Save</button>
                                :
                                null
                        }
                        {
                            !updateActive && !newSetInputDisplay
                                ?
                                <>
                                    <button type='button' onClick={allowUpdate}>Update</button>
                                    <button type='button' onClick={deleteSet}>Delete</button>
                                </>
                                : null
                        }
                        {
                            updateActive
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