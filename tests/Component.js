/**
 *  This is a test suite to test Component class.
 *
 *  @author     Pawel Kuznik <pawel.kuznik@gmail.com>
 */

// announce that we are testing Component class
describe('Component', () => {

    // check the elem
    describe('.elem', () => {

        it('should expose an element that the component is contained to', () => {

            // make a component
            let a = new sparkle.Component();

            // it should be an element
            expect(a.elem).to.be.instanceof(Element);
        });

        it('should expose same element as one specified in the constructor', () => {

            // make a component
            let a = new sparkle.Component({ elem: document.createElement('SPAN') });
            let b = new sparkle.Component({ elem: document.createElement('SECTION') });

            // check the elements
            expect(a.elem.tagName).to.be.equal('SPAN');
            expect(b.elem.tagName).to.be.equal('SECTION');
        });
    });

    // check the content element
    describe('.content', () => {

        it('should expose a component content element', () => {

            // make a component
            let a = new sparkle.Component();

            // it should be an element
            expect(a.content).to.be.instanceof(Element);
        });
    });

    // we want to test the append method
    describe('.append()', () => {

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

    // we want to test the emplace method
    describe('.emplace()', () => {

        it('should create component that is already inside the existing one', () => {

            // construct component
            let a = new sparkle.Component();

            // construct b
            let b = a.emplace(sparkle.Component);

            // b element should be under a elem
            expect(b.elem.parentElement).to.be.equal(a.elem);
        });
    });

    // we weant to test the appendTo method
    describe('.appendTo()', () => {

        // test a case when we want to append to another component
        it('should append to a component', () => {

            // make 2 components
            let a = new sparkle.Component();
            let b = new sparkle.Component();

            // make the append
            a.appendTo(b);

            // expect that a is under b
            expect(a.elem.parentElement).to.be.equal(b.elem);
        });

        // test a case when we want to append to an element
        it('should append to a component', () => {

            // make 2 components
            let a = new sparkle.Component();
            let b = document.createElement('SPAN');

            // make the append
            a.appendTo(b);

            // expect that a is under b
            expect(a.elem.parentElement).to.be.equal(b);
        });
    });
});
