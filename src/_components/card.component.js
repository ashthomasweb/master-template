import { useContext } from 'react'
import { MainContext } from '../context/MainContext'
import DisplayService from '../services/display.service'
import QuizService from '../services/quiz.service'

export default function Card() {
    const {
        mainState: {
            isCardFrontDisplayed,
            isDualCardDisplayActive,
            quizzableEntries,
            currentQuizEntries,
            currentEntry
        },
    } = useContext(MainContext)

    const toggleCardDisplay = () => {
        DisplayService.toggleCardDisplay(isCardFrontDisplayed)
    }

    const resetQuiz = () => {

    }

    const startQuiz = () => {
        QuizService.startQuiz(currentQuizEntries) 
    }

    const handleSuccessfulEntry = () => {
        QuizService.nextQuizEntry(currentEntry, currentQuizEntries, quizzableEntries)
    }

    const handleFailedEntry = () => {
        QuizService.nextQuizEntry(currentEntry, currentQuizEntries, quizzableEntries)
    }

    return (
        <div className='quiz-container'>
            <div className='quiz-controls'>
                {
                    quizzableEntries.length > 0
                        ? quizzableEntries.length === currentQuizEntries.length
                            ? <button type='button' onClick={startQuiz}>Start!</button>
                            : <button type='button' onClick={resetQuiz}>Reset</button>
                        : null
                }
            </div>
            <div className={`card front ${isCardFrontDisplayed ? 'isFrontDisplayed' : ''} ${isDualCardDisplayActive ? 'dual-display' : ''}`} onClick={toggleCardDisplay}>
                {currentEntry.question}
            </div>
            <div className={`card back ${!isCardFrontDisplayed ? 'isBackDisplayed' : ''} ${isDualCardDisplayActive ? 'dual-display' : ''}`} onClick={toggleCardDisplay}>
                {currentEntry.answer}
            </div>
            <div className='controls-container'>
                <button className='flip-button' type='button' onClick={toggleCardDisplay}>Flip</button>
                <button className='success-button' type='button' onClick={handleSuccessfulEntry}>Success</button>
                <button className='fail-button' type='button' onClick={handleFailedEntry}>Fail</button>
            </div>
        </div>
    )
}