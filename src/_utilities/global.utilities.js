export const getStrTag = (input) => {
    return Object.prototype.toString.call(input)
}

export const isTypeEquivalent = (input1, input2) => {
    return getStrTag(input1) !== getStrTag(input2)
}

export const isArray = (input) => {
    return getStrTag(input) === '[object Array]'
}

export const isObjLit = (input) => {
    return getStrTag(input) === '[object Object]'
}

export const getLength = (input) => {
    return input.length
}

export const checkLength = (input, length) => {
    return input.length === length
}

export const lengthEquivalent = (input1, input2) => {
    return input1.length === input2.length
}

export const genNewId = (idLength, forceString = true) => { // TODO: Refactor
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

export const genNewAlphaNumId = (idLength) => { // TODO: Refactor
    const letterArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    const ranNum = (highestValue) => {
        return Math.floor(Math.random() * (highestValue + 1))
    }
    let concatString = ''
    for (let i = 0; i < idLength; i++) {
        const isNum = ranNum(1)
        const isUppercase = ranNum(1)
        concatString = concatString + `${isNum ? ranNum(9).toString() : isUppercase ? letterArray[ranNum(25)].toUpperCase() : letterArray[ranNum(25)]}`
    }
    return concatString
}
