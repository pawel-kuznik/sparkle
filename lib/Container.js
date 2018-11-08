/**
 *  This is a container class that that enables mounting various components
 *  inside it.
 *  @author     Pawel Kuznik <pawel.kuznik@gmail.com>
 */

// the depencies
const Component = require('./Component.js');

// the privates
const current = Symbol('current');

// export the class
module.exports = class extends Component {

    /**
     *  The constructor
     */
    constructor() {

        // construct the parent class
        super();

        /**
         *  The currently installed component.
         *  @var    Component
         */
        this[current] = null;
    }

    /**
     *  Get the currently installed component.
     *  @return Component
     */
    get current() {

        // return the the currently installed component
        return this[current];
    }

    /**
     *  Install a new widget inside the container.
     */
    install(Widget, ...args) {

        // is there something installed?
        if (this[current]) this[current].remove();

        // construct new widget
        this[current] = new Widget(...args);
        this.elem.appendChild(this[current].elem);

        // allow chaining
        return this[current];
    }

    /**
     *  Remove the currently installed component.
     */
    clear() {

        // do we have a current component installed?
        if (this[current]) this[current].remove();

        // reset the variable
        this[current] = null;

        // allow chaining
        return this;
    }

    /**
     *  Remove the instance
     */
    remove() {

        // clear the component
        this.clear();

        // remove the component
        super.remove();
    }
};
