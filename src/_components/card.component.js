import { useContext } from 'react'
import { MainContext } from '../context/MainContext'
import DisplayService from '../services/display.service'

export default function Card() {
    const {
        mainState: {
            isCardFrontDisplayed,
            isDualCardDisplayActive
        },
        mainDispatch
    } = useContext(MainContext)

    const toggleCardDisplay = () => {
        DisplayService.toggleCardDisplay(isCardFrontDisplayed)
    }

    return (
        <>
            <div className={`card front ${isCardFrontDisplayed ? 'isFrontDisplayed' : ''} ${isDualCardDisplayActive ? 'dual-display' : ''}`} onClick={toggleCardDisplay}>
                CardFront
                <button type='button' className='flip-button' onClick={toggleCardDisplay}>Flip</button>
            </div>
            <div className={`card back ${!isCardFrontDisplayed ? 'isBackDisplayed' : ''} ${isDualCardDisplayActive ? 'dual-display' : ''}`} onClick={toggleCardDisplay}>
                CardBack
                <button className='flip-button' type='button' onClick={toggleCardDisplay}>Flip</button>
            </div>
        </>
    )
}