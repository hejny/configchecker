import { ConfigChecker } from "../classes/ConfigChecker";

export interface IConfigValueProfile {
    key: string;
    configChecker: ConfigChecker;
    description?: string;
}