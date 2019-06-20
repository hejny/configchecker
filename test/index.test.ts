import { ConfigChecker } from '../src/classes/ConfigChecker';

test('ConfigChecker', () => {
    const config = ConfigChecker.from({
        STRING: 'foo',
        STRING_EMPTY: '',
        NUMERIC: '1',
        NUMERIC_INVALID: 'foo1foo', // TODO: Also with 1foo
        BOOLEAN: 'True',
        BOOLEAN_INVALID: 'foo',
        // TODO: Others
    });

    expect(() => config.get('UNDEFINED').value).not.toThrowError();
    expect(() => config.get('UNDEFINED').required().value).toThrowError();

    expect(() => config.get('STRING').value).not.toThrowError();
    expect(() => config.get('STRING_EMPTY').value).not.toThrowError();

    expect(() => config.get('NUMERIC').number().value).not.toThrowError();
    expect(() => config.get('NUMERIC_INVALID').number().value).toThrowError();

    expect(() => config.get('BOOLEAN').boolean().value).not.toThrowError();
    expect(() => config.get('BOOLEAN_INVALID').boolean().value).toThrowError();

    expect(() => config.get('STRING').object.STRING).not.toThrowError();

    /*
    TODO: To documentation
    const configValues = {
        ...config.get('MESSENGER_APP_SECRET').required().object,
    };
    */
});

// TODO:  In config thare is a problem with converting "https://find-toilet.herokuapp.com/" to url. Value is not valid URL.
