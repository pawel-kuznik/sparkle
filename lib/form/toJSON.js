/**
 *  This is a function that allows to cast a form element to a JSON object.
 *  This function is primarly intended to create a REST API friendly representation
 *  of form data.
 *
 *  @author     Pawel Kuznik <pawel.kuznik@gmail.com>
 */

const handleCheckbox = function(form, name) {

    // the output
    const output = [];

    // get all of the checkboxes
    const checkboxes = form.querySelectorAll(`input[type="checkbox"][name="${name}"]`);

    // check if we are dealing with a flag checkbox (one that has no value set and
    // it only serve a purpose to set a true/false value).
    if (checkboxes.length == 1 && (checkboxes[0].value == 'on' || checkboxes[0].value == 'off')) {

        // return true/false depending of the checkbox is checked or not
        return checkboxes[0].checked;
    }

    // get all of the checboxes
    for (let checkbox of checkboxes) {

        // not checked? then skip this one
        if (!checkbox.checked) continue;
    
        // push checkbox value
        output.push(checkbox.value);
    }

    // return the output
    return output;
};

/**
 *  The function
 *  @param  HTMLElement     The form element to serialize to a JSON object
 *  @return object          The object with form data.
 */
module.exports = function(element) {

    // get all inputs form the element
    const inputs = element.querySelectorAll('input[name],textarea[name],select[name]');

    // the output data
    const output = { };

    // create a set that we will use to track which checkboxes we already processed
    const checkboxes = new Set();

    // iterate over the inputs
    for (let input of inputs) {

        // make sure we don't parse disabled inputs
        if (input.disabled) continue;

        // get the name
        let name = input.getAttribute('name');
        
        // no name? then skip this one
        if (!name) continue;

        // get the input type
        let type = input.getAttribute('type');

        // do we need to handle a checkbox in our special way?
        if (type == 'checkbox') {

            // already processed? skip it
            if (checkboxes.has(name)) continue;

            // remember that we processed this checkbox
            checkboxes.add(name);

            // assuign the value
            output[name] = handleCheckbox(element, name);
        }

        // do we have a radio input?
        else if (type == 'radio') {

            // make sure that we note the property in the output
            if (!output.hasOwnProperty(name)) output[name] = null;

            // if it's checked then we can assign the value
            if (input.checked) output[name] = input.value;

            // no need for further processing
            continue;
        }

        // assign the value to the output object
        else output[name] = input.value;
    }

    // return the output
    return output;
};
