/**
 *  A test script for form.fromJSON() function.
 *
 *  @author     Pawel Kuznik <pawel.kuznik@gmail.com>
 */

// declare the test for the function 
describe('form.fromJSON()', () => {

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

    // the function to handle NULL correctly
    it('should fill NULL as empty string on text inputs and textares', () => {

        // create a form element
        let form = document.createElement('FORM');

        // create a text input
        let input = document.createElement('INPUT');
        input.setAttribute('type', 'text');
        input.setAttribute('name', 'foo');
        form.appendChild(input);

        // create a textarea
        let textarea = document.createElement('TEXTAREA');
        textarea.setAttribute('name', 'textfoo');
        form.appendChild(textarea);

        // fill in the form
        sparkle.form.fromJSON(form, {
            foo: null,
            textfoo: null
        });

        // check if the value is there
        expect(input.value).to.equal('');
        expect(textarea.value).to.equal('');
    });

    it('should fill select values', () => {

        let form = document.createElement('FORM');
        let input = document.createElement('SELECT');
        input.setAttribute('name', 'test');
        form.append(input);

        let option1 = document.createElement('OPTION');
        option1.setAttribute('value', 'foo1');
        input.append(option1);

        let option2 = document.createElement('OPTION');
        option2.setAttribute('value', 'foo2');
        input.append(option2);

        // fill the form
        sparkle.form.fromJSON(form, {
            test: 'foo2'
        });

        // check if second option is selected
        expect(option2.selected).to.equal(true);
    });

    it('should fill flag checkboxes', () => {

        // creat a form element
        let form = document.createElement('FORM');
        let input = document.createElement('INPUT');
        input.setAttribute('type', 'checkbox');
        input.setAttribute('name', 'foo');
        form.append(input);

        // fill the form
        sparkle.form.fromJSON(form, { foo: true });

        // check if the checkbox is properly set
        expect(input.checked).to.equal(true);

        // fill the form with opposise value
        sparkle.form.fromJSON(form, { foo: false });

        // check if the value is properly set
        expect(input.checked).to.equal(false);
    });

    it('should fill checkboxes with an array', () => {

        // creat a form element
        let form = document.createElement('FORM');
        let input = document.createElement('INPUT');
        input.setAttribute('type', 'checkbox');
        input.setAttribute('name', 'foo');
        input.value = 'fooval';
        form.append(input);

        let another = document.createElement('INPUT');
        another.setAttribute('type', 'checkbox');
        another.setAttribute('name', 'foo');
        another.value = 'anotherval';
        form.append(another);

        // fill the form
        sparkle.form.fromJSON(form, { foo: [ 'fooval' ] });

        // check if the checkbox is properly set
        expect(input.checked).to.equal(true);
        expect(another.checked).to.equal(false);

        // fill the form with opposise value
        sparkle.form.fromJSON(form, { foo: ['anotherval'] });

        // check if the value is properly set
        expect(input.checked).to.equal(false);
        expect(another.checked).to.equal(true);
    });
});
