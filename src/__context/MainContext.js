import { createContext } from "react"
import { useReducer } from "react"
import FirebaseAuthService from '../_services/firebase/firebase-auth.service'
import FirebaseReadService from "../_services/firebase/firebase-read.service"
import FirebaseUpdateService from "../_services/firebase/firebase-update.service"
import FirebaseDeleteService from "../_services/firebase/firebase-delete.service"
import DisplayService from '../_services/display.service'
import DataService from "../_services/data.service"
import ContextValidator from "./ContextValidator"
import DebugService from "../_services/debug.service"
export const MainContext = createContext()

export const initialMainState = {
    userName: 'User',
    userObj: { temp: 'user' },
    testArray: [1, 2, 3, 4, [10, {key: 'value'}]],
    testObjectLit: {
        test: 'value'
    }
    // userObj: null,
}

const MainReducer = (state, action) => {
    
    if (ContextValidator.validate(action.payload, initialMainState, 'MainContext')) {
        return {
            ...state,
            ...action.payload
        }
    }
}

const MainProvider = (props) => {
    const [mainState, mainDispatch] = useReducer(MainReducer, initialMainState)

    DisplayService.setLocalDispatch(mainDispatch)
    DataService.setLocalDispatch(mainDispatch)
    DebugService.setLocalDispatch(mainDispatch)
    
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