import {
    /* Firebase */
    /* Components */
    /* Context */
    initialMainStateTypes,
    /* Views */
    /* Custom Hooks */
    /* Service Classes */
    /* Utility Functions */
    getStrTag,
    isTypeEquivalent,
    isArray,
    isObjLit,
    getLength,
    lengthEquivalent,
    getParsedTypeFromStrTag,
    /* Assets */
    /* Icons */
    /* Configs */
    errorConfigs,
    /* Types */
    /* Interfaces */
    /* DeveloperTools */
    debug,
    logInit,
    trace,
    m,
} from '../../app-index'

/* Trace vars */
const t = false
const file = 'ContextValidator'
const msg = (copy, fileName = file) => m(copy, fileName)
/* END Trace vars */

class ContextValidator {
    constructor() {
        this.payloadType = '[object Object]'
        this.primitiveTypes = [
            '[object Null]',
            '[object Undefined]',
            '[object Error]',
            '[object Number]',
            '[object NaN]',
            '[object Boolean]',
            '[object String]',
            '[object Date]',
        ]
        this.referentialTypes = [
            '[object Object]',
            '[object Array]',
        ]
        this.skipValidation = ['userObj']
    }

    validate(payload, state, contextName) {
        let recursionCount = 0

        /* Helper methods */

        const getAllowedTypes = () => {
            return this.primitiveTypes.concat(this.referentialTypes)
        }

        const isAllowedType = (input) => {
            return getAllowedTypes().includes(getStrTag(input))
        }

        
        const buildError = (array, errorArrays, payload) => {
            const payloadType = getParsedTypeFromStrTag(getStrTag(payload))
            const arrayName = Object.keys(errorArrays).find(key => errorArrays[key] === array)
            if (getLength(array) > 0) {
                console.error(errorConfigs[payloadType][arrayName].replace(/ContextName/g, contextName), array)
            }
        }
        
        /* Validation methods based on payload type */

        const initialPayloadValidation = (payload) => {
            if (getStrTag(payload) !== this.payloadType) {
                console.error({ allowedPayloadType: this.payloadType, passedPayloadType: getStrTag(payload) })
                throw new Error(`Invalid payload type.`)
            }
        }

        const handleObjLitValidation = (payload, state) => {
            if (state === null) return // ATTN: Can this be handled with more control ?
            
            const disallowedTypesInState = [], disallowedTypeKeys = [], undeclaredKeys = [], invalidTypeKeys = []
            const errorArrays = { disallowedTypesInState, disallowedTypeKeys, undeclaredKeys, invalidTypeKeys }

            Object.keys(state).forEach(stateKey => {
                if (!isAllowedType(state[stateKey])) {
                    disallowedTypesInState.push(
                        { disallowedKey: stateKey, disallowedType: getStrTag(state[stateKey]), allowedTypes: getAllowedTypes() }
                    )
                }
            })

            Object.keys(payload).forEach(payloadKey => {
                const checkKeyValueValidity = () => {
                    if (!Object.keys(state).includes(payloadKey)) {
                        undeclaredKeys.push(
                            { undeclared: [{ undeclaredKey: payloadKey, undeclaredKeyValue: payload[payloadKey] }] }
                        )
                    }
                    if (!isAllowedType(payload[payloadKey])) {
                        disallowedTypeKeys.push(
                            { disallowedKey: payloadKey, disallowedType: getStrTag(payload[payloadKey]), allowedTypes: getAllowedTypes() }
                        )
                    }
                    if (isTypeEquivalent(payload[payloadKey], state[payloadKey])) {
                        if (getStrTag(state[payloadKey]) === "[object Null]") return
                        invalidTypeKeys.push(
                            { invalidKey: payloadKey, invalidValueType: getStrTag(payload[payloadKey]), initialValueType: getStrTag(state[payloadKey]) }
                        )
                    }
                }
                !this.skipValidation.includes(payloadKey) && checkKeyValueValidity() // ATTN: Why does this need to be here, as well as in the primary loop?
            })

            for (const key in errorArrays) {
                buildError(errorArrays[key], errorArrays, payload)
                errorArrays[key].forEach(errorArray => {
                    errorArray.payload = payload
                    errorArray.state = state
                })
            }
        }

        const handleArrayEntryValidation = (payload, state) => {
            if (state === null) return // ATTN: Can this be handled with more control ?

            const disallowedTypesInState = [], undeclaredElements = [], disallowedTypeElements = [], invalidTypeElements = []
            const errorArrays = { disallowedTypesInState, undeclaredElements, disallowedTypeElements, invalidTypeElements }

            state.forEach(entry => {
                if (!isAllowedType(entry)) {
                    disallowedTypesInState.push(
                        { disallowedElement: entry, disallowedType: getStrTag(entry), allowedTypes: getAllowedTypes() }
                    )
                }
            })

            if (!lengthEquivalent(payload, state)) {
                undeclaredElements.push(
                    { undeclared: payload.slice(getLength(state)) }
                )
            }

            payload.forEach((entry, index) => {
                const checkElementValidity = () => {
                    if (!isAllowedType(entry)) {
                        disallowedTypeElements.push(
                            { disallowedElement: entry, disallowedType: getStrTag(entry), allowedTypes: getAllowedTypes() }
                        )
                    }
                    if (isTypeEquivalent(entry, state[index])) {
                        invalidTypeElements.push(
                            { invalidElement: entry, invalidElementType: getStrTag(entry), initialValueType: getStrTag(state[index]) }
                        )
                    }
                }
                !this.skipValidation.includes(entry) && checkElementValidity() // ATTN: Why does this need to be here, as well as in the primary loop?
            })

            for (const key in errorArrays) {
                buildError(errorArrays[key], errorArrays, payload)
                errorArrays[key].forEach(errorArray => {
                    errorArray.payload = payload
                    errorArray.state = state
                })
            }
        }

        // TODO: Handle other iterable types - Set, Map, etc..
        
        /* Validation loop */

        initialPayloadValidation(payload)

        const traverseState = (payload, state) => {
            recursionCount++

            if (isArray(payload)) {
                handleArrayEntryValidation(payload, state)
                for (const [index, element] of payload.entries()) {
                    !this.skipValidation.includes(element) && traverseState(element, state[index])
                }
            } else if (isObjLit(payload)) {
                handleObjLitValidation(payload, state)
                for (const key in payload) {
                    !this.skipValidation.includes(key) && traverseState(payload[key], state[key])
                }
            }

            --recursionCount
        }
        traverseState(payload, state)

        /* END Validation loop */

        // If recursive loop completes with no errors thrown, return 'true', allowing payload to be set to context ...
        if (recursionCount === 0) return true
    }
}

export default new ContextValidator()