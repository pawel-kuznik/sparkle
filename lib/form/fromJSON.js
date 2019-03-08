/**
 *  This is a helper function to fill a form element with data from a JSON object.
 *  The JSON object should be a KEY-VALUE representation of the inputs in the form.
 *
 *  @author     Pawel Kuznik <pawel.kuznik@gmail.com>
 */

/**
 *  The actual function.
 *  @param  HTMLElement     The FORM element
 *  @param  object          The object that should be iterated and assigned to a form.
 */
module.exports = function (form, data) {

    // iterate over the data and set the values one by one
    for (let property in data) {

        // fetch the first element with give name
        let input = form.querySelector('[name="' + property + '"]');

        // no found? skip it
        if (!input) continue;

        // set the input value
        input.value = (typeof(data[property] != 'undefined') && data[property] != null) ? data[property] : '';
    }
};
