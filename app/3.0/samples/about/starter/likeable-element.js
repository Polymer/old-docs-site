// Import an element
import '@polymer/paper-checkbox/paper-checkbox.js';

// Import the PolymerElement base class and html helper
import {PolymerElement, html} from '@polymer/polymer';

// Define an element class
class LikeableElement extends PolymerElement {

  // Define publc API properties
  static get properties() { return { liked: Boolean }}

  // Define the element's template
  static get template() {
    return html`
      <style>
        .response { margin-top: 10px; } 
      </style>
      <paper-checkbox checked="{{liked}}">I like web components.</paper-checkbox>

      <div hidden$="[[!liked]]" class="response">Web components like you, too.</div>
    `;
  }
}

// Register the element with the browser
customElements.define('likeable-element', LikeableElement);
  
