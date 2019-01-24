/**
 *  This is a test script for object.flatten() function.
 *
 *  @author     Paweł Kuźnik <pawel.kuznik@gmail.com>
 */

// tell that we are testing a function
describe('object.flatten()', () => {

    // we want the function to work on flat objects and produce pretty much the
    // same object in return
    it('should work on a flat object', () => {
    
        // the test object
        let obj = { foo: 'a', baz: 'b' };

        // flatten the object
        let result = sparkle.object.flatten(obj);

        // check if both propertie are there
        expect(result).to.have.property('foo').that.is.equal('a');
        expect(result).to.have.property('baz').that.is.equal('b');
    });

    // we want to check if this function works for deep objects
    it('should work on a deep object', () => {
    
        // a deep object
        let obj = { foo: { baz: 'a' }, a: { b: { c: 'b' } } };

        // flatten the object
        let result= sparkle.object.flatten(obj);

        // check if the deep property was recognized
        expect(result).to.have.property('foo.baz').that.is.equal('a');
        expect(result).to.have.property('a.b.c').that.is.equal('b');
    });
});
