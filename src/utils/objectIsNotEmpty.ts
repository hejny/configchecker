// TODO: maybe this should be typeguard
export function objectIsNotEmpty<T>(mixedObject: { [key: string]: T | undefined; }): boolean {
    for (const mixedKey of Object.keys(mixedObject)) {
        if (mixedObject[mixedKey]) {
            return true;
        }
    }

    return false;
}
