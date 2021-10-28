import { IConfigChecker } from '../interfaces/IConfigChecker';
import { ConfigValueString } from './ConfigValueString';

/**
 * This object behaves like ConfigChecker but it is returning only mocked values which are passed in.
 */
export class ConfigCheckerMocked implements IConfigChecker {
    public static create() {
        return new ConfigCheckerMocked();
    }

    public get(value: string | undefined): ConfigValueString {
        return new ConfigValueString(value, { key: `MOCKED_VALUE_${value?.toUpperCase}`, description: `Mocked value "${value}".`, configChecker: this });
    }

}
