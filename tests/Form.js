/**
 *  A test script for the Form class.
 *  
 *  @author     Pawel Kuznik <pawel.kuznik@gmail.com>
 */

// tell that we are testing Form class
describe('Form', () => {

    describe('.data', () => {

        it('should be assigned from the constructor', () => {

            // make the component
            let init = { foo: 'a' };
            let comp = new sparkle.Form({ data: init });

            // make sure it's the same object
            expect(comp.data).to.be.equal(init);
        });
    });

    // we want to test if the submit event is properly triggered
    describe('+submit', () => {

        // we want to make sure that the submit event is fired
        it('should fire the submit event when form fires it', (done) => {

            // construct a form
            let form = new sparkle.Form();

            // install a handler on the submit event
            form.on('submit', () => { done(); });

            // trigger the submit event
            form.elem.dispatchEvent(new Event('submit'));
        });
    });

    describe('+submitted', () => {

        // we want to make sure that the submit event is fired
        it('should fire the submit event when form fires it', (done) => {

            // construct a form
            let form = new sparkle.Form();

            // install a handler on the submit event
            form.on('submitted', () => { done(); });

            // trigger the submit event
            form.elem.dispatchEvent(new Event('submit'));
        });

        // we want to make sure that the submit event is fired
        it('should fire the submit event when we call submit() method', (done) => {

            // construct a form
            let form = new sparkle.Form();

            // install a handler on the submit event
            form.on('submitted', () => { done(); });

            // call the form
            form.submit();
        });
    });

    describe('.fill()', () => {

        it('should update the form fields', () => {

            // prepare test form
            let form = document.createElement('FORM');
            let input = document.createElement('INPUT');
            input.setAttribute('name', 'foo');
            form.appendChild(input);

            // the object to fill the form with
            let obj = { foo: 'a' };

            // create a component form
            let comp = new sparkle.Form({ elem: form });

            // fill the component form with data
            comp.fill(obj);

            // expect the input to be filled in
            expect(input.value).to.be.equal('a');
        });

        it('should update the form field identified by accessor', () => {

            // prepare test form
            let form = document.createElement('FORM');
            let input = document.createElement('INPUT');
            input.setAttribute('name', 'foo.baz');
            form.appendChild(input);

            // the object to fill the form with
            let obj = { foo: { baz: 'a' } };

            // create a component form
            let comp = new sparkle.Form({ elem: form });

            // fill the component form with data
            comp.fill(obj);

            // expect the input to be filled in
            expect(input.value).to.be.equal('a');
        });

        it('should update the form from object with defined getter', () => {

            // prepare test form
            let form = document.createElement('FORM');
            let input = document.createElement('INPUT');
            input.setAttribute('name', 'foo');
            form.appendChild(input);

            // prepare an object with defined getter
            let obj = { };
            Object.defineProperty(obj, 'foo', { get () { return 'baz'; } });

            // create a component form
            let comp = new sparkle.Form({ elem: form });

            // fill the component form with data
            comp.fill(obj);

            // expect the input to be filled in
            expect(input.value).to.be.equal('baz');
        });
    });

    describe('.assign()', () => {

        it('should assign simple data to an object', () => {

            // prepare test form
            let form = document.createElement('FORM');
            let input = document.createElement('INPUT');
            input.setAttribute('name', 'foo');
            input.value = 'a';
            form.appendChild(input);

            // the object to fill the form with
            let obj = { };

            // create a component form
            let comp = new sparkle.Form({ elem: form });

            // fill the component form with data
            comp.assign(obj);

            // expect the input to be filled in
            expect(obj).to.have.property('foo').that.is.equal('a');
        });

        it('should assign data identified by accessor', () => {

            // prepare test form
            let form = document.createElement('FORM');
            let input = document.createElement('INPUT');
            input.setAttribute('name', 'foo.baz');
            input.value = 'a';
            form.appendChild(input);

            // the object to fill in with data
            let obj = { };

            // create a component
            let comp = new sparkle.Form({ elem: form });

            // assign data
            comp.assign(obj);

            // make sure that we have a deep object
            expect(obj).to.have.property('foo').that.has.property('baz').that.is.equal('a');
        });
    });

    describe('.push()', () => {
        
        it('should update the data object', () => {

            // prepare test form
            let form = document.createElement('FORM');
            let input = document.createElement('INPUT');
            input.setAttribute('name', 'foo');
            input.value = 'a';
            form.appendChild(input);
            let comp = new sparkle.Form({ elem: form });

            // make the push
            comp.push();

            // expect that the form data has the property and it has proper value
            expect(comp.data).to.have.property('foo').that.is.equal('a');
        });
    });

    describe('.pull()', () => {

        it('should update the form elements', () => {

            // prepare test form
            let form = document.createElement('FORM');
            let input = document.createElement('INPUT');
            input.setAttribute('name', 'foo');
            form.appendChild(input);
            let comp = new sparkle.Form({ elem: form, data: { foo: 'a' } });

            // make the push
            comp.pull();

            // expect that the form data has the property and it has proper value
            expect(input.value).to.be.equal('a');
        });
    });


    describe('.submit()', () => {

        it('should apply current data state on the data object', () => {

            // prepare test form
            let form = document.createElement('FORM');
            let input = document.createElement('INPUT');
            input.setAttribute('name', 'foo');
            input.value = 'baz';
            form.appendChild(input);
            let comp = new sparkle.Form({ elem: form, data: { } });

            // submit the form state
            comp.submit();

            // expect form data to have new values
            expect(comp.data).to.have.property('foo').that.be.equal('baz');
        });

        it('should trigger submitted event', (done) => {

            // prepare test form
            let form = document.createElement('FORM');
            let comp = new sparkle.Form({ elem: form, data: { } });

            // install on submit handler
            comp.on('submitted', () => {
                done();
            });

            // submit the form state
            comp.submit();
        });
    });
});
