import {Element as PolymerElement} from "https://unpkg.com/@polymer/polymer@3.0.0-pre.1/polymer-element.js"

//export const html = Polymer.html

class NameTag extends PolymerElement {
  constructor() {
    super();
    
    /* set this element's owner property */
    this.owner = "Daniel";
  }
  static get template() {
    return `
      <!-- bind to the "owner" property -->
      This is <b>{{owner}}</b>'s name-tag element.
    `;
  }
}
customElements.define('name-tag', NameTag);

   /* TODO: 
     * - Try editing the value of the `owner` property.
     * - Try adding another property and binding it in 
     *   your component. Hint: Add the following property
     *   definition to the constructor:
     *   `this.propertyName = "Property contents";`
     *   and add `{{propertyName}}` to the element’s shadow DOM.
     */
