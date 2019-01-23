/**
 *  This is a function that allow to access a certain property in an object by
 *  a string of keys separated by a dot. An accessor string.
 *
 *  @author Pawel Kuznik <pawel.kuznik@gmail.com>
 */

/**
 *  The function.
 *  @param  object  The object to access
 *  @param  string  The accessor string
 */
module.exports = function (object, accessor) {

    // variables that we will need
    let property, properties = accessor.split('.');

    // try to get deep into object
    while(property = properties.shift()) {

        // we don't have the property, so nothing to fetch
        if (!(property in object)) return undefined;

        // descend further
        object = object[property];
    }

    // return the final thing
    return object;
};
