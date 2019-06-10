import { ConfigChecker } from '../src/classes/ConfigChecker';

test('ConfigChecker', () => {
    const c = ConfigChecker.from({
        string: 'foo',
        stringEmpty: '',
        numeric: '1',
        numericInvalid: 'foo1foo', // TODO: Also with 1foo
        boolean: 'True',
        booleanInvalid: 'foo',
        // TODO: Others
    });

    expect(() => c.get('undefined').value).not.toThrowError();
    expect(() => c.get('undefined').required().value).toThrowError();

    expect(() => c.get('string').value).not.toThrowError();
    expect(() => c.get('stringEmpty').value).not.toThrowError();

    expect(() => c.get('numeric').number().value).not.toThrowError();
    expect(() => c.get('numericInvalid').number().value).toThrowError();

    expect(() => c.get('boolean').boolean().value).not.toThrowError();
    expect(() => c.get('booleanInvalid').boolean().value).toThrowError();
});
