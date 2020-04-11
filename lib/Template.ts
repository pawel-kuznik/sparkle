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

// export the class
export class Template {

    /**
     *  The abort controller.
     */
    private readonly _controller :AbortController = new AbortController();

    /**
     *  The promise of a loaded template.
     */
    private readonly _promise : Promise<string>;

    /**
     *  The constructor.
     *  @param  string  The url of the template.
     */
    constructor(url:string) {

        // the abort signal
        const signal = this._controller.signal;

        // start loading the template and make sure we also provide an abort signal
        this._promise = fetch(url, { signal }).then(response => response.text());
    }

    /**
     *  A template is a thenable object as it represents a resource that
     *  potentially will be fetched from the server.
     *
     *  @param  function    success callback
     *  @param  function    failure callback
     */
    then(success:any, failure:any) : Promise<void> {

        // install callbacks
        return this._promise.then(success, failure);
    }

    /**
     *  Make a copy of the template to arrive to a specific HTML element.
     *
     *  @param  HTMLElement     The element that should get a copy of the template.
     *  @return Promise         A promise resolved when the template copy is in the
     *                          target element.
     */
    arrivesTo(target:HTMLElement|SVGElement) : Promise<void> {

        // await the promise and add the HTML to the target
        return this._promise.then(html => {

            // construct a template element so we can parse the html
            let template:HTMLTemplateElement = document.createElement('template');

            // assign the string to the template
            template.innerHTML = html;

            // adopt all children
            let child:Element|null;
            while(child = template.content.firstElementChild) {

                // try to adopt the node inside our own document
                const adopted = target.ownerDocument?.adoptNode(child)

                // append the template
                if (adopted) target.appendChild(adopted);
            }

            // we can remove the template element
            template.remove();
        });
    }

    /**
     *  Abort the template object.
     */
    abort() : void { this._controller.abort(); }
};
