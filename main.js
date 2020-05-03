/**
 *  This is a file that exports the public interface of the library.
 *
 *  @author     Pawel Kuznik <pawel.kuznik@gmail.com>
 */

// this is the public interface of the library
window.sparkle = {
    Template:   require('./build/lib/Template.js').Template,
    Component:  require('./build/lib/Component.js').Component,
    Container:  require('./build/lib/Container.js').Container,
    // Form:       require('./build/Form.js'),
    // List:       require('./build/List.js'),
    // form:       require('./build/form.js'),
    // object:     require('./build/object.js'),
    // DOM:        { createElement: require('./build/DOM/createElement.js') }
};
