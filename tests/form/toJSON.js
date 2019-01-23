/**
 *  A test script for form.toJSON() function.
 *
 *  @author     Pawel Kuznik <pawel.kuznik@gmail.com>
 */

// declare the test for the function 
describe('form.toJSON()', () => {

    // the function should always return an object.
    it('should return an object', () => {

        // create a form element
        let form = document.createElement('FORM');

        // check if the result is an object
        expect(sparkle.form.toJSON(form)).to.be.an('object');
    });
});
