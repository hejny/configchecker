import { objectTransformDates } from './objectTransformDates';

// tslint:disable:object-literal-sort-keys
describe('how transforming dates in object', () => {
    it('transforms dates', () => {
        expect(objectTransformDates({ start: '2021-08-16', end: '2021-09-16' })).toEqual({
            start: new Date('2021-08-16'),
            end: new Date('2021-09-16'),
        });
    });

    it('transforms dates deep in the object', () => {
        expect(objectTransformDates({ deep: { start: '2021-08-16', end: '2021-09-16' } })).toEqual({
            deep: {
                start: new Date('2021-08-16'),
                end: new Date('2021-09-16'),
            },
        });
    });

    it('transforms dates (testing with ISO strings)', () => {
        expect(objectTransformDates({ start: '2021-08-16', end: '2021-09-16' })).toEqual({
            start: new Date('2021-08-16T00:00:00.000Z'),
            end: new Date('2021-09-16T00:00:00.000Z'),
        });
    });

    it(' do not transforms non-dates', () => {
        expect(objectTransformDates({ start: '2021', end: 123 })).toEqual({ start: '2021', end: 123 });
    });
});

/**
 * TODOs:
 *
 * - Test circular structures
 */
