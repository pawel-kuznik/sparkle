/**
 *  This is a thin wrapper around Iventy.Emitter class that allows to be used a
 *  internal instance for the event handlers/emitters for a component.
 *
 *  @author     Pawel Kuznik <pawel.kuznik@gmail.com>
 */

// get the dependency
import { Emitter as BaseEmitter, Event } from "iventy";

const emitters:WeakMap<Emitter, BaseEmitter> = new WeakMap();

/**
 *  This is a class that exposes the emitting part of the event interface.This is
 *  meant to be used as a base class or in public interface.
 */
export class Emitter {

    /**
     *  The actual event emitter.
     */
    private readonly _emitter:BaseEmitter = new BaseEmitter();

    /**
     *  Install a new event handler.
     *  @param  variadic    Look into Iventy.Emitter.on() for mode info.
     */
    on(name:string, callback:() => void) : Emitter {

        // the same signature, so we can pass the arguments just like that
        this._emitter.on(name, callback);

        // set the emitter
        emitters.set(this, this._emitter);

        // allow chaining
        return this;
    }

    /**
     *  Uninstall an event handler.
     *  @param  variadic    Look into Iventy.Emitter.on() for mode info.
     */
    off(name:string, callback:() => void) : Emitter {

        // the same signature, so we can pass the arguments just like that
        this._emitter.off(name, callback);

        // allow chaining
        return this;
    }

    /**
     *  Bubble events to a new target.
     *  @param  variadic    Look into Iventy.Emitter.on() for mode info.
     */
    bubbleTo(target:Emitter) : Emitter {

        // try to get the target base emitter
        const targetEmitter:BaseEmitter | null = emitters.get(target);

        // no target emitter? then skip it
        if (!targetEmitter) return;

        this._emitter.bubbleTo(target[emitter]);

        // allow chaining
        return this;
    }

    /**
     *  Get access to the events triggerer.
     *  @return Triggerer
     */
    get triggerer() : Triggerer {

        // return new triggerer
        return new Triggerer(this);
    }
};

/**
 *  This is a class that exposes the triggering part of the event interface.This
 *  class works in pair with the EventEmitter and it need to be instantiated with
 *  that emitter insteance.
 */
export class Triggerer {

    /**
     *  The actual event emitter.
     */
    private readonly _emitter:BaseEmitter;

    /**
     *  The constructor.
     *
     *  @param  EventEmitter
     */
    constructor(parentEmitter:BaseEmitter) {

        // get the event emitter from the parent
        this._emitter = parentEmitter[emitter];
    }

    /**
     *  Trigger an event.
     */
    trigger(...args) : Triggerer {

        // call the emitter
        this._emitter.trigger(...args);

        // allow chaining
        return this;
    }

    /**
     *  Create a new event instance.
     */
     /*
    createEvent(name, data = { }, previousEvent = null) {

        // create a new event
        return new Event(name, data, this[emitter], previousEvent);
    }
    */
};
