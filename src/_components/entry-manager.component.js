import { useContext, useState, useRef } from 'react'
import { MainContext } from '../context/MainContext'
import { Entry, Tag } from '../config/data-types'
import DataService from '../services/data.service'
import EntryService from '../services/entry.service'
import TagService from '../services/tag.service'

export default function EntryManager(props) {
    const {
        mainState: {
            userObj,
            tagArray,
            setArray,
            requestedEntries
        }
    } = useContext(MainContext)

    const [newEntryInputDisplay, setNewEntryInputDisplay] = useState(false)
    const [showRequestedEntries, setShowRequestedEntries] = useState(false)

    // const [addTagInputDisplay, setAddTagInputDisplay] = useState(true)
    const [selectedSet, setSelectedSet] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [selectedTag, setSelectedTag] = useState(null)
    const [selectedTagsArray, setSelectedTagsArray] = useState([])

    const entryQuestionRef = useRef(null)
    const entryAnswerRef = useRef(null)
    const tagSelectionRef = useRef(null)
    // const newTagRef = useRef(null)
    const selectMenuRef = useRef(null)
    const categoryRef = useRef(null)


    const allowNewEntry = () => {
        setNewEntryInputDisplay(true)
        setShowRequestedEntries(false)
    }

    const saveNewEntry = async () => {
        // build data and options
        const entryQuestion = entryQuestionRef.current.value
        const entryAnswer = entryAnswerRef.current.value
        const tags = []
        const count = null
        const forceString = true
        const entryId = DataService.generateNewId(15, forceString)
        const newEntry = new Entry(entryId, entryQuestion, entryAnswer, selectedSet.id, selectedCategory.id, tags, count)
        await EntryService.saveNewEntry(newEntry, userObj)
    }

    const handleSetChange = () => {
        setSelectedSet(setArray.filter(entry => entry.title === selectMenuRef.current.value)[0])
        setSelectedCategory(null)
    }

    const handleCategoryChange = () => {
        setSelectedCategory(setArray.filter(entry => entry.title === selectMenuRef.current.value)[0].categories.filter(entry => entry.title === categoryRef.current.value)[0])
    }

    const selectionSearchHandler = async () => {
        setNewEntryInputDisplay(false)
        setShowRequestedEntries(true)
        await EntryService.getSelectedEntries(selectedSet, selectedCategory, userObj)
    }

    // const handleTagChange = () => {
    //     tagMenuRef.current.value === 'Add New Tag' ? setAddTagInputDisplay(true) : setAddTagInputDisplay(false)
    // }

    // const addNewTag = () => {
    //     const tagId = DataService.generateNewId(15, true)
    //     const newTag = new Tag(tagId, newTagRef.current.value)
    //     TagService.createNewTag(newTag)
    // }

    const deleteEntry = ({ target }) => {
        console.dir(target.parentElement)
    }

    const updateEntry = ({ target }) => {

    }

    const addSelectedTagToEntry = () => {
        console.log(selectedTag)
        setSelectedTagsArray([...new Set([...selectedTagsArray, selectedTag])])
    }

    const handleTagSelectionChange = ({ target }) => {
        const selectedTag = tagArray.filter(entry => entry.id === target.value)[0]
        setSelectedTag(selectedTag)
    }

    return (
        <div className='modal-container'>
            <div className={`menu-modal entry-manager ${props.isOpen ? 'isOpen' : ''}`}>
                <div className='modal-header'><span>Entry Manager</span><span>{selectedSet ? selectedSet.title : 'Select a Set'}:{selectedCategory ? selectedCategory.title : 'Optional Category'}</span></div>
                <div className='selection-menus'>
                    <label>Set:</label>
                    <select ref={selectMenuRef} onChange={handleSetChange}>
                        {selectedSet === null ? <option>Pick A Set</option> : null}
                        {setArray.map(entry => <option key={entry.id} value={entry.title}>{entry.title}</option>)}
                    </select>
                    <label>Category:</label>
                    <select ref={categoryRef} onChange={handleCategoryChange}>
                        <option >Select a Category</option>
                        {selectedSet?.categories.filter(entry => !Object.keys(entry).includes('deletedAt')).map(entry => <option key={entry.id} value={entry.title}>{entry.title}</option>)}
                    </select>
                    <br />
                    <button type='button' onMouseDown={selectionSearchHandler}>Search within selected options</button>
                    <button className={`save-new-entry ${selectedCategory ? 'isActive' : 'isDisabled'}`} type='button' onMouseDown={allowNewEntry} >Create new Entry at selected options</button>
                </div>

                {newEntryInputDisplay
                    ?
                    <div className='new-entry-container'>
                        <textarea ref={entryQuestionRef} type='text' placeholder='Enter your new Question' />
                        <textarea ref={entryAnswerRef} type='text' placeholder='Enter your answer' />
                        <button type='button' onClick={saveNewEntry}>Save</button>
                    </div>
                    : null
                }

                {showRequestedEntries
                    ?
                    <div className='requested-entry-container'>
                        <h2>{`Entries matching Set: ${selectedSet.title} and Category: ${selectedCategory.title}`}</h2>
                        <hr />
                        {requestedEntries.map((entry, index) => {
                            // console.log(entry)

                            return (<div className='existing-entry' key={entry.id} data-id={entry.id}>
                                <label>Entry {index}:</label>
                                <textarea defaultValue={entry.question}></textarea>
                                <textarea defaultValue={entry.answer} ></textarea >
                                <div className='existing-tags-container'>
                                    {entry.tags.map(tag => {
                                        <span>{tag.title}</span>
                                    })}
                                </div>
                                <div className='tag-selection-container'>
                                    <select ref={tagSelectionRef} onChange={handleTagSelectionChange}>
                                        <option key='0' value='Choose From Existing'>Choose From Existing In Selected Set</option>
                                        {tagArray.filter(entry => entry.primarySet === selectedSet.title).map(tag => (
                                            <option key={tag.id} value={tag.id}>{tag.title}</option>
                                        ))}
                                    </select>
                                    <button type='button' onClick={addSelectedTagToEntry}>Add</button>
                                    <div className='temp-tag-container'>
                                        {selectedTagsArray.map(entry => <span key={entry.id}>{entry.title}</span>)}
                                    </div>
                                </div>
                                <div className='controls-container'>
                                    <button type='button' onClick={deleteEntry} >Delete</button>
                                    <button type='button' onClick={updateEntry} >Update</button>
                                </div>

                                <hr />
                            </div>
                            )
                        })}
                        <hr />
                    </div>
                    : null
                }
            </div>
        </div >
    )
}
