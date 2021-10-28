import { IConfigChecker } from "./IConfigChecker";

export interface IConfigValueProfile {
    key: string;
    configChecker: IConfigChecker;
    description?: string;
}
