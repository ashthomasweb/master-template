import { useContext, useEffect, useRef, useState } from 'react'
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

    const setTitleRef = useRef(null)
    const setSubtitleRef = useRef(null)
    const existingSetTitleRef = useRef(null)
    const existingSetSubtitleRef = useRef(null)
    const [existingSetTitle, setExistingSetTitle] = useState(null)
    const [existingSetSubtitle, setExistingSetSubtitle] = useState(null)
    const [updateActive, setUpdateActive] = useState(false)

    useEffect(() => {
        SetService.retrieveAllSets(userObj)
    }, [])

    const handleSetChange = ({ target }) => {
        if (target.value === 'Add New') {
            setUpdateActive(false)
            setNewSetInputDisplay(true)
        } else {
            setNewSetInputDisplay(false)
            const selectedSet = setArray.filter(entry => entry.title === target.value)[0]
            SetService.setActiveSet(selectedSet)
            setExistingSetTitle(selectedSet.title)
            setExistingSetSubtitle(selectedSet.subtitle)
        }
    }

    const saveNewSet = () => {
        const title = setTitleRef.current.value
        const subtitle = setSubtitleRef.current.value
        const forceString = true
        const id = DataService.generateNewId(15, forceString)
        const setCategories = []
        const newSet = new Set(id, title, subtitle, setCategories)
        SetService.saveNewSet(newSet, userObj)
        setTitleRef.current.value = ''
        setSubtitleRef.current.value = ''
    }

    const handleControlledInputs = () => {
        setExistingSetTitle(existingSetTitleRef.current.value)
        setExistingSetSubtitle(existingSetSubtitleRef.current.value)
    }

    // Updates current set with new values and then cancels 'update mode' ...
    const updateSetFields = () => {
        const newTitle = existingSetTitle
        const newSubtitle = existingSetSubtitle
        SetService.updateSingleSet(currentSet, newTitle, newSubtitle, userObj)
        setUpdateActive(false)
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
        setExistingSetTitle('')
        setExistingSetSubtitle('')
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
                    <select onInput={handleSetChange}>
                        <option value='Add New'>Add New</option>
                        {setArray.map(entry => <option key={entry.title} value={entry.title}>{entry.title}</option>)}
                    </select>
                    <div className='input-display-container'>
                        {
                            newSetInputDisplay
                                ? <>
                                    <label>
                                        Title:
                                        <input ref={setTitleRef} type='text' placeholder='Enter your new Set title' />
                                    </label>
                                    <label>
                                        Subtitle:
                                        <input ref={setSubtitleRef} type='text' placeholder='Enter your subtitle' />
                                    </label>
                                    <button type='button' onClick={saveNewSet}>Save</button>
                                </>
                                : null
                        }
                        {
                            !newSetInputDisplay && currentSet !== null
                                ? <>
                                    <label>
                                        Title:
                                        <input ref={existingSetTitleRef} type='text' onInput={handleControlledInputs} value={existingSetTitle} readOnly={!updateActive} />
                                    </label>
                                    <label>
                                        Subtitle:
                                        <input ref={existingSetSubtitleRef} type='text' onChange={handleControlledInputs} value={existingSetSubtitle} readOnly={!updateActive} />
                                    </label>
                                    {
                                        !updateActive
                                            ? <button type='button' onClick={allowUpdate}>Update</button>
                                            : <button type='button' onClick={updateSetFields}>Save New Values</button>
                                    }
                                    {
                                        updateActive
                                            ? <button type='button' onClick={cancelUpdate}>Cancel</button>
                                            : null
                                    }
                                    {
                                        !updateActive
                                            ? <button type='button' onClick={deleteSet}>Delete</button>
                                            : null
                                    }
                                </>
                                : null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}