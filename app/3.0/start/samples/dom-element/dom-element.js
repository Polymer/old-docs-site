import {Element as PolymerElement} from "https://unpkg.com/@polymer/polymer@3.0.0-pre.1/polymer-element.js"

//export const html = Polymer.html;

// Define the class for a new element called custom-element
class DomElement extends PolymerElement {
  
  static get template () {
    return `
      <p>I'm a DOM element. This is my shadow DOM!</p>
      
      <!-- TODO: Try adding some other html elements inside the 
           template. For example, add <h1>A heading!</h1> or 
           <a href=”stuff.html”>A link!</a>
      --> 
    `;
  }
}
// Register the new element with the browser
customElements.define('dom-element', DomElement);