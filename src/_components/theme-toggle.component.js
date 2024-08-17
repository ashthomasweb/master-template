import { useContext } from 'react'
import {
    /* Firebase */
    /* Components */
    /* Context */
    MainContext,
    /* Views */
    /* Custom Hooks */
    /* Service Classes */
    ThemeService,
    /* Utility Functions */
    /* Assets */
    /* Icons */
    /* Configs */
    /* Types */
    /* Interfaces */
    /* DeveloperTools */
    debug,
    logInit,
    trace,
    m
} from '../app-index'

/* Trace vars */
const run = false
const file = ''
const msg = (copy, fileName = file) => m(copy, fileName)
/* END Trace vars */

export default function ThemeToggle() {
    const {
        mainState: {
            theme
        }
    } = useContext(MainContext)

    const handleThemeToggle = () => {
        ThemeService.switchTheme(theme)
    }

    return (
        <div className='theme-toggle-container'>
            <label className="switch">
                <input type="checkbox" checked={theme === 'night'} onClick={handleThemeToggle} readOnly/>
                    <span className="slider round"></span>
            </label>
        </div>
    )
}