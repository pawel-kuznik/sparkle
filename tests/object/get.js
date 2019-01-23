/**
 *  This is a script to test object.get()
 *
 *  @author     Pawel Kuznik <pawel.kuznik@gmail.com>
 */

// tell that we want to test object.get()
describe('object.get()', () => {

    it('should get simple properties', () => {

        // make a test object
        let obj = { foo: 'a' };

        // expect that we can fetch the property
        expect(sparkle.object.get(obj, 'foo')).to.equal('a');
    });

    it('should get a value with accessor string', () => {

        // make a test object
        let obj = { foo: { baz: 'a' } };

        // expect that we can fetch the property
        expect(sparkle.object.get(obj, 'foo.baz')).to.equal('a');
    });

    it('should return undefined when it can not be accessed', () => {

        // make a test object
        let obj = { foo: 'a' };

        // expect that we can fetch the property
        expect(sparkle.object.get(obj, 'baz')).to.be.an('undefined');
    });
});
