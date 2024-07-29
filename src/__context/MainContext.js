import { createContext } from "react"
import { useReducer } from "react"
import FirebaseAuthService from '../_services/firebase/firebase-auth.service'
import FirebaseReadService from "../_services/firebase/firebase-read.service"
import FirebaseUpdateService from "../_services/firebase/firebase-update.service"
import FirebaseDeleteService from "../_services/firebase/firebase-delete.service"
import DisplayService from '../_services/display.service'
import DataService from "../_services/data.service"

export const MainContext = createContext()

export const initialMainState = {
    userName: 'User',
    userObj: {temp: 'user'},
    // userObj: null,
}

const MainReducer = (state, action) => {
    return {
        ...state,
        ...action.payload
    }
}

const MainProvider = (props) => {
    const [mainState, mainDispatch] = useReducer(MainReducer, initialMainState)

    DisplayService.setLocalDispatch(mainDispatch)
    DataService.setLocalDispatch(mainDispatch)

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