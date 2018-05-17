import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
class ExampleCard extends PolymerElement {
  static get template() {
    return html`
      <h2><slot name="title"></slot></h2>
      <div><slot></slot></div>
    `;
  }
}
// Tell the browser about the new tag
customElements.define('example-card', ExampleCard);
