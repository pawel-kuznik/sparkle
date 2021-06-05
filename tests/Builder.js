/**
 *  This test suite tests Builder class.
 *  @author Paweł Kuźnik <pawel.kuznik@gmail.com>
 */
describe('Builder', () => {

    describe('.build()', () => {

        it('should build a document fragment', () => {

            // create builder
            const builder = new sparkle.Builder();

            // create result
            const result = builder.build();

            // expect document fragment always
            expect(result).to.be.instanceOf(DocumentFragment);
        });
    });

    describe('.element()', () => {

        it('should build one element', () => {

            // create builder
            const builder = new sparkle.Builder();
            builder.element('DIV');

            // create result
            const result = builder.build();

            // expect one element that is a DIV
            expect(result.children.length).to.equal(1);
            expect(result.children.item(0).tagName).to.equal('DIV');
        });

        it('should build a series of elements', () => {

            // create builder
            const builder = new sparkle.Builder();
            builder.element('DIV');
            builder.element('SPAN');
            builder.element('IMG');

            // create result
            const result = builder.build();

            // expect 3 elements
            expect(result.children.length).to.equal(3);
            expect(result.children.item(0).tagName).to.equal('DIV');
            expect(result.children.item(1).tagName).to.equal('SPAN');
            expect(result.children.item(2).tagName).to.equal('IMG');
        });

        it('shoult build nested elements', () => {

            // create builder
            const builder = new sparkle.Builder();
            builder.element('DIV').element('SPAN');
            builder.element('DIV');

            // create result
            const result = builder.build();

            // expect 2 immediate children
            expect(result.children.length).to.equal(2);
            expect(result.children[0].children.length).to.equal(1);
            expect(result.children[0].children[0].tagName).to.equal('SPAN');
        });
    });
});