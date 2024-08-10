class ThemeService {
    mainDispatch = null
    
    constructor() {
        this.appViewRef = null 
    }
    
    setLocalDispatch(dispatch) {
        this.mainDispatch = dispatch
    }

    switchTheme(input) {
        const payload = {
            theme: input === 'night' ? 'day' : 'night'
        }
        this.mainDispatch({ payload })
    }
}

export default new ThemeService()