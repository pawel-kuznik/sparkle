/**
 *  This is a test suite to test Component class.
 *
 *  @author     Pawel Kuznik <pawel.kuznik@gmail.com>
 */

// announce that we are testing Component class
describe('Component', () => {

    // we want to test the append method
    describe('#append()', () => {

        // we want to have support for components
        it('should append another component', () => {

            // make two components 
            let a = new sparkle.Component();
            let b = new sparkle.Component();

            // make a append b
            a.append(b);

            // b element should be under a elem
            expect(b.elem.parentElement).to.be.equal(a.elem);
        });

        // we want to have support for elements
        it('should append an element', () => {

            // make component and element
            let a = new sparkle.Component();
            let b = document.createElement('SPAN');

            // make the append
            a.append(b);

            // b element should be under a elem
            expect(b.parentElement).to.be.equal(a.elem);
        });

    });
});
