import { createContext } from "react"
import { useReducer } from "react"
import FirebaseAuthService from '../services/firebase/firebase-auth.service'
import FirebaseReadService from "../services/firebase/firebase-read.service"
import FirebaseUpdateService from "../services/firebase/firebase-update.service"
import FirebaseDeleteService from "../services/firebase/firebase-delete.service"
import DisplayService from '../services/display.service'
import DataService from "../services/data.service"
import SetService from "../services/set.service"
import CategoryService from "../services/category.service"
import EntryService from "../services/entry.service"

export const MainContext = createContext()

export const initialMainState = {
    userName: 'User',
    userObj: null,
    readDisplay: null,
    isCardFrontDisplayed: true,
    isDualCardDisplayActive: false,
    /* Sets */
    currentSet: 'Select A Set',
    setArray: [],
    /* Categories */
    currentCategory: 'Select A Category',
    categoryArray: [],
    /* Entry */
    currentEntry: null,
    /* Tags */
    tagArray: [],
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
    SetService.setLocalDispatch(mainDispatch)
    CategoryService.setLocalDispatch(mainDispatch)
    EntryService.setLocalDispatch(mainDispatch)
    // DataService.setLocalDispatch(mainDispatch)
    // DataService.setLocalDispatch(mainDispatch)

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