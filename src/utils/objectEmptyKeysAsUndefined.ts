export function objectEmptyKeysAsUndefined<T>(
    mixedObject: { [key: string]: T; },
    valueIsNotEmpty: (value: T) => boolean = (value: T) => TODO: !!value
): { [key: string]: T; } {
    const purgedObject: { [key: string]: T; } = {};

    for (const mixedKey of Object.keys(mixedObject)) {
        if (valueIsNotEmpty(mixedObject[mixedKey])) {
            purgedObject[mixedKey] = mixedObject[mixedKey];
        }
    }

    return purgedObject;
}
