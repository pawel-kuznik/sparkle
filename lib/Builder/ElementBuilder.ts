import { AttributesBuilder } from "./AttributesBuilder";
/**
 *  The class that defines a builder for one element. This class can be configured in terms
 *  of what element should be created, which attributes should be assigned, and what content
 *  should be assigned.
 */
export class ElementBuilder {

    /**
     *  The element type to create. By default we take a DIV.
     */
    private _element:string;

    /**
     *  The attributes builder.
     */
    private _attributes:AttributesBuilder = new AttributesBuilder();

    /**
     *  The constructor for the builder. Specify the type of the element and optionally
     *  a namespace in which the element should be created.
     */
    constructor(element:string = 'DIV', namespace = null) {

        // assign the element.
        this._element = element;
    }

    /**
     *  The attributes builder.
     */
    attributes() : AttributesBuilder { return this._attributes; }

    /**
     *  Build the element
     */
    build() : HTMLElement {

        // construct the element
        const elem = document.createElement(this._element);

        // return constructed element
        return elem;
    }
};
}