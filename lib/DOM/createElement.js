/**
 *  This is a function that allows for creating an DOM element in a very quick
 *  and easy way.
 *
 *  @param  string  The tag name of the element. It should be capitalized.
 *  @param  object  A key-value object of attributes to assign to the element.
 *  @return Element The element to create.
 */
module.exports = function(tagName, attrs = { }) {

    // create the element
    const element = document.createElement(tagName);

    // itarate over the attributes
    for(let attr in attrs) {

        // set the attribute
        element.setAttribute(attr, attrs[attr]);
    }

    // return the element
    return element;
};
