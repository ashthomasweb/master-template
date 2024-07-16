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
            currentEntry,
            currentSet,
            currentCategory,
            statCount
        },
    } = useContext(MainContext)

    const toggleCardDisplay = () => {
        DisplayService.toggleCardDisplay(isCardFrontDisplayed)
    }

    const resetQuiz = () => {
        QuizService.resetQuiz(quizzableEntries)
    }

    const startQuiz = () => {
        QuizService.startQuiz(currentQuizEntries)
    }

    const handleSuccessfulEntry = () => {
        QuizService.nextQuizEntry(currentEntry, currentQuizEntries, quizzableEntries, statCount, 'success')
    }

    const handleFailedEntry = () => {
        QuizService.nextQuizEntry(currentEntry, currentQuizEntries, quizzableEntries, statCount, 'fail')
    }

    return (
        <div className='quiz-container'>
            <div className='quiz-controls'>
                {
                    quizzableEntries.length > 0
                        ? quizzableEntries.length === currentQuizEntries.length
                            ? <button type='button' onClick={startQuiz}>Start!</button>
                            : <button type='button' onClick={resetQuiz}>Reset</button>
                        : `Use 'Quiz Menu' to start`
                }
            </div>
            <div className={`card front ${isCardFrontDisplayed ? 'isFrontDisplayed' : ''} ${isDualCardDisplayActive ? 'dual-display' : ''}`} onClick={toggleCardDisplay}>
                <span>Question:</span>
                {currentEntry.question}
            </div>
            <div className={`card back ${!isCardFrontDisplayed ? 'isBackDisplayed' : ''} ${isDualCardDisplayActive ? 'dual-display' : ''}`} onClick={toggleCardDisplay}>
                <span>Answer:</span>
                {currentEntry.answer}
            </div>
            {
                Object.keys(currentEntry).length > 0
                    ?
                    <div className='controls-container'>
                        <button className='flip-button' type='button' onClick={toggleCardDisplay}>Flip</button>
                        <hr />
                        <div>
                            <button className='success-button' type='button' onClick={handleSuccessfulEntry}>Success</button>
                            <button className='fail-button' type='button' onClick={handleFailedEntry}>Fail</button>
                        </div>
                    </div>
                    : null
            }
        </div>
    )
}