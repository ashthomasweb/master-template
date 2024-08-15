class ThemeService {
    mainDispatch = null
    
    constructor() {
        console.log('%cTRACE: ThemeService Init', 'color: green; font-weight: 900')
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