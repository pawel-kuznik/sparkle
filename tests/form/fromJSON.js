/**
 *  A test script for form.fromJSON() function.
 *
 *  @author     Pawel Kuznik <pawel.kuznik@gmail.com>
 */

// declare the test for the function 
describe('toJSON()', () => {

    // the function should fill in input inside a form
    it('should fill in the elements in the form', () => {

        // create a form element
        let form = document.createElement('FORM');
        let input = document.createElement('INPUT');
        input.setAttribute('type', 'text');
        input.setAttribute('name', 'foo');
        form.appendChild(input);

        // fill in the form
        sparkle.form.fromJSON(form, { foo: 'baz' });

        // check if the value is there
        expect(input.value).to.equal('baz');
    });
});
