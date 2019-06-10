import { IConfigValueProfile } from "../interfaces/IConfigValueProfile";

//TODO: nice generic types
export class ConfigValue<T> {

    constructor(public value: T, protected profile: IConfigValueProfile, private canBeUndefined = true) {}

    get about() {
        return(
        `
**Key:** "${this.profile.key}"
**Description:** "${this.profile.description}"
**Config:**
\`\`\`json
${JSON.stringify(this.profile.configChecker.source,null, 4)}
\`\`\`
        `.trim()
        );
    }

    private checkThatValueCanBeUndefinedToPreventMultipleUsageOfRequiredOrDefault(){
        if(!this.canBeUndefined){
            //TODO: Better option would be to check it in typescript not the runtime
            throw Error(`Required and default can be used only once ${this.about}`);
        }
    }

    required(): ConfigValue<NonNullable<T>> {
        this.checkThatValueCanBeUndefinedToPreventMultipleUsageOfRequiredOrDefault();
        if (typeof this.value === 'undefined') {
            throw Error(`In config should be defined ${this.profile.key}. \n ${this.about}`);
        }
        return new ConfigValue(this.value!, this.profile, false);
    }

    default(value: NonNullable<T>): ConfigValue<T> {
        this.checkThatValueCanBeUndefinedToPreventMultipleUsageOfRequiredOrDefault();
        return new ConfigValue(this.value || value, this.profile, false);
    }

    custom<TC>(conversionType: string, convert: (value: NonNullable<T>) => TC): ConfigValue<TC|undefined>{
        if (typeof this.value === 'undefined') {
            return new ConfigValue(undefined, this.profile);
        }

        try{
            return new ConfigValue<TC>(convert(this.value!/*TODO: why !*/),this.profile);
        }catch(error){
            throw new Error(
                `In config thare is a problem with converting "${this.value}" to ${conversionType}. ${error.message} \n ${this.about}`,
            );
        }        
    }

    asType<T>(): ConfigValue<T>{
        return new ConfigValue(this.value as unknown as T, this.profile);
    }
}