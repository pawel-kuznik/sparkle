/**
 *  This is a class describing a component. A component is a part of the UI.
 *  As a part of the UI it expose an element to use as it's representation.
 *  This element can be accessed via .elem property.
 *
 *  The Component class can be initalized with following options:
 *
 *      elem:DOMElement The element that should be used as the component's
 *                      element. By passing a custom element to the constructor
 *                      you also pass the ownership of that element to the
 *                      component. This means that component will modify and
 *                      remove (if needed) the element during it's lifecycle.
 *
 *                      (Default: <div>)
 *
 *  This Component class can emmit following events:
 *
 *  @event  removed     This event emmits when the component was removed
 *                      and should not be used further.
 *
 *  @author     Paweł Kuźnik <pawel.kuznik@gmail.com>
 */

// get the dependencies
const EventHandlers = require('./EventHandlers.js');

// the privates
const _elem = Symbol('elem');

// export the class
module.exports = class extends EventHandlers {

    /**
     *  The constructor.
     *
     *  @param  object  @see the file-level docblock
     */
    constructor(inits = { }) {

        // construct the base class
        super();

        // initialize the element of the component
        this[_elem] = inits.elem || document.createElement('DIV');
    }

    /**
     *  Get access to the component's elements.
     *
     *  @return DOMElement
     */
    get elem () {
        return this[_elem];
    }

    /**
     *  Remove the component.
     */
    remove() {

        // remove the component
        this.elem.remove();

        // trigger removed event
        this.trigger($.Event('removed'));
    }
};
