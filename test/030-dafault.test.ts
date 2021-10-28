import { config } from './config';

describe('default value', () => {
    it('returns default value when config value is undefined', () => {
        expect(config.get(undefined).default('foo').value).toBe('foo');
        expect(config.get('undefined').default('foo').value).toBe('foo');
        expect(config.get('     ').default('foo').value).toBe('foo');
    });
});
