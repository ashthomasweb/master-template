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
            userObj
        },
        mainDispatch
    } = useContext(MainContext)

    const [newTagInputDisplay, setNewTagInputDisplay] = useState(true)
    const [tagTitle, setTagTitle] = useState('')
    const tagTitleRef = useRef(null)
    const selectMenuRef = useRef(null)

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

    const saveNewTag = () => {
        const forceIdAsString = true
        const id = dataService.generateNewId(15, forceIdAsString)
        const newTag = new Tag(id, tagTitleRef.current.value)
        TagService.createNewTag(newTag)
    }

    const tagUpdateHandler = ({ target }) => {
        setTagTitle(target.value)
    }

    return (
        <div className='modal-container'>
            <div className={`menu-modal tag-manager ${props.isOpen ? 'isOpen' : ''}`}>
                <div className='modal-header'><span>TagManager</span></div>
                <div className='content'>
                    <select ref={selectMenuRef} onInput={handleTagChange}>
                        <option value='Add New'>Add New</option>
                        {tagArray?.map(entry => <option key={entry.id} value={entry.title}>{entry.title}</option>)}
                    </select>
                    <div className='input-display-container'>
                        <input ref={tagTitleRef} value={tagTitle} onInput={tagUpdateHandler} readOnly={newTagInputDisplay ? false : true} type='text' placeholder='Enter your new tag title' />
                        <button type='button' onClick={saveNewTag} >Save New</button>
                    </div>
                </div>
            </div>
        </div>
    )
}