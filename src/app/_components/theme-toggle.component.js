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
    /* Configs */
    /* Types */
    /* Interfaces */
    /* DeveloperTools */
    debug,
    logInit,
    trace,
    m
} from '../../app-index'

/* Trace vars */
const run = false
const file = ''
const msg = (copy, fileName = file) => m(copy, fileName)
/* END Trace vars */

export default function ThemeToggle() {
    logInit && logComponentInit(file)

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
                    <div className='slider-thumb'></div>
                    <div className={`icon-container ${isChecked ? 'isNight' : ''}`}>
                        {theme === 'day'
                            ? <SVGIcon src={'sun'} />
                            : <SVGIcon src={'moon'} />
                        }
                    </div>
                </span>
            </label>
        </div>
    )
}
