import {
    /* Firebase */
    /* Components */
    /* Context */
    /* Views */
    /* Custom Hooks */
    /* Service Classes */
    /* Utility Functions */
    getStrTag,
    isArray,
    isObjLit,
    getLength,
    checkLength,
    /* Assets */
    /* Icons */
    /* Configs */
    /* Types */
    /* Interfaces */
    /* DeveloperTools */
    debug,
    trace,
    m
} from '../app-index'

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
        this.skipValidation = []
    }

    validate(payload, state, contextName) {
        let recursionCount = 0

        const getAllowedTypes = () => {
            return this.primitiveTypes.concat(this.referentialTypes)
        }

        const initialPayloadValidation = (payload) => {
            if (getStrTag(payload) !== this.payloadType) {
                console.error({ allowedPayloadType: this.payloadType, passedPayloadType: getStrTag(payload) })
                throw new Error(`Invalid payload type.`)
            }
        }

        const handleKeyValueValidation = (payload, state) => {
            const disallowedTypesInState = [], disallowedTypeKeys = [], undeclaredKeys = [], invalidTypeKeys = []

            Object.keys(state).forEach(stateKey => {
                if (!getAllowedTypes().includes(getStrTag(state[stateKey]))) {
                    disallowedTypesInState.push(
                        { disallowedKey: stateKey, disallowedType: getStrTag(state[stateKey]), allowedTypes: getAllowedTypes(), payload, state }
                    )
                }
            })

            Object.keys(payload).forEach(payloadKey => {
                const checkKeyValueValidity = () => {
                    if (!getAllowedTypes().includes(getStrTag(payload[payloadKey]))) {
                        disallowedTypeKeys.push(
                            { disallowedKey: payloadKey, disallowedType: getStrTag(payload[payloadKey]), allowedTypes: getAllowedTypes(), payload, state }
                        )
                    }
                    if (getStrTag(payload[payloadKey]) !== getStrTag(state[payloadKey])) {
                        invalidTypeKeys.push(
                            { invalidKey: payloadKey, invalidValueType: getStrTag(payload[payloadKey]), initialValueType: getStrTag(state[payloadKey]), payload, state }
                        )
                    }
                    if (!Object.keys(state).includes(payloadKey)) {
                        undeclaredKeys.push(
                            { undeclaredKey: payloadKey, undeclaredKeyValue: payload[payloadKey], payload, state }
                        )
                    }
                }
                !this.skipValidation.includes(payloadKey) && checkKeyValueValidity()
            })


            if (getLength(disallowedTypesInState) > 0) {
                console.error(`State keys with disallowed types: `, disallowedTypesInState)
                throw new Error(`Disallowed types present in ${contextName} initial state. Check ${contextName} initial state for accuracy, or consider modifying allowable types in ContextValidator.`)
            }
            if (getLength(disallowedTypeKeys) > 0) {
                console.error(`Keys with disallowed types: `, disallowedTypeKeys)
                throw new Error(`Disallowed types present in passed payload. Check payload for accuracy, or consider modifying allowable types in ContextValidator.`)
            }
            if (getLength(undeclaredKeys) > 0) {
                console.error(`Undeclared keys: `, undeclaredKeys)
                throw new Error(`Undeclared keys present in passed payload. Check payload for accuracy, or consider modifying initial state object in ${contextName}.`)
            }
            if (getLength(invalidTypeKeys) > 0) {
                console.error(`Invalid type(s): `, invalidTypeKeys)
                throw new Error(`Invalid types present in passed payload. Check passed payload for type accuracy against initial state declaration in ${contextName}.`)
            }
        }

        const handleArrayEntryValidation = (payload, state) => {
            const disallowedTypesInState = [], undeclaredElements = [], disallowedTypeElements = [], invalidTypeElements = []

            state.forEach(entry => {
                if (!getAllowedTypes().includes(getStrTag(entry))) {
                    disallowedTypesInState.push(
                        { disallowedElement: entry, disallowedType: getStrTag(entry), allowedTypes: getAllowedTypes(), payload, state }
                    )
                }
            })

            if (!checkLength(payload, getLength(state))) {
                undeclaredElements.push(
                    { elements: payload.slice(getLength(state)), payload, state }
                )
            }

            payload.forEach((entry, index) => {
                const checkElementValidity = () => {
                    if (!getAllowedTypes().includes(getStrTag(entry))) {
                        disallowedTypeElements.push(
                            { disallowedElement: entry, payload, disallowedType: getStrTag(entry), allowedTypes: getAllowedTypes(), payload, state }
                        )
                    }
                    if (getStrTag(entry) !== getStrTag(state[index])) {
                        invalidTypeElements.push(
                            { invalidElement: entry, invalidElementType: getStrTag(entry), initialValueType: getStrTag(state[index]), payload, state }
                        )
                    }
                }
                !this.skipValidation.includes(entry) && checkElementValidity()
            })

            if (getLength(disallowedTypesInState) > 0) {
                console.error(`State elements with disallowed types: `, disallowedTypesInState)
                throw new Error(`Disallowed types present in ${contextName} initial state. Check ${contextName} initial state for accuracy, or consider modifying allowable types in ContextValidator.`)
            }
            if (getLength(undeclaredElements) > 0) {
                console.error(`Undeclared elements: `, undeclaredElements)
                throw new Error(`Undeclared elements present in passed payload. Check payload for accuracy, or consider modifying initial state object in ${contextName}.`)
            }
            if (getLength(disallowedTypeElements) > 0) {
                console.error(`Elements with disallowed types: `, disallowedTypeElements)
                throw new Error(`Disallowed types present in passed payload. Check payload for accuracy, or consider modifying allowable types in ContextValidator.`)
            }
            if (getLength(invalidTypeElements) > 0) {
                console.error(`Invalid type(s): `, invalidTypeElements)
                throw new Error(`Invalid types present in passed payload. Check passed payload for type accuracy against initial state declaration in ${contextName}.`)
            }
        }

        
        initialPayloadValidation(payload)
        
        // TODO: Handle other iterable types - Set, Map, etc..
        const traverseState = (payload, state) => {
            recursionCount++

            if (isArray(payload)) {
                handleArrayEntryValidation(payload, state)
                for (const [index, element] of payload.entries()) {
                    !this.skipValidation.includes(element) && traverseState(element, state[index])
                }
            } else if (isObjLit(payload)) {
                handleKeyValueValidation(payload, state)
                for (const key in payload) {
                    !this.skipValidation.includes(key) && traverseState(payload[key], state[key])
                }
            }

            --recursionCount
        }
        traverseState(payload, state)

        if (recursionCount === 0) return true
    }
}

export default new ContextValidator()