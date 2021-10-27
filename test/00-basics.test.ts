import { config } from './config';

describe('basics', () => {
    it('can parse strings', () => {
        expect(config.get('foo').value).toBe('foo');
        expect(config.get('bar').value).toBe('bar');
        expect(config.get('1').value).toBe('1');
    });

    it('can parse numbers', () => {
        expect(config.get('0').number().value).toBe(0);
        expect(config.get('+0').number().value).toBe(0);
        expect(config.get('-0').number().value).toBe(0);
        expect(config.get('1').number().value).toBe(1);
        expect(config.get('2').number().value).toBe(2);
        expect(config.get('+1').number().value).toBe(1);
        expect(config.get('+2').number().value).toBe(2);
        expect(config.get('-2').number().value).toBe(-2);
        expect(config.get('1.1').number().value).toBe(1.1);
        expect(config.get('+INFINITY').number().value).toBe(Infinity);
        expect(config.get('+Infinity').number().value).toBe(Infinity);
        expect(config.get('+infinity').number().value).toBe(Infinity);
        expect(config.get('INFINITY').number().value).toBe(Infinity);
        expect(config.get('Infinity').number().value).toBe(Infinity);
        expect(config.get('infinity').number().value).toBe(Infinity);
        expect(config.get('-INFINITY').number().value).toBe(-Infinity);
        expect(config.get('-Infinity').number().value).toBe(-Infinity);
        expect(config.get('-infinity').number().value).toBe(-Infinity);
        // TODO: Other bases
    });

    it('can throw error when not numeric', () => {
        expect(() => config.get('foo').number().value).toThrowError();
        expect(() => config.get('t1').number().value).toThrowError();
        expect(() => config.get('1t').number().value).toThrowError();
        expect(() => config.get('-').number().value).toThrowError();
    });

    it('can parse booleans', () => {
        expect(config.get('1').boolean().value).toBe(true);
        expect(config.get('TRUE').boolean().value).toBe(true);
        expect(config.get('True').boolean().value).toBe(true);
        expect(config.get('true').boolean().value).toBe(true);
        expect(config.get('YES').boolean().value).toBe(true);
        expect(config.get('Yes').boolean().value).toBe(true);
        expect(config.get('yes').boolean().value).toBe(true);

        expect(config.get('0').boolean().value).toBe(false);
        expect(config.get('FALSE').boolean().value).toBe(false);
        expect(config.get('False').boolean().value).toBe(false);
        expect(config.get('false').boolean().value).toBe(false);
        expect(config.get('NO').boolean().value).toBe(false);
        expect(config.get('No').boolean().value).toBe(false);
        expect(config.get('no').boolean().value).toBe(false);
    });

    it('can throw error when not boolean', () => {
        expect(() => config.get('foo').number().value).toThrowError();
        expect(() => config.get('12.4').number().value).toThrowError();
        expect(() => config.get('t1').number().value).toThrowError();
        expect(() => config.get('1t').number().value).toThrowError();
        expect(() => config.get('-').number().value).toThrowError();
    });
});
