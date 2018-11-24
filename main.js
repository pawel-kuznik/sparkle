/**
 *  This is a file that exports the public interface of the library.
 *
 *  @author     Pawel Kuznik <pawel.kuznik@gmail.com>
 */

// this is the public interface of the library
module.exports = {
    Component: require('./lib/Component.js'),
    Container: require('./lib/Container.js'),
    List: require('./lib/List.js'),
    formToJSON: require('./lib/formToJSON.js'),
    fillForm: require('./lib/fillForm.js')
};
