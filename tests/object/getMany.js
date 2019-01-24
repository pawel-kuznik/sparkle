/**
 *  This is a test script for object.getMany() function.
 *
 *  @author     Paweł Kuźnik <pawel.kuznik@gmail.com>
 */

// tell that we are testing a function
describe('object.getMany()', () => {

    // we want the function to work on flat objects and produce pretty much the
    // same object in return
    it('should work on a flat object', () => {
    
        // the test object
        let obj = { foo: 'a', baz: 'b' };

        // flatten the object
        let result = sparkle.object.getMany();

        // check if both propertie are there
        expect(result).to.have.property('foo').that.is.equal('a');
        expect(result).to.have.property('baz').that.is.equal('b');
    });
});
