/**
 *  A test script for form.toJSON() function.
 *
 *  @author     Pawel Kuznik <pawel.kuznik@gmail.com>
 */

// get the expect into local scope
const expect = chai.expect;

// declare the test for the function 
describe('toJSON()', () => {

    // the function should always return an object.
    it('should return an object', () => {

        // create a form element
        let form = document.createElement('FORM');

        // check if the result is an object
        expect(sparkle.form.toJSON(form)).to.be.an('object');
    });
});
