// Import the Polymer library and html helper function
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
// Define the new element as a class
class MyHeader extends PolymerElement {
  // Provide a DOM template for the element
  static get template() {
    // Tag the returned template literal with the html helper function
    // to convert it into an instance of HTMLTemplateElement
    return html`
      <!-- Begin shadow tree -->
      <style>
        /* encapsulated styles go here */
      </style>
      <header>
        <h1>I'm a header</h1>
        <button>Menu</button>
      </header>
      <!-- End shadow tree -->
    `;
  }
}
// Tell the browser about the new tag
customElements.define('my-header', MyHeader);
