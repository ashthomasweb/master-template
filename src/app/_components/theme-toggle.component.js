import { useContext, useState } from 'react'
import {
    /* Firebase */
    /* Components */
    SVGIcon,
    /* Context */
    MainContext,
    /* Views */
    /* Custom Hooks */
    /* Service Classes */
    ThemeService,
    /* Utility Functions */
    /* Assets */
    /* Icons */
    iconPaths,
    // sunIcon,

    /* Configs */
    /* Types */
    /* Interfaces */
    /* DeveloperTools */
    debug,
    logInit,
    trace,
    m
} from '../../app-index'
// import iconPaths from '../config/icon-paths'

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

    const [isChecked, setIsChecked] = useState(true)

    const handleThemeToggle = () => {
        ThemeService.switchTheme(theme)
        theme === 'night' ? setIsChecked(false) : setIsChecked(true)
    }

    return (
        <div className='theme-toggle-container'>


            <label className="switch">
                <input type="checkbox" checked={isChecked} onClick={handleThemeToggle} readOnly />
                <span className="slider round">
                    <div className={`icon-container ${isChecked ? 'isNight' : ''}`}>
                        {theme === 'day'
                            ? <SVGIcon src={iconPaths.sun} />
                            : <SVGIcon src={iconPaths.moon} />
                        }
                    </div>
                </span>
            </label>
        </div>
    )
}