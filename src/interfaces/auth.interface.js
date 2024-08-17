import {
    /* Firebase */
    FirebaseAuthService,
    /* Components */
    /* Context */
    /* Views */
    /* Custom Hooks */
    /* Service Classes */
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
const t = false
const file = ''
const msg = (copy, fileName = file) => m(copy, fileName)
/* END Trace vars */

class AuthInterface {
    userLogin() {
        FirebaseAuthService.firebaseSignIn()
    }

    userLogout() {
        FirebaseAuthService.firebaseSignOut()
    }
}

export default new AuthInterface()
