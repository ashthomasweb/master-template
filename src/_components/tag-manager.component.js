import { useContext } from 'react'
import { MainContext } from '../context/MainContext'

export default function TagManager(props) {
    const {
        mainState: {
        },
        mainDispatch
    } = useContext(MainContext)

    return (
        <div className='modal-container'>
            <div className={`menu-modal tag-manager ${props.isOpen ? 'isOpen' : ''}`}>
                <div className='modal-header'><span>TagManager</span></div>
                {/* <select onInput={handleCategoryChange}>
                        <option value='Add New'>Add New</option>
                        {currentSet?.categories?.map(entry => <option key={entry.title} value={entry.title}>{entry.title}</option>)}
                    </select> */}
                {/* {newCategoryInputDisplay
                        ?
                        <>
                            <input ref={categoryTitleRef} type='text' placeholder='Enter your new Category title' />
                            <input ref={categorySubtitleRef} type='text' placeholder='Enter your subtitle' />
                            <button type='button' onClick={saveNewCategory}>Save</button>
                        </>
                        : null
                    } */}
            </div>
        </div>
    )
}