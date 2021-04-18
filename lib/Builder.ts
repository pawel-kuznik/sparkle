import ElementBuilder from "./Builder/ElementBuilder";
/**
 *  This is a class that allows specifying a builder. This builder can build a certain structure
 *  of DOM elements and components specified by a recipe.
 */
export class Builder {

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
        const builder = new ElementBuilder(this, tagName);

        // remember the builder
        this._builders.push(builder);

        // return the builder
        return builder;
    }

    /**
     *  Build the structure.
     */
    build() {

    }
}