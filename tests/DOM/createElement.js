/**
 *  Test for the DOM.createElement() function.
 */
describe('DOM.createElement()', () => {

    it('should create an element', () => {

        // create element
        const elem = sparkle.DOM.createElement('SPAN');

        // should be an element
        expect(elem).to.be.instanceof(Element);
    });

    it('should assign attributes', () => {

        // attributes to assign
        const attrs = { id: 'custom', title: ' custom title' };

        // create element
        const elem = sparkle.DOM.createElement('SPAN', attrs);

        // make sure the attributes are assigned
        for (let attr in attrs) expect(elem.getAttribute(attr)).to.equal(attrs[attr]);
    });
});
