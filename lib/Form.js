/**
 *  This is a form class. This class abstracts a regular HTML form element 
 *  and provides a series of methods to manager output of a form. 
 *
 *  This component fires following events:
 *
 *  @event  submit      This event triggers when a user submits a form somehow.
 *
 *  @event  submitted   This event triggers when the form is submitted by an
 *                      user or API. This event trigger after the submit processing
 *                      is done.
 *
 *  @author Paweł Kuźnik <pawel.kuznik@gmail.com>
 */

// the dependencies
const Component = require('./Component.js');
const form = require('./form.js');
const object = require('./object.js');

// the data of the form
const data = Symbol('data');

// export the class
module.exports = class extends Component {

    /**
     *  The constructor of the form.
     *
     *  @param  object  The options object. It supports all Component
     *                  options and additional one:
     *
     *                  data:object     An initial object to fill the form with.
     */
    constructor(inits = { }) {

        // construct base object
        super(Object.assign({ }, {
            elem:   document.createElement('form')
        }, inits));

        /**
         *  An actual object might be bound to the form. This allows to have
         *  an form to data binding. The form later on can be asked to update
         *  itself or to push the current data on the object.
         *
         *  @var    object
         */
        this[data] = inits.data || { };

        // install an on submit handler
        this.elem.addEventListener('submit', event => {

            // no default handling
            event.preventDefault();

            // create our submit event
            let submitEvent = this.triggerer.createEvent('submit');

            // trigger the event
            this.triggerer.trigger(submitEvent);

            // was the event prevented?
            if (submitEvent.isPrevented) return;

            // submit the form
            this.submit();
        });

        // if we can initialize the form we can do this
        if (inits.data) {
         
            // when the component is ready we want to fill the form with initial
            // data set.
            this.then(() => {
                this.fill(inits.data);
            });
        }
    }

    /**
     *  Get access to current data.
     *  @return object
     */
    get data() {

        // return current data object
        return this[data];
    }

    /**
     *  Push current form state to the data object.
     *  @return Form
     */
    push() {

        // push the data on the object
        this.assign(this.data);

        // allow chaining
        return this;
    }

    /**
     *  Pull data from the data object to the form.
     *  @return Form
     */
    pull() {

        // reset the form
        this.elem.reset();

        // fill the form with current data object
        this.fill(this.data);

        // allow chaining
        return this;
    }

    /**
     *  Fill the form with a fresh data.
     *  @param  object
     *  @return Form    The object to chain.
     */
    fill(newData) {

        // get all the inputs, textareas, or selects to fill with with data
        // from the object.
        let inputs = this.elem.querySelectorAll('input, textarea');

        // @todo support checkboxes and radio buttons.
        // @todo support select

        // iterate over the inputs
        for (let input of inputs) {

            // get data from the object by value
            let value = object.get(newData, input.getAttribute('name'));

            // undefined value? then we want to remove the value all together
            if (typeof(value) == 'undefined') input.removeAttribute('value');

            // we area dealing with a text or text-like value
            else {

                // if the value is null or undefined, then we want to assign
                // empty string to the actual element
                if (value == null || typeof(value) == 'undefined') input.value = '';

                // assign a string version of the value
                else input.setAttribute('value', value);
            }
        }

        // allow chaining
        return this;
    }

    /**
     *  Apply the form data on a specific object. This is useful when a form
     *  is dealing with object to be assigned and then updated by the form.
     *  The target object will be assigned with the data from the form.
     *
     *  @param  object  The target object to assign the form data.
     *  @return Form    Chained object
     */
    assign(target) {

        // set get the plain data
        let plainData = form.toJSON(this.elem);

        // assign all data with the accessor
        for(let key in plainData) object.set(target, key, plainData[key]);

        // allow chaining
        return this;
    }

    /**
     *  Submit the form. This method make a programatic submit and does not
     *  force the element to submit. This method can be overriden to provide
     *  specific submit behavior. Event in such case, parent method shoud be
     *  called to maintain the 'submitted' event call.
     *
     *  @return Form
     */
    submit() {

        // push the current state of the form to the data object
        this.push();

        // trigger the submitted event
        this.triggerer.triggerEvent('submitted');

        // allow chaining
        return this;
    }
};
