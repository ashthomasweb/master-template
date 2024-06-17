import { useContext, useEffect, useRef, useState } from 'react'
import { MainContext } from '../context/MainContext'
import { Set } from '../config/data-types'
import SetService from '../services/set.service'
import DataService from '../services/data.service'

export default function SetManager(props) {
    const {
        mainState: {
            currentSet,
            setArray,
            userObj
        },
        mainDispatch
    } = useContext(MainContext)

    const [newSetInputDisplay, setNewSetInputDisplay] = useState(true)

    const setTitleRef = useRef(null)
    const setSubtitleRef = useRef(null)

    const handleSetChange = ({ target }) => {
        if (target.value === 'Add New') {
            setNewSetInputDisplay(true)
        } else {
            setNewSetInputDisplay(false)
            SetService.setActiveSet(setArray.filter(entry => entry.title === target.value)[0])
        } 
    }

    useEffect(() => {
        SetService.retrieveAllSets(userObj)
    }, [])

    const saveNewSet = () => {
        const title = setTitleRef.current.value
        const subtitle = setSubtitleRef.current.value
        const forceString = true
        const id = DataService.generateNewId(15, forceString)
        const setCategories = []
        const newSet = new Set(id, title, subtitle, setCategories)
        SetService.saveNewSet(newSet, userObj)
    }

    return (
        <div className={`set-manager `}>
            <div className={`menu-modal ${props.isOpen ? 'isOpen' : ''}`}>
                <div className='set-header'><span>Set Manager</span><span>{currentSet.title}</span></div>
                <select onInput={handleSetChange}>
                    <option value='Add New'>Add New</option>
                    {setArray.map(entry => <option key={entry.title} value={entry.title}>{entry.title}</option>)}
                </select>
                {newSetInputDisplay
                    ?
                    <>
                        <input ref={setTitleRef} type='text' placeholder='Enter your new Set title' />
                        <input ref={setSubtitleRef} type='text' placeholder='Enter your subtitle' />
                        <button type='button' onClick={saveNewSet}>Save</button>
                    </>
                    : null}
            </div>
        </div>
    )
}