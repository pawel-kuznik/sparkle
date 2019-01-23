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
            elem: document.createElement('form')
        }, inits));

        // install an on submit handler
        this.elem.addEventListener('submit', event => {

            // no default handling
            event.preventDefault();

            // create our submit event
            let submitEvent = this.triggerer.createEvent('submit');

            // trigger the event
            this.triggerer.trigger(submitEvent);

            // was the event prevented?
            if (submitEvent.isDefaultPrevented()) return;

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

        // convert the form to JSON object
        return form.toJSON(this.elem);
    }

    /**
     *  Fill the form with a fresh data.
     *  @param  object
     *  @return Form    The object to chain.
     */
    fill(newData) {

        // fill form with new data
        form.fromJSON(this.elem, newData);

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

        // assign all form data on a specific target
        Object.assign(target, this.data);

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

        // trigger the submitted event
        this.triggerer.triggerEvent('submitted');

        // By default we don't have any built in submit behavior, but it
        // can be defined in a child class.

        // allow chaining
        return this;
    }
};
