import { useContext, useEffect, useRef, useState } from 'react'
import { MainContext } from '../context/MainContext'
import { Tag } from '../config/data-types'
import dataService from '../services/data.service'
import TagService from '../services/tag.service'
import crudInterface from '../interfaces/crud-interface'

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


    const [updateModeActive, setUpdateModeActive] = useState(false)

    const existingTagSetMenuRef = useRef(null)
    const newTagSetMenuRef = useRef(null)
    const primarySetMenuRef = useRef({ value: 'All Sets' })
    const primarySetTagsRef = useRef(null)
    const [existingSet, setExistingSet] = useState(null)

    const tagTitleRef = useRef('')
    const newTagTitleRef = useRef('')

    const [tagTitle, setTagTitle] = useState('')

    const [currentTag, setCurrentTag] = useState(null)

    useEffect(() => {
        TagService.retrieveAllTags()
    }, [])

    const clearInputForNewEntry = () => {
        // setNewTagInputDisplay(true)
        setTagTitle('')
    }

    const handleExistingTagChange = ({ target }) => {
        clearInputForNewEntry()
        setUpdateModeActive(false)
        if (target.value === 'Pick To View or Edit') {
            setDisplayViewOrUpdate(false)
        } else {
            setDisplayViewOrUpdate(true)
            setTagTitle(primarySetTagsRef.current.value)
            setCurrentTag(tagArray.filter(entry => entry.title === target.value)[0])
            // setExistingSet()
        }
    }

    const handleSearchSetChange = ({ target }) => {
        setExistingSet(target.value)
        setUpdateModeActive(false)
        primarySetTagsRef.current.options.selectedIndex = 0
        setCurrentTag(null)
        setDisplayViewOrUpdate(false)
    }

    const handleNewSetSelectionChange = ({ target }) => {
        setExistingSet(target.value)
    }

    const handleExistingSetChange = ({ target }) => {
        setExistingSet(target.value)
    }

    const saveNewTag = () => {
        if (newTagTitleRef.current.value === '' || newTagTitleRef.current.value === null) {
            alert('Cannot save empty tag. Please input a value')
            return
        }
        const forceIdAsString = true
        const id = dataService.generateNewId(15, forceIdAsString)
        const primarySet = newTagSetMenuRef.current.value
        const newTag = new Tag(id, newTagTitleRef.current.value, primarySet)
        TagService.createNewTag(newTag)
        clearInputForNewEntry()
        setExistingSet(null)
    }

    const updateTag = () => {
        const updatedTag = {
            ...currentTag,
            primarySet: existingTagSetMenuRef.current.value,
            title: tagTitle
        }
        TagService.updateTag(updatedTag)
        setUpdateModeActive(false)
        setCurrentTag(updatedTag)
    }

    const enableUpdateMode = () => {
        setUpdateModeActive(true)
    }

    const cancelUpdateMode = () => {
        setUpdateModeActive(false)
        setTagTitle(currentTag.title)
    }

    const handleControlledInputs = ({ target }) => {
        setTagTitle(target.value)
    }

    const addNewTagFields = () => {
        clearInputForNewEntry()
        setNewTagDisplay(!newTagDisplay)
        setExistingTagDisplay(false)
    }

    const existingTagFields = () => {
        setExistingTagDisplay(!existingTagDisplay)
        setNewTagDisplay(false)
    }

    const markTagAsDeleted = () => {
        TagService.deleteTag(currentTag)
        setDisplayViewOrUpdate(false)
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
                                        {
                                        // primarySetMenuRef !== null
                                        //    / ?
                                            primarySetMenuRef.current?.value === 'All Sets'
                                                ? tagArray?.map(entry => <option key={entry.id} value={entry.title}>{entry.title}</option>)
                                                : tagArray?.filter(entry => entry.primarySet === primarySetMenuRef.current?.value).map(entry => <option key={entry.id} value={entry.title}>{entry.title}</option>)
                                            // : null
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
                                                        <select ref={existingTagSetMenuRef} onInput={handleExistingSetChange}>
                                                            {setArray?.filter(entry => entry.title === currentTag.primarySet).map(entry => <option key={entry.id} value={entry.title}>{entry.title}</option>)}
                                                            {setArray?.filter(entry => entry.title !== currentTag.primarySet).map(entry => <option key={entry.id} value={entry.title}>{entry.title}</option>)}
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
                                                        <button type='button' onClick={markTagAsDeleted} >Delete</button>
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
                                <input ref={newTagTitleRef} value={tagTitle} onInput={handleControlledInputs} type='text' placeholder='Enter your new tag title' />
                                <label>
                                    Assign to Set:
                                    <select ref={newTagSetMenuRef} onInput={handleNewSetSelectionChange}>
                                        {setArray?.map(entry => <option key={entry.id} value={entry.title}>{entry.title}</option>)}
                                    </select>
                                </label>
                                <button type='button' onClick={saveNewTag} >Save New</button>
                            </div>
                            : null
                    }
                </div>
            </div>
        </div>
    )
}