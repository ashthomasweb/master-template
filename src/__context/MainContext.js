import { createContext, useReducer } from "react"
import {
    /* Firebase */
    FirebaseAuthService,
    FirebaseReadService,
    FirebaseUpdateService,
    FirebaseDeleteService,
    /* Components */
    /* Context */
    ContextValidator,
    /* Views */
    /* Custom Hooks */
    logComponentInit,
    /* Service Classes */
    DisplayService,
    DataService,
    /* Utility Functions */
    /* Assets */
    /* Icons */
    /* Configs */
    /* Types */
    /* Interfaces */
    /* DeveloperTools */
    DebugService,
    debug,
    trace,
    m
} from '../app-index'
import ThemeService from "../_services/theme.service"

/* Trace vars */
const t = false
const file = 'MainProvider'
const msg = (copy, fileName = file) => m(copy, fileName)
/* END Trace vars */

export const MainContext = createContext()
// debug && log(...msg('MainContext init'))
console.log('%cTRACE: MainContext Init', 'color: green; font-weight: 900')

export const initialMainState = {
    userName: null,
    userObj: null,
    theme: 'night',

    /* Test values */
    // testArray: [1, 2, 3, 4, [10, { key: 'value' }]],
    // testObjectLit: {
        // test: 'value'
    // },
}

const MainReducer = (state, action) => {
    try {
        ContextValidator.validate(action.payload, initialMainState, 'MainContext')
        return {
            ...state,
            ...action.payload
        }
    } catch (error) {
        console.error(error)
        return {
            ...state
        }    
    }
}

const MainProvider = (props) => {
    debug && logComponentInit(file)

    const [mainState, mainDispatch] = useReducer(MainReducer, initialMainState)

    DisplayService.setLocalDispatch(mainDispatch)
    DataService.setLocalDispatch(mainDispatch)
    DebugService.setLocalDispatch(mainDispatch)
    ThemeService.setLocalDispatch(mainDispatch)
    FirebaseAuthService.setLocalDispatch(mainDispatch)
    FirebaseReadService.setLocalDispatch(mainDispatch)
    FirebaseUpdateService.setLocalDispatch(mainDispatch)
    FirebaseDeleteService.setLocalDispatch(mainDispatch)

    return (
        <MainContext.Provider value={{ mainState, mainDispatch }}>
            {props.children}
        </MainContext.Provider>
    )
}

export default MainProvider
