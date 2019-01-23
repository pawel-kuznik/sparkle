/**
 *  A test script for the Form class.
 *  
 *  @author     Pawel Kuznik <pawel.kuznik@gmail.com>
 */

// tell that we are testing Form class
describe('Form', () => {

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
});
