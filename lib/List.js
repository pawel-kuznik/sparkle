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
const components = Symbol('components');
const removedHandler = Symbol('removedHandler');

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

        /**
         *  The list of component housed inside this list.
         *  @var    Set
         */
        this[components] = new Set();

        /**
         *  A special event handler for when a list component is removed.
         *
         *  @param  Iventy.Event    The removed event.
         */
        this[removedHandler] = event => {

            // not our component
            if (!this[components].has(event.target)) return;

            // remove the target from us
            this.delete(event.target);
        }
    }

    /**
     *  Constuct a new component inside this list.
     *
     *  @param  constructor     A Component's constructor.
     *  @param  variadic        A list of parameters to the constructor.
     *  @return Component       The added item.
     */
    add(Component, ...args) {

        // construct the component
        let component = new Component(...args);

        // we want to remember the component for later use
        this[components].add(component);

        // add the component element to the list element
        this.elem.appendChild(component.elem);

        // if the component is removed, then we want to remove it from the list also.
        component.on('removed', this[removedHandler]);

        // tell others that a list item was removed
        this.triggerer.triggerEvent('added', { item: component });

        // return the added item
        return component;
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
        if (!this[components].has(component)) return this;

        // stop listening to the removed handler
        component.off('removed', this[removedHandler]);

        // remove the component from our list
        this[components].delete(component);

        // .removeChild() may throw
        try
        {
            // try to remove the child
            this.elem.removeChild(component.elem);

            // tell others that a list item was removed
            this.triggerer.triggerEvent('deleted', { item: component });
        }

        // the component was not a child of our list. Everything is ok.
        catch(e) { }

        // allow chaining
        return this;
    }

    /**
     *  Clear the list out of all components.
     *
     *  @return List
     */ 
    clear() {

        // iterate over the list and delete each component
        for(let c of this) this.delete(c);

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
        return Array.from(this[components]);
    }

    /**
     *  Get the iterator so it's possible to go through the list.
     */
    * [Symbol.iterator] () {
    
        // yield all the components.
        for (let component of this[components]) yield component;
    }
};
