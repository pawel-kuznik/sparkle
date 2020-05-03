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
import { Emitter } from "iventy";
import { Template } from "./Template";

// the privates
const template = Symbol('template');
const adopted = Symbol('adopted');
const adoptedRemovedHandler = Symbol('adoptedRemovedHandler');

// export the class
export class Component extends Emitter {

    /**
     *  An HTML or SVG element. Depending in which document context the component
     *  was created.
     */
    private _elem:HTMLElement|SVGElement;

    /**
     *  A possible template the component needs.
     */
    private readonly _template:Template|null;

    /**
     *  A set of adopted components by this one.
     */
    private readonly _adopted:Set<Component> = new Set();

    /**
     *  A special handler for the remove event of the adopted components.
     */
    private readonly _adoptedRemoveHandler = (event:any) => {

        // release the event target (the adopted component)
        if (event.target) this.release(event.target);
    };

    /**
     *  The constructor.
     *
     *  @param  object  @see the file-level docblock
     */
    constructor(inits:{
        elem?:HTMLElement|SVGElement,
        template?:string
    } = { }) {

        // construct the base class
        super();

        // assign the element
        this._elem = inits.elem || document.createElement('DIV');

        // should we load a template into our component?
        if (inits.template) {

            // construct a template
            this._template = new Template(inits.template);

            // tell the template to arrive to our element
            this._template.arrivesTo(this.elem);
        }

        // we don't have a template, so the component is immediately ready
        else this._template = null;
    }

    /**
     *  Get access to the component's elements.
     */
    get elem () : HTMLElement|SVGElement { return this._elem; }

    /**
     *  Get access to the component's content element. This is an element that
     *  other things can use to add more content. In many cases it's the same
     *  element as the `.elem`, but derived components might change it.
     *  @return DOMElement
     */
    get content() : HTMLElement|SVGElement|null { return this._elem; }

    /**
     *  A component is a thenable object. This promise resolves when
     *  the component is fully loaded. If the component is removed before
     *  if can be initialized the promise is rejected.
     *  @return Promise
     */
    then(successCallback:() => void, failureCallback:() => void) : Promise<void> {

        // if we do have the template promise we would like to return a new one
        if (this._template) return this._template.then(successCallback, failureCallback);

        // create a resolved promise, cause we never neded to load a template
        let promise:Promise<void> = new Promise((resolve, reject) => { resolve(); });

        // return the resolved promise
        return promise.then(successCallback, failureCallback);
    }

    /**
     *  Adopting a component transfer the cleanup responsibity to the adopter.
     *  This means that you don't need to call the remove method on the adoptee.
     *  @param  Component   The component to adopt.
     *  @return Component   The adopted component.
     */
    adopt(component:Component) : Component {

        // add the component to the adopted ones
        this._adopted.add(component);

        // install a removed handler
        component.on('removed', this._adoptedRemoveHandler);

        // return the same component
        return component;
    }

    /**
     *  Releasing a component means to give up the responsibility to remove
     *  the adopted component.
     *  @param  Component   The component to release.
     *  @return Component   The released component.
     */
    release(component:Component) : Component {

        // install a removed handler
        component.off('removed', this._adoptedRemoveHandler);

        // release the component
        this._adopted.delete(component);

        // return the component
        return component;
    }

    /**
     *  Append a component or an element to this component.
     *  @param  Component|Element
     *  @return Component
     */
    append(child:HTMLElement|SVGElement|Component) : Component {

        // if we are dealing with a component we want to append the component element to our
        if (child instanceof Component) this.content?.appendChild(child.elem);

        // if we are dealing with an element we want to append the element like that
        if (child instanceof Element || child instanceof SVGElement) this.content?.appendChild(child);

        // allow chaining
        return this;
    }

    /**
     *  Append the component to an another componet or an element.
     *  @param  Component|Element
     *  @return Component
     */
    appendTo(target:HTMLElement|SVGElement|Component) : Component {

        // if we are dealing with a component we want to append our element to the component element
        if (target instanceof Component) target.content?.appendChild(this.elem);

        // if we are dealing with an element, we just want to append our element to it
        if (target instanceof HTMLElement || target instanceof SVGElement) target.appendChild(this.elem);

        // allow chaining
        return this;
    }

    /**
     *  Remove the component.
     */
    remove() {

        // remove all of the adopted components
        for (let component of this._adopted) {

            // remove the component
            component.remove();

            // forget about the component
            this.release(component);
        }

        // was the component already removed? then do nothing
        if (!this._elem) return;

        // if we have a template promise we should abort it at this time
        if (this._template) this._template.abort();

        // remove the element
        this._elem.remove();

        // trigger the removed event
        this.trigger('removed');
    }
};