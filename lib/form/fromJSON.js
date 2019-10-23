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

        // fetch all elements with given name
        let inputs = form.querySelectorAll('[name="' + property + '"]');

        // no found? skip it
        if (!inputs) continue;

        // iterate over all found inputs
        for (let input of inputs) {

            // if we have a checkbox then we need to supply a very special handling
            if (input.getAttribute('type') == 'checkbox') {

                // do we have a boolean value? then we should only change the checked
                // property only
                if (data[property] === true || data[property] === false) input.checked = data[property];

                // if the property is an array we want to check if the checkbox value
                // is included in the value.
                else if (Array.isArray(data[property])) input.checked = data[property].includes(input.value);

                // the last case is to check the checkbox only if the valye matches
                // the value provided from the data.
                else input.checked = input.value == data[property];
            }

            // regular input so we can proceed with regular handling
            else input.value = (typeof(data[property] != 'undefined') && data[property] != null) ? data[property] : '';
        }
    }
};
