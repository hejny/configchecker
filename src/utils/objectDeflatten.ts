export function objectDeflatten<T>(flatObject: Record<string, T>): Record<string, any> {
    const deflattenedObject: Record<string, any> = {};

    for (const [flatKey, value] of Object.entries(flatObject)) {
        const keyTree = flatKey.split('.');
        const lastKey = keyTree.pop()!;

        let deflattenedObjectReference: any = deflattenedObject;
        for (const key of keyTree) {
            if (deflattenedObjectReference[key] === undefined) {
                deflattenedObjectReference[key] = {};
            }

            if (typeof deflattenedObjectReference[key] !== 'object') {
                throw new Error(`Conflict in key "${flatKey}". (version A)`);
            }

            deflattenedObjectReference = deflattenedObjectReference[key];
        }

        if (deflattenedObjectReference[lastKey] !== undefined) {
            throw new Error(`Conflict in key "${flatKey}". (version B)`);
        }

        deflattenedObjectReference[lastKey] = value;
    }

    return deflattenedObject;
}

/**
 * TODOs:
 *
 * - Figure out how to do return type "type IDeepRecord<T> = Record<string, T> | IDeepRecord<T>;"
 * - More delimiter chars
 * - Arrays
 */
