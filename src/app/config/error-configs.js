export const errorConfigs = {
    object: {
        disallowedTypesInState: `Disallowed types present in ContextName initial state. Check ContextName initial state for accuracy, or consider modifying allowable types in ContextValidator.\nState elements with disallowed types: `,
        disallowedTypeKeys: `Disallowed types present in passed payload. Check payload for accuracy, or consider modifying allowable types in ContextValidator.\nKeys with disallowed types: `,
        undeclaredKeys: `Undeclared keys present in passed payload. Check payload for accuracy, or consider modifying initial state object in ContextName.\nUndeclared keys: `,
        invalidTypeKeys: `Invalid types present in passed payload. Check passed payload for type accuracy against initial state declaration in ContextName.\nInvalid type(s): `
    },
    array: {
        disallowedTypesInState: `Disallowed types present in ContextName initial state. Check ContextName initial state for accuracy, or consider modifying allowable types in ContextValidator.\nState elements with disallowed types: `,
        undeclaredElements: `Undeclared elements present in passed payload. Check payload for accuracy, or consider modifying initial state object in ContextName.\nUndeclared elements: `,
        disallowedTypeElements: `Disallowed types present in passed payload. Check payload for accuracy, or consider modifying allowable types in ContextValidator.\nElements with disallowed types: `,
        invalidTypeElements: `Invalid types present in passed payload. Check passed payload for type accuracy against initial state declaration in ContextName.\nInvalid type(s): `
    }
}