/**
 *  This is a class that holds the interface for the form module
 *
 *  @author     Pawel Kuznik <pawel.kuznik@gmail.com>
 */

// this is the interface of form module
module.exports = {
    fromJSON:   require('./form/fromJSON.js'),
    toJSON:     require('./form/toJSON.js')
};
