import { objectDeflatten } from './objectDeflatten';

describe('how object deflattening works', () => {
    it('works with simple one-layer object', () => {
        expect(objectDeflatten({ 'name.en': 'Apple', 'name.de': 'Apfel' })).toEqual({
            name: { en: 'Apple', de: 'Apfel' },
        });
    });

    it('works with simple two-layer object', () => {
        expect(objectDeflatten({ 'fruit.name.en': 'Apple', 'fruit.name.de': 'Apfel' })).toEqual({
            fruit: { name: { en: 'Apple', de: 'Apfel' } },
        });
    });

    it('should crash on key conflict', () => {
        expect(() => objectDeflatten({ 'name.en': 'Apple', name: 'Apfel' })).toThrow();
        expect(() => objectDeflatten({ 'name.en': 'Apple', 'name.en.de': 'Apfel' })).toThrow();
        expect(() => objectDeflatten({ 'name.en': 'Apple', name: { de: 'Apfel' } })).toThrow();
    });
});
