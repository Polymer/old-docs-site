import {PolymerElement, html} from '@polymer/polymer/polymer-element.js'

// Define the class for a new element called custom-element
class DomElement extends PolymerElement {

  static get template () {
    return html`
      <p>I'm a DOM element. This is my shadow DOM!</p>

      <!-- TODO: Try adding some other html elements inside the
           template. For example, add <h1>A heading!</h1> or
           <a href="stuff.html">A link!</a>
      -->
    `;
  }
}
// Register the new element with the browser
customElements.define('dom-element', DomElement);