import { useContext, useRef, useState } from 'react'
import { MainContext } from '../context/MainContext'
import { Set } from '../config/data-types'
import DataService from '../services/data.service'

export default function SetManager(props) {
    const {
        mainState: {
            currentSet,
            setArray
        },
        mainDispatch
    } = useContext(MainContext)

    const [newSetInput, setNewSetInput] = useState(false)

    const setTitleRef = useRef(null)
    const setSubtitleRef = useRef(null)

    const handleSetChange = ({ target }) => {
        console.log(target.value)
        target.value === 'Add New' ? setNewSetInput(true) : setNewSetInput(false)
    }

    const saveNewSet = () => {
        const title = setTitleRef.current.value
        const subtitle = setSubtitleRef.current.value
        const forceString = true
        const id = DataService.generateNewId(15, forceString)
        const setCategories = null
        const newSet = new Set(id, title, subtitle, setCategories)
        console.log(newSet)
    }

    return (
        <div className={`set-manager `}>
            <div className={`menu-modal ${props.isOpen ? 'isOpen' : ''}`}>
                Set Manager
                <select onChange={handleSetChange}>
                    <option value='Add New'>Add New</option>
                    {setArray.map((entry, index) => <option key={entry.title} value={entry.title}>{entry.title}</option>)}
                </select>
                {newSetInput
                    ?
                    <>
                        <input ref={setTitleRef} type='text' placeholder='Enter your new Set title' />
                        <input ref={setSubtitleRef} type='text' placeholder='Enter your new Set subtitle' />
                        <button type='button' onClick={saveNewSet}>Save</button>
                    </>
                    : null}
            </div>
        </div>
    )
}