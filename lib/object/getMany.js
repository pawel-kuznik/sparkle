/**
 *  @author     Paweł Kuźnik <pawel.kuznink@gmail.com>
 */

const scanObject = (object, prefix = null) => {

    // the result object
    let result = { };

    // iterate over the object
    for(let prop in object) {

        // compute the property
        let property = prefix ? prefix + prop : prop;

        // an object or an array? then we can descend further
        if (typeof(object[prop]) == 'object' || typeof(object[prop]) == 'array') {

            // assign result of the deeper scan to the result
            Object.assign(result, scanObject(object[prop], property + '.'));
        }

        // assign the value
        else result[property] = object[prop];
    }

    // return the result
    return result;
}

/**
 *  The imlpementation of the function.
 *  @param  object  The object to scan and get all the properties.
 *  @return object  The resulting object.
 */
module.exports = function(object) {

    // the algorithm for scaning is a recursive algorithm, so we call it here
    return scanObject(object);
};
