/**
 *  A file to expose the interface of object module.
 *
 *  @author     Pawel Kuznik <pawel.kuznik@gmail.com>
 */

// expose the API
module.exports = {
    get:        require('./object/get.js'),
    set:        require('./object/set.js'),
    flatten:    require('./object/flatten.js')
};
