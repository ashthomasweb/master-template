import {  } from "react"
import Main from "./_components/main.component"
import MainProvider from "./context/MainContext"

export function App() {
    return (
        <MainProvider>
            <Main />
        </MainProvider>
    )
}
