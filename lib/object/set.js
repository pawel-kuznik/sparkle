/**
 *  This is a function that allows setting a property on an object.
 *
 *  @author     Pawel Kuznik <pawel.kuznik@gmail.com>
 */

/**
 *  The function
 *  @param  object  The object to set the property on.
 *  @param  string  The accessor string.
 *  @param  mixed   The new value to set the property on.
 */
module.exports = function(object, accessor, value) {

    // split the accessor
    let properties = accessor.split('.');
    let last = properties.pop();

    // try to get deep into object
    while(property = properties.shift()) {

        // we don't have the property, so nothing to fetch
        if (!(property in object)) object[property] = { };

        // descend further
        object = object[property];
    }

    // set the value
    object[last] = value;
};
