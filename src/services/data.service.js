class DataService {
    mainDispatch = null

    setLocalDispatch(dispatch) {
        this.mainDispatch = dispatch
    }

    generateNewId(idLength, forceString) {
        let concatString = ''
        for (let i = 0; i < 4; i++) {
            concatString = concatString + String(Math.ceil(Math.random() * 10e18))
        }
        concatString = concatString.replaceAll('0', '')
        let tempId = concatString.split('')
        tempId.forEach((entry, index) => {
            if (entry === tempId[index - 1]) {
                tempId[index] = '0'
            }
        })
        concatString = tempId.join().replaceAll(',', '')
        if (idLength < 18 && !forceString) {
            return Number(concatString.substring(0, idLength))
        } else {
            return concatString.substring(0, idLength)
        }
    }
}

export default new DataService()