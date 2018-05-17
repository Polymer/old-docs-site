import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './child-element.js';

class ParentElement extends PolymerElement {
  static get template() {
    return html`
      <child-element><slot id="parent-slot"></slot></child-element>
    `;
  }
}
// Tell the browser about the new tag
customElements.define('parent-element', ParentElement);
