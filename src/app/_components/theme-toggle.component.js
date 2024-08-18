import { useContext } from 'react'
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

    const handleThemeToggle = () => {
        ThemeService.switchTheme(theme)
    }

    return (
        <div className='theme-toggle-container'>
            <div className='icon-container'>
                {theme === 'day'
                    ? <SVGIcon src={iconPaths.sun}  />
                    : <SVGIcon src={iconPaths.moon}  />
                }
            </div>

            <label className="switch">
                <input type="checkbox" checked={theme === 'night'} onClick={handleThemeToggle} readOnly />
                <span className="slider round"></span>
            </label>
        </div>
    )
}