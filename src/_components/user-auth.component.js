import AuthInterface from '../interfaces/auth.interface'
import { useContext } from 'react'
import { MainContext } from '../__context/MainContext'

export default function UserAuth() {
    const {
        mainState: {
            userObj
        }
    } = useContext(MainContext)

    const userLogin = () => {
        AuthInterface.userLogin()
    }

    const userLogout = () => {
        AuthInterface.userLogout()
    }

    return (
        <div className="entry-auth-modal" >
            <h2>User Authentication</h2>
            <button type='button' onClick={userLogin}>Login</button>
            {
                userObj !== null
                    ? <>
                        <hr />
                        <button type='button' onClick={userLogout}>Logout</button>
                    </>
                    : null
            }
        </div>
    )
}