import FirebaseAuthService from '../_services/firebase/firebase-auth.service'

class AuthInterface {
    userLogin() {
        FirebaseAuthService.firebaseSignIn()
    }

    userLogout() {
        FirebaseAuthService.firebaseSignOut()
    }
}

export default new AuthInterface()
