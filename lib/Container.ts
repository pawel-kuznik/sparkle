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
import { Component } from "./Component";

// export the class
export class Container extends Component {

    /**
     *  The current component in the container.
     */
    private _current:Component|null = null;

    /**
     *  The constructor
     *
     *  @param  see file-level doc block
     */
    constructor(params:{
        elem?:HTMLElement|SVGElement,
    } = { }) {

        // construct the parent class and pass some of the parameters to the parent class
        super({
            elem:   params.elem
        });
    }

    /**
     *  Get the currently installed component.
     *  @return Component
     */
    get current() : Component|null { return this._current; }

    /**
     *  Install a new widget inside the container.
     */
    install(Widget: new (...a: any[]) => Component, ...args:Array<any>) : Component {

        // is there something installed?
        if (this._current) this._current.remove(true);

        // construct new widget
        this._current = this.adopt(new Widget(...args));
        this.elem.appendChild(this._current.elem);

        // allow chaining
        return this._current;
    }

    /**
     *  Remove the currently installed component.
     */
    clear() : Container {

        // no current? we can leap out
        if (!this._current) return this;

        // remvoe the currently installed component.
        this._current.remove(true);

        // reset the variable
        this._current = null;

        // allow chaining
        return this;
    }

    /**
     *  Destroy the container.
     */
    destroy() : void {

        // do we have a current component?
        if (this._current) this._current.destroy();

        // release null
        this._current = null;

        // call the super destroy
        super.destroy();
    }
};
