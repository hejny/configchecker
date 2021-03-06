export function objectDecapitalize<T>(mixedObject: { [key: string]: T }): { [key: string]: T } {
    const decapitalizedObject: { [key: string]: T } = {};

    for (const mixedKey of Object.keys(mixedObject)) {
        const decapitalizedKey = mixedKey.substr(0, 1).toLowerCase() + mixedKey.substr(1);
        decapitalizedObject[decapitalizedKey] = mixedObject[mixedKey];
    }

    return decapitalizedObject;
}

export function objectEmptyKeysAsUndefined<T>(
    mixedObject: { [key: string]: T },
    valueIsNotEmpty: (value: T) => boolean = (value: T) => !!value,
): { [key: string]: T } {
    const purgedObject: { [key: string]: T } = {};

    for (const mixedKey of Object.keys(mixedObject)) {
        if (valueIsNotEmpty(mixedObject[mixedKey])) {
            purgedObject[mixedKey] = mixedObject[mixedKey];
        }
    }

    return purgedObject;
}

// TODO: maybe this should be typeguard
export function objectIsNotEmpty<T>(mixedObject: { [key: string]: T | undefined }): boolean {
    for (const mixedKey of Object.keys(mixedObject)) {
        if (mixedObject[mixedKey]) {
            return true;
        }
    }

    return false;
}
