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

    it('should only parse inputs with name', () => {

        // create a form element
        let form = document.createElement('FORM');

        // create an input
        let input = document.createElement('INPUT');
        input.setAttribute('type', 'text');
        input.value = 'foo';

        form.append(input);

        // get the data
        const data = sparkle.form.toJSON(form);

        // expect the data to be an empty object
        expect(data).to.be.deep.equal({ });
    });

    it('should handle text inputs', () => {

        // create a form element
        let form = document.createElement('FORM');

        let input = document.createElement('INPUT');
        input.setAttribute('type', 'text');
        input.setAttribute('name', 'test');
        input.value = 'foo';

        form.append(input);

        // get the data
        const data = sparkle.form.toJSON(form);

        // make sure we have desired data
        expect(data).to.have.property('test').that.equals('foo');
    });

    it('should handle flag checkboxes', () => {

        // create a form element
        let form = document.createElement('FORM');

        // construct a checkbox
        let checkbox = document.createElement('INPUT');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('name', 'test');
        checkbox.checked = false;

        // append the checkbox to the form
        form.append(checkbox);

        // get the data
        let data = sparkle.form.toJSON(form);

        // expect false value from a lone checkbox
        expect(data).to.have.property('test').that.equals(false);

        // set the checkbox to checked state
        checkbox.checked = true;

        // get the data again
        data = sparkle.form.toJSON(form);

        // expect true value from a lone checkbox
        expect(data).to.have.property('test').that.equals(true);
    });

    it('should handle multiple checkboxes', () => {

        // create a form elemnt
        let form = document.createElement('FORM');

        // create a checkbox
        let checkbox1 = document.createElement('INPUT');
        checkbox1.setAttribute('type', 'checkbox');
        checkbox1.setAttribute('name', 'foo');
        checkbox1.checked = true;
        checkbox1.value = 'baz1';

        form.append(checkbox1);

        // create a checkbox
        let checkbox2 = document.createElement('INPUT');
        checkbox2.setAttribute('type', 'checkbox');
        checkbox2.setAttribute('name', 'foo');
        checkbox2.checked = true;
        checkbox2.value = 'baz2';

        form.append(checkbox2);

        // create a checkbox
        let checkbox3 = document.createElement('INPUT');
        checkbox3.setAttribute('type', 'checkbox');
        checkbox3.setAttribute('name', 'foo');
        checkbox3.checked = false;
        checkbox3.value = 'baz3';

        form.append(checkbox3);

        // get the data
        const data = sparkle.form.toJSON(form);

        // make sure we have only baz1 and baz2 in output data
        expect(data).to.have.property('foo').that.deep.equal(['baz1', 'baz2']);
    });

    it('should handle multiple radioboxe', () => {
    
        // create form element
        const form = document.createElement('FORM');

        let radio1 = document.createElement('INPUT');
        radio1.setAttribute('type', 'radio');
        radio1.setAttribute('name', 'test');
        radio1.value = 'foo1';

        form.append(radio1);

        let radio2 = document.createElement('INPUT');
        radio2.setAttribute('type', 'radio');
        radio2.setAttribute('name', 'test');
        radio2.value = 'foo2';
        radio2.checked = true;

        form.append(radio2);

        let radio3 = document.createElement('INPUT');
        radio3.setAttribute('type', 'radio');
        radio3.setAttribute('name', 'test');
        radio3.value = 'foo3';

        form.append(radio3);

        // get the data
        const data = sparkle.form.toJSON(form);

        // make sure we have proper value
        expect(data).to.have.property('test').that.equal('foo2');
    });
});
