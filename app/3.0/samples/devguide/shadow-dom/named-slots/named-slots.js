import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
class NamedSlots extends PolymerElement {
  static get template() {
    return html`
      <style>
        /* encapsulated styles go here */
      </style>
      <header>
        <h2><slot name="title"></slot></h2>
        
      </header>
    `;
  }
}
// Tell the browser about the new tag
customElements.define('named-slots', NamedSlots);
