/**
 *  This is a test suite to test Component class.
 *
 *  @author     Pawel Kuznik <pawel.kuznik@gmail.com>
 */

// announce that we are testing Component class
describe('Container', () => {

    describe('.install()', () => {

        it('should install a Component instance', () => {

            // make a container
            const c = new sparkle.Container();

            // install a component
            c.install(sparkle.Component);

            // make sure current is something of a component type
            expect(c.current).to.be.instanceOf(sparkle.Component);
        });

        it('should install a derived class', () => {

            // make a container
            const c = new sparkle.Container();

            // make a derived class
            const A = class extends sparkle.Container { };

            // install a component
            c.install(A);

            // make sure current is something of a component type
            expect(c.current).to.be.instanceOf(A);
        });
    });

    describe('.remove()', () => {

        it('should remove the installed component', () => {

            // make a container
            const c = new sparkle.Container();

            // make a derived class
            const A = class extends sparkle.Container { };

            // install a component
            c.install(A);

            // remove the container
            c.remove(true);

            // expect the current to be null
            expect(c.current).to.be.equal(null);
        });
    });
});
