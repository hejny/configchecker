/**
 * IConfigSource is any object which contain string key-value pairs (or the value can ve undefined)
 * Typically this can be process.env in node
 */
export interface IConfigSource {
    [key: string]: string | undefined;
}
