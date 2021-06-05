/**
 *  This is a class to set attributes on a element. This class allows for setting up
 *  a single attribute on a specifi element.
 *  @author     Paweł Kuźnik <pawel.kuznik@gmail.com>
 */
export default class AttributesBuilder {

    /**
     *  A map with all attributes to set on an element.
     */
    private _attrs:Map<string,string> = new Map();

    /**
     *  Remember an attribute.
     */
    public set(attr:string, value:string): this;
    public set(attr:string, value:number) : this;
    public set(attr:string, value:any) : this
    {
        // make sure value is a string
        value = value as string;

        this._attrs.set(attr, value);

        return this;
    }

    /**
     *  Delete an attribute to set on an element.
     */
    public delete(attr:string) : this 
    {
        this._attrs.delete(attr);

        return this;
    }

    /**
     *  Set all specified attributes on the element.
     */
    public build(element:Element) : Element
    {
        for (let [attr, value] of this._attrs) element.setAttribute(attr, value);

        return element;
    }

}