import { useContext, useEffect, useRef, useState } from 'react'
import { MainContext } from '../context/MainContext'
import { Tag } from '../config/data-types'
import dataService from '../services/data.service'
import { FirebaseCreateOptions } from '../config/firebase-types'
import DataPaths from '../config/data-paths'
import TagService from '../services/tag.service'

export default function TagManager(props) {
    const {
        mainState: {
            tagArray,
            setArray
        }
    } = useContext(MainContext)

    const [newTagDisplay, setNewTagDisplay] = useState(false)
    const [existingTagDisplay, setExistingTagDisplay] = useState(false)


    const [newTagInputDisplay, setNewTagInputDisplay] = useState(true)
    const [updateModeActive, setUpdateModeActive] = useState(false)

    const selectMenuRef = useRef(null)
    const primarySetMenuRef = useRef(null)
    const primarySetTagsRef = useRef(null)
    const [primarySet, setPrimarySet] = useState(null)


    const tagTitleRef = useRef(null)
    const [tagTitle, setTagTitle] = useState('')

    useEffect(() => {
        TagService.retrieveAllTags()
    }, [])

    const clearInputForNewEntry = () => {
        setNewTagInputDisplay(true)
        setTagTitle('')
    }

    const handleTagChange = ({ target }) => {
        clearInputForNewEntry()
        if (target.value === 'Add New') {
            setNewTagInputDisplay(true)
        } else {
            setNewTagInputDisplay(false)
            setTagTitle(selectMenuRef.current.value)
        }
    }

    const handleSetChange = ({ target }) => {
        setPrimarySet(target.value)
    }

    const saveNewTag = () => {
        const forceIdAsString = true
        const id = dataService.generateNewId(15, forceIdAsString)
        const primarySet = primarySetMenuRef.current.value
        const newTag = new Tag(id, tagTitleRef.current.value, primarySet)
        TagService.createNewTag(newTag)
    }

    const updateTag = () => {

    }

    const enableUpdateMode = () => {
        setUpdateModeActive(true)
    }

    const cancelUpdateMode = () => {
        setUpdateModeActive(false)
    }

    const handleControlledInputs = ({ target }) => {
        setTagTitle(target.value)
    }

    const addNewTagFields = () => {
        setNewTagDisplay(!newTagDisplay)
        setExistingTagDisplay(false)
    }

    const existingTagFields = () => {
        setExistingTagDisplay(!existingTagDisplay)
        setNewTagDisplay(false)
    }

    return (
        <div className='modal-container'>
            <div className={`menu-modal tag-manager ${props.isOpen ? 'isOpen' : ''}`}>
                <div className='modal-header'><span>TagManager</span></div>
                <div className='content'>
                    <button type='button' onClick={addNewTagFields}>Add New</button>
                    <button type='button' onClick={existingTagFields}>See Existing</button>
                    <hr />
                    {
                        existingTagDisplay
                            ?
                            <>
                                <label>
                                    Search In Set:
                                    <select ref={primarySetMenuRef} onChange={handleSetChange} >
                                        <option key='0' value='All Sets'>All Sets</option>
                                        {setArray?.map(entry => <option key={entry.id} value={entry.title}>{entry.title}</option>)}
                                    </select>
                                </label>
                                <label>
                                    Tags:
                                    <select ref={primarySetTagsRef} onInput={handleSetChange}>
                                        <option key='0' value='Pick To View or Edit'>Pick To View or Edit</option>
                                        {tagArray?.filter(entry => entry.primarySet === primarySetMenuRef.current?.value).map(entry => <option key={entry.id} value={entry.title}>{entry.title}</option>)}
                                    </select>
                                </label>
                            </>
                            : null
                    }
                    {
                        newTagDisplay
                            ?
                            <div className='input-display-container'>
                                <input ref={tagTitleRef} value={tagTitle} onInput={handleControlledInputs} type='text' placeholder='Enter your new tag title' />
                                <label>
                                    Assign to Set:
                                    <select ref={primarySetMenuRef} onInput={handleSetChange}>
                                        {setArray?.map(entry => <option key={entry.id} value={entry.title}>{entry.title}</option>)}
                                    </select>
                                </label>
                                <button type='button' onClick={saveNewTag} >Save New</button>
                            </div>
                            : null
                    }
                    {/* {
                        <div className='input-display-container'>
                            <input ref={tagTitleRef} value={tagTitle} onInput={handleControlledInputs} readOnly={!updateModeActive && !newTagInputDisplay} type='text' placeholder='Enter your new tag title' />
                            {updateModeActive
                                ?
                                <>
                                    <label>
                                        In Set:
                                        <select ref={primarySetMenuRef} onInput={handleSetChange}>
                                            {setArray?.map(entry => <option key={entry.id} value={entry.title}>{entry.title}</option>)}
                                        </select>
                                    </label>
                                    <button type='button' onClick={cancelUpdateMode} >Cancel Update</button>
                                </>
                                : null
                            }
                            {
                                updateModeActive
                                    ? <button type='button' onClick={updateTag} >Save New Values</button>
                                    : <>
                                        <button type='button' onClick={saveNewTag} >Save New</button>
                                        <button type='button' onClick={enableUpdateMode} >Update</button>
                                    </>
                            }
                        </div>
                    } */}
                </div>
            </div>
        </div>
    )
}