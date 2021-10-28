import { ConfigValue } from './ConfigValue';

/**
 * ConfigValueString represent one unprocessed config value which can be by this class and its methods futher processed.
 */
export class ConfigValueString extends ConfigValue<string | undefined> {
    public number(): ConfigValue<number | undefined> {
        return this.custom('number', (stringValue) => {
            const numericValue = Number.parseFloat(stringValue);

            if (Number.isNaN(numericValue)) {
                throw new Error(`Value is not numeric.`);
            }

            return numericValue;
        });
    }

    public boolean(): ConfigValue<boolean | undefined> {
        return this.custom('boolean', (stringValue) => {
            stringValue = stringValue.toUpperCase();

            if (['TRUE', '1', 'YES'].includes(stringValue)) {
                return true;
            }
            if (['FALSE', '0', 'NO'].includes(stringValue)) {
                return false;
            }

            throw new Error(`Value is not boolean like.`);
        });
    }

    public json(): ConfigValue<any | undefined> {
        return this.custom('json', (stringValue) => {
            try {
                return JSON.parse(stringValue);
            } catch (error) {
                throw new Error(`Value is not valid json.`);
            }
        });
    }

    public list(): ConfigValue<string[] | undefined> {
        return this.custom('list', (stringValue) => {
            return stringValue.split(',').map((value) => value.trim());
        });
    }

    public date(): ConfigValue<Date | undefined> {
        return this.custom('date', (stringValue) => {
            const dateValue = new Date(stringValue);

            if (Number.isNaN(dateValue.getTime())) {
                throw new Error(`Value is not date-like.`);
            }

            return dateValue;
        });
    }

    public url(): ConfigValue<URL | undefined> {
        return this.custom('url', (stringValue) => {
            try {
                return new URL(stringValue);
            } catch (error) {
                throw new Error(`Value is not valid URL.`);
            }
        });
    }

    // TODO: make regexp
}
