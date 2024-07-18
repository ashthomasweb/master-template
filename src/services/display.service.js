class DisplayService {
    mainDispatch = null

    setLocalDispatch(dispatch) {
        this.mainDispatch = dispatch
    }

    toggleCardDisplay(displayCondition) {
        const payload = {
            isCardFrontDisplayed: !displayCondition
        }
        this.mainDispatch({ payload })
    }
}

export default new DisplayService()
