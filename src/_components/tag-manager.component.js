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
    const [displayViewOrUpdate, setDisplayViewOrUpdate] = useState(false)


    const [newTagInputDisplay, setNewTagInputDisplay] = useState(true)
    const [updateModeActive, setUpdateModeActive] = useState(false)

    const existingTagSetMenuRef = useRef(null)
    const primarySetMenuRef = useRef({value: 'All Sets'})
    const primarySetTagsRef = useRef(null)
    const [primarySet, setPrimarySet] = useState(null)

    const tagTitleRef = useRef(null)
    const [tagTitle, setTagTitle] = useState('')

    const [currentTag, setCurrentTag] = useState(null)

    useEffect(() => {
        TagService.retrieveAllTags()
    }, [])

    const clearInputForNewEntry = () => {
        setNewTagInputDisplay(true)
        setTagTitle('')
    }

    const handleExistingTagChange = ({ target }) => {
        clearInputForNewEntry()
        if (target.value === 'Pick To View or Edit') {
            setDisplayViewOrUpdate(false)
        } else {
            setDisplayViewOrUpdate(true)
            setTagTitle(primarySetTagsRef.current.value)
            setCurrentTag(tagArray.filter(entry => entry.title === target.value)[0])
        }
    }

    const handleSearchSetChange = ({ target }) => {
        setPrimarySet(target.value)
    }

    const saveNewTag = () => {
        const forceIdAsString = true
        const id = dataService.generateNewId(15, forceIdAsString)
        const primarySet = primarySetMenuRef.current.value
        const newTag = new Tag(id, tagTitleRef.current.value, primarySet)
        TagService.createNewTag(newTag)
        clearInputForNewEntry()
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
        console.log(primarySetMenuRef)
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
                                    <select ref={primarySetMenuRef} onChange={handleSearchSetChange} >
                                        <option key='0' value='All Sets'>All Sets</option>
                                        {setArray?.map(entry => <option key={entry.id} value={entry.title}>{entry.title}</option>)}
                                    </select>
                                </label>
                                <label>
                                    Tags:
                                    <select ref={primarySetTagsRef} onChange={handleExistingTagChange}>
                                        <option key='0' value='Pick To View or Edit'>Pick To View or Edit</option>

                                        {primarySetMenuRef !== null
                                            ?
                                            primarySetMenuRef.current?.value === 'All Sets'
                                                ? tagArray?.map(entry => <option key={entry.id} value={entry.title}>{entry.title}</option>)
                                                : tagArray?.filter(entry => entry.primarySet === primarySetMenuRef.current?.value).map(entry => <option key={entry.id} value={entry.title}>{entry.title}</option>)

                                            : null
                                        }
                                    </select>
                                </label>
                                {
                                    displayViewOrUpdate
                                        ?
                                        <div className='input-display-container'>
                                            <span>{currentTag ? currentTag.primarySet : null} : {currentTag ? currentTag.title : null}</span>
                                            <input ref={tagTitleRef} value={tagTitle} onInput={handleControlledInputs} readOnly={updateModeActive ? false : true} type='text' placeholder='Enter your new tag title' />
                                            {updateModeActive
                                                ?
                                                <>
                                                    <label>
                                                        In Set:
                                                        <select ref={existingTagSetMenuRef} onInput={handleSearchSetChange}>
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
                                                        <button type='button' onClick={enableUpdateMode} >Update</button>
                                                    </>
                                            }
                                        </div>
                                        : null
                                }
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
                                    <select ref={primarySetMenuRef} onInput={handleSearchSetChange}>
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
                                        <select ref={primarySetMenuRef} onInput={handleSearchSetChange}>
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