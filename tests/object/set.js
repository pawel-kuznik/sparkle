/**
 *  The test script to test object.set()
 *
 *  @author     Pawel Kuznik <pawel.kuznik@gmail.com>
 */

// tell that we are testing object.set() function
describe('object.set()', () => {

    it('should set simple property', () => {

        // our test object
        let obj = { };

        // set the property
        sparkle.object.set(obj, 'foo', 'a');

        // make sure that we have a foo property and is set to a
        expect(obj).to.have.property('foo').that.is.equal('a');
    });

    it('should set a deep property', () => {

        // out test object
        let obj = { };

        // set the property
        sparkle.object.set(obj, 'foo.baz', 'a');

        // make sure that we set the property
        expect(obj).to.have.property('foo').that.has.property('baz').that.is.equal('a');
    });
});
