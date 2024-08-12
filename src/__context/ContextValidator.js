import {
    /* Firebase */
    /* Components */
    /* Context */
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
    /* Assets */
    /* Icons */
    /* Configs */
    /* Types */
    /* Interfaces */
    /* DeveloperTools */
    debug,
    trace,
    m,
} from '../app-index'

/* Trace vars */
const t = false
const file = 'ContextValidator'
const msg = (copy, fileName = file) => m(copy, fileName)
/* END Trace vars */

const errorConfigs = {
    objLit: {
        disallowedTypesInState: `Disallowed types present in ContextName initial state. Check ContextName initial state for accuracy, or consider modifying allowable types in ContextValidator.\nState elements with disallowed types: `,

    },
    array: {
        disallowedTypesInState: `Disallowed types present in ContextName initial state. Check ContextName initial state for accuracy, or consider modifying allowable types in ContextValidator.\nState elements with disallowed types: `,
        undeclaredElements: `Undeclared elements present in passed payload. Check payload for accuracy, or consider modifying initial state object in ContextName.\nUndeclared elements: `,
        disallowedTypeElements: `Disallowed types present in passed payload. Check payload for accuracy, or consider modifying allowable types in ContextValidator.\nElements with disallowed types: `,
        invalidTypeElements: `Invalid types present in passed payload. Check passed payload for type accuracy against initial state declaration in ContextName.\nInvalid type(s): `
    }
}

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

        const isAllowedType = (input) => {
            return getAllowedTypes().includes(getStrTag(input))
        }

        const initialPayloadValidation = (payload) => {
            if (getStrTag(payload) !== this.payloadType) {
                console.error({ allowedPayloadType: this.payloadType, passedPayloadType: getStrTag(payload) })
                throw new Error(`Invalid payload type.`)
            }
        }

        const buildError = (array, errorArrays, type) => {
            const arrayName = Object.keys(errorArrays).find(key => errorArrays[key] === array)
            if (getLength(array) > 0) {
                console.error(errorConfigs[type][arrayName].replace(/ContextName/g, contextName), array)
            }
        }

        const handleObjLitValidation = (payload, state) => {
            const disallowedTypesInState = [], disallowedTypeKeys = [], undeclaredKeys = [], invalidTypeKeys = []
            const errorArrays = [disallowedTypesInState, disallowedTypeKeys, undeclaredKeys, invalidTypeKeys]

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
                console.error(`Disallowed types present in ${contextName} initial state. Check ${contextName} initial state for accuracy, or consider modifying allowable types in ContextValidator.\nState keys with disallowed types: `, disallowedTypesInState)
            }
            if (getLength(disallowedTypeKeys) > 0) {
                console.error(`Disallowed types present in passed payload. Check payload for accuracy, or consider modifying allowable types in ContextValidator.\nKeys with disallowed types: `, disallowedTypeKeys)
            }
            if (getLength(undeclaredKeys) > 0) {
                console.error(`Undeclared keys present in passed payload. Check payload for accuracy, or consider modifying initial state object in ${contextName}.\nUndeclared keys: `, undeclaredKeys)
            }
            if (getLength(invalidTypeKeys) > 0) {
                console.error(`Invalid types present in passed payload. Check passed payload for type accuracy against initial state declaration in ${contextName}.\nInvalid type(s): `, invalidTypeKeys)
            }
        }

        const handleArrayEntryValidation = (payload, state) => {
            const disallowedTypesInState = [], undeclaredElements = [], disallowedTypeElements = [], invalidTypeElements = []
            const errorArrays = {disallowedTypesInState, undeclaredElements, disallowedTypeElements, invalidTypeElements}

            state.forEach(entry => {
                if (!isAllowedType(entry)) {
                    disallowedTypesInState.push(
                        { disallowedElement: entry, disallowedType: getStrTag(entry), allowedTypes: getAllowedTypes(), payload, state }
                    )
                }
            })

            if (!lengthEquivalent(payload, state)) { // Checks the length of the payload against the length of the state
                undeclaredElements.push(
                    { elements: payload.slice(getLength(state)), payload, state }
                )
            }

            payload.forEach((entry, index) => {
                const checkElementValidity = () => {
                    if (!isAllowedType(entry)) {
                        disallowedTypeElements.push(
                            { disallowedElement: entry, disallowedType: getStrTag(entry), allowedTypes: getAllowedTypes(), payload, state }
                        )
                    }
                    if (isTypeEquivalent(entry, state[index])) {
                        invalidTypeElements.push(
                            { invalidElement: entry, invalidElementType: getStrTag(entry), initialValueType: getStrTag(state[index]), payload, state }
                        )
                    }
                }
                !this.skipValidation.includes(entry) && checkElementValidity()
            })

            for (const key in errorArrays) {
                buildError(errorArrays[key], errorArrays, 'array')
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
                handleObjLitValidation(payload, state)
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