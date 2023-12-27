import { config } from './config';

describe('undefineds', () => {
    it('can detect that value is undefined in multiple situations', () => {
        expect(config.get(undefined).value).toBe(undefined);
        expect(config.get(null as any).value).toBe(undefined);
        expect(config.get('NaN').value).toBe(undefined);
        expect(config.get('-').value).toBe(undefined);
        expect(config.get('---').value).toBe(undefined);
        expect(config.get('UNDEFINED').value).toBe(undefined);
        expect(config.get('Undefined').value).toBe(undefined);
        expect(config.get('undefined').value).toBe(undefined);
        expect(config.get('NONE').value).toBe(undefined);
        expect(config.get('None').value).toBe(undefined);
        expect(config.get('none').value).toBe(undefined);
    });

    it('can detect that value is undefined on empty string', () => {
        expect(config.get('').value).toBe(undefined);
        expect(config.get(' ').value).toBe(undefined);
        expect(config.get('              ').value).toBe(undefined);
        expect(config.get(' \n   ').value).toBe(undefined);
        expect(config.get(' \t\n\r   ').value).toBe(undefined);
    });

    it('has value in some other cases', () => {
        expect(config.get('0').value).toBe('0');
        expect(config.get('-1').value).toBe('-1');
        expect(config.get('Infinity').value).toBe('Infinity');
        expect(config.get('NO').value).toBe('NO');
        expect(config.get('false').value).toBe('false');
    });
});
