/**
 *  This is a class that allows to create a simple list of components. This list
 *  holds the instance of the components installed here and properly bubbles all
 *  events to one common point.
 *
 *  In addition to standard Component events and the events related to the children
 *  of the list this component triggers following events:
 *
 *  @event      added       This event triggers when a new component is added to
 *                          the list.
 *
 *  @event      deleted     This event triggers when a component is deleted from
 *                          the list.
 *
 *  @author     Pawel Kuznik <pawel.kuznik@gmail.com>
 */

// get the dependencies
const Component = require('./Component.js');

// the privates
const _components = Symbol('components');

// export the class
module.exports = class extends Component { 

    /**
     *  The constructor
     *
     *  @param  object  @see the Component documentation.
     */
    constructor(inits = { }) {

        // call the parent constructor
        super(inits);

        // construct a set of components
        this[_components] = new Set();
    }

    /**
     *  A special event handler for when a list component is removed.
     *
     *  @param  Iventy.Event    The removed event.
     */
    [_removedHandler] (event) {

        // not our component
        if (!this[_components].has(event.target)) return;

        // remove the target from us
        this.delete(event.target);
    }

    /**
     *  Constuct a new component inside this list.
     *
     *  @param  constructor     A Component's constructor.
     *  @param  variadic        A list of parameters to the constructor.
     */
    add(Component, ...args) {

        // construct the component
        let component = new Component(...args);

        // add the component element to the list element
        this.elem.appendChild(component.elem);

        // if the component is removed, then we want to remove it from the list also.
        component.on('removed', this[_removedHandler]);

        // allow chaining
        return this;
    }

    /**
     *  Delete a component from the list. The component should be one of the components
     *  created with the .add() method. If not one of them, then this method has no effect.
     *
     *  @param  Component   The component to remove from the list.
     *  @return List.
     */
    delete(component) {

        // not our component? skip processing
        if (!this[_components].has(component)) return this;

        // stop listening to the removed handler
        component.off('removed', this[_removedHandler]);

        // remove the component from our list
        this[_components].delete(component);

        // .removeChild() may throw
        try
        {
            // try to remove the child
            this.elem.removeChild(component.elem);
        }

        // the component was not a child of our list. Everything is ok.
        catch(e) { }

        // allow chaining
        return this;
    }

    /**
     *  Get access to installed components.
     *
     *  @return Array
     */
    get components () {

        // return the components
        return Array.from(this[_components]);
    }

    /**
     *  Get the iterator so it's possible to go through the list.
     */
    * [Symbol.iterator] () {
    
        // yield all the components.
        for (let component of this[_components]) yield component;
    }

    /**
     *  Remove the list with all of it's components.
     */
    remove() {

        // remove all components
        for(let component of this[_components]) component.remove();

        // and remove with the parent method also
        super.remove();
    }
};
