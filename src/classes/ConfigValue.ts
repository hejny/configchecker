import { IConfigValueProfile } from '../interfaces/IConfigValueProfile';

// TODO: nice generic types
export class ConfigValue<TValue> {
    constructor(public value: TValue, protected profile: IConfigValueProfile, private canBeUndefined = true) {}

    private get about():string {

        const about = this.profile.key;

        if(this.profile.description){
            this.profile.description += `(${this.profile.description.trim()}")`;
        }

        return about;
    }

    public required(): ConfigValue<NonNullable<TValue>> {
        this.checkThatValueCanBeUndefinedToPreventMultipleUsageOfRequiredOrDefault();
        if (this.value === undefined) {
            throw Error(`In config should be defined ${this.profile.key}. \n ${this.about}`);
        }
        return new ConfigValue(this.value!, this.profile, false);
    }

    public default(
        defaultValue: NonNullable<TValue>,
    ): ConfigValue<
    NonNullable<TValue>
    > /*TODO: Return type should be ConfigValue<NonNullable<T>> but Typescript is not working with that... */ {
        this.checkThatValueCanBeUndefinedToPreventMultipleUsageOfRequiredOrDefault();
        // TODO: ... it is saying on next line: "Type 'ConfigValue<T>' is not assignable to type 'ConfigValue<NonNullable<T>>'. Type 'T' is not assignable to type 'NonNullable<T>':
       
        let value: NonNullable<TValue>;

        if(this.value!==undefined){
            value = this.value as NonNullable<TValue>;
        }else{
            value = defaultValue;
        }
       
        return new ConfigValue(value, this.profile, false);
    }

    public custom<TvalueCustom>(
        conversionType: string,
        convert: (value: NonNullable<TValue>) => TvalueCustom,
    ): ConfigValue<TvalueCustom | undefined> {
        if (typeof this.value === 'undefined' || this.value as unknown as string === '') {
            return new ConfigValue(undefined, this.profile);
        }

        try {
            return new ConfigValue<TvalueCustom>(convert(this.value! /*TODO: why !*/), this.profile);
        } catch (error) {
            throw new Error(
                `In config thare is a problem with converting "${this.value}" to ${conversionType}. ${error.message} \n ${this.about}`,
            );
        }
    }

    get object() {
        const object: any = {};
        object[this.profile.key] = this.value;
        // TODO: Here is not used the full potencial of the typescript
        return object as { [k: string]: TValue };
    }

    /* tslint:disable */
    // TODO: Strange ts-lint warning Shadowed name: 'T'
    public asType<TvalueCustom>(typeChecker?:(value:TValue)=>boolean): ConfigValue<TvalueCustom> {

        if(typeChecker){
            if(!typeChecker(this.value)){
                throw new Error(`Value is not in expected format - rejected by type checker function. ${this.about}`);
            }
        }
        return new ConfigValue((this.value as unknown) as TvalueCustom, this.profile);
    }
    /* tslint:enable */

    private checkThatValueCanBeUndefinedToPreventMultipleUsageOfRequiredOrDefault() {
        if (!this.canBeUndefined) {
            // TODO: Better option would be to check it in typescript not the runtime
            throw Error(`Required and default can be used only once ${this.about}`);
        }
    }
}
