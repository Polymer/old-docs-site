import {PolymerElement, html} from '@polymer/polymer/polymer-element.js'

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

