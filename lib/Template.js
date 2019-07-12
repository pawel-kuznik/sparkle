/** 
 *  This is a class describing a HTML template fetched from an URL. The class is
 *  a thenable object cause it manages data fetched from a server under a specific
 *  URL.
 *
 *  This class only manages the template resource (not the usage of lifecycle of
 *  the actual content), but it can be told to make a copy of the template and
 *  insert it to a specific HTML element. Use arrivesTo() method to do it asynchronously.
 *
 *  @author     Pawel Kuznik <pawel.kuznik@gmail.com>
 */

// the privates
const controller = Symbol('controller');
const promise = Symbol('promise');

// export the class
module.exports = class {

    /**
     *  The constructor.
     *  @param  string  The url of the template.
     */
    constructor(url) {

        /**
         *  Construct an abort controller.
         *  @var    AbortController
         */
        this[controller] = new AbortController();

        // the abort signal
        const signal = this[controller].signal;

        /**
         *  The promise that fetches the template content.
         *  @var    Promise
         */
        this[promise] = fetch(url, { signal }).then(response => response.text());
    }

    /**
     *  A template is a thenable object as it represents a resource that
     *  potentially will be fetched from the server.
     *
     *  @param  function    success callback
     *  @param  function    failure callback
     */
    then(success, failure) {
        
        // install callbacks
        return this[promise].then(success, failure);
    }

    /**
     *  Make a copy of the template to arrive to a specific HTML element.
     *
     *  @param  HTMLElement     The element that should get a copy of the template.
     *  @return Promise         A promise resolved when the template copy is in the
     *                          target element.
     */
    arrivesTo(target) {

        // await the promise and add the HTML to the target
        return this[promise].then(html => {

            // construct a template element so we can parse the html
            let template = document.createElement('template');

            // assign the string to the template
            template.innerHTML = html;

            // adopt all children
            let child;
            while(child = template.content.firstElementChild) target.appendChild(target.ownerDocument.adoptNode(child));

            // we can remove the template element
            template.remove();
        });
    }

    /**
     *  Abort the template object.
     */
    abort() {

        // make an abort
        this[controller].abort();
    }
};
