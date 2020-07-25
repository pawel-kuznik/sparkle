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
 *  @author     Paweł Kuźnik <pawel.kuznik@gmail.com>
 */

// get the dependencies
import { Emitter } from "iventy";
import { Template } from "./Template";

// the privates
const template = Symbol('template');
const adopted = Symbol('adopted');
const adoptedRemovedHandler = Symbol('adoptedRemovedHandler');

/**
 *  The interface telling how the init object of the compoennt should look like.
 */
export interface ComponentInit {
    elem?:HTMLElement|SVGElement,
    template?:string
};

// export the class
export class Component<OuterElement extends SVGElement | HTMLElement = HTMLElement, InnerElement extends SVGElement | HTMLElement = HTMLElement> extends Emitter {

    /**
     *  An HTML or SVG element. Depending in which document context the component
     *  was created.
     */
    private _elem:OuterElement;

    /**
     *  A possible template the component needs.
     */
    private readonly _template:Template|null;

    /**
     *  A set of adopted components by this one.
     */
    private readonly _adopted:Set<Component> = new Set();

    /**
     *  The constructor.
     *
     *  @param  object  @see the file-level docblock
     */
    constructor(inits:ComponentInit = { }) {

        // construct the base class
        super();

        // assign the element
        this._elem = inits.elem as OuterElement || document.createElement('DIV');

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
    get elem () : OuterElement { return this._elem; }

    /**
     *  Get access to the component's content element. This is an element that
     *  other things can use to add more content. In many cases it's the same
     *  element as the `.elem`, but derived components might change it.
     *  @return DOMElement
     */
    get content() : InnerElement { return this._elem as unknown as InnerElement; }

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
        let promise:Promise<void> = new Promise((resolve) => { resolve(); });

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

        // release the component
        this._adopted.delete(component);

        // return the component
        return component;
    }

    /**
     *  Create a specific widgets inside the this component. This method automatically
     *  appends the instance of the component and adopts it.
     *  @param Component    The component to install inside this one.
     *  @variadic           The parameters for the component.
     */
    emplace(Widget: new (...a: any[]) => Component, ...args:Array<any>) : Component {

        // construct the widget
        const widget = new Widget(...args);

        // adopt the widget cause we want to make sure that we also destroy it
        // when we are called to be destroyed
        this.adopt(widget);

        // make sure that the widget is appended to the DOM of the this component.
        this.append(widget);

        // return constructed widget
        return widget;
    }

    /**
     *  Append a component or an element to this component.
     *  @param  Component|Element
     *  @return Component
     */
    append(child:HTMLElement|SVGElement|Component) : this {

        // if we are dealing with a component we want to append the component element to our
        if (child instanceof Component) this.content?.appendChild(child.elem);

        // if we are dealing with an element we want to append the element like that
        if (child instanceof HTMLElement || child instanceof SVGElement) this.content?.appendChild(child);

        // allow chaining
        return this;
    }

    /**
     *  Append the component to an another componet or an element.
     *  @param  Component|Element
     *  @return Component
     */
    appendTo(target:HTMLElement|SVGElement|Component) : this {

        // if we are dealing with a component we want to append our element to the component element
        if (target instanceof Component) target.content?.appendChild(this.elem);

        // if we are dealing with an element, we just want to append our element to it
        if (target instanceof HTMLElement || target instanceof SVGElement) target.appendChild(this.elem);

        // allow chaining
        return this;
    }

    /**
     *  This method should be called when the component is meant to be
     *  destroyed/destructed and it's meant to release any long runnig resources.
     *  This method will also make sure that it destroys any adopted components.
     *
     *  It's not expected that after this method is called the instance will be
     *  still used.
     */
    destroy() : void {

        // remove all of the adopted components
        for (let component of this._adopted) component.destroy();

        // clear the set of adopted components
        this._adopted.clear();

        // if we have a template promise we should abort it at this time
        if (this._template) this._template.abort();
    }

    /**
     *  Remove the component from DOM. Optionally, also destroy it.
     */
    remove(destroy:boolean = false) {

        // should we also destroy the component?
        if (destroy) this.destroy();

        // remove the element
        this._elem.remove();
    }
};
