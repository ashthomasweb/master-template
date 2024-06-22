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
        },
        mainDispatch
    } = useContext(MainContext)

    const [newSetInputDisplay, setNewSetInputDisplay] = useState(true)

    const setTitleRef = useRef(null)
    const setSubtitleRef = useRef(null)
    const existingSetTitleRef = useRef(currentSet.title)
    const existingSetSubtitleRef = useRef(currentSet.subtitle)
    const [existingSetTitle, setExistingSetTitle] = useState(currentSet.title)
    const [existingSetSubtitle, setExistingSetSubtitle] = useState(currentSet.subtitle)
    const [updateActive, setUpdateActive] = useState(false)


    const handleSetChange = ({ target }) => {
        if (target.value === 'Add New') {
            setNewSetInputDisplay(true)
        } else {
            setNewSetInputDisplay(false)
            const selectedSet = setArray.filter(entry => entry.title === target.value)[0]
            SetService.setActiveSet(selectedSet)
            setExistingSetTitle(selectedSet.title)
            setExistingSetSubtitle(selectedSet.subtitle)
        }
    }

    useEffect(() => {
        SetService.retrieveAllSets(userObj)
    }, [])

    const saveNewSet = () => {
        const title = setTitleRef.current.value
        const subtitle = setSubtitleRef.current.value
        const forceString = true
        const id = DataService.generateNewId(15, forceString)
        const setCategories = []
        const newSet = new Set(id, title, subtitle, setCategories)
        SetService.saveNewSet(newSet, userObj)
    }

    const handleFieldUpdate = () => {
        setExistingSetTitle(existingSetTitleRef.current.value)
        setExistingSetSubtitle(existingSetSubtitleRef.current.value)
    }

    const updateSetFields = () => {
        if (updateActive) {
            const newTitle = existingSetTitle
            const newSubtitle = existingSetSubtitle
            SetService.updateSingleSet(currentSet, newTitle, newSubtitle, userObj)
        } else if (!updateActive) {
            setUpdateActive(true)
        }
    }

    const deleteSet = () => {

    }

    const cancelUpdate = () => {
        setUpdateActive(false)
        setExistingSetTitle(currentSet.title)
        setExistingSetSubtitle(currentSet.subtitle)
    }


    return (
        <div className={`modal-container`}>
            <div className={`menu-modal set-manager ${props.isOpen ? 'isOpen' : ''}`}>
                <div className='modal-header'><span>Set Manager</span><span><strong><em>Current Set:</em></strong> {currentSet.title}</span></div>
                <div className='content'>
                    <select onInput={handleSetChange}>
                        <option value='Add New'>Add New</option>
                        {setArray.map(entry => <option key={entry.title} value={entry.title}>{entry.title}</option>)}
                    </select>
                    <div className='input-display-container'>

                        {newSetInputDisplay
                            ?
                            <>
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
                                ?
                                <>
                                    <label>
                                        Title:
                                        <input ref={existingSetTitleRef} type='text' onInput={handleFieldUpdate} value={existingSetTitle} readOnly={!updateActive}/>
                                    </label>
                                    <label>
                                        Subtitle:
                                        <input ref={existingSetSubtitleRef} type='text' onChange={handleFieldUpdate} value={existingSetSubtitle} readOnly={!updateActive}/>
                                    </label>
                                    <button type='button' onClick={updateSetFields}>{updateActive ? 'Save New Values' : 'Update'}</button>
                                    {
                                        updateActive 
                                        ? <button type='button' onClick={cancelUpdate}>Cancel</button>
                                        : null
                                    }
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