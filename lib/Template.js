/**
 *  This is a class describing a template for a component. This template is
 *  fetched from a URL and then it can be unsed.
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


    then(success, failure) {
        
        // install callbacks
        return this[promise].then(success, failure);
    }


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

    abort() {

        // make an abort
        this[controller].abort();
    }
};
