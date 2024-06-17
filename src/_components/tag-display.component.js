import { useContext } from 'react'
import { MainContext } from '../context/MainContext'

export default function TagDisplay() {
    const {
        mainState: {
            currentEntry
        },
    } = useContext(MainContext)

    return (
        <div className='tag-display-container'>
            {
                currentEntry.tags.map(entry => (
                    <div>
                        {entry.title}
                    </div>
                ))
            }
        </div>
    )
}