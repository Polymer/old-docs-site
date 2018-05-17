import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
class ChildElement extends PolymerElement {
  static get template() {
    return html`
      <div><slot id="child-slot"></slot></div>
    `;
  }
}
// Tell the browser about the new tag
customElements.define('child-element', ChildElement);
