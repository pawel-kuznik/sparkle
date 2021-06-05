/**
 *  This is a test suite to test AttributeBuilder
 * 
 *  @author     Paweł Kuźnik <pawel.kuznik@gmail.com>
 */

 describe('AttributesBuilder', () => {

    describe('.build()', () => {

        it('should apply attributes on an element', () => {

            let t = document.createElement('DIV');

            const builder = new sparkle.Builder.AttributesBuilder();

            builder.set('data-t', 'test');

            t = builder.build(t);

            expect(t.getAttribute('data-t')).to.equal('test');
        });
    });

    describe('.delete()', () => {

        it('should not apply deleted attribute', () => {

            let t = document.createElement('DIV');

            const builder = new sparkle.Builder.AttributesBuilder();

            builder.set('data-t', 'test');
            builder.delete('data-t');

            t = builder.build(t);

            expect(t.getAttribute('data-t')).to.not.equal('test');
        });
    });
});