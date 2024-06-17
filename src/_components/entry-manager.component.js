import { useContext, useState, useRef } from 'react'
import { MainContext } from '../context/MainContext'
import { Entry } from '../config/data-types'
import CategoryService from '../services/category.service'
import DataService from '../services/data.service'
import SetService from '../services/set.service'
import EntryService from '../services/entry.service'

export default function EntryManager(props) {
    const {
        mainState: {
            currentCategory,
            currentSet,
            userObj
        }
    } = useContext(MainContext)

    const [newEntryInputDisplay, setNewEntryInputDisplay] = useState(true)
    const entryQuestionRef = useRef(null)
    const entryAnswerRef = useRef(null)

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

    return (
        <div className='entry-manager'>
            <div className={`menu-modal ${props.isOpen ? 'isOpen' : ''}`}>
                <div className='entry-header'><span>Entry Manager</span><span>{currentSet.title}:{currentCategory.title ? currentCategory.title : 'None selected'}</span></div>
                <select onInput={handleEntryChange}>
                    <option value='Add New'>Add New</option>
                    {/* {currentSet.categories.map(entry => <option key={entry.title} value={entry.title}>{entry.title}</option>)} */}
                </select>

                {newEntryInputDisplay
                    ?
                    <>
                        <textarea ref={entryQuestionRef} type='text' placeholder='Enter your new Question' />
                        <textarea ref={entryAnswerRef} type='text' placeholder='Enter your answer' />
                        <button type='button' onClick={saveNewEntry}>Save</button>
                    </>
                    : null
                }
            </div>
        </div>
    )
}