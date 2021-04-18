/**
 *  This is a function that allows for creating an DOM element in a very quick
 *  and easy way.
 *
 *  @param  string  The tag name of the element. It should be capitalized.
 *  @param  object  A key-value object of attributes to assign to the element.
 *  @return Element The element to create.
 */
export namespace DOM {

    export function createElement(tagName:string, attrs:{ [key: string]: string|number } ) : HTMLElement {

        // create the element
        const element = document.createElement(tagName);
    
        // itarate over the attributes
        for(let attr in attrs) element.setAttribute(attr, attrs[attr] as string);
    
        // return the element
        return element;
    };
}
