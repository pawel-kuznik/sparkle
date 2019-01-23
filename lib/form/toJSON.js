/**
 *  This is a function that allows to cast a form element to a JSON object.
 *  This function is primarly intended to create a REST API friendly representation
 *  of form data.
 *
 *  @author     Pawel Kuznik <pawel.kuznik@gmail.com>
 */

/**
 *  The function
 *  @param  HTMLElement     The form element to serialize to an JSON object
 *  @return object          The object with form data.
 */
module.exports = function(element) {

    // get the form data of a form
    let data = new FormData(element);

    // an object that we will use to store the data
    let parsed = { };

    // iterate over the form data and assign the recognized
    // data to the parsed object
    for(let [key, value] of data) parsed[key] = value;

    // return the parsed object
    return parsed;
};
