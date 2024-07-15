import { useContext } from 'react'
import { MainContext } from '../context/MainContext'
import Card from '../_components/card.component'
import Stats from '../_components/stats.component'

export default function ContentView() {
    const {
        mainState: {
            userObj,
            userName,
            currentSet,
            currentCategory
        }
    } = useContext(MainContext)

    return (
        <div className='content-view'>
            <div className='content-header'>
                {
                    userObj !== null
                        ? <div className='user-info'>
                            Welcome<br />{userName}!
                        </div>
                        : null
                }
                <div className='quiz-header'>
                    <span><strong>Set:</strong> {currentSet !== 'Select A Set' ? currentSet.title : 'None Selected'}</span><span><strong>Category:</strong> {currentCategory !== 'Select A Category' ? currentCategory?.title : 'None Selected'}</span>
                </div>
            </div>
            <Card />
            <Stats />
        </div>
    )
}