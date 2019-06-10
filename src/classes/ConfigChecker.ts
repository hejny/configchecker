import { IConfigSource } from '../interfaces/IConfigSource';
import { ConfigValueString } from './ConfigValueString';

export class ConfigChecker {
    public static from(source: IConfigSource): ConfigChecker {
        const config = new ConfigChecker();
        config.load(source);
        return config;
    }

    public source: IConfigSource = {};

    public load(source: IConfigSource) {
        this.source = {
            ...this.source,
            ...source,
        };
    }

    public get(key: string, description?: string): ConfigValueString {
        return new ConfigValueString(this.source[key], { key, description, configChecker: this });
    }

    // TODO: Check multiple usages of config values
    // TODO: custom metods to parse values
}
