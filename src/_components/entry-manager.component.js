import { useContext, useState, useRef, useEffect } from 'react'
import { MainContext } from '../context/MainContext'
import { Entry, Tag } from '../config/data-types'
import CategoryService from '../services/category.service'
import DataService from '../services/data.service'
import SetService from '../services/set.service'
import EntryService from '../services/entry.service'
import TagService from '../services/tag.service'

export default function EntryManager(props) {
    const {
        mainState: {
            currentCategory,
            currentSet,
            userObj,
            tagArray,
            setArray
        }
    } = useContext(MainContext)

    const [newEntryInputDisplay, setNewEntryInputDisplay] = useState(true)
    const [addTagInputDisplay, setAddTagInputDisplay] = useState(true)
    const [selectedSet, setSelectedSet] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState(null)

    // useEffect(() => {
    //     setSelectedSet(setArray[0])
    //     setSelectedCategory(setArray[0].categories)
    // }, [setArray])

    const entryQuestionRef = useRef(null)
    const entryAnswerRef = useRef(null)
    const tagMenuRef = useRef(null)
    const newTagRef = useRef(null)
    const setRef = useRef(null)
    const categoryRef = useRef(null)


    const handleEntryChange = ({ target }) => {
        target.value === 'Add New' ? setNewEntryInputDisplay(true) : setNewEntryInputDisplay(false)
    }

    const saveNewEntry = async () => {
        // build data and options
        const entryQuestion = entryQuestionRef.current.value
        const entryAnswer = entryAnswerRef.current.value
        const tags = []
        const count = null
        const forceString = true
        const entryId = DataService.generateNewId(15, forceString)
        const newEntry = new Entry(entryId, entryQuestion, entryAnswer, currentSet.id, currentCategory.id, tags, count)
        await EntryService.saveNewEntry(newEntry, userObj)
    }

    const handleSetChange = () => {
        setSelectedSet(setArray.filter(entry => entry.title === setRef.current.value)[0])
    }

    const handleCategoryChange = () => {
        setSelectedCategory(setArray.filter(entry => entry.title === setRef.current.value)[0].categories.filter(entry => entry.title === categoryRef.current.value)[0])
    }

    const selectionSearchHandler = () => {
        console.log(selectedSet, selectedCategory)

    }

    // const handleTagChange = () => {
    //     tagMenuRef.current.value === 'Add New Tag' ? setAddTagInputDisplay(true) : setAddTagInputDisplay(false)
    // }

    // const addNewTag = () => {
    //     const tagId = DataService.generateNewId(15, true)
    //     const newTag = new Tag(tagId, newTagRef.current.value)
    //     TagService.createNewTag(newTag)
    // }

    return (
        <div className='entry-manager'>
            <div className={`menu-modal ${props.isOpen ? 'isOpen' : ''}`}>
                <div className='entry-header'><span>Entry Manager</span><span>{currentSet.title}:{currentCategory.title ? currentCategory.title : 'None selected'}</span></div>
                <div className='selection-menus'>
                    <label>Set:</label>
                    <select ref={setRef} onChange={handleSetChange}>
                        { selectedSet === null ? <option>Pick A Set</option> : null}
                        {setArray.map(entry => <option key={entry.id} value={entry.title}>{entry.title}</option>)}
                    </select>
                    <label>Category:</label>
                    <select ref={categoryRef} onChange={handleCategoryChange}>
                        {
                            selectedSet?.categories.map(entry => <option key={entry.id} value={entry.title}>{entry.title}</option>)
                        }
                    </select>
                    <button type='button' onMouseDown={selectionSearchHandler}>Search within selected options</button>
                </div>
                {newEntryInputDisplay
                    ?
                    <>
                        <textarea ref={entryQuestionRef} type='text' placeholder='Enter your new Question' />
                        <textarea ref={entryAnswerRef} type='text' placeholder='Enter your answer' />

                        <button type='button' onClick={saveNewEntry}>Save</button>
                    </>
                    : null
                }
                <hr />
                {/* <select onInput={handleEntryChange}>
                    <option value='Add New'>Add New</option>
                    {
                        currentEntries.filter(entry => entry.setId === currentSet.id || entry.categoryId === currentCategory.id)
                            .map(entry => <option key={entry.id} value={entry.title}>{entry.title}</option>)
                    }
                </select> */}

            </div>
        </div>
    )
}