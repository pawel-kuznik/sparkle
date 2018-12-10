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
 *      template:string This path to a template that should be loaded into
 *                      the component. The file behind the path should
 *                      contain a HTML inside.
 *
 *                      When the template is loaded the .ready() promise
 *                      is resolved.
 *
 *                      (Default: null)
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
const elem = Symbol('elem');
const templatePromise = Symbol('templatePromise');
const adopted = Symbol('adopted');
const adoptedRemovedHandler = Symbol('adoptedRemovedHandler');

// export the class
module.exports = class extends EventHandlers.Emitter {

    /**
     *  The constructor.
     *
     *  @param  object  @see the file-level docblock
     */
    constructor(inits = { }) {

        // construct the base class
        super();

        /**
         *  The element housing the component in the DOM tree.
         *  @var    HTMLElement
         */
        this[elem] = inits.elem || document.createElement('DIV');

        /**
         *  The promise of a template to load.
         *  @var    Promise
         */
        this[templatePromise] = null;

        /**
         *  A set of adopted components.
         *  @var    Set
         */
        this[adopted] = new Set();

        /**
         *  A handler to react on when an adopted component is removed.
         *  @var    function
         */
        this[adoptedRemovedHandler] = event => {

            // release the event target (the adopted component)
            this.release(event.target);
        };

        // should we load a template into our component?
        if(inits.template) {

            // start loading template
            this[templatePromise] = fetch(inits.template).then(response => {
                return response.text();
            }).then(html => {

                // construct a template element so we can parse the html
                let template = document.createElement('template');

                // assign the string to the template
                template.innerHTML = html;

                // adopt all children
                let child;
                while(child = template.content.firstElementChild) this.elem.appendChild(this.elem.ownerDocument.adoptNode(child));

                // we can remove the template element
                template.remove();
            });
        }
    }

    /**
     *  Get access to the component's elements.
     *  @return DOMElement
     */
    get elem () {
        return this[elem];
    }

    /**
     *  A component is a thenable object.
     *  @return Promise
     */
    then() {

        // if we do have the template promise we would like to return a new one
        if (this[templatePromise]) return this[templatePromise].then();

        // create a resolved promise, cause we never neded to load a template
        let promise = new Promise((resolve, reject) => { resolve(); });

        // return the resolved promise
        return promise;
    }

    /**
     *  Adopting a component transfer the cleanup responsibity to the adopter.
     *  This means that you don't need to call the remove method on the adoptee.
     *  @param  Component   The component to adopt.
     *  @return Component   The adopted component.
     */
    adopt(component) {

        // add the component to the adopted ones
        this[adopted].add(component);

        // install a removed handler
        this[adopted].on('removed', this[adoptedRemovedHandler]);

        // return the same component
        return component;
    }

    /**
     *  Releasing a component means to give up the responsibility to remove
     *  the adopted component.
     *  @param  Component   The component to release.
     *  @return Component   The released component.
     */
    release(component) {

        // install a removed handler
        this[adopted].off('removed', this[adoptedRemovedHandler]);

        // release the component
        this[adopted].delete(component);
    
        // return the component
        return component;
    }

    /**
     *  Remove the component.
     */
    remove() {

        // remove all of the adopted components
        for (let component of this[adopted]) component.remove();

        // remove the component
        this.elem.remove();

        // trigger the removed event
        this.triggerer.triggerEvent('removed');
    }
};
