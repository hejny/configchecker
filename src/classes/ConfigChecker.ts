import { IConfigChecker } from '../interfaces/IConfigChecker';
import { IConfigSource } from '../interfaces/IConfigSource';
import { ConfigValueString } from './ConfigValueString';

export class ConfigChecker implements IConfigChecker {
    /**
     * Create a new ConfigChecker from a source
     * @param source Typically this can be process.env in node
     */
    public static from(source: IConfigSource): ConfigChecker {
        const config = new ConfigChecker();
        config.load(source);
        return config;
    }

    private source: IConfigSource = {};

    /**
     * Load additional configuation source
     * @param source Typically this can be process.env in node
     */
    public load(source: IConfigSource) {
        this.source = {
            ...this.source,
            ...source,
        };
    }

    /**
     * Gets a value for futher processing
     * @param key in the source given to the constructor or load method
     * @param description human readable description of the value (used in error messages)
     * @returns ConfigValueString which can be futher processed
     */
    public get(key: string, description?: string): ConfigValueString {
        return new ConfigValueString(this.source[key], { key, description, configChecker: this });
    }

    // TODO: !!! custom metods to parse values
}
