/**
 *  This is a file that exports the public interface of the library.
 *
 *  @author     Pawel Kuznik <pawel.kuznik@gmail.com>
 */

// this is the public interface of the library
module.exports = {
    Component:  require('./lib/Component.js'),
    Container:  require('./lib/Container.js'),
    Form:       require('./lib/Form.js'),
    List:       require('./lib/List.js'),
    form:       require('./lib/form.js')
};
