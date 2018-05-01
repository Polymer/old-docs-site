import {Element as PolymerElement, html} from 'https://unpkg.com/@polymer/polymer@3.0.0-pre.7/polymer-element.js'

class ConfigurableNameTag extends PolymerElement {
  static get properties () {
    return {
      // Configure owner property
      owner: {
        type: String,
          value: 'Daniel',
      }
    };
  } 
  static get template () {
    return html`
      <!-- bind to the "owner" property -->
      This is <b>[[owner]]</b>'s name-tag element.
    `;
  }
}
customElements.define('configurable-name-tag', ConfigurableNameTag);

