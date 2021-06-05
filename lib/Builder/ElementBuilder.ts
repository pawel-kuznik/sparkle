import AttributesBuilder from "./AttributesBuilder";
/**
 *  The class that defines a builder for one element. This class can be configured in terms
 *  of what element should be created, which attributes should be assigned, and what content
 *  should be assigned.
 */
export default class ElementBuilder {

    /**
     *  The element type to create. By default we take a DIV.
     */
    private _element:string;

    /**
     *  The attributes builder.
     */
    private _attributes:AttributesBuilder = new AttributesBuilder();

    /**
     *  The children builders.
     */
    private _children:Set<ElementBuilder> = new Set();

    /**
     *  The constructor for the builder. Specify the type of the element and optionally
     *  a namespace in which the element should be created.
     *  @todo handle namespace of the element
     */
    constructor(element:string = 'DIV', namespace = null) {

        this._element = element;
    }

    /**
     *  The attributes builder.
     */
    attributes() : AttributesBuilder { return this._attributes; }

    /**
     *  Add a child element that has to be built.
     */
    element(tagName:string) : ElementBuilder {

        const child = new ElementBuilder(tagName);
        this._children.add(child);

        return child;
    }

    /**
     *  Build the element
     */
    build() : Element {

        // construct the element but cast it as Element cause we might be dealing with
        // HTML or SVG elements and we want to make sure we can deal with both.
        let elem = document.createElement(this._element) as Element;

        elem = this._attributes.build(elem);

        for (let elemBuilder of this._children) elem.append(elemBuilder.build());

        return elem;
    }
};
