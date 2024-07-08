import { useContext, useEffect, useRef, useState } from 'react'
import { MainContext } from '../context/MainContext'
import { Tag } from '../config/data-types'
import dataService from '../services/data.service'
import TagService from '../services/tag.service'

export default function TagManager(props) {
    const {
        mainState: {
            tagArray,
            setArray
        }
    } = useContext(MainContext)

    // Tab display conditions ...
    const [displayNewTagTab, setDisplayNewTagTab] = useState(false)
    const [displayExistingTagTab, setDisplayExistingTagTab] = useState(false)

    // View/Update display and mode conditions ...
    const [displayViewOrUpdate, setDisplayViewOrUpdate] = useState(false)
    const [updateModeActive, setUpdateModeActive] = useState(false)

    const primarySetTagsRef = useRef(null)
    const newTagPrimarySetRef = useRef(null)
    
    // Controlled input value for new, existing, and updating tags
    const [tagTitle, setTagTitle] = useState('')
    
    const [newPrimarySet, setNewPrimarySet] = useState(null)
    const [searchSet, setSearchSet] = useState(null)
    const [existingSet, setExistingSet] = useState(null)
    const [currentTag, setCurrentTag] = useState(null)

    useEffect(() => {
        TagService.retrieveAllTags()
    }, [])

    // Helper functions ...
    const clearInputForNewEntry = () => {
        setTagTitle('')
    }
    const enableUpdateMode = () => {
        setUpdateModeActive(true)
        setExistingSet(currentTag.primarySet)
    }

    const cancelUpdateMode = () => {
        setUpdateModeActive(false)
        setTagTitle(currentTag.title)
    }

    const handleControlledInputs = ({ target }) => {
        setTagTitle(target.value)
    }

    // Action tab selection ...
    const displayNewTagEntry = () => {
        setExistingSet(null)
        clearInputForNewEntry()
        setDisplayNewTagTab(!displayNewTagTab)
        setDisplayExistingTagTab(false)
    }

    const displayExistingTags = () => {
        setExistingSet(null)
        setDisplayViewOrUpdate(false)
        setSearchSet('All Sets')
        setDisplayExistingTagTab(!displayExistingTagTab)
        setDisplayNewTagTab(false)
    }

    
    // onChange handlers ...
    const handleExistingTagChange = ({ target }) => {
        clearInputForNewEntry()
        setUpdateModeActive(false)
        if (target.value === 'Pick To View or Edit') {
            setDisplayViewOrUpdate(false)
        } else {
            setCurrentTag(tagArray.filter(entry => entry.title === target.value)[0])
            setTagTitle(primarySetTagsRef.current.value)
            setDisplayViewOrUpdate(true)
        }
    }

    const handleSearchSetChange = ({ target }) => {
        setSearchSet(target.value)
        setUpdateModeActive(false)
        primarySetTagsRef.current.options.selectedIndex = 0
        setCurrentTag(null)
        setDisplayViewOrUpdate(false)
    }

    const handleNewPrimarySetChange = ({ target }) => {
        setNewPrimarySet(target.value)
    }

    const handleExistingSetChange = ({ target }) => {
        setExistingSet(target.value)
    }

    // CRUD operations ...
    const saveNewTag = () => {
        if (tagTitle === '' || tagTitle === null) {
            alert('Cannot save empty tag. Please input a value')
            return
        }
        const forceIdAsString = true
        const id = dataService.generateNewId(15, forceIdAsString)
        const primarySet = newPrimarySet
        const newTag = new Tag(id, tagTitle, primarySet)
        TagService.createNewTag(newTag)
        clearInputForNewEntry()
        setExistingSet(null)
    }

    const updateTag = () => {
        const updatedTag = {
            ...currentTag,
            primarySet: existingSet,
            title: tagTitle
        }
        TagService.updateTag(updatedTag)
        setUpdateModeActive(false)
        setCurrentTag(updatedTag)
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

                    {/* Action Tabs */}
                    <button type='button' onClick={displayNewTagEntry}>Add New</button>
                    <button type='button' onClick={displayExistingTags}>See Existing</button>
                    <hr />

                    {/* Search and/or View/Update within existing Tags */}
                    {
                        displayExistingTagTab
                            ?
                            <>
                                {/* Search for Existing Tags */}
                                <label>
                                    Search In Set:
                                    <select onChange={handleSearchSetChange} >
                                        <option key='0' value='All Sets'>All Sets</option>
                                        {setArray?.map(entry => <option key={entry.id} value={entry.title}>{entry.title}</option>)}
                                    </select>
                                </label>
                                <label>
                                    Tags:
                                    <select ref={primarySetTagsRef} onChange={handleExistingTagChange}>
                                        <option key='0' value='Pick To View or Edit'>Pick To View or Edit</option>
                                        {
                                            searchSet !== null
                                                ?
                                                searchSet === 'All Sets'
                                                    ? tagArray?.map(entry => <option key={entry.id} value={entry.title}>{entry.title}</option>)
                                                    : tagArray?.filter(entry => entry.primarySet === searchSet).map(entry => <option key={entry.id} value={entry.title}>{entry.title}</option>)
                                                :
                                                null
                                        }
                                    </select>
                                </label>

                                {/* View Tag and/or Update Tag */}
                                {
                                    displayViewOrUpdate
                                        ?
                                        <div className='input-display-container'>
                                            <span>{currentTag ? currentTag.primarySet : null} : {currentTag ? currentTag.title : null}</span>
                                            <input value={tagTitle} onInput={handleControlledInputs} readOnly={updateModeActive ? false : true} type='text' placeholder='Enter your new tag title' />
                                            {updateModeActive
                                                ?
                                                <>
                                                    <label>
                                                        In Set:
                                                        <select onChange={handleExistingSetChange}>
                                                            {setArray?.filter(entry => entry.title === currentTag.primarySet).map(entry => <option key={entry.id} value={entry.title}>{entry.title}</option>)}
                                                            {setArray?.filter(entry => entry.title !== currentTag.primarySet).map(entry => <option key={entry.id} value={entry.title}>{entry.title}</option>)}
                                                        </select>
                                                    </label>
                                                    <button type='button' onClick={cancelUpdateMode} >Cancel Update</button>
                                                    <button type='button' onClick={updateTag} >Save New Values</button>
                                                </>
                                                :
                                                <>
                                                    <button type='button' onClick={enableUpdateMode} >Update</button>
                                                    <button type='button' onClick={markTagAsDeleted} >Delete</button>
                                                </>
                                            }
                                        </div>
                                        :
                                        null
                                }
                            </>
                            :
                            null
                    }

                    {/* New Tag Placement and Setter */}
                    {
                        displayNewTagTab
                            ?
                            <div className='input-display-container'>
                                <input value={tagTitle} onInput={handleControlledInputs} type='text' placeholder='Enter your new tag title' />
                                <label>
                                    Assign to Set:
                                    <select ref={newTagPrimarySetRef} onChange={handleNewPrimarySetChange}>
                                        {setArray?.map(entry => <option key={entry.id} value={entry.title}>{entry.title}</option>)}
                                    </select>
                                </label>
                                <button type='button' onClick={saveNewTag} >Save New</button>
                            </div>
                            :
                            null
                    }
                </div>
            </div>
        </div>
    )
}