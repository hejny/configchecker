import { ConfigValueString } from '../classes/ConfigValueString';

export interface IConfigChecker {
    get(key: string, description?: string): ConfigValueString;
}
