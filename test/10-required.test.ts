import { config } from './config';

describe('required check', () => {
    it('throws errors when missing required value', () => {
        expect(() => config.get(undefined).required().value).toThrowError();
        expect(() => config.get('undefined').required().value).toThrowError();
        expect(() => config.get('     ').required().value).toThrowError();
    });
});
