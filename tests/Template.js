/**
 *  This is a test suite to test Template class.
 *
 *  @author     Pawel Kuznik <pawel.kuznik@gmail.com>
 */

// announce that we are testing Component class
describe('Template', () => {

    describe('.abort()', () => {

        it('should reject the promise', done => {

            // start the template fetch
            const template = new sparkle.Template('/dummy.html');

            // abort template
            template.abort();

            // the promise should be rejected
            template.then(() => { }, () => { done(); });
        });
    });

    describe('.arrivesTo()', () => {

        it('should append to a specific element', done => {

            // create an element
            const div = document.createElement('DIV');

            // start the template fetch
            const template = new sparkle.Template('/dummy.html');

            // append the thing to the element
            template.arrivesTo(div).then(() => {

                // expect one child inside
                expect(div.children.length).to.equal(1);

                // we are done
                done();
            });
        });

        it('should not append anything when aborted', done => {

            // create an element
            const div = document.createElement('DIV');

            // start the template fetch
            const template = new sparkle.Template('/dummy.html');

            // append the thing to the element
            template.arrivesTo(div).then(() => {

                // we should not resolve here
                done(new Error('Resolved when it should not'));

            },() => {

                // expect one child inside
                expect(div.children.length).to.equal(0);

                // we are done
                done();
            });

            // abort the template
            template.abort();
        });
    });
});
