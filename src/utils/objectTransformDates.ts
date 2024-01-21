export function objectTransformDates<T>(object: T): T {
    if (typeof object !== 'object') {
        return object;
    }

    const objectAs = object as Record<string, any>;
    const transformedObject: Record<string, any> = {};

    for (const [key, value] of Object.entries(objectAs)) {
        if (typeof value === 'object') {
            transformedObject[key] = objectTransformDates(value);
        } else if (typeof value === 'string') {
            if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(value)) {
                transformedObject[key] = new Date(value);
            } else {
                transformedObject[key] = value;
            }
        } else {
            transformedObject[key] = value;
        }
    }

    return transformedObject as T;
}

/**
 * TODOs:
 *
 * - Figure out how to do input and return type
 * - Maybe more universally
 */
