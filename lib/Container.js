/**
 *  This is a container class that that enables mounting various components
 *  inside it.
 *
 *  The Container class can be initalized with following options:
 *
 *      elem:DOMElement The element that should be used as the containers's
 *                      element. By passing a custom element to the constructor
 *                      you also pass the ownership of that element to the
 *                      component. This means that component will modify and
 *                      remove (if needed) the element during it's lifecycle.
 *
 *                      (Default: <div>)
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
     *
     *  @param  see file-level doc block
     */
    constructor(params = { }) {

        // construct the parent class and pass some of the parameters to the parent class
        super({
            elem:   params.elem
        });

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