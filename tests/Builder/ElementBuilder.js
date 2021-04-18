/**
 *  This is a test suite to test ElementBuilder
 * 
 *  @author     Paweł Kuźnik <pawel.kuznik@gmail.com>
 */

describe('ElementBuilder', () => {

    describe('.build()', () => {

        it('should build a DIV element', () => {

            // make builder
            const builder = new sparkle.Builder.ElementBuilder();

            // construct an element
            const element = builder.build();

            // we should have a default element that is a DIV
            expect(element.tagName).to.be.equal('DIV');
        });

        it('should build an IMG element', () => {

            // make builder
            const builder = new sparkle.Builder.ElementBuilder('IMG');

            // construct an element
            const element = builder.build();

            // we should have a default element that is a IMG
            expect(element.tagName).to.be.equal('IMG');
        });
    });
});