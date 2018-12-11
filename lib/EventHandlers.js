/**
 *  This is a thin wrapper around Iventy.Emitter class that allows to be used a
 *  internal instance for the event handlers/emitters for a component.
 *  
 *  @author     Pawel Kuznik <pawel.kuznik@gmail.com>
 */

// get the dependency
const BaseEmitter = require('iventy').Emitter;
const Event = require('iventy').Event;

// the private symbols
const emitter = Symbol('emitter');

/**
 *  This is a class that exposes the emitting part of the event interface.This is
 *  meant to be used as a base class or in public interface.
 */
const Emitter = class {

    /**
     *  The constructor.
     */
    constructor() {
    
        /**
         *  The actual event system emitter.
         *  @var    Iventy.Emitter
         */
        this[emitter] = new BaseEmitter();
    }

    /**
     *  Install a new event handler.
     *  @param  variadic    Look into Iventy.Emitter.on() for mode info.
     */
    on(...args) {

        // the same signature, so we can pass the arguments just like that
        this[emitter].on(...args);

        // allow chaining
        return this;
    }

    /**
     *  Uninstall an event handler.
     *  @param  variadic    Look into Iventy.Emitter.on() for mode info.
     */
    off(...args) {

        // the same signature, so we can pass the arguments just like that
        this[emitter].off(...args);

        // allow chaining
        return this;
    }

    /**
     *  Bubble events to a new target.
     *  @param  variadic    Look into Iventy.Emitter.on() for mode info.
     */
    bubbleTo(...args) {

        // the same signature, so we can pass the arguments just like that
        this[emitter].bubbleTo(...args);

        // allow chaining
        return this;
    }

    /**
     *  Get access to the events triggerer.
     *  @return Triggerer
     */
    get triggerer() {

        // return new triggerer
        return new Triggerer(this);
    }
};

/**
 *  This is a class that exposes the triggering part of the event interface.This
 *  class works in pair with the EventEmitter and it need to be instantiated with
 *  that emitter insteance.
 */
const Triggerer = class {

    /**
     *  The constructor.
     *
     *  @param  EventEmitter
     */
    constructor(parentEmitter) {

        /**
         *  The emitter instance.
         *  @var    Emitter
         */
        this[emitter] = parentEmitter;
    }
    
    /**
     *  Trigger an event.
     */
    trigger(...args) {
        
        // trigger an event
        this[emitter][emitter].trigger(...args);

        // allow chaining
        return this;
    }

    /**
     *  A shorthand for this.trigger(this.createEvent))
     */
    triggerEvent(...args) {
    
        // trigger the event
        this.trigger(this.createEvent(...args));

        // allow chaining
        return this;
    }

    /**
     *  Create a new event instance.
     */
    createEvent(name, data = { }, previousEvent = null) {

        // create a new event
        return new Event(name, data, this, previousEvent);
    }
};

// expose the classes
module.exports = {
    Emitter:    Emitter,
    Triggerer:  Triggerer
};

