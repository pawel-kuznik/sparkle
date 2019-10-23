

module.exports = function(checkbox, value) {

    // do we have a boolean value? then we should only change the checked
    // property only
    if (value === true || value === false) checkbox.checked = value;

    // if the property is an array we want to check if the checkbox value
    // is included in the value.
    else if (Array.isArray(value)) checkbox.checked = value.includes(checkbox.value);

    // the last case is to check the checkbox only if the valye matches
    // the value provided from the data.
    else checkbox.checked = checkbox.value == value;
};
