/**
 *  This is a thin wrapper around Iventy.Emitter class that allows to be used a
 *  internal instance for the event handlers/emitters for a component.
 *  
 *  @author     Pawel Kuznik <pawel.kuznik@gmail.com>
 */

// get the dependency
const Iventy.Emitter = require('iventy').Emitter;

// the event handlers class
const EventHandlers = class extends Iventy.Emitter {

    // for now this expose whatever the interface of the Iventy.Emitter is. It might
    // be that in the future we will need overrides or change the interface somehow.
    // To enable us to make such changes we would like to have this one class here
};
