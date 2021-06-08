import ElementBuilder from "./Builder/ElementBuilder";
import BuildProperties from "./BuildProperties"
/**
 *  This is a class that allows specifying a builder. This builder can build a certain structure
 *  of DOM elements and components specified by a recipe.
 */
export default class Builder {

    /**
     *  The sub builders.
     */
    private _builders:Array<ElementBuilder> = [];

    /**
     *  Tell to create an element with given tag.
     *  @param string   The tag name
     */
    element(tagName:string) : ElementBuilder {

        // construct new element builder
        const builder = new ElementBuilder(tagName);

        // remember the builder
        this._builders.push(builder);

        // return the builder
        return builder;
    }

    /**
     *  Build the structure.
     */
    build<Props extends BuildProperties>(props:Props|null = null) : DocumentFragment {

        // create a document fragment that is built by this builder
        const result = document.createDocumentFragment();

        // iterate over the builders and create all elements
        for (let elementBuilder of this._builders) result.append(elementBuilder.build());

        // return the fragment
        return result;
    }
}