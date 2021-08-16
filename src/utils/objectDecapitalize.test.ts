import { objectDecapitalize } from './objectDecapitalize';

describe('how object decapitalization works', () => {
    it('transforms object', () => {
        expect(objectDecapitalize({ Name: 'John', Surname: 'Smith' })).toEqual({ name: 'John', surname: 'Smith' });
    });

    it('keeps object as it is', () => {
        expect(objectDecapitalize({ subobject: { Name: 'John', Surname: 'Smith' } })).toEqual({
            subobject: { Name: 'John', Surname: 'Smith' },
        });
        expect(objectDecapitalize({ name: 'John', surname: 'Smith' })).toEqual({ name: 'John', surname: 'Smith' });
    });
});
