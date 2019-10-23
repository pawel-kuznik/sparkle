/**
 *  This is a helper function to fill a form element with data from a JSON object.
 *  The JSON object should be a KEY-VALUE representation of the inputs in the form.
 *
 *  @author     Pawel Kuznik <pawel.kuznik@gmail.com>
 */

// get the helper function to assign to a chckbox
const toCheckbox = require('./toCheckbox.js');

/**
 *  The actual function.
 *  @param  HTMLElement     The FORM element
 *  @param  object          The object that should be iterated and assigned to a form.
 */
module.exports = function (form, data) {

    // iterate over the data and set the values one by one
    for (let property in data) {

        // fetch all elements with given name
        let inputs = form.querySelectorAll('[name="' + property + '"]');

        // no found? skip it
        if (!inputs) continue;

        // iterate over all found inputs
        for (let input of inputs) {

            // if we have a checkbox then we need to supply a very special handling
            if (input.getAttribute('type') == 'checkbox') toCheckbox(input, data[property]);

            // regular input so we can proceed with regular handling
            else input.value = (typeof(data[property] != 'undefined') && data[property] != null) ? data[property] : '';
        }
    }
};
