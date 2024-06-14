import { useContext, useState, useRef } from 'react'
import { MainContext } from '../context/MainContext'
import { Category } from '../config/data-types'
import DataService from '../services/data.service'

export default function CategoryManager(props) {
    const {
        mainState: {
            currentCategory,
            currentSet,
            userObj
        }
    } = useContext(MainContext)

    const [newCategoryInputDisplay, setNewCategoryInputDisplay] = useState(true)
    const categoryTitleRef = useRef(null)
    const categorySubtitleRef = useRef(null)
    
    const handleCategoryChange = ({ target }) => {
        console.log(target.value)
        target.value === 'Add New' ? setNewCategoryInputDisplay(true) : setNewCategoryInputDisplay(false)
    }

    const saveNewCategory = () => {
        const title = categoryTitleRef.current.value
        const subtitle = categorySubtitleRef.current.value
        const forceString = true
        const id = DataService.generateNewId(15, forceString)
        const categoryEntries = null

        const newCategory = new Category(id, title, subtitle, categoryEntries)
        DataService.saveNewCategory(newCategory, userObj)
    }

    return (
        <div className='category-manager'>
              <div className={`menu-modal ${props.isOpen ? 'isOpen' : ''}`}>
              <div className='category-header'><span>Category Manager</span><span>{currentCategory}</span></div>
              <select onInput={handleCategoryChange}>
                    <option value='Add New'>Add New</option>
                    {/* {setArray.map((entry, index) => <option key={entry.title} value={entry.title}>{entry.title}</option>)} */}
                </select>
                {newCategoryInputDisplay
                    ?
                    <>
                        <input ref={categoryTitleRef} type='text' placeholder='Enter your new Category title' />
                        <input ref={categorySubtitleRef} type='text' placeholder='Enter your subtitle' />
                        <button type='button' onClick={saveNewCategory}>Save</button>
                    </>
                    : null}

            </div>
        </div>
    )
}