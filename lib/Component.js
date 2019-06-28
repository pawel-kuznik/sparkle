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
const Template = require('./Template.js');

// the privates
const elem = Symbol('elem');
const template = Symbol('template');
const adopted = Symbol('adopted');
const adoptedRemovedHandler = Symbol('adoptedRemovedHandler');

// export the class
const Component = class extends EventHandlers.Emitter {

    /**
     *  This a method that allow to compose a component class on fly. This is
     *  usefull when creating a bunch on components that would need to have only
     *  a template assigned or a similar options and don't need to have a full
     *  class defined.
     *
     *  For the base class it's not really that useful, but it shines with forms
     *  or lists. Anyway we keep it in the base class so any component can be
     *  composed to a on fly class.
     *
     *  @param  object|function     This parameter can be an object which will
     *                              be applied on the 1st parameter of the constructor.
     *
     *                              This parameter can be an function that will
     *                              be called to get the parameters of the constructor
     *                              and compose an object for the actual constructor.
     *
     *  @return Component
     */
    static compose(data) {

        // extends the class
        return class extends this {

            // the new constructor
            constructor(...args) {

                // if the data is a function we want to call it
                if (typeof(data) == 'function') super(data(...args));

                // call the constructor with the object
                else super(Object.assign({ }, data, args[0] ? args[0] : { }));
            }
        };
    }

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
         *  Possible template of this component.
         *  @var    Template
         */
        this[template] = null;

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
            
            // construct a template
            this[template] = new Template(inits.template);

            // tell the template to arrive to our element
            this[template].arrivesTo(this.elem);
        }
    }

    /**
     *  Get access to the component's elements.
     *  @return DOMElement
     */
    get elem () { return this[elem]; }

    /**
     *  A component is a thenable object. This promise resolves when
     *  the component is fully loaded. If the component is removed before
     *  if can be initialized the promise is rejected.
     *  @return Promise
     */
    then(successCallback, failureCallback) {

        // if we do have the template promise we would like to return a new one
        if (this[template]) return this[template].then(successCallback, failureCallback);

        // create a resolved promise, cause we never neded to load a template
        let promise = new Promise((resolve, reject) => { resolve(); });

        // return the resolved promise
        return promise.then(successCallback, failureCallback);
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
        component.on('removed', this[adoptedRemovedHandler]);

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
        component.off('removed', this[adoptedRemovedHandler]);

        // release the component
        this[adopted].delete(component);
    
        // return the component
        return component;
    }

    /**
     *  Append a component or an element to this component.
     *  @param  Component|Element
     *  @return Component
     */
    append(child) {

        // if we are dealing with a component we want to append the component element to our
        if (child instanceof Component) this.elem.appendChild(child.elem);

        // if we are dealing with an element we want to append the element like that
        if (child instanceof Element) this.elem.appendChild(child);

        // allow chaining
        return this;
    }

    /**
     *  Append the component to an another componet or an element.
     *  @param  Component|Element
     *  @return Component
     */
    appendTo(target) {

        // if we are dealing with a component we want to append our element to the component element
        if (target instanceof Component) target.elem.appendChild(this.elem);

        // if we are dealing with an element, we just want to append our element to it
        if (target instanceof Element) target.appendChild(this.elem);

        // allow chaining
        return this;
    }

    /**
     *  Remove the component.
     */
    remove() {

        // remove all of the adopted components
        for (let component of this[adopted]) {

            // remove the component
            component.remove();

            // forget about the component
            this.release(component);
        }

        // was the component already removed? then do nothing
        if (!this[elem]) return;

        // if we have a template promise we should abort it at this time
        if (this[template]) this[template].abort();

        // remove the element
        this[elem].remove();
        this[elem] = null;

        // trigger the removed event
        this.triggerer.triggerEvent('removed');

        // remove all event handlers. At this point they are meaningless
        this.off();
    }
};

// export the class
module.exports = Component;
